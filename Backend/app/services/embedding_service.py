from sentence_transformers import SentenceTransformer
from typing import List
import numpy as np

# Load once at module level (cached after first load)
_model = None

def get_model() -> SentenceTransformer:
    global _model
    if _model is None:
        print("Loading embedding model... (first time only)")
        _model = SentenceTransformer('all-MiniLM-L6-v2')
    return _model


def generate_embeddings(texts: List[str]) -> np.ndarray:
    """
    Convert list of texts into embedding vectors.
    Returns numpy array of shape (n_texts, embedding_dim).
    """
    model = get_model()
    embeddings = model.encode(
        texts,
        batch_size=32,
        show_progress_bar=False,
        normalize_embeddings=True
    )
    return embeddings