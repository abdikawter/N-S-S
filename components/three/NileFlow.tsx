import { cn } from "@/lib/utils";

/**
 * Lightweight SVG rendition of the Nile flow. Used as the mobile / reduced
 * motion / pre-load fallback for the 3D hero and as a background motif.
 * Pure SVG + CSS: no JavaScript, no WebGL.
 */

function wave(offset: number, amp: number, phase: number) {
  // Smooth meandering path across a 1200×600 viewBox.
  const pts: string[] = [];
  for (let i = 0; i <= 24; i++) {
    const x = -100 + i * 60;
    const y =
      300 + offset + Math.sin(i * 0.48 + phase) * amp + Math.sin(i * 0.17 + phase * 0.5) * amp * 0.7;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  // Catmull-Rom → cubic Bézier for a smooth curve.
  const p = pts.map((s) => s.split(",").map(Number) as [number, number]);
  let d = `M${p[0]![0]},${p[0]![1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i]!;
    const p1 = p[i]!;
    const p2 = p[i + 1]!;
    const p3 = p[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0]},${p2[1]}`;
  }
  return d;
}

const strands = Array.from({ length: 9 }, (_, i) => {
  const t = i / 8;
  return {
    d: wave((t - 0.5) * 110, 70 - Math.abs(t - 0.5) * 40, t * 1.1),
    width: i === 4 ? 1.6 : 0.8,
    opacity: 0.18 + (1 - Math.abs(t - 0.5) * 2) * 0.5,
    dash: i % 3 === 0,
    delay: -(i * 1.7),
  };
});

const nodes = [
  [180, 170],
  [320, 120],
  [470, 190],
  [690, 140],
  [860, 210],
  [980, 120],
  [250, 470],
  [560, 480],
  [800, 450],
  [1040, 420],
] as const;

export function NileFlow({
  className,
  intensity = 1,
  id = "nf",
}: {
  className?: string;
  intensity?: number;
  /** Unique prefix for gradient ids when used more than once per page. */
  id?: string;
}) {
  return (
    <svg
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
      style={{ opacity: intensity }}
    >
      <defs>
        <linearGradient id={`${id}-stroke`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#4285FF" stopOpacity="0" />
          <stop offset="0.25" stopColor="#4285FF" />
          <stop offset="0.75" stopColor="#36D6C5" />
          <stop offset="1" stopColor="#36D6C5" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.55" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#4285FF" stopOpacity="0.22" />
          <stop offset="1" stopColor="#4285FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="600" fill={`url(#${id}-glow)`} />
      <g stroke="rgba(122,169,255,0.12)" strokeWidth="1">
        {nodes.slice(0, -1).map(([x, y], i) => {
          const n = nodes[i + 1]!;
          return <line key={i} x1={x} y1={y} x2={n[0]} y2={n[1]} />;
        })}
      </g>
      <g fill="none" strokeLinecap="round">
        {strands.map((s, i) => (
          <path
            key={i}
            d={s.d}
            stroke={`url(#${id}-stroke)`}
            strokeWidth={s.width}
            strokeOpacity={s.opacity}
            strokeDasharray={s.dash ? "2 14" : "160 40"}
            className="animate-flow"
            style={{ animationDelay: `${s.delay}s`, animationDuration: `${16 + i}s` }}
          />
        ))}
      </g>
      <g style={{ fill: "var(--flow-node)" }}>
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.6 : 1.6} opacity={0.75} />
        ))}
      </g>
    </svg>
  );
}
