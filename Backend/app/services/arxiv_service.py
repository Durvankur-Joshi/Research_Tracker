import httpx
import xml.etree.ElementTree as ET
from typing import List, Dict
from datetime import datetime

ARXIV_BASE_URL = "https://export.arxiv.org/api/query"

async def fetch_papers(topic: str, max_results: int = 50) -> List[Dict]:
    """
    Fetch papers from arXiv API for a given topic.
    Returns list of {title, abstract, year} dicts.
    """
    params = {
        "search_query": f"all:{topic}",
        "start": 0,
        "max_results": max_results,
        "sortBy": "relevance",
        "sortOrder": "descending"
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.get(ARXIV_BASE_URL, params=params)
        response.raise_for_status()

    papers = _parse_arxiv_xml(response.text)
    return papers


def _parse_arxiv_xml(xml_text: str) -> List[Dict]:
    """Parse arXiv Atom XML and extract title, abstract, year."""
    ns = {
        "atom": "http://www.w3.org/2005/Atom",
        "arxiv": "http://arxiv.org/schemas/atom"
    }

    root = ET.fromstring(xml_text)
    papers = []

    for entry in root.findall("atom:entry", ns):
        title_el = entry.find("atom:title", ns)
        abstract_el = entry.find("atom:summary", ns)
        published_el = entry.find("atom:published", ns)

        if title_el is None or abstract_el is None:
            continue

        title = title_el.text.strip().replace("\n", " ")
        abstract = abstract_el.text.strip().replace("\n", " ")

        year = datetime.now().year
        if published_el is not None:
            try:
                year = int(published_el.text[:4])
            except (ValueError, TypeError):
                pass

        papers.append({
            "title": title,
            "abstract": abstract,
            "year": year,
            "text": f"{title}. {abstract}"
        })

    return papers