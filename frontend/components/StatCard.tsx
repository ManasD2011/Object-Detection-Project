import type { FC } from "react";

interface StatCardProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  accentColor?: string;    // raw CSS colour string
  trend?: number;          // percentage delta vs previous fetch
  className?: string;
}

/** KPI card — follows SKILL.md Metric / KPI Card pattern */
const StatCard: FC<StatCardProps> = ({
  label,
  value,
  icon,
  accentColor = "var(--color-brand)",
  trend,
  className = "",
}) => {
  const isPositive = trend === undefined || trend >= 0;

  return (
    <div
      className={[
        "rounded-xl border border-border bg-card p-4",
        "transition-all duration-200 hover:border-border-subtle hover:shadow-sm",
        className,
      ].join(" ")}
    >
      {/* Icon + trend */}
      <div className="mb-3 flex items-start justify-between">
        {icon && (
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              backgroundColor: `color-mix(in oklch, ${accentColor} 14%, transparent)`,
              color: accentColor,
            }}
          >
            {icon}
          </div>
        )}

        {trend !== undefined && (
          <span
            className={[
              "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
              isPositive
                ? "bg-success/10 text-success"
                : "bg-danger/10  text-danger",
            ].join(" ")}
          >
            {isPositive ? "+" : ""}{trend}%
          </span>
        )}
      </div>

      {/* Label + value */}
      <p className="mb-0.5 text-[11px] font-medium capitalize text-muted">{label}</p>
      <p className="text-2xl font-bold tracking-tight text-fg">{value}</p>
    </div>
  );
};

export default StatCard;
