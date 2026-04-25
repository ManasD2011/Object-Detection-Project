"""
YOLO Model Loader Module

This module ensures that the YOLO model is loaded only once
and reused across the application (Singleton Pattern).
"""
from ultralytics import YOLO

import torch
print(torch.cuda.is_available())


class YOLOModel:
    """
    Singleton class for loading and accessing the YOLO model.
    """
    _model = None  # Class-level variable to store model instance

    @classmethod
    def load_model(cls, model_path: str = "yolov8m.pt"):
        """
        Load YOLO model only once.

        Args:
            model_path (str): Path to YOLO model weights.

        Returns:
            YOLO: Loaded YOLO model instance.
        """
        if cls._model is None:
            cls._model = YOLO(model_path)  # Load model only once
        return cls._model

