"""
Tracking Service

Handles object tracking across frames using YOLO's built-in tracker.
"""

from app.models.yolo_model import YOLOModel


class TrackingService:
    """
    Service class for tracking detected objects across frames.
    """

    def __init__(self):
        """
        Initialize tracking service by loading YOLO model.
        """
        self.model = YOLOModel.load_model()

    def track(self, frame):
        """
        Perform object tracking on a frame.

        Args:
            frame (numpy.ndarray): Input video frame.

        Returns:
            list: YOLO tracking results with object IDs.
        """
        # persist=True ensures object IDs remain consistent across frames
        results = self.model.track(frame, persist=True, conf=0.5)
        return results
        