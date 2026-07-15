#!/usr/bin/env python3

from __future__ import annotations

import json
import re
import time
from html import unescape
from pathlib import Path
from typing import Any
from urllib.parse import quote
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
SEED_FILE = ROOT / "src" / "lib" / "seed-data.ts"
OUTPUT_FILE = ROOT / "src" / "lib" / "generated-state-benefits.json"
VERIFIED_DATE = "2026-07-14"


def read_seed_source() -> str:
    return SEED_FILE.read_text()


def parse_states(seed_source: str) -> list[dict[str, str]]:
    states_block = re.search(
        r"export const states: StateDefinition\[] = \[(.*?)\];",
        seed_source,
        re.S,
    )
    if not states_block:
        raise RuntimeError("Could not find states array")

    entries = []
    for block in re.findall(r"\{(.*?)\}", states_block.group(1), re.S):
        slug_match = re.search(r'slug:\s*"([^"]+)"', block)
        code_match = re.search(r'code:\s*"([^"]+)"', block)
        name_match = re.search(r'name:\s*"([^"]+)"', block)
        if slug_match and code_match and name_match:
            entries.append(
                {
                    "slug": slug_match.group(1),
                    "code": code_match.group(1),
                    "name": name_match.group(1),
                }
            )
    return entries


def fetch_markdown(state_name: str) -> str:
    page_slug = state_name.replace(" ", "-")
    mirror_url = (
        "https://r.jina.ai/http://https://myarmybenefits.us.army.mil/"
        f"Benefit-Library/State/Territory-Benefits/{quote(page_slug)}"
    )
    try:
        request = Request(mirror_url, headers={"User-Agent": "Mozilla/5.0"})
        with urlopen(request, timeout=20) as response:
            return response.read().decode("utf-8", errors="ignore")
    except Exception:
        page_url = (
            "https://myarmybenefits.us.army.mil/Benefit-Library/State/Territory-Benefits/"
            f"{quote(page_slug)}"
        )
        request = Request(page_url, headers={"User-Agent": "Mozilla/5.0"})
        with urlopen(request, timeout=20) as response:
            html = response.read().decode("utf-8", errors="ignore")
        return html_to_markdownish(html)


