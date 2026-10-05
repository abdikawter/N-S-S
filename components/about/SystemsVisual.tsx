/**
 * Abstract diagram of connected digital systems: a core platform linking
 * operations, people, data, AI, payments and reporting. Pure SVG + CSS.
 */
const nodes = [
  { label: "Operations", x: 90, y: 110 },
  { label: "Customers", x: 410, y: 80 },
  { label: "AI", x: 470, y: 260 },
  { label: "Payments", x: 400, y: 430 },
  { label: "Reports", x: 110, y: 440 },
  { label: "Data", x: 40, y: 280 },
];

const cx = 260;
const cy = 270;

export function SystemsVisual() {
  return (
    <div className="surface relative aspect-square w-full overflow-hidden rounded-3xl">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
      <svg viewBox="0 0 520 540" className="relative h-full w-full" role="img" aria-labelledby="sv-title">
        <title id="sv-title">
          Diagram: a central platform connecting operations, customers, AI, payments, reports and data.
        </title>
        <defs>
          <linearGradient id="sv-line" x1="0" x2="1">
            <stop offset="0" stopColor="#4285FF" />
            <stop offset="1" stopColor="#36D6C5" />
          </linearGradient>
          <radialGradient id="sv-core" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#4285FF" stopOpacity="0.45" />
            <stop offset="1" stopColor="#4285FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {[70, 130, 200].map((r, i) => (
          <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray={i === 1 ? "2 6" : undefined} />
        ))}

        {nodes.map((n, i) => (
          <g key={n.label}>
            <path
              d={`M${cx},${cy} Q${(cx + n.x) / 2 + (i % 2 ? 40 : -40)},${(cy + n.y) / 2} ${n.x},${n.y}`}
              fill="none"
              stroke="rgba(122,169,255,0.18)"
            />
            <path
              d={`M${cx},${cy} Q${(cx + n.x) / 2 + (i % 2 ? 40 : -40)},${(cy + n.y) / 2} ${n.x},${n.y}`}
              fill="none"
              stroke="url(#sv-line)"
              strokeWidth="1.5"
              strokeDasharray="6 120"
              className="animate-flow"
              style={{ animationDuration: `${9 + i}s`, animationDirection: i % 2 ? "reverse" : "normal" }}
            />
          </g>
        ))}

        <circle cx={cx} cy={cy} r="110" fill="url(#sv-core)" />
        <circle cx={cx} cy={cy} r="44" fill="#0D121B" stroke="rgba(255,255,255,0.16)" />
        <path
          d={`M${cx - 18},${cy + 8}c8 0 10-22 18-22s10 22 18 22`}
          fill="none"
          stroke="url(#sv-line)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy - 14} r="3" fill="#F5F7FA" />

        {nodes.map((n) => (
          <g key={`${n.label}-node`}>
            <rect x={n.x - 46} y={n.y - 17} width="92" height="34" rx="10" fill="#111722" stroke="rgba(255,255,255,0.12)" />
            <circle cx={n.x - 30} cy={n.y} r="3.5" fill="#36D6C5" />
            <text x={n.x - 20} y={n.y + 4} fontSize="11.5" fill="#C9D2DE" fontFamily="var(--font-geist-sans)">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
