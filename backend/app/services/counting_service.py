"""
Counting Service

Counts the number of detected objects per class.
"""


class CountingService:
    """
    Service class for counting detected objects.
    """

    def __init__(self, class_names):
        """
        Initialize with model class labels.

        Args:
            class_names (dict): Mapping of class IDs to labels.
        """
        self.class_names = class_names

    def count_objects(self, results):
        """
        Count objects based on detection results.

        Args:
            results (list): YOLO detection/tracking results.

        Returns:
            dict: Object counts per class.
        """
        counts = {}

        if results and results[0].boxes is not None:
            for box in results[0].boxes:
                cls_id = int(box.cls[0])           # Class index
                label = self.class_names[cls_id]   # Convert to label

                # Increment count
                counts[label] = counts.get(label, 0) + 1

        return counts
        