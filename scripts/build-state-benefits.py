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

PROPERTY_SOURCE_OVERRIDES: dict[str, tuple[str, str]] = {
    "arkansas": (
        "Arkansas DFA statement on disabled veteran property tax exemption",
        "https://webftp.blr.arkansas.gov/Home/FTPDocument?path=Assembly%2F%2F2025%2F2025R%2FFiscal+Impacts%2FHB1072-DFA1.pdf",
    ),
}

PROPERTY_RECORD_OVERRIDES: dict[str, dict[str, Any]] = {
    "indiana": {
        "summary": "Indiana lets qualifying disabled veterans deduct 50% to 100% of their homestead's assessed value from property tax, based on the VA disability rating.",
        "detailMd": "To qualify, the veteran must have served at least 90 days, received an honorable discharge, and have at least a 50% disability. Indiana scales the deduction to the rating: a 50% disability yields a 50% deduction, a 60% disability yields a 60% deduction, and so on up to a 100% deduction at a 100% rating. Apply through the county using the Indiana Department of Veterans Affairs certificate of eligibility.",
        "status": "partial",
        "disabilityThreshold": "At least 50% disability",
        "sourceLabel": "Indiana DVA disabled veteran property tax benefits",
        "sourceUrl": "https://www.in.gov/dva/divisions/training-and-services/disabled-veteran-property-tax-deduction/",
    },
    "maine": {
        "summary": "Maine gives qualifying veterans a $6,000 property tax exemption from the just value of the home, and certain totally and permanently disabled veterans can receive a $50,000 exemption for specially adapted housing.",
        "detailMd": "A veteran qualifies for the $6,000 exemption if they served during a recognized war period and are age 62 or older, receive a 100% disability rating as a veteran, or became 100% disabled while serving. Maine Revenue Services also offers a $50,000 exemption for a veteran who received a federal grant for a specially adapted housing unit. Applications go to the local town office by April 1.",
        "status": "partial",
        "disabilityThreshold": "100% disability for the standard veteran exemption; specially adapted housing grant for the $50,000 disabled-veteran exemption",
        "sourceLabel": "Maine Revenue Services property tax exemptions",
        "sourceUrl": "https://www.maine.gov/revenue/taxes/tax-relief-credits-programs/property-tax-relief-programs/property-tax-exemptions",
    },
    "massachusetts": {
        "summary": "Massachusetts offers local property tax exemptions for eligible veterans, disabled veterans, surviving spouses, and Gold Star parents when the municipality has adopted the exemption.",
        "detailMd": "Exemption amounts depend on the veteran's status, disability classification, and local adoption. Massachusetts says qualifying veterans are entitled to a property tax exemption if their municipality has voted to accept the exemptions, and later HERO Act changes let municipalities expand certain veteran property tax relief.",
        "status": "conditional",
        "disabilityThreshold": None,
        "sourceLabel": "Local Property Tax Exemptions for Veterans",
        "sourceUrl": "https://www.mass.gov/info-details/local-property-tax-exemptions-for-veterans",
    },
    "michigan": {
        "summary": "Michigan exempts an eligible disabled veteran's homestead from property tax, and an un-remarried surviving spouse can continue the exemption.",
        "detailMd": "Michigan's disabled veteran exemption applies to real property used and owned as a homestead by a disabled veteran or the veteran's un-remarried surviving spouse. Eligibility generally turns on one of three paths: a total and permanent service-connected disability, VA assistance for specially adapted housing, or individual unemployability.",
        "status": "full",
        "disabilityThreshold": "Total and permanent disability, specially adapted housing assistance, or individual unemployability",
        "sourceLabel": "Michigan disabled veterans exemption",
        "sourceUrl": "https://www.michigan.gov/taxes/property/exemptions/veterans/disabled-veterans-exemption",
    },
    "south-carolina": {
        "summary": "South Carolina fully exempts a qualifying disabled veteran's home and land, up to five acres, and up to two private passenger vehicles from property tax.",
        "detailMd": "Veterans with a total, permanent, and service-connected disability can claim the exemption. Surviving spouses may also qualify. The South Carolina Department of Revenue says qualified veterans can apply through MyDORWAY and that recent law changes allow eligible disabled veterans to claim the real-property exemption beginning in the year the disability occurs, with limited retroactive relief.",
        "status": "full",
        "disabilityThreshold": "Total, permanent, and service-connected disability",
        "sourceLabel": "South Carolina DOR veterans property tax exemptions",
        "sourceUrl": "https://dor.sc.gov/tax-tips/veterans-learn-more-about-sc-property-tax-exemptions",
    },
    "vermont": {
        "summary": "Vermont exempts $10,000 of appraised value on a qualifying veteran's residence, and towns may vote to raise that exemption to as much as $40,000.",
        "detailMd": "A Vermont veteran, spouse, widow, widower, or child can qualify if the household is receiving VA or military disability compensation, death compensation, dependency and indemnity compensation, or a disability pension. State law requires filing with the Office of Veterans Affairs before May 1 in the first year, and the exemption remains until title is transferred. Towns may raise the exemption amount to as much as $40,000 of appraised value.",
        "status": "partial",
        "disabilityThreshold": "At least 50% disability compensation or other qualifying VA or military disability or death benefits",
        "sourceLabel": "32 V.S.A. § 3802 veterans property tax exemption",
        "sourceUrl": "https://legislature.vermont.gov/statutes/section/32/125/03802",
    },
    "washington": {
        "summary": "Washington reduces property taxes for disabled veterans who own and occupy a primary residence and meet county income limits.",
        "detailMd": "A veteran can qualify through the county assessor if they own and live in the home, meet the county income threshold, and have either an 80% or higher service-connected disability evaluation or VA compensation at the 100% rate for a service-connected disability. The exemption is part of Washington's property-tax program for seniors, people retired due to disability, and veterans with disabilities.",
        "status": "conditional",
        "disabilityThreshold": "At least 80% service-connected disability or VA compensation at the 100% rate",
        "sourceLabel": "Washington DOR property tax exemption for veterans with disabilities",
        "sourceUrl": "https://dor.wa.gov/taxes-rates/property-tax/property-tax-exemption-seniors-people-retired-due-disability-and-veterans-disabilities",
    },
}

