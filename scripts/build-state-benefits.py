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
    "alabama": {
        "summary": "Alabama's H-3 homestead exemption covers qualifying residents who are permanently and totally disabled, with no income limit.",
        "detailMd": "The Alabama Department of Revenue lists a disabled homestead exemption for residents who are permanently and totally disabled. The exemption applies to an owner-occupied homestead and does not have an income limit, but the resident still applies through the local assessing official.",
        "status": "conditional",
        "disabilityThreshold": "Permanent and total disability",
        "sourceLabel": "Alabama homestead exemptions",
        "sourceUrl": "https://www.revenue.alabama.gov/property-tax/homestead-exemptions/",
    },
    "arizona": {
        "summary": "Arizona offers a property tax exemption for disabled veterans, with the exemption amount tied to the veteran's disability percentage and subject to income and assessed-value limits.",
        "detailMd": "Arizona says disabled veterans can qualify for a property tax exemption, and the amount is tied to the disability percentage shown in the VA benefit summary letter. Arizona's Department of Revenue also notes that the exemption is limited by income and by the assessed value of the property, with a full exemption available only in limited circumstances such as a total and permanent disability.",
        "status": "conditional",
        "disabilityThreshold": "Service-connected or non-service-connected disability; larger relief for total and permanent disability",
        "sourceLabel": "Arizona property tax exemption for veterans with a disability",
        "sourceUrl": "https://azdor.gov/business/property-tax/property-tax-faqs",
    },
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
    "connecticut": {
        "summary": "Connecticut now grants a complete property tax exemption for the primary residence or one motor vehicle of a veteran with a permanent and total service-connected disability.",
        "detailMd": "Connecticut enacted a statewide exemption for veterans with a permanent and total disability rating resulting from active-duty service. The exemption applies to the veteran's primary residence or, if the veteran does not own a home, one motor vehicle, and municipalities must offer it.",
        "status": "full",
        "disabilityThreshold": "Permanent and total service-connected disability",
        "sourceLabel": "Connecticut veterans property tax exemption law announcement",
        "sourceUrl": "https://portal.ct.gov/governor/news/press-releases/2024/05-2024/governor-lamont-signs-law-establishing-property-tax-exemption-for-veterans",
    },
    "delaware": {
        "summary": "Delaware offers a credit against 100% of non-vocational school district property tax on a qualifying disabled veteran's primary residence.",
        "detailMd": "Delaware's Disabled Veterans School Tax Credit applies only to the primary residence and only to non-vocational school district property tax. The state says applications are due by April 30, and the benefit is intended for disabled veterans who meet the program's residency and disability standards.",
        "status": "partial",
        "disabilityThreshold": "100% permanent disability or compensation at the 100% rate due to individual unemployability",
        "sourceLabel": "Delaware disabled veterans school tax credit",
        "sourceUrl": "https://finance.delaware.gov/disabled-veterans/",
    },
    "hawaii": {
        "summary": "Hawaii provides real-property tax exemptions for totally disabled veterans and eligible widow(er)s, but the amount varies by county.",
        "detailMd": "Hawaii's Office of Veterans' Services says real-property tax exemptions are available on a home owned and occupied by a totally disabled veteran or the veteran's widow(er). Because the benefit varies by island and county, applicants must work with the local real property tax office where the home is located.",
        "status": "conditional",
        "disabilityThreshold": "Total disability",
        "sourceLabel": "Hawaii real property tax exemption guidance",
        "sourceUrl": "https://dod.hawaii.gov/ovs/benefits-and-services/",
    },
    "mississippi": {
        "summary": "Mississippi exempts a qualifying totally disabled homeowner from taxes on the first $75,000 of true value on the homestead.",
        "detailMd": "Mississippi's homestead exemption program gives age or disability relief to qualifying homeowners. The Department of Revenue says a person who is otherwise eligible for homestead exemption and is totally disabled is exempt from taxes on the first $75,000 of true value on the home.",
        "status": "partial",
        "disabilityThreshold": "Total disability",
        "sourceLabel": "Mississippi property tax FAQs",
        "sourceUrl": "https://www.dor.ms.gov/county-services/property-tax-frequently-asked-questions",
    },
    "new-mexico": {
        "summary": "New Mexico reduces a disabled veteran's taxable property value by the same percentage as the veteran's service-connected disability rating.",
        "detailMd": "New Mexico's disabled veteran property tax exemption is applied to the taxable value of the veteran's primary residence. A veteran with a 50% service-connected disability can therefore receive a 50% reduction in taxable value, and a veteran with a 100% total and permanent rating also receives relief from special benefit assessments.",
        "status": "partial",
        "disabilityThreshold": "Any service-connected disability rating; extra relief at 100% total and permanent disability",
        "sourceLabel": "New Mexico disabled veteran property tax exemption",
        "sourceUrl": "https://www.dvs.nm.gov/benefits/",
    },
    "new-hampshire": {
        "summary": "New Hampshire gives certain totally and permanently disabled veterans a standard $700 property tax credit, and towns may adopt a higher amount up to $5,000.",
        "detailMd": "New Hampshire provides a statewide standard credit for certain disabled veterans under RSA 72:35 and allows municipalities to adopt a larger optional credit. The qualifying disability credit is tied to service-connected total and permanent disability, or certain catastrophic service-connected conditions such as double amputation or paraplegia.",
        "status": "partial",
        "disabilityThreshold": "Service-connected total and permanent disability, or qualifying double-amputation or paraplegia",
        "sourceLabel": "New Hampshire veterans tax credits and exemptions",
        "sourceUrl": "https://www.revenue.nh.gov/taxes-glance/tax-credit-programs/exemptions-and-veterans-tax-credits",
    },
    "ohio": {
        "summary": "Ohio's disabled veterans enhanced homestead exemption gives qualifying veterans additional property-tax relief with no income test.",
        "detailMd": "Ohio's Department of Taxation says the enhanced homestead exemption is for service-connected disabled veterans and their surviving spouses and does not use an income test. The benefit is tied to the disabled-veteran homestead exemption forms and provides larger relief than the standard homestead exemption.",
        "status": "partial",
        "disabilityThreshold": "100% service-connected disability or compensation at the 100% rate due to unemployability",
        "sourceLabel": "Ohio disabled veterans enhanced homestead exemption",
        "sourceUrl": "https://tax.ohio.gov/individual/property-tax",
    },
    "oklahoma": {
        "summary": "Oklahoma exempts the full fair cash value of a qualifying 100% disabled veteran's homestead from property tax.",
        "detailMd": "Oklahoma Tax Commission guidance says the disabled veteran property tax exemption covers the full fair cash value of the homestead. The benefit can also continue for the surviving spouse if the statutory conditions remain satisfied and the application is filed with the county assessor.",
        "status": "full",
        "disabilityThreshold": "100% disabled from service-related injuries",
        "sourceLabel": "Oklahoma ad valorem property tax exemption for 100% disabled veterans",
        "sourceUrl": "https://oklahoma.gov/tax/individuals/exemptions.html",
    },
    "rhode-island": {
        "summary": "Rhode Island authorizes veteran property tax exemptions, but the actual exemption amounts for disabled veterans vary by city and town.",
        "detailMd": "Rhode Island's Office of Veterans Services points veterans to the municipal exemption report because property tax exemptions are set locally. Disabled-veteran relief exists statewide under the law, but applicants need the local assessor's rules, form, and exemption amount for the town where the property sits.",
        "status": "conditional",
        "disabilityThreshold": "Service-connected disability categories and amounts vary by municipality",
        "sourceLabel": "Rhode Island veterans property tax exemptions",
        "sourceUrl": "https://vets.ri.gov/i-am-find-your-benefits/world-war-ii-korean-war-veteran/property-tax-exemptions",
    },
    "north-carolina": {
        "summary": "North Carolina exempts the first $45,000 of assessed value on a qualifying disabled veteran's permanent residence.",
        "detailMd": "North Carolina's disabled veteran homestead exemption applies to the first $45,000 of assessed value on the veteran's permanent residence. It is available to honorably discharged veterans with a total and permanent service-connected disability or benefits for specially adapted housing, and can continue for certain surviving spouses.",
        "status": "partial",
        "disabilityThreshold": "Total and permanent service-connected disability or VA specially adapted housing eligibility",
        "sourceLabel": "North Carolina disabled veterans property tax relief",
        "sourceUrl": "https://www.milvets.nc.gov/benefits-services/veterans-property-tax-relief",
    },
    "pennsylvania": {
        "summary": "Pennsylvania can fully exempt a qualifying disabled veteran's principal residence from real estate taxes, but the applicant must also meet the program's financial-need test.",
        "detailMd": "Pennsylvania's Disabled Veterans' Real Estate Tax Exemption can remove all real estate tax on the principal residence when the veteran or surviving spouse meets every eligibility requirement. Those requirements include a qualifying wartime-service history, a 100% permanent service-connected disability or certain catastrophic service injuries, residency, occupancy, and financial need.",
        "status": "conditional",
        "disabilityThreshold": "100% permanent service-connected disability, or blindness, paralysis, or loss of two or more limbs due to military service",
        "sourceLabel": "Pennsylvania disabled veterans real estate tax exemption",
        "sourceUrl": "https://www.pa.gov/agencies/dmva/pennsylvania-veterans/pa-vetconnect/state-veterans-programs/financial-assistance/retx",
    },
    "south-dakota": {
        "summary": "South Dakota exempts up to $200,000 of assessed value on qualifying property owned and occupied by a disabled veteran or eligible surviving spouse.",
        "detailMd": "South Dakota's Department of Revenue says the disabled veteran exemption covers up to $200,000 of assessed value on the home, garage, and lot. The veteran must be permanently and totally disabled because of a service-connected disability, and an un-remarried surviving spouse may also qualify.",
        "status": "partial",
        "disabilityThreshold": "Permanent and total service-connected disability",
        "sourceLabel": "South Dakota disabled veteran property tax exemption",
        "sourceUrl": "https://dor.sd.gov/individuals/taxes/property-tax/relief-programs/",
    },
    "tennessee": {
        "summary": "Tennessee reimburses property tax relief for a qualifying disabled veteran's primary residence based on up to $175,000 of market value.",
        "detailMd": "Tennessee treats disabled-veteran property tax relief as a reimbursement program. The veteran or surviving spouse must own and use the property as a primary residence, and the state calculates relief on up to $175,000 of market value under current published guidance.",
        "status": "partial",
        "disabilityThreshold": "Disabled-veteran eligibility determined through VA documentation and county trustee review",
        "sourceLabel": "Tennessee property tax relief for disabled veterans",
        "sourceUrl": "https://www.tn.gov/veteran/veteran-benefits/tn-state-benefits/homeowners/property-tax-relief-for-disabled-veterans.html",
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
    "west-virginia": {
        "summary": "West Virginia refunds 100% of qualifying homestead property tax through the Disabled Veteran Real Property Tax Credit.",
        "detailMd": "West Virginia's Tax Division says the Disabled Veteran Real Property Tax Credit is a refundable personal income tax credit for disabled veteran homeowners. It can be claimed by a veteran who is 90% to 100% permanently and totally disabled and who timely paid the homestead's real property tax; the credit refunds 100% of that real property tax paid.",
        "status": "full",
        "disabilityThreshold": "90% to 100% permanently and totally disabled",
        "sourceLabel": "West Virginia disabled veteran real property tax credit",
        "sourceUrl": "https://tax.wv.gov/Individuals/Pages/IncomeTaxCreditsForPropertyTaxesPaid.aspx",
    },
    "wyoming": {
        "summary": "Wyoming provides a $6,000 assessed-value property tax exemption that can be applied to a qualifying veteran's primary residence or, if unused there, to a vehicle.",
        "detailMd": "Wyoming's property-tax relief page says the veterans exemption equals $6,000 in assessed value against real or personal property. Disabled veterans with a compensable service-connected disability can qualify, but so can certain wartime or combat veterans, so applicants need to confirm eligibility with the county assessor.",
        "status": "partial",
        "disabilityThreshold": "Compensable service-connected disability or other qualifying veteran-service categories",
        "sourceLabel": "Wyoming veterans property tax exemption program",
        "sourceUrl": "https://wyo-prop-div.wyo.gov/tax-relief",
    },
}

