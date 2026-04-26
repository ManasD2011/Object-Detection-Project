const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export async function getDetections() {
  const res = await fetch(`${BASE_URL}/api/detections`);
  return await res.json();
}
