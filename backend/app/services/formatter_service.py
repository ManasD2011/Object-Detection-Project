"""
Formatter Service

Cleans and formats YOLO detection outputs.
"""

class FormatterService:
    def __init__(self):
        # 🔥 Only allow relevant classes
        self.allowed_classes = ["person", "bottle", "cup"]

        # 🔥 Label mapping for better UX
        self.label_map = {
            "person": "Person",
            "bottle": "Container",
            "cup": "Cup"
        }

        # 🔥 Confidence threshold
        self.min_confidence = 0.4

    def format_detections(self, results, class_names):
        objects = []

        if results and results[0].boxes is not None:
            for box in results[0].boxes:

                cls_id = int(box.cls[0])
                raw_label = class_names[cls_id]
                confidence = float(box.conf[0])

                # 🔥 Step 1: Confidence filtering
                if confidence < self.min_confidence:
                    continue

                # 🔥 Step 2: Class filtering
                if raw_label not in self.allowed_classes:
                    continue

                # 🔥 Step 3: Label mapping
                label = self.label_map.get(raw_label, raw_label)

                obj = {
                    "label": label,
                    "confidence": confidence,
                    "bbox": box.xyxy[0].tolist()
                }

                # Add tracking ID if available
                if box.id is not None:
                    obj["id"] = int(box.id[0])

                objects.append(obj)

        return objects