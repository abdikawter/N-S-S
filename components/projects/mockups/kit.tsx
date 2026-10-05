/**
 * Building blocks for the coded product mockups. Every mockup sets a small
 * theme through CSS variables on its root (see `themes`), so the same pieces
 * render light clinical software, dark operations dashboards, or a retail UI.
 *
 * All data shown in mockups is fictional demo data.
 */
import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type MockTheme = {
  bg: string;
  surface: string;
  surface2: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
  accent2: string;
  accentText: string;
};

export const themes = {
  prms: {
    bg: "#0B1016",
    surface: "#111821",
    surface2: "#16202B",
    border: "rgba(255,255,255,0.07)",
    text: "#E8EEF4",
    muted: "#8593A3",
    accent: "#36D6C5",
    accent2: "#4285FF",
    accentText: "#05201D",
  },
  clinic: {
    bg: "#F4F7FB",
    surface: "#FFFFFF",
    surface2: "#F0F4F9",
    border: "#E2E8F0",
    text: "#0F1B2D",
    muted: "#5B6B80",
    accent: "#2563EB",
    accent2: "#0EA5A4",
    accentText: "#FFFFFF",
  },
  ethirent: {
    bg: "#FAFAF7",
    surface: "#FFFFFF",
    surface2: "#F3F2EC",
    border: "#E7E5DC",
    text: "#17171A",
    muted: "#6B6A66",
    accent: "#1F5EFF",
    accent2: "#E4A11B",
    accentText: "#FFFFFF",
  },
  shop: {
    bg: "#F6F4F0",
    surface: "#FFFFFF",
    surface2: "#EEEBE5",
    border: "#E3DED5",
    text: "#141414",
    muted: "#6E6A63",
    accent: "#141414",
    accent2: "#5B5BF0",
    accentText: "#FFFFFF",
  },
  coffee: {
    bg: "#0F0D0B",
    surface: "#17140F",
    surface2: "#1F1B15",
    border: "rgba(255,240,220,0.08)",
    text: "#F3EDE4",
    muted: "#A39886",
    accent: "#E3A452",
    accent2: "#7BC47F",
    accentText: "#1E1305",
  },
} satisfies Record<string, MockTheme>;

export function themeVars(t: MockTheme): CSSProperties {
  return {
    "--m-bg": t.bg,
    "--m-surface": t.surface,
    "--m-surface2": t.surface2,
    "--m-border": t.border,
    "--m-text": t.text,
    "--m-muted": t.muted,
    "--m-accent": t.accent,
    "--m-accent2": t.accent2,
    "--m-accent-text": t.accentText,
  } as CSSProperties;
}

/* -------------------------------------------------------------------------- */
/*  Frame                                                                     */
/* -------------------------------------------------------------------------- */

export function AppWindow({
  theme,
  url,
  children,
  className,
}: {
  theme: MockTheme;
  url: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      style={themeVars(theme)}
      className={cn(
        "flex h-full w-full flex-col overflow-hidden bg-[var(--m-bg)] font-sans text-[13px] text-[var(--m-text)] antialiased",
        className,
      )}
    >
      <div className="flex h-9 shrink-0 items-center gap-3 border-b border-[var(--m-border)] bg-[var(--m-surface)] px-4">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="mx-auto flex h-6 w-[380px] items-center justify-center rounded-md bg-[var(--m-surface2)] text-[11px] text-[var(--m-muted)]">
          {url}
        </div>
        <span className="rounded border border-[var(--m-border)] px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-[var(--m-muted)]">
          Demo data
        </span>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  App shell                                                                 */
/* -------------------------------------------------------------------------- */

export interface NavEntry {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  badge?: string;
}

export function Sidebar({
  brand,
  brandSub,
  items,
  footer,
}: {
  brand: ReactNode;
  brandSub?: string;
  items: NavEntry[];
  footer?: ReactNode;
}) {
  return (
    <aside className="flex w-[212px] shrink-0 flex-col border-r border-[var(--m-border)] bg-[var(--m-surface)] px-3 py-4">
      <div className="mb-6 flex items-center gap-2.5 px-2">
        <span className="grid size-8 place-items-center rounded-lg bg-[var(--m-accent)] text-[13px] font-bold text-[var(--m-accent-text)]">
          {brand}
        </span>
        {brandSub && <span className="text-[13px] font-semibold leading-tight">{brandSub}</span>}
      </div>
      <nav className="flex flex-col gap-0.5">
        {items.map(({ label, icon: I, active, badge }) => (
          <span
            key={label}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12.5px]",
              active
                ? "bg-[color-mix(in_srgb,var(--m-accent)_14%,transparent)] font-medium text-[var(--m-text)]"
                : "text-[var(--m-muted)]",
            )}
          >
            <I className={cn("size-4", active && "text-[var(--m-accent)]")} strokeWidth={1.8} />
            {label}
            {badge && (
              <span className="ml-auto rounded-full bg-[var(--m-accent)] px-1.5 text-[10px] font-semibold text-[var(--m-accent-text)]">
                {badge}
              </span>
            )}
          </span>
        ))}
      </nav>
      {footer && <div className="mt-auto">{footer}</div>}
    </aside>
  );
}

