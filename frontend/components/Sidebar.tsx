import { LayoutDashboard, Shield } from "lucide-react";

const STATUS = [
  { label: "Camera",   value: "Active", ok: true },
  { label: "AI Model", value: "Active", ok: true },
  { label: "Server",   value: "Online", ok: true },
] as const;

export default function Sidebar() {
  return (
    <aside className="w-[216px] shrink-0 flex flex-col h-screen bg-surface border-r border-border">

      {/* ── Brand ─────────────────────────────── */}
      <div className="flex h-[60px] shrink-0 items-center gap-3 px-5 border-b border-border">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand shadow-lg">
          <Shield size={15} className="text-white" />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-fg leading-tight">AI Vision</p>
          <p className="text-[10px] text-muted leading-tight tracking-wide">Detection System</p>
        </div>
      </div>

      {/* ── Navigation ────────────────────────── */}
      <nav className="flex-1 overflow-y-auto p-3">
        <div
          role="button"
          aria-label="Dashboard"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium bg-brand/10 text-brand cursor-default select-none"
        >
          <LayoutDashboard size={14} className="shrink-0" />
          Dashboard
        </div>
      </nav>

      {/* ── System Status ──────────────────────── */}
      <div className="p-4 border-t border-border space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-dim">
            System Status
          </p>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-success">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            Online
          </span>
        </div>

        <div className="space-y-2">
          {STATUS.map(({ label, value, ok }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-[11px] text-dim">{label}</span>
              <span className={`text-[11px] font-medium ${ok ? "text-success" : "text-danger"}`}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

    </aside>
  );
}