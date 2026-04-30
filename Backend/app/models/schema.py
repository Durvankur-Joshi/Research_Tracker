from pydantic import BaseModel
from typing import List, Optional

class TopicRequest(BaseModel):
    topic: str
    max_papers: Optional[int] = 50
    num_clusters: Optional[int] = 5

class PaperSchema(BaseModel):
    title: str
    abstract: str
    year: int

class ClusterSchema(BaseModel):
    id: int
    name: str
    papers: int
    status: str  # "Mature" | "Growing" | "Gap"
    top_keywords: List[str]
    recent_ratio: float

class InsightSchema(BaseModel):
    cluster_id: int
    cluster_name: str
    insight: str

class AnalysisResponse(BaseModel):
    topic: str
    total_papers: int
    clusters: List[ClusterSchema]
    insights: List[InsightSchema]