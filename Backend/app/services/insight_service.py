import os
from typing import List, Dict
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize model
model = genai.GenerativeModel("gemini-2.5-flash")


def _build_prompt(cluster: Dict) -> str:
    topic_name = cluster["name"]
    status = cluster["status"]
    keywords = ", ".join(cluster.get("keywords", []))
    paper_count = cluster["paper_count"]
    recent_ratio = cluster["recent_ratio"]

    return f"""
You are a research analyst.

Given the following research cluster data, generate ONE concise insight (max 2 sentences) about the research landscape.

Cluster: {topic_name}
Status: {status}
Key topics: {keywords}
Papers found: {paper_count}
Recent paper ratio: {recent_ratio:.0%}

Instructions:
- If Gap → highlight research opportunity
- If Growing → highlight momentum
- If Mature → highlight stability and next directions

Return ONLY the insight. No labels.
"""


async def generate_insight_gemini(cluster: Dict) -> str:
    """Generate insight using Google Gemini."""
    prompt = _build_prompt(cluster)

    try:
        response = model.generate_content(prompt)

        if response and hasattr(response, "text"):
            return response.text.strip()

    except Exception as e:
        print(f"Gemini API error: {e}")

    # Fallback if Gemini fails
    return _fallback_insight(cluster)


def _fallback_insight(cluster: Dict) -> str:
    """Rule-based fallback insights when LLM is unavailable."""
    name = cluster["name"]
    status = cluster["status"]
    keywords = cluster.get("keywords", [])
    kw = keywords[0] if keywords else "this area"

    if status == "Gap":
        return (
            f"'{name}' is underexplored with only {cluster['paper_count']} papers. "
            f"This presents a strong research opportunity in {kw}."
        )
    elif status == "Growing":
        return (
            f"'{name}' is gaining momentum with {cluster['recent_ratio']:.0%} recent papers. "
            f"This is an emerging area worth exploring."
        )
    else:
        return (
            f"'{name}' is a well-established field with {cluster['paper_count']} papers. "
            f"Future work could explore advanced applications in {kw}."
        )


async def generate_all_insights(analyzed_clusters: List[Dict]) -> List[Dict]:
    """Generate insights for all clusters."""
    insights = []

    for cluster in analyzed_clusters:
        insight_text = await generate_insight_gemini(cluster)

        insights.append({
            "cluster_id": cluster["id"],
            "cluster_name": cluster["name"],
            "status": cluster["status"],
            "insight": insight_text
        })

    return insights