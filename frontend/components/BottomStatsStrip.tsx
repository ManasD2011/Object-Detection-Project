"use client";

import { useEffect, useState } from "react";
import { getDetections } from "@/services/api";
import { Activity, Layers, Cpu, Server } from "lucide-react";

interface BottomStat {
  id: string;
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: React.ReactNode;
  iconColor: string;
}

export default function BottomStatsStrip() {
  const [total, setTotal] = useState(0);
  const [classes, setClasses] = useState(0);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      const res = await getDetections();
      if (!res || !mounted) return;
      const counts: Record<string, number> = res.counts || {};
      const t = Object.values(counts).reduce((s, v) => s + Number(v), 0);
      setTotal(t);
      setClasses(Object.keys(counts).length);
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  const stats: BottomStat[] = [
    {
      id: "total",
      label: "Total Detections",
      value: total.toLocaleString(),
      trend: "+Live",
      trendUp: true,
      icon: <Activity size={16} />,
      iconColor: "#3b82f6",
    },
    {
      id: "classes",
      label: "Active Classes",
      value: String(classes),
      trend: "vs session",
      trendUp: true,
      icon: <Layers size={16} />,
      iconColor: "#8b5cf6",
    },
    {
      id: "confidence",
      label: "Avg Confidence",
      value: "87.3%",
      trend: "+2.1%",
      trendUp: true,
      icon: <Cpu size={16} />,
      iconColor: "#10b981",
    },
    {
      id: "uptime",
      label: "System Uptime",
      value: "99.8%",
      trend: "+0.1%",
      trendUp: true,
      icon: <Server size={16} />,
      iconColor: "#f59e0b",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map(({ id, label, value, trend, trendUp, icon, iconColor }) => (
        <div
          key={id}
          className="bg-[#111827] border border-zinc-800/60 rounded-xl p-4 hover:border-zinc-700/60 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-zinc-500">{label}</p>
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${iconColor}20`, color: iconColor }}
            >
              {icon}
            </div>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
            {trend && (
              <span
                className={`text-[10px] font-semibold mb-0.5 ${
                  trendUp ? "text-green-400" : "text-red-400"
                }`}
              >
                {trend}
              </span>
            )}
          </div>
          <p className="text-[10px] text-zinc-600 mt-1">vs yesterday</p>
        </div>
      ))}
    </div>
  );
}
