from sklearn.cluster import KMeans
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
from typing import List, Dict, Tuple


def cluster_papers(embeddings: np.ndarray, n_clusters: int = 5) -> np.ndarray:
    """
    Cluster paper embeddings using KMeans.
    Returns array of cluster labels.
    """
    n_clusters = min(n_clusters, len(embeddings))
    kmeans = KMeans(
        n_clusters=n_clusters,
        random_state=42,
        n_init=10
    )
    labels = kmeans.fit_predict(embeddings)
    return labels


def extract_cluster_keywords(papers: List[Dict], labels: np.ndarray, cluster_id: int, top_n: int = 5) -> List[str]:
    """
    Extract top TF-IDF keywords for a specific cluster.
    """
    cluster_texts = [
        p["text"] for p, label in zip(papers, labels) if label == cluster_id
    ]

    if not cluster_texts:
        return []

    try:
        vectorizer = TfidfVectorizer(
            max_features=100,
            stop_words='english',
            ngram_range=(1, 2)
        )
        tfidf_matrix = vectorizer.fit_transform(cluster_texts)
        feature_names = vectorizer.get_feature_names_out()
        mean_scores = np.asarray(tfidf_matrix.mean(axis=0)).flatten()
        top_indices = mean_scores.argsort()[-top_n:][::-1]
        keywords = [feature_names[i] for i in top_indices]
        return keywords
    except Exception:
        return []


def name_cluster(keywords: List[str]) -> str:
    """
    Generate a human-readable cluster name from keywords.
    Capitalizes the top 2-3 keywords.
    """
    if not keywords:
        return "General Research"
    # Use top 2 keywords, title-cased
    name_parts = [k.title() for k in keywords[:2]]
    return " & ".join(name_parts)


def build_clusters(papers: List[Dict], labels: np.ndarray, n_clusters: int) -> List[Dict]:
    """
    Build cluster summary dicts with names, paper lists, and metadata.
    """
    clusters = []
    for cluster_id in range(n_clusters):
        cluster_papers = [
            p for p, label in zip(papers, labels) if label == cluster_id
        ]
        if not cluster_papers:
            continue

        keywords = extract_cluster_keywords(papers, labels, cluster_id)
        name = name_cluster(keywords)

        clusters.append({
            "id": cluster_id,
            "name": name,
            "papers": cluster_papers,
            "keywords": keywords
        })

    return clusters