#  Real-Time Object Detection & Tracking System

A full-stack AI-powered system for **real-time object detection, tracking, and movement analysis** using YOLOv8, FastAPI, and Next.js.

---

##  Overview

This project is a **AI system** that processes live video streams, detects objects, tracks them across frames, and provides real-time analytics via a modern web dashboard.

It demonstrates **end-to-end system design**, combining Machine Learning, Backend APIs, and Frontend visualization.

---

##  Key Features

* **Live Video Streaming** (MJPEG stream)
* **Real-Time Object Detection** using YOLOv8
* **Object Tracking with Unique IDs**
* **Object Counting**
* **Entry / Exit Movement Detection**
* **Live Dashboard (Next.js)**
* **FastAPI Backend with Modular Architecture**

---

##  Tech Stack

### Backend

* FastAPI
* OpenCV
* YOLOv8 (Ultralytics)
* Python

### Frontend

* Next.js (App Router)
* Tailwind CSS

### ML

* Pre-trained YOLOv8 model (COCO dataset)

---

##  Project Structure

```
object-detection-system/
│
├── backend/        # FastAPI Backend
├── frontend/       # Next.js Frontend        
└── README.md
```

---

##  Setup Instructions

###  1. Clone the Repository

```bash
git clone https://github.com/your-username/object-detection-system.git
cd object-detection-system
```

---

###  2. Backend Setup

```bash
cd backend

python -m venv venv
venv\Scripts\activate   # Windows

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs at:
`http://localhost:8000`

---

###  3. Frontend Setup

```bash
cd frontend

npm install
npm run dev
```

 Frontend runs at:
`http://localhost:3000`

---

##  API Endpoints

###  Get Detections

```
GET /api/detections
```


```json
{
  "counts": {...},
  "objects": [...],
  "movement": {...}
}
```

---

###  Live Stream

```
GET /api/stream
```

---

##  ML Pipeline

1. Frame Capture (OpenCV)
2. Preprocessing (Resize)
3. Detection (YOLOv8)
4. Tracking (ID assignment)
5. Counting
6. Movement Analysis

---

##  Limitations

* Model trained on COCO dataset (limited classes)
* May misclassify uncommon objects (e.g., perfume bottles)
* Performance depends on hardware

---

##  Future Improvements

* Custom-trained model (domain-specific detection)
* WebSocket-based real-time updates
* Database integration (logs & analytics)
* Authentication system
* Deployment (Docker + Cloud)

---
