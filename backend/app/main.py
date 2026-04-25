"""
FastAPI Main Application

Entry point for the Object Detection Backend.
Handles API routing and application configuration.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes_detection import router as detection_router
from app.api.routes_stream import router as stream_router


# Initialize FastAPI app
app = FastAPI(
    title="Real-Time Object Detection API",
    description="API for real-time object detection, tracking, and streaming using YOLOv8",
    version="1.0.0"
)


# =========================
# CORS Configuration
# =========================
# Allows frontend (Next.js) to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Change this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# Register API Routes
# =========================
app.include_router(detection_router, prefix="/api", tags=["Detection"])
app.include_router(stream_router, prefix="/api", tags=["Streaming"])


# =========================
# Root Endpoint
# =========================
@app.get("/")
def root():
    """
    Health check endpoint.
    """
    return {
        "message": "Object Detection API is running",
        "status": "success"
    }


# =========================
# Optional: Health Endpoint
# =========================
@app.get("/health")
def health_check():
    """
    Simple health check for monitoring.
    """
    return {
        "status": "healthy"
    }
    