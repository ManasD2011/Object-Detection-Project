"""
Stream Service

Handles frame generation for live streaming.
"""

import cv2
import time 


from app.services.tracking_service import TrackingService
from app.services.counting_service import CountingService
from app.services.formatter_service import FormatterService
from app.services.movement_service import MovementService


class StreamService:
    def __init__(self):
        self.tracking_service = TrackingService()
        self.model = self.tracking_service.model

        self.counter = CountingService(self.model.names)
        self.formatter = FormatterService()
        self.movement = MovementService(line_position=300)
        self.latest_data = None
        self.cap = cv2.VideoCapture(0)
        

    def generate_frames(self):
        """
        Generator for streaming video frames.
        """
        while True:
            success, frame = self.cap.read()
            if not success:
                break
            
            frame = cv2.resize(frame, (640, 480))

            results = self.tracking_service.track(frame)
            counts = self.counter.count_objects(results)
            objects = self.formatter.format_detections(results, self.model.names)
            movement_data = self.movement.track_movement(objects)
            self.latest_data = {
                "counts": counts,
                "objects": objects,
                "movement": movement_data
            }
            time.sleep(0.05)

            annotated = frame.copy()

            for obj in objects:
                x1, y1, x2, y2 = map(int, obj["bbox"])
                label = obj["label"]
                conf = obj["confidence"]

                text = f"{label} ({conf:.2f})"

                cv2.rectangle(annotated, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(
                    annotated,
                    text,
                    (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.6,
                    (0, 255, 0),
                    2
                )

            height, width, _ = frame.shape
            cv2.line(annotated, (0, 300), (width, 300), (0, 0, 255), 2)

            # Add counts
            y = 30
            for label, count in counts.items():
                cv2.putText(annotated, f"{label}: {count}", (10, y),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,255,0), 2)
                y += 25

            # Add movement info
            cv2.putText(annotated, f"Entry: {movement_data['entry']}", (10, 100),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255,0,0), 2)

            cv2.putText(annotated, f"Exit: {movement_data['exit']}", (10, 130),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,0,255), 2)

            # Encode frame
            _, buffer = cv2.imencode(".jpg", annotated)
            frame_bytes = buffer.tobytes()

            yield (
                b"--frame\r\n"
                b"Content-Type: image/jpeg\r\n\r\n" +
                frame_bytes +
                b"\r\n"
            )
            