"""
Movement Service

Tracks object movement across frames and detects direction + line crossing.
"""

class MovementService:
    """
    Handles movement tracking, direction detection, and entry/exit counting.
    """

    def __init__(self, line_position=300):
        """
        Initialize movement tracking.

        Args:
            line_position (int): Y-coordinate for virtual counting line.
        """
        self.previous_positions = {}   # Stores previous positions of objects
        self.line_position = line_position

        # Counters
        self.entry_count = 0
        self.exit_count = 0

    def get_center(self, bbox):
        """
        Calculate center point of bounding box.

        Args:
            bbox (list): [x1, y1, x2, y2]

        Returns:
            tuple: (center_x, center_y)
        """
        x1, y1, x2, y2 = bbox
        center_x = int((x1 + x2) / 2)
        center_y = int((y1 + y2) / 2)
        return center_x, center_y

    def track_movement(self, objects):
        """
        Track movement of objects and detect direction + line crossing.

        Args:
            objects (list): List of detected objects (formatted output)

        Returns:
            dict: Movement data (entry/exit counts)
        """
        for obj in objects:
            if "id" not in obj:
                continue  # skip objects without tracking ID

            obj_id = obj["id"]
            bbox = obj["bbox"]

            _, current_y = self.get_center(bbox)

            # Get previous position
            prev_y = self.previous_positions.get(obj_id)

            if prev_y is not None:
                # Detect crossing downward
                if prev_y < self.line_position and current_y >= self.line_position:
                    self.entry_count += 1

                # Detect crossing upward
                elif prev_y > self.line_position and current_y <= self.line_position:
                    self.exit_count += 1

            # Update position
            self.previous_positions[obj_id] = current_y

        return {
            "entry": self.entry_count,
            "exit": self.exit_count
        }

        