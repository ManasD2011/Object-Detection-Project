"use client";

import { useEffect, useState, type JSX } from "react";
import { getDetections } from "@/services/api";
import {
  User, Package, Coffee, Monitor, Smartphone,
  BookOpen, ShoppingBag, Box, Utensils, Clock,
  Leaf, Laptop, FlaskConical, Shirt,
} from "lucide-react";

const ICON_MAP: Record<string, JSX.Element> = {
  person:         <User size={13} />,
  bottle:         <FlaskConical size={13} />,
  cup:            <Coffee size={13} />,
  laptop:         <Laptop size={13} />,
  "cell phone":   <Smartphone size={13} />,
  phone:          <Smartphone size={13} />,
  book:           <BookOpen size={13} />,
  clock:          <Clock size={13} />,
  tv:             <Monitor size={13} />,
  monitor:        <Monitor size={13} />,
  "potted plant": <Leaf size={13} />,
  plant:          <Leaf size={13} />,
  backpack:       <ShoppingBag size={13} />,
  bag:            <ShoppingBag size={13} />,
  fork:           <Utensils size={13} />,
  spoon:          <Utensils size={13} />,
  container:      <Package size={13} />,
  shirt:          <Shirt size={13} />,
};

const COLOR_MAP: Record<string, string> = {
  person:         "var(--color-brand)",
  bottle:         "var(--color-violet)",
  cup:            "var(--color-amber)",
  laptop:         "var(--color-cyan)",
  "cell phone":   "var(--color-success)",
  phone:          "var(--color-success)",
  book:           "var(--color-amber)",
  tv:             "var(--color-cyan)",
  monitor:        "var(--color-cyan)",
  "potted plant": "var(--color-success)",
  plant:          "var(--color-success)",
  backpack:       "var(--color-violet)",
  bag:            "var(--color-violet)",
  container:      "var(--color-violet)",
};

function getIcon(cls: string): JSX.Element {
  return ICON_MAP[cls.toLowerCase()] ?? <Box size={13} />;
}
function getColor(cls: string): string {
  return COLOR_MAP[cls.toLowerCase()] ?? "var(--color-brand)";
}

interface Detection { label: string; count: number; ts: string }

export default function RecentDetections() {
  const [list, setList] = useState<Detection[]>([]);

  useEffect(() => {
    let mounted = true;

    const fetch_ = async () => {
      const res = await getDetections();
      if (!res || !mounted) return;

      const counts: Record<string, number> = res.counts ?? {};
      const ts = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit", second: "2-digit",
      });

      setList(
        Object.entries(counts)
          .sort(([, a], [, b]) => Number(b) - Number(a))
          .map(([label, count]) => ({ label, count: Number(count), ts }))
      );
    };

    fetch_();
    const id = setInterval(fetch_, 3000);
    return () => { mounted = false; clearInterval(id); };
  }, []);

  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm">

      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[13px] font-semibold text-fg">Recent Detections</h2>
        <button
          type="button"
          aria-label="View all detections"
          className="text-[11px] font-medium text-brand transition-colors hover:text-fg"
        >
          View All
        </button>
      </div>

      {/* Empty state */}
      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="mb-3 rounded-2xl bg-elevated p-4">
            <Box size={22} className="text-dim" />
          </div>
          <p className="text-[13px] font-medium text-fg">Waiting for detections…</p>
          <p className="mt-1 text-[11px] text-muted">Results will appear as objects are detected</p>
        </div>
      ) : (
        <ul className="space-y-1.5 overflow-y-auto max-h-72" role="list">
          {list.map(({ label, count, ts }) => {
            const color = getColor(label);
            return (
              <li
                key={label}
                className="flex items-center gap-3 rounded-lg border border-border-subtle bg-surface px-3 py-2.5 transition-colors duration-150 hover:bg-elevated"
              >
                {/* Icon */}
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: `color-mix(in oklch, ${color} 12%, transparent)`,
                    color,
                  }}
                >
                  {getIcon(label)}
                </div>

                {/* Label */}
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium capitalize text-fg truncate">
                    {label} Detected
                  </p>
                  <p className="text-[10px] text-dim">Camera 01 — Main Street</p>
                </div>

                {/* Count + timestamp */}
                <div className="text-right shrink-0">
                  <p className="text-[13px] font-bold text-fg">{count}</p>
                  <p className="text-[10px] text-dim">{ts}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