RETIREMENT_RECORD_OVERRIDES: dict[str, dict[str, Any]] = {
    "louisiana": {
        "summary": "Louisiana excludes federal retirement benefits, including military retirement pay, from Louisiana taxable income.",
        "detailMd": "The Louisiana Department of Revenue says federal retirement benefits received by federal retirees, both military and nonmilitary, may be excluded from Louisiana taxable income. Federal benefits paid through a military survivor benefit plan may also be excluded.",
        "status": "full",
        "sourceLabel": "Louisiana retirement benefits exclusion FAQ",
        "sourceUrl": "https://revenue.louisiana.gov/tax-education-and-faqs/faqs/individual-income-tax/is-there-a-list-of-retirement-system-benefits-that-may-be-excluded-from-louisiana-income-tax/",
    }
}


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
    if heading.startswith("summary of"):
        score -= 8
    if heading.startswith("who is eligible"):
        score -= 2
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
    if (
        ("disabled veteran" in heading or "disabled veterans" in heading)
        and ("property tax exemption" in heading or "homestead" in heading)
    ):
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


def keyword_score(text: str, keywords: list[str]) -> int:
    normalized = text.lower()
    return sum(1 for keyword in keywords if keyword in normalized)


def pick_official_link(
    section: str,
    keywords: list[str],
    fallback_label: str,
    fallback_url: str,
) -> tuple[str, str]:
    links = []
    for label, url in find_links(section):
        normalized_label = normalize_sentence(label)
        normalized_url = url.lower()
        if not normalized_label:
            continue
        if "myarmybenefits.us.army.mil/images" in normalized_url:
            continue
        score = keyword_score(normalized_label, keywords) * 4
        score += keyword_score(normalized_url, keywords) * 3
        if any(
            domain in normalized_url
            for domain in [
                ".gov/",
                ".gov?",
                ".state.",
                ".us/",
                ".mil/",
                ".edu/",
            ]
        ):
            score += 3
        if "law.justia.com" in normalized_url:
            score += 1
        if "irs.gov" in normalized_url and "disability" in normalized_label.lower():
            score -= 2
        if "va.gov" in normalized_url and "military retired pay" not in normalized_label.lower():
            score -= 2
        if "learn more" in normalized_label.lower():
            score += 1
        if score > 0:
            links.append((score, normalized_label, url))

    if not links:
        return fallback_label, fallback_url

    links.sort(key=lambda item: (item[0], len(item[1])), reverse=True)
    _, label, url = links[0]
    return label, url


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
        retirement_source_label, retirement_source_url = pick_official_link(
            section,
            [
                "military retired pay",
                "military retirement pay",
                "retired pay",
                "income tax",
                "income taxes",
                "tax information for military personnel",
            ],
            f"Army Benefits state guide: {state_name}",
            state_page_url,
        )
        property_source_label, property_source_url = pick_official_link(
            markdown,
            [
                "property tax",
                "homestead",
                "disabled veteran",
                "tax exemption",
                "tax credit",
                "county assessor",
            ],
            f"Army Benefits state guide: {state_name}",
            state_page_url,
        )
        if state["slug"] in PROPERTY_SOURCE_OVERRIDES:
            property_source_label, property_source_url = PROPERTY_SOURCE_OVERRIDES[
                state["slug"]
            ]

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
            retirement_record["sourceLabel"] = f"Army Benefits state guide: {state_name}"
            retirement_record["sourceUrl"] = state_page_url

        retirement_record.update(RETIREMENT_RECORD_OVERRIDES.get(state["slug"], {}))

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
            if property_record["sourceLabel"] == f"Army Benefits state guide: {state_name}":
                property_record["sourceLabel"] = f"Army Benefits state guide: {state_name}"
                property_record["sourceUrl"] = state_page_url

        property_record.update(PROPERTY_RECORD_OVERRIDES.get(state["slug"], {}))

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
