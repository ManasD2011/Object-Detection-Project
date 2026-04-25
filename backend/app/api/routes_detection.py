"""
Detection API

Returns detection results as JSON.
"""

from fastapi import APIRouter
import cv2

from app.services.tracking_service import TrackingService
from app.services.counting_service import CountingService
from app.services.formatter_service import FormatterService
from app.services.movement_service import MovementService
from app.api.routes_stream  import stream_service


router = APIRouter()

# Initialize once (IMPORTANT)
tracking_service = TrackingService()
model = tracking_service.model

counter = CountingService(model.names)
formatter = FormatterService()
movement_service = MovementService(line_position=300)

cap = cv2.VideoCapture(0)


@router.get("/detections")
def get_detections():
    data = stream_service.latest_data

    if data is None:
        return {"message": "No data yet"}

    return data