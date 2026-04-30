from typing import List, Dict
from datetime import datetime

CURRENT_YEAR = datetime.now().year
RECENT_THRESHOLD = CURRENT_YEAR - 4  # Last 4 years = "recent"


def classify_status(paper_count: int, recent_count: int) -> str:
    """
    Core hackathon logic to classify research maturity.
    
    - Mature: well-researched area (many papers)
    - Growing: emerging field (mostly recent papers)
    - Gap: underexplored area (few papers, mostly old)
    """
    if paper_count == 0:
        return "Gap"

    recent_ratio = recent_count / paper_count

    if paper_count > 20:
        return "Mature"
    elif recent_ratio > 0.6:
        return "Growing"
    else:
        return "Gap"


def analyze_clusters(clusters: List[Dict]) -> List[Dict]:
    """
    Analyze each cluster and attach status, recent_ratio to each.
    """
    analyzed = []

    for cluster in clusters:
        papers = cluster["papers"]
        paper_count = len(papers)
        recent_count = sum(1 for p in papers if p.get("year", 0) >= RECENT_THRESHOLD)
        recent_ratio = round(recent_count / paper_count, 2) if paper_count > 0 else 0.0

        status = classify_status(paper_count, recent_count)

        analyzed.append({
            **cluster,
            "paper_count": paper_count,
            "recent_count": recent_count,
            "recent_ratio": recent_ratio,
            "status": status
        })

    return analyzed