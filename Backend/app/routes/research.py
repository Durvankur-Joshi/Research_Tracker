from fastapi import APIRouter, HTTPException
from app.models.schema import TopicRequest, AnalysisResponse, ClusterSchema, InsightSchema
from app.services.arxiv_service import fetch_papers
from app.services.embedding_service import generate_embeddings
from app.services.clustering_service import cluster_papers, build_clusters
from app.services.analysis_service import analyze_clusters
from app.services.insight_service import generate_all_insights
from app.utils.text_cleaner import clean_papers
import numpy as np

router = APIRouter()


@router.post("/analyze-topic", response_model=AnalysisResponse)
async def analyze_topic(request: TopicRequest):
    """
    Full pipeline:
    1. Fetch papers from arXiv
    2. Clean text
    3. Generate embeddings
    4. Cluster papers
    5. Analyze cluster status
    6. Generate LLM insights
    7. Return structured response
    """
    # Step 1: Fetch papers
    papers = await fetch_papers(request.topic, max_results=request.max_papers)
    if not papers:
        raise HTTPException(status_code=404, detail=f"No papers found for topic: {request.topic}")

    # Step 2: Clean text
    papers = clean_papers(papers)

    # Step 3: Embed
    texts = [p["text"] for p in papers]
    embeddings = generate_embeddings(texts)

    # Step 4: Cluster
    n_clusters = min(request.num_clusters, len(papers))
    labels = cluster_papers(embeddings, n_clusters=n_clusters)
    clusters = build_clusters(papers, labels, n_clusters)

    # Step 5: Analyze status
    analyzed = analyze_clusters(clusters)

    # Step 6: Generate insights
    insights_data = await generate_all_insights(analyzed)

    # Step 7: Build response
    cluster_schemas = [
        ClusterSchema(
            id=c["id"],
            name=c["name"],
            papers=c["paper_count"],
            status=c["status"],
            top_keywords=c.get("keywords", []),
            recent_ratio=c["recent_ratio"]
        )
        for c in analyzed
    ]

    insight_schemas = [
        InsightSchema(
            cluster_id=i["cluster_id"],
            cluster_name=i["cluster_name"],
            insight=i["insight"]
        )
        for i in insights_data
    ]

    return AnalysisResponse(
        topic=request.topic,
        total_papers=len(papers),
        clusters=cluster_schemas,
        insights=insight_schemas
    )


@router.get("/health")
def health():
    return {"status": "ok"}