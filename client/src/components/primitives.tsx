import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  title,
  meta,
  actions,
  children,
  className,
  testId,
}: {
  title?: string;
  meta?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  testId?: string;
}) {
  return (
    <section className={cn("panel", className)} data-testid={testId}>
      {(title || actions) && (
        <header className="panel-header">
          <div className="flex items-center gap-2">
            {title && <span className="panel-title">{title}</span>}
            {meta && (
              <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {meta}
              </span>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className="p-4">{children}</div>
    </section>
  );
}

export function StatusChip({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "ok" | "warn" | "risk" | "cyan" | "gold";
  children: ReactNode;
}) {
  const map: Record<string, string> = {
    neutral: "border-border bg-muted/50 text-foreground/80",
    ok: "border-status-ok/40 bg-status-ok/10 text-status-ok",
    warn: "border-status-warn/40 bg-status-warn/10 text-status-warn",
    risk: "border-status-risk/40 bg-status-risk/10 text-status-risk",
    cyan: "border-hive-cyan/40 bg-hive-cyan/10 text-hive-cyan",
    gold: "border-hive-gold/40 bg-hive-gold/10 text-hive-gold",
  };
  return <span className={cn("hive-chip", map[tone])}>{children}</span>;
}

export function KpiCard({
  label,
  value,
  unit,
  trend,
  testId,
  highlight = false,
}: {
  label: string;
  value: string | number;
  unit?: string;
  trend?: string;
  testId?: string;
  highlight?: boolean;
}) {
  return (
    <div
      data-testid={testId}
      className={cn(
        "panel relative flex flex-col gap-1 px-4 py-3",
        highlight && "border-hive-cyan/40",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="mono text-2xl font-semibold leading-none tracking-tight">
          {value}
        </span>
        {unit && (
          <span className="text-xs font-medium text-muted-foreground">{unit}</span>
        )}
      </div>
      {trend && (
        <div className="mono text-[11px] text-muted-foreground">{trend}</div>
      )}
      {highlight && (
        <div className="absolute inset-x-0 top-0 h-px bg-hive-cyan" />
      )}
    </div>
  );
}

export function CtaButton({
  children,
  variant = "primary",
  onClick,
  testId,
  type,
}: {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  onClick?: () => void;
  testId?: string;
  type?: "button" | "submit";
}) {
  const map = {
    primary:
      "bg-hive-cyan text-hive-cyan-foreground border border-hive-cyan/60 hover-elevate font-semibold",
    outline:
      "border border-border bg-card hover-elevate text-foreground",
    ghost: "hover-elevate text-foreground",
  } as Record<string, string>;
  return (
    <button
      data-testid={testId}
      type={type ?? "button"}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm px-3 py-1.5 text-xs uppercase tracking-[0.12em]",
        map[variant],
      )}
      style={
        variant === "primary"
          ? { color: "hsl(var(--primary-foreground))" }
          : undefined
      }
    >
      {children}
    </button>
  );
}

export function Divider({ label }: { label?: string }) {
  if (!label) return <div className="my-4 border-t border-border" />;
  return (
    <div className="my-4 flex items-center gap-3">
      <div className="h-px flex-1 bg-border" />
      <span className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
