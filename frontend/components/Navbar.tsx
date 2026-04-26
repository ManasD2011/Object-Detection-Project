"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";

export default function Navbar() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setDate(now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="flex h-[60px] shrink-0 items-center justify-between border-b border-border bg-surface/80 px-6 backdrop-blur-sm">

      {/* Left: page context */}
      <div>
        <h1 className="text-[15px] font-semibold text-fg leading-tight">Dashboard</h1>
        <p className="text-[11px] text-muted">Real-time overview of your AI detection system</p>
      </div>

      {/* Right: meta + live pill */}
      <div className="flex items-center gap-4">

        <div className="flex items-center gap-1.5 text-[11px] text-dim">
          <Calendar size={12} className="shrink-0" />
          {date}
        </div>

        <div className="h-3.5 w-px bg-border" />

        <div className="flex items-center gap-1.5 text-[11px] text-dim">
          <Clock size={12} className="shrink-0" />
          {time}
        </div>

        <div className="h-3.5 w-px bg-border" />

        {/* Live status badge — SKILL.md pattern */}
        <span className="inline-flex items-center gap-1.5 rounded-full border border-success/25 bg-success/8 px-2.5 py-1 text-[11px] font-medium text-success">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          Live
        </span>

      </div>
    </header>
  );
}