export function Topbar({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <div className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--m-border)] px-6">
      <div>
        <div className="text-[17px] font-semibold tracking-tight">{title}</div>
        {subtitle && <div className="text-[11.5px] text-[var(--m-muted)]">{subtitle}</div>}
      </div>
      <div className="flex items-center gap-3">{right}</div>
    </div>
  );
}

export function UserChip({ initials, name, role }: { initials: string; name: string; role?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar initials={initials} />
      <div className="leading-tight">
        <div className="text-[12px] font-medium">{name}</div>
        {role && <div className="text-[10.5px] text-[var(--m-muted)]">{role}</div>}
      </div>
    </div>
  );
}

export function Avatar({ initials, size = 28, tone = 0 }: { initials: string; size?: number; tone?: number }) {
  const tones = ["var(--m-accent)", "var(--m-accent2)", "#A78BFA", "#F59E0B", "#EC4899"];
  const bg = tones[tone % tones.length];
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full font-semibold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: `color-mix(in srgb, ${bg} 75%, #000)`,
      }}
    >
      {initials}
    </span>
  );
}

export function SearchBox({ placeholder, width = 240 }: { placeholder: string; width?: number }) {
  return (
    <div
      className="flex h-9 items-center gap-2 rounded-lg border border-[var(--m-border)] bg-[var(--m-surface2)] px-3 text-[12px] text-[var(--m-muted)]"
      style={{ width }}
    >
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      {placeholder}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Content blocks                                                            */
/* -------------------------------------------------------------------------- */

export function Card({ children, className, title, action }: { children: ReactNode; className?: string; title?: string; action?: ReactNode }) {
  return (
    <div className={cn("rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] p-4", className)}>
      {(title || action) && (
        <div className="mb-3 flex items-center justify-between">
          {title && <div className="text-[13px] font-semibold">{title}</div>}
          {action && <div className="text-[11px] text-[var(--m-muted)]">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

export function Kpi({
  label,
  value,
  unit,
  delta,
  positive = true,
  icon: I,
  spark,
}: {
  label: string;
  value: string;
  unit?: string;
  delta?: string;
  positive?: boolean;
  icon?: LucideIcon;
  spark?: number[];
}) {
  return (
    <div className="rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] p-4">
      <div className="flex items-center justify-between text-[11.5px] text-[var(--m-muted)]">
        {label}
        {I && <I className="size-4" strokeWidth={1.8} />}
      </div>
      <div className="mt-2 flex items-end justify-between gap-2">
        <div>
          <span className="text-[24px] font-semibold tracking-tight">{value}</span>
          {unit && <span className="ml-1 text-[12px] text-[var(--m-muted)]">{unit}</span>}
          {delta && (
            <div className={cn("mt-1 text-[11px] font-medium", positive ? "text-[#22B07D]" : "text-[#E5484D]")}>
              {positive ? "▲" : "▼"} {delta}
            </div>
          )}
        </div>
        {spark && <Sparkline data={spark} />}
      </div>
    </div>
  );
}

export function Pill({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "accent" | "success" | "warn" | "danger" | "info" }) {
  const map = {
    neutral: "bg-[var(--m-surface2)] text-[var(--m-muted)]",
    accent: "bg-[color-mix(in_srgb,var(--m-accent)_16%,transparent)] text-[var(--m-accent)]",
    success: "bg-[#22B07D1f] text-[#1F9E70]",
    warn: "bg-[#F5A5241f] text-[#C27C0E]",
    danger: "bg-[#E5484D1a] text-[#D93D42]",
    info: "bg-[#3B82F61a] text-[#3B7BE8]",
  } as const;
  return (
    <span className={cn("inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[10.5px] font-medium", map[tone])}>
      <span className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

export function Progress({ value, color = "var(--m-accent)" }: { value: number; color?: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--m-surface2)]">
      <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

export function Table({
  columns,
  rows,
  className,
}: {
  columns: { label: string; align?: "left" | "right"; width?: string }[];
  rows: ReactNode[][];
  className?: string;
}) {
  return (
    <table className={cn("w-full border-collapse text-left text-[12px]", className)}>
      <thead>
        <tr className="text-[10.5px] uppercase tracking-wider text-[var(--m-muted)]">
          {columns.map((c) => (
            <th
              key={c.label}
              className={cn("border-b border-[var(--m-border)] pb-2 pr-4 font-medium last:pr-0", c.align === "right" && "text-right")}
              style={{ width: c.width }}
            >
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-b border-[var(--m-border)] last:border-0">
            {r.map((cell, j) => (
              <td key={j} className={cn("py-2.5 pr-4 last:pr-0", columns[j]?.align === "right" && "text-right tabular-nums")}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* -------------------------------------------------------------------------- */
/*  Charts (static SVG)                                                       */
/* -------------------------------------------------------------------------- */

function smoothPath(points: [number, number][]) {
  let d = `M${points[0]![0]},${points[0]![1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]!;
    const p1 = points[i]!;
    const p2 = points[i + 1]!;
    const p3 = points[i + 2] ?? p2;
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
  }
  return d;
}

export function Sparkline({ data, w = 72, h = 28, color = "var(--m-accent)" }: { data: number[]; w?: number; h?: number; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - 2 - ((v - min) / (max - min || 1)) * (h - 4)] as [number, number]);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <path d={smoothPath(pts)} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function AreaChart({
  series,
  labels,
  w = 560,
  h = 200,
  max,
}: {
  series: { data: number[]; color: string; name?: string }[];
  labels: string[];
  w?: number;
  h?: number;
  max?: number;
}) {
  const top = max ?? Math.max(...series.flatMap((s) => s.data)) * 1.15;
  const padB = 22;
  const ih = h - padB;
  const gridLines = 4;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="block">
      {Array.from({ length: gridLines + 1 }, (_, i) => (
        <line key={i} x1="0" x2={w} y1={(ih / gridLines) * i + 0.5} y2={(ih / gridLines) * i + 0.5} stroke="var(--m-border)" />
      ))}
      {series.map((s, si) => {
        const pts = s.data.map((v, i) => [(i / (s.data.length - 1)) * w, ih - (v / top) * ih] as [number, number]);
        const line = smoothPath(pts);
        const id = `ag-${si}-${s.color.replace(/[^a-z0-9]/gi, "")}`;
        return (
          <g key={si}>
            <defs>
              <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor={s.color} stopOpacity={si === 0 ? 0.28 : 0.12} />
                <stop offset="1" stopColor={s.color} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${line} L${w},${ih} L0,${ih} Z`} fill={`url(#${id})`} />
            <path d={line} fill="none" stroke={s.color} strokeWidth="2" strokeDasharray={si > 0 ? "4 4" : undefined} />
          </g>
        );
      })}
      {labels.map((l, i) => (
        <text
          key={l + i}
          x={(i / (labels.length - 1)) * w}
          y={h - 4}
          fontSize="10"
          fill="var(--m-muted)"
          textAnchor={i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle"}
        >
          {l}
        </text>
      ))}
    </svg>
  );
}

export function BarChart({
  data,
  labels,
  h = 160,
  colors = ["var(--m-accent)", "var(--m-accent2)"],
  stacked = false,
}: {
  data: number[][];
  labels: string[];
  h?: number;
  colors?: string[];
  stacked?: boolean;
}) {
  const totals = data.map((d) => (stacked ? d.reduce((a, b) => a + b, 0) : Math.max(...d)));
  const max = Math.max(...totals) * 1.1;
  return (
    <div className="flex items-end gap-2" style={{ height: h }}>
      {data.map((group, i) => (
        <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
          <div className={cn("flex w-full flex-1 items-end justify-center", stacked ? "flex-col-reverse items-stretch" : "gap-1")}>
            {group.map((v, j) => (
              <div
                key={j}
                className={cn(stacked ? "w-full first:rounded-b-[3px] last:rounded-t-[3px]" : "w-full max-w-[14px] rounded-t-[3px]")}
                style={{ height: `${(v / max) * 100}%`, background: colors[j % colors.length] }}
              />
            ))}
          </div>
          <span className="text-[10px] text-[var(--m-muted)]">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

export function Donut({
  segments,
  size = 120,
  thickness = 16,
  center,
}: {
  segments: { value: number; color: string }[];
  size?: number;
  thickness?: number;
  center?: ReactNode;
}) {
  const total = segments.reduce((a, s) => a + s.value, 0);
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--m-surface2)" strokeWidth={thickness} />
        {segments.map((s, i) => {
          const len = (s.value / total) * c;
          const el = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              strokeDasharray={`${Math.max(len - 2, 0)} ${c}`}
              strokeDashoffset={-acc}
            />
          );
          acc += len;
          return el;
        })}
      </svg>
      {center && <div className="absolute inset-0 grid place-items-center text-center">{center}</div>}
    </div>
  );
}

export function Legend({ items }: { items: { label: string; color: string; value?: string }[] }) {
  return (
    <ul className="flex flex-col gap-2 text-[11.5px]">
      {items.map((it) => (
        <li key={it.label} className="flex items-center gap-2">
          <span className="size-2 rounded-sm" style={{ background: it.color }} />
          <span className="text-[var(--m-muted)]">{it.label}</span>
          {it.value && <span className="ml-auto font-medium tabular-nums">{it.value}</span>}
        </li>
      ))}
    </ul>
  );
}
