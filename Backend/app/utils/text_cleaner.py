import re
from typing import List, Dict

def clean_text(text: str) -> str:
    """Remove LaTeX, special chars, and normalize whitespace."""
    # Remove LaTeX math blocks
    text = re.sub(r'\$[^$]*\$', '', text)
    text = re.sub(r'\\\w+\{[^}]*\}', '', text)
    # Remove special characters except periods and commas
    text = re.sub(r'[^\w\s.,;:()\-]', ' ', text)
    # Normalize whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def clean_papers(papers: List[Dict]) -> List[Dict]:
    """Clean text field for all papers."""
    cleaned = []
    for p in papers:
        p_copy = p.copy()
        p_copy["text"] = clean_text(p["text"])
        p_copy["title"] = clean_text(p["title"])
        p_copy["abstract"] = clean_text(p["abstract"])
        cleaned.append(p_copy)
    return cleaned