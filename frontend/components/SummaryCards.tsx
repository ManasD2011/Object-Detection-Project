"use client";

import { useEffect, useState, useRef, type JSX } from "react";
import { getDetections } from "@/services/api";
import StatCard from "./StatCard";
import {
  User, Package, Coffee, Monitor, Smartphone,
  BookOpen, ShoppingBag, Box, Utensils, Clock,
  Leaf, Laptop, FlaskConical, Shirt,
} from "lucide-react";

/** Map YOLO class name → lucide icon element */
const ICON_MAP: Record<string, JSX.Element> = {
  person:         <User size={14} />,
  bottle:         <FlaskConical size={14} />,
  cup:            <Coffee size={14} />,
  laptop:         <Laptop size={14} />,
  "cell phone":   <Smartphone size={14} />,
  phone:          <Smartphone size={14} />,
  book:           <BookOpen size={14} />,
  clock:          <Clock size={14} />,
  tv:             <Monitor size={14} />,
  monitor:        <Monitor size={14} />,
  "potted plant": <Leaf size={14} />,
  plant:          <Leaf size={14} />,
  backpack:       <ShoppingBag size={14} />,
  bag:            <ShoppingBag size={14} />,
  fork:           <Utensils size={14} />,
  spoon:          <Utensils size={14} />,
  container:      <Package size={14} />,
  shirt:          <Shirt size={14} />,
};

/** Map YOLO class name → OKLCH accent colour */
const COLOR_MAP: Record<string, string> = {
  person:         "var(--color-brand)",
  bottle:         "var(--color-violet)",
  cup:            "var(--color-amber)",
  laptop:         "var(--color-cyan)",
  "cell phone":   "var(--color-success)",
  phone:          "var(--color-success)",
  book:           "var(--color-amber)",
  clock:          "oklch(0.65 0.20 330)",
  tv:             "var(--color-cyan)",
  monitor:        "var(--color-cyan)",
  "potted plant": "var(--color-success)",
  plant:          "var(--color-success)",
  backpack:       "var(--color-violet)",
  bag:            "var(--color-violet)",
  container:      "var(--color-violet)",
};

function getIcon(cls: string): JSX.Element {
  return ICON_MAP[cls.toLowerCase()] ?? <Box size={14} />;
}
function getColor(cls: string): string {
  return COLOR_MAP[cls.toLowerCase()] ?? "var(--color-brand)";
}

export default function SummaryCards() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const prevRef = useRef<Record<string, number>>({});

  useEffect(() => {
    let mounted = true;

    const fetch_ = async () => {
      const res = await getDetections();
      if (res && mounted) {
        prevRef.current = counts;
        setCounts(res.counts ?? {});
      }
    };

    fetch_();
    const id = setInterval(fetch_, 3000);
    return () => { mounted = false; clearInterval(id); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const entries = Object.entries(counts);
  const total   = entries.reduce((s, [, v]) => s + Number(v), 0);

  const getTrend = (key: string, cur: number): number | undefined => {
    const prev = prevRef.current[key];
    if (prev === undefined || prev === 0) return undefined;
    return Math.round(((cur - prev) / prev) * 100);
  };

  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm">

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[13px] font-semibold text-fg">Object Summary</h2>
        <span className="rounded-full border border-success/20 bg-success/8 px-2 py-0.5 text-[10px] font-medium text-success">
          Live
        </span>
      </div>

      {/* Empty state — SKILL.md pattern */}
      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="mb-3 rounded-2xl bg-elevated p-4">
            <Box size={22} className="text-dim" />
          </div>
          <p className="text-[13px] font-medium text-fg">No detections yet</p>
          <p className="mt-1 text-[11px] text-muted">Objects will appear here once detected</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5">
          {entries.map(([k, v]) => (
            <StatCard
              key={k}
              label={k}
              value={v}
              icon={getIcon(k)}
              accentColor={getColor(k)}
              trend={getTrend(k, Number(v))}
            />
          ))}
          {/* Total card always last */}
          <StatCard
            label="Total Objects"
            value={total}
            icon={<Box size={14} />}
            accentColor="var(--color-amber)"
          />
        </div>
      )}
    </section>
  );
}
