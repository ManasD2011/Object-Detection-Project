"""
Streaming API
"""

from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.services.stream_service import StreamService

router = APIRouter()

stream_service = StreamService()


@router.get("/stream")
def stream_video():
    return StreamingResponse(
        stream_service.generate_frames(),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )

    