export default function VideoCard() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">

      {/* ── Header ──────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2 text-[13px] font-medium text-fg">
          {/* Inline video camera SVG — lucide Video icon */}
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="text-muted"
          >
            <rect x="2" y="7" width="15" height="10" rx="2" />
            <path d="m17 9 5-3v12l-5-3" />
          </svg>
          Live Camera Feed
        </div>

        {/* SKILL.md Live Status Badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full border border-danger/25 bg-danger/8 px-2.5 py-0.5 text-[11px] font-medium text-danger">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-danger" />
          </span>
          LIVE
        </span>
      </div>

      {/* ── Stream ──────────────────────────────── */}
      {/*
        NOTE: Using <img> intentionally here — this is an MJPEG stream from
        the local backend. next/image cannot handle streaming responses.
      */}
      <div className="w-full bg-black" style={{ aspectRatio: "16/9" }}>
        <img
          src="http://localhost:8000/api/stream"
          className="w-full h-full object-cover"
          alt="Live object detection stream"
        />
      </div>

      {/* ── Footer ──────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface border-t border-border">
        <div className="flex items-center gap-2 text-[11px] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Camera 01 — Main Street
        </div>
        <div className="flex items-center gap-3 text-[11px] text-dim">
          <span>1280 × 720</span>
          <span className="text-border">|</span>
          <span>25 fps</span>
        </div>
      </div>

    </div>
  );
}
