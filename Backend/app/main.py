from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.research import router

app = FastAPI(
    title="Research Radar API",
    description="AI-powered research gap detection engine",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Research Radar API is live 🚀"}