def html_to_markdownish(html: str) -> str:
    text = html
    text = re.sub(r"(?is)<script.*?</script>", "", text)
    text = re.sub(r"(?is)<style.*?</style>", "", text)
    text = re.sub(r"(?is)<strong[^>]*>", "**", text)
    text = re.sub(r"(?is)</strong>", "**", text)
    text = re.sub(r"(?is)<b[^>]*>", "**", text)
    text = re.sub(r"(?is)</b>", "**", text)
    text = re.sub(
        r'(?is)<a [^>]*href="([^"]+)"[^>]*>(.*?)</a>',
        lambda match: f"[{strip_html(match.group(2)).strip()}]({match.group(1)})",
        text,
    )
    text = re.sub(r"(?is)<li[^>]*>", "\n* ", text)
    text = re.sub(r"(?is)</li>", "\n", text)
    text = re.sub(r"(?is)<br\s*/?>", "\n", text)
    text = re.sub(r"(?is)</p>", "\n\n", text)
    text = re.sub(r"(?is)</h[1-6]>", "\n\n", text)
    text = re.sub(r"(?is)<[^>]+>", "", text)
    text = unescape(text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def strip_html(text: str) -> str:
    return unescape(re.sub(r"(?is)<[^>]+>", "", text))


def clean_markdown(text: str) -> str:
    text = text.replace("\r", "")
    text = re.sub(r"!\[[^\]]*\]\([^)]+\)", "", text)
    text = re.sub(r"^\s*\[[^\]]+\]\([^)]+\)\s*", "", text)
    text = re.sub(r"^\s*\]\([^)]+\)\s*", "", text)
    text = re.sub(r"\)(?=\[)", ")\n", text)
    text = re.sub(r"([^\s\[]+)\]\((https?://[^)]+)\)", r"\1", text)
    text = re.sub(r"\]\((https?://[^)]+)\)", "", text)
    text = re.sub(r"\n\[\s*$", "", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def extract_tax_section(markdown: str, state_name: str) -> str:
    heading_pattern = re.compile(
        rf"What are my {re.escape(state_name)} .*?State Tax(?:es)? Benefits\?",
        re.I,
    )
    heading_match = heading_pattern.search(markdown)
    if not heading_match:
        raise RuntimeError(f"Could not find tax section for {state_name}")
    start = heading_match.start()
    tail = markdown[start:]
    next_heading = re.search(
        r"What are my .*? Military and Veteran[s]?.*? Benefits\?",
        tail[heading_match.end() - start :],
        re.I,
    )
    if not next_heading:
        return tail
    end = (heading_match.end() - start) + next_heading.start()
    return tail[:end]


def strip_links(text: str) -> str:
    return re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)", r"\1", text)


def find_links(block: str) -> list[tuple[str, str]]:
    return re.findall(r"\[([^\]]+)\]\((https?://[^)\s]+)(?: [^)]+)?\)", block)


def normalize_sentence(text: str) -> str:
    text = strip_links(clean_markdown(text))
    text = text.replace("****", "")
    text = text.replace("**", "")
    text = text.replace("_", "")
    text = re.sub(r"([a-z])([A-Z])", r"\1 \2", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip(" *")


def pick_status_for_retirement(text: str) -> str:
    lower = text.lower()
    if (
        "does not have a general state income tax" in lower
        or "there are no individual state income taxes" in lower
        or "there are no individual income taxes" in lower
    ):
        return "full"
    if "partial exemption" in lower or "tiered exemption" in lower:
        return "partial"
    if "is exempt from" in lower and "income tax" in lower:
        return "full"
    if (
        "does not tax military retired pay" in lower
        or "military retired pay is not taxed" in lower
        or "military retired pay is not taxable" in lower
        or "exempt from state taxes on all military retired pay" in lower
    ):
        return "full"
    if "eligible for the following state tax exemptions" in lower:
        return "partial"
    if "deduction" in lower or "credit" in lower or "subtraction" in lower or "exclusion" in lower:
        return "partial"
    if "taxed" in lower or "subject to" in lower:
        return "none"
    return "conditional"


def pick_status_for_property(text: str) -> str:
    lower = text.lower()
    if "no property tax" in lower:
        return "full"
    if "full exemption" in lower or "exempt from all property taxes" in lower:
        return "full"
    if "partial" in lower or "portion" in lower or "part of" in lower or "market value" in lower:
        return "partial"
    if "may qualify" in lower or "eligible" in lower or "based on" in lower or "must" in lower:
        return "conditional"
    return "conditional"


def extract_threshold(text: str) -> str | None:
    patterns = [
        r"(\d{1,3}%[^.:\n]*service-connected disability[^.:\n]*)",
        r"(100%[^.:\n]*disabled[^.:\n]*)",
        r"(permanent and total[^.:\n]*)",
        r"(unemployab[^.:\n]*)",
    ]
    for pattern in patterns:
        match = re.search(pattern, text, re.I)
        if match:
            return normalize_sentence(match.group(1))
    return None


def split_heading_blocks(section: str) -> list[str]:
    blocks = re.split(r"(?=\n\*\*[^*\n])", "\n" + section.strip())
    return [clean_markdown(block) for block in blocks if block.strip().startswith("**")]


def heading_text(block: str) -> str:
    first_line = block.splitlines()[0]
    first_line = strip_links(first_line)
    first_line = re.sub(r"\*\*", "", first_line)
    return normalize_sentence(first_line)


def choose_best_block(
    section: str,
    scorer,
    state_name: str,
    label: str,
) -> tuple[str, str]:
    best_block = None
    best_heading = None
    best_score = 0

    for block in split_heading_blocks(section):
        heading = heading_text(block)
        score = scorer(heading.lower(), block.lower())
        if score > best_score:
            best_block = block
            best_heading = heading
            best_score = score

    if best_block and best_heading:
        return best_block, best_heading

    raise RuntimeError(f"Could not find {label} block for {state_name}")


def extract_phrase_block(section: str, phrases: list[str]) -> tuple[str, str] | None:
    for phrase in phrases:
        match = re.search(re.escape(phrase), section, re.I)
        if not match:
            continue
        line_start = section.rfind("\n", 0, match.start())
        line_start = 0 if line_start == -1 else line_start + 1
        block_start = section.rfind("**", line_start, match.start())
        if block_start == -1:
            block_start = line_start
        start = block_start
        next_heading = re.search(r"\n\*\*[^*\n]", section[match.end() :])
        back_to_top = re.search(r"\n\[\*\*Back to top\*\*\]", section[match.end() :], re.I)
        candidates = []
        if next_heading:
            candidates.append(match.end() + next_heading.start())
        if back_to_top:
            candidates.append(match.end() + back_to_top.start())
        end = min(candidates) if candidates else len(section)
        return clean_markdown(section[start:end]), phrase
    return None


def retirement_score(heading: str, block: str) -> int:
    score = 0
    if "military retired pay" in heading or "military retirement pay" in heading:
        score += 6
    if "income taxes" in heading or "income tax" in heading or "state taxes" in heading:
        score += 3
    if "retired" in heading:
        score += 2
    if "survivor benefit" in heading or "combat pay" in heading or "medal of honor" in heading:
        score -= 3
    if "disability retirement pay" in heading:
        score -= 2
    return score


def property_score(heading: str, block: str) -> int:
    score = 0
    if "property tax" in heading:
        score += 6
    if "homestead" in heading:
        score += 4
    if "school tax credit" in heading:
        score += 4
    if "tax credit" in heading and "veteran" in heading:
        score += 3
    if "disabled veteran" in heading or "disabled veterans" in heading:
        score += 3
    if "veteran" in heading:
        score += 1
    if "survivor benefit" in heading or "income tax" in heading or "abatement" in heading:
        score -= 4
    return score


def extract_retirement_block(section: str, state_name: str) -> tuple[str, str]:
    phrases = [
        "Military Retired Pay",
        "Military Retirement Pay",
        "Taxable Income Subtraction for Military Retired Pay",
        "Income Taxes on Military Retired Pay",
        "Retired Pay Income Tax",
        "Retired Pay is Exempt from",
    ]
    return extract_phrase_block(section, phrases) or choose_best_block(
        section,
        retirement_score,
        state_name,
        "retirement",
    )


def extract_property_block(markdown: str, section: str, state_name: str) -> tuple[str, str]:
    return choose_best_block(markdown, property_score, state_name, "property")


def build_summary(text: str, fallback: str) -> str:
    text = clean_markdown(text)
    first_sentence = re.split(r"(?<=[.?!])\s+", text, maxsplit=1)[0]
    sentence = normalize_sentence(first_sentence).lstrip("]:- ")
    if sentence.lower().startswith("summary of "):
        return fallback
    if sentence and not sentence.endswith((".", "!", "?")):
        sentence += "."
    return sentence if sentence else fallback


def build_detail(text: str) -> str:
    text = clean_markdown(text)
    text = strip_links(text)
    text = re.sub(r"\*\*", "", text)
    text = re.sub(r"_([^_]+)_", r"\1", text)
    text = re.sub(r"(?m)^\[[^\n]*\n?", "", text)
    text = re.sub(r"\[\s*$", "", text)
    text = re.sub(r"([a-z0-9.])([A-Z])", r"\1 \2", text)
    text = re.split(
        r"\n\s*[A-Z][A-Za-z .]*State Taxes on U\. ?S\. Department of Veterans Affairs Disability Dependency and Indemnity Compensation",
        text,
        maxsplit=1,
    )[0]
    text = re.sub(r"\n{2,}", "\n\n", text)
    return text[:1800].strip()


def pick_source(block: str, fallback_label: str, fallback_url: str) -> tuple[str, str]:
    links = [
        (normalize_sentence(label), url)
        for label, url in find_links(block)
        if "back to top" not in label.lower()
    ]
    if links:
        return links[0]
    return fallback_label, fallback_url


def build_records() -> list[dict[str, Any]]:
    seed_source = read_seed_source()
    states = parse_states(seed_source)
    records: list[dict[str, Any]] = []

    for index, state in enumerate(states):
        state_name = state["name"]
        state_page_url = (
            "https://myarmybenefits.us.army.mil/Benefit-Library/State/Territory-Benefits/"
            + state_name.replace(" ", "-")
        )
        markdown = fetch_markdown(state_name)
        section = extract_tax_section(markdown, state_name)

        retirement_text, _ = extract_retirement_block(section, state_name)
        property_text, _ = extract_property_block(markdown, section, state_name)

        retirement_summary = build_summary(
            retirement_text,
            f"{state_name} military retirement tax treatment is published in the official state benefits guide.",
        )
        property_summary = build_summary(
            property_text,
            f"{state_name} disabled veteran property tax rules are published in the official state benefits guide.",
        )
        retirement_source_label, retirement_source_url = pick_source(
            retirement_text,
            f"Official Army Benefits: {state_name}",
            state_page_url,
        )
        property_source_label, property_source_url = pick_source(
            property_text,
            f"Official Army Benefits: {state_name}",
            state_page_url,
        )

        retirement_record = {
            "id": f"{state['slug']}-military-retirement-pay",
            "stateSlug": state["slug"],
            "category": "military-retirement-pay",
            "categoryGroup": "Taxes",
            "question": f"Does {state_name} tax military retirement pay?",
            "summary": retirement_summary,
            "detailMd": build_detail(retirement_text),
            "status": pick_status_for_retirement(retirement_text),
            "disabilityThreshold": None,
            "sourceLabel": retirement_source_label,
            "sourceUrl": retirement_source_url,
            "verifiedDate": VERIFIED_DATE,
            "published": True,
            "featuredInComparison": True,
        }

        if (
            not retirement_record["detailMd"]
            or str(retirement_record["summary"]).startswith("[")
            or (
                "spouse" in str(retirement_record["summary"]).lower()
                and "retired" not in str(retirement_record["summary"]).lower()
            )
        ):
            retirement_record["summary"] = (
                f"{state_name} military retirement tax treatment is published in the official state benefits guide."
            )
            retirement_record["detailMd"] = (
                f"The official {state_name} state benefits source should be used to confirm how military retirement pay is treated for state tax purposes."
            )
            retirement_record["sourceLabel"] = f"Official Army Benefits: {state_name}"
            retirement_record["sourceUrl"] = state_page_url

        property_record = {
            "id": f"{state['slug']}-property-tax-exemption",
            "stateSlug": state["slug"],
            "category": "property-tax-exemption",
            "categoryGroup": "Housing",
            "question": f"What disabled veteran property tax relief is available in {state_name}?",
            "summary": property_summary,
            "detailMd": build_detail(property_text),
            "status": pick_status_for_property(property_text),
            "disabilityThreshold": extract_threshold(property_text),
            "sourceLabel": property_source_label,
            "sourceUrl": property_source_url,
            "verifiedDate": VERIFIED_DATE,
            "published": True,
            "featuredInComparison": True,
        }

        if not property_record["detailMd"] or str(property_record["summary"]).startswith("["):
            property_record["summary"] = (
                f"{state_name} disabled veteran property tax rules are published in the official state benefits guide."
            )
            property_record["detailMd"] = (
                f"The official {state_name} state benefits source should be used to confirm current disabled veteran property tax relief, thresholds, and local filing requirements."
            )
            property_record["sourceLabel"] = f"Official Army Benefits: {state_name}"
            property_record["sourceUrl"] = state_page_url

        records.extend([retirement_record, property_record])
        time.sleep(0.2)
        print(f"Built {index + 1}/{len(states)}: {state_name}")

    return records


def main() -> None:
    records = build_records()
    OUTPUT_FILE.write_text(json.dumps(records, indent=2) + "\n")
    print(f"Wrote {len(records)} records to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