RETIREMENT_RECORD_OVERRIDES: dict[str, dict[str, Any]] = {
    "florida": {
        "summary": "Florida does not impose a personal income tax, so military retirement pay is not taxed at the state level.",
        "detailMd": "Florida's Department of Revenue says Florida does not impose a personal income tax, so there is no state individual income tax return filing requirement. That means military retirement pay is not taxed by the state.",
        "status": "full",
        "sourceLabel": "Florida DOR personal income tax FAQ",
        "sourceUrl": "https://floridarevenue.com/faq/Pages/FAQDetails.aspx?FAQID=1466",
    },
    "louisiana": {
        "summary": "Louisiana excludes federal retirement benefits, including military retirement pay, from Louisiana taxable income.",
        "detailMd": "The Louisiana Department of Revenue says federal retirement benefits received by federal retirees, both military and nonmilitary, may be excluded from Louisiana taxable income. Federal benefits paid through a military survivor benefit plan may also be excluded.",
        "status": "full",
        "sourceLabel": "Louisiana retirement benefits exclusion FAQ",
        "sourceUrl": "https://revenue.louisiana.gov/tax-education-and-faqs/faqs/individual-income-tax/is-there-a-list-of-retirement-system-benefits-that-may-be-excluded-from-louisiana-income-tax/",
    },
    "new-mexico": {
        "summary": "New Mexico currently allows a partial exemption of up to $30,000 of military retirement income from state personal income tax.",
        "detailMd": "New Mexico phased in its armed forces retirement exemption from $10,000 in tax year 2022 to $20,000 in 2023, and then to $30,000 in tax years 2024 through 2026. Qualifying military retirees can claim the exemption against military retirement pay included in New Mexico net income.",
        "status": "partial",
        "sourceLabel": "New Mexico PIT-ADJ military retirement exemption instructions",
        "sourceUrl": "https://realfile.tax.newmexico.gov/2022pit-adj-ins.pdf",
    },
    "tennessee": {
        "summary": "Tennessee does not tax military retirement pay because the Hall income tax was fully repealed for tax years beginning January 1, 2021.",
        "detailMd": "The Tennessee Department of Revenue says the Hall income tax was fully repealed for tax periods beginning on or after January 1, 2021. Tennessee therefore has no state individual income tax on military retirement pay.",
        "status": "full",
        "sourceLabel": "Tennessee DOR Hall income tax repeal guidance",
        "sourceUrl": "https://www.tn.gov/revenue/taxes/hall-income-tax.html",
    },
    "texas": {
        "summary": "Texas does not impose a state personal income tax, so military retirement pay is not taxed at the state level.",
        "detailMd": "The Texas Comptroller states that Texas has no state income tax. Because there is no Texas personal income tax, military retirement pay is not taxed by the state.",
        "status": "full",
        "sourceLabel": "Texas Comptroller on state income tax",
        "sourceUrl": "https://comptroller.texas.gov/economy/fiscal-notes/industry/2025/small-biz-info/",
    },
    "vermont": {
        "summary": "Vermont excludes all federally taxable military retirement and survivor benefit income for taxpayers with federal adjusted gross income of $125,000 or less, phases the exclusion out through $175,000, and allows no exclusion at $175,000 or more.",
        "detailMd": "Act 71 of 2025 added Vermont's current military retirement exclusion. Vermont allows a full exclusion of federally taxable U.S. military retirement income and survivor benefit income at $125,000 or less of federal adjusted gross income, a proportional phaseout between $125,000 and $175,000, and no exclusion once federal adjusted gross income reaches $175,000.",
        "status": "partial",
        "sourceLabel": "Vermont Act 71 military retirement exclusion",
        "sourceUrl": "https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT071/ACT071%20As%20Enacted.pdf",
    },
    "wyoming": {
        "summary": "Wyoming does not impose a state personal income tax, so military retirement pay is not taxed at the state level.",
        "detailMd": "Wyoming promotes its no-state-income-tax structure across official state resources. Because Wyoming has no state personal income tax, military retirement pay is not taxed by the state.",
        "status": "full",
        "sourceLabel": "Wyoming official state relocation guide",
        "sourceUrl": "https://dws.wyo.gov/dws-division/business-training-support-unit/wyrelocate/",
    },
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
