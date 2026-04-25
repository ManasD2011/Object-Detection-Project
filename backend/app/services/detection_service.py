"""
Detection Service

Handles object detection using YOLO model.
"""

from app.models.yolo_model import YOLOModel


class DetectionService:
    """
    Service class for performing object detection.
    """

    def __init__(self):
        """
        Initialize detection service by loading YOLO model.
        """
        self.model = YOLOModel.load_model()

    def detect(self, frame):
        """
        Perform object detection on a frame.

        Args:
            frame (numpy.ndarray): Input video frame.

        Returns:
            list: YOLO detection results.
        """
        results = self.model(frame)
        return results
        