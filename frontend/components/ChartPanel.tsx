"use client";

import { useEffect, useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { getDetections } from "@/services/api";

const COLORS = [
  "#3b82f6", "#8b5cf6", "#f59e0b", "#10b981",
  "#ef4444", "#06b6d4", "#f97316", "#ec4899",
];

interface DataPoint {
  time: string;
  [key: string]: number | string;
}

export default function ChartPanel() {
  const [data, setData]     = useState<DataPoint[]>([]);
  const [classes, setClasses] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;

    const interval = setInterval(async () => {
      const res = await getDetections();
      if (!res || !mounted) return;

      const counts: Record<string, number> = res.counts || {};
      const keys = Object.keys(counts);

      // Merge new class keys discovered over time
      setClasses((prev) => {
        const merged = Array.from(new Set([...prev, ...keys]));
        return merged;
      });

      const point: DataPoint = {
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit", minute: "2-digit", second: "2-digit",
        }),
      };
      keys.forEach((k) => { point[k] = counts[k]; });

      setData((prev) => [...prev, point].slice(-20));
    }, 3000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-[#111827] border border-zinc-800/60 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-white">Object Detection Over Time</h2>
        <span className="text-[10px] text-zinc-500 bg-zinc-800/60 border border-zinc-700/40 px-2.5 py-1 rounded-full">
          Last 20 ticks
        </span>
      </div>

      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              {classes.map((cls, i) => (
                <linearGradient key={cls} id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={COLORS[i % COLORS.length]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" tick={{ fontSize: 9, fill: "#64748b" }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
            <YAxis tick={{ fontSize: 9, fill: "#64748b" }} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8, fontSize: 11 }}
              labelStyle={{ color: "#94a3b8" }}
            />
            <Legend
              wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
              iconType="circle"
              iconSize={7}
            />
            {classes.map((cls, i) => (
              <Area
                key={cls}
                type="monotone"
                dataKey={cls}
                stroke={COLORS[i % COLORS.length]}
                fill={`url(#grad-${i})`}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3 }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
