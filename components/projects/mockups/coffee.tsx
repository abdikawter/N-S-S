import {
  Boxes,
  ClipboardList,
  Coffee,
  Droplets,
  FileText,
  Gauge,
  LayoutDashboard,
  Plus,
  Scale,
  Sun,
  Users,
  Warehouse,
  Waves,
  Wrench,
} from "lucide-react";
import {
  AppWindow,
  AreaChart,
  Avatar,
  Card,
  Kpi,
  Pill,
  Progress,
  Sidebar,
  Table,
  Topbar,
  themes,
  type NavEntry,
} from "./kit";
import { cn } from "@/lib/utils";

const t = themes.coffee;

const nav = (active: string): NavEntry[] =>
  [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Cherry intake", icon: Scale },
    { label: "Processing", icon: Waves },
    { label: "Lots & inventory", icon: Boxes },
    { label: "Workers", icon: Users },
    { label: "Equipment", icon: Wrench },
    { label: "Reports", icon: FileText },
  ].map((n) => ({ ...n, active: n.label === active }));

function Shell({ active, title, subtitle, children }: { active: string; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <AppWindow theme={t} url="station.app / preview">
      <div className="flex h-full">
        <Sidebar
          brand={<Coffee className="size-4" />}
          brandSub="Washing Station"
          items={nav(active)}
          footer={
            <div className="rounded-lg border border-dashed border-[var(--m-accent)]/40 p-3 text-[11px] leading-snug text-[var(--m-muted)]">
              <div className="mb-1 font-semibold text-[var(--m-accent)]">In development</div>
              Preview build with sample data.
            </div>
          }
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar
            title={title}
            subtitle={subtitle}
            right={
              <>
                <span className="rounded-lg border border-[var(--m-border)] px-3 py-2 text-[12px] text-[var(--m-muted)]">Harvest season 2026/27</span>
                <span className="flex h-9 items-center gap-1.5 rounded-lg bg-[var(--m-accent)] px-3 text-[12px] font-semibold text-[var(--m-accent-text)]">
                  <Plus className="size-3.5" strokeWidth={2.4} /> Record delivery
                </span>
              </>
            }
          />
          <div className="min-h-0 flex-1 overflow-hidden p-5">{children}</div>
        </div>
      </div>
    </AppWindow>
  );
}

const stages: { name: string; icon: typeof Scale; lots: number; load: number }[] = [
  { name: "Receiving", icon: Scale, lots: 4, load: 55 },
  { name: "Pulping", icon: Gauge, lots: 3, load: 72 },
  { name: "Fermentation", icon: Droplets, lots: 6, load: 84 },
  { name: "Washing", icon: Waves, lots: 2, load: 40 },
  { name: "Drying beds", icon: Sun, lots: 11, load: 68 },
  { name: "Parchment store", icon: Warehouse, lots: 18, load: 46 },
];

export function CoffeeOperations() {
  return (
    <Shell active="Overview" title="Station overview" subtitle="Today · Sample data">
      <div className="grid grid-cols-4 gap-4">
        <Kpi label="Cherry received today" value="18,420" unit="kg" icon={Scale} spark={[8, 11, 9, 14, 13, 17, 18]} />
        <Kpi label="Lots in process" value="26" icon={Waves} />
        <Kpi label="Drying bed occupancy" value="68" unit="%" icon={Sun} />
        <Kpi label="Workers on site" value="112" icon={Users} />
      </div>

      <Card className="mt-4" title="Processing pipeline" action="Lots per stage">
        <div className="grid grid-cols-6 gap-2">
          {stages.map((s, i) => (
            <div key={s.name} className="relative rounded-lg border border-[var(--m-border)] bg-[var(--m-surface2)] p-3">
              <div className="flex items-center gap-2 text-[11.5px] text-[var(--m-muted)]">
                <s.icon className="size-3.5 text-[var(--m-accent)]" /> {s.name}
              </div>
              <div className="mt-2 text-[22px] font-semibold">{s.lots}</div>
              <div className="mb-1.5 text-[10.5px] text-[var(--m-muted)]">lots · {s.load}% capacity</div>
              <Progress value={s.load} color={s.load > 80 ? "#E3A452" : "var(--m-accent2)"} />
              {i < stages.length - 1 && (
                <span className="absolute -right-[9px] top-1/2 z-10 grid size-4 -translate-y-1/2 place-items-center rounded-full border border-[var(--m-border)] bg-[var(--m-surface)] text-[9px] text-[var(--m-muted)]">
                  ›
                </span>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-4 grid grid-cols-[1.4fr_1fr] gap-4">
        <Card
          title="Daily cherry intake"
          action={
            <span className="flex gap-3">
              <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 bg-[var(--m-accent)]" />Red cherry</span>
              <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 border-t border-dashed border-[var(--m-accent2)]" />Rejected</span>
            </span>
          }
        >
          <AreaChart
            h={170}
            labels={["Oct 1", "Oct 2", "Oct 3", "Oct 4", "Oct 5", "Oct 6", "Oct 7"]}
            series={[
              { data: [9.2, 11.4, 10.6, 14.1, 13.3, 16.8, 18.4], color: t.accent },
              { data: [0.8, 0.9, 0.7, 1.1, 0.9, 1.2, 1.0], color: t.accent2 },
            ]}
          />
        </Card>
        <Card title="Latest deliveries" action="View all">
          <div className="flex flex-col">
            {[
              ["Alemayehu G.", "Kebele 04", "642 kg", "success", "Grade 1"],
              ["Tsehay W.", "Kebele 02", "418 kg", "success", "Grade 1"],
              ["Mulugeta D.", "Kebele 07", "305 kg", "warn", "Grade 2"],
              ["Birtukan A.", "Kebele 04", "520 kg", "success", "Grade 1"],
            ].map(([n, k, w, tone, g], i) => (
              <div key={n} className="flex items-center gap-2.5 border-b border-[var(--m-border)] py-2.5 last:border-0 text-[12px]">
                <Avatar initials={n!.split(" ").map((x) => x[0]).join("")} size={26} tone={i} />
                <div className="flex-1">
                  <div className="font-medium">{n}</div>
                  <div className="text-[10.5px] text-[var(--m-muted)]">{k}</div>
                </div>
                <span className="tabular-nums">{w}</span>
                <Pill tone={tone as "success" | "warn"}>{g}</Pill>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Shell>
  );
}

export function CoffeeLots() {
  const lots = [
    ["L-2026-031", "Washed", "Fermentation", "4,820", "—", "warn", "36 h"],
    ["L-2026-028", "Washed", "Drying beds", "3,960", "14.2%", "info", "Day 6"],
    ["L-2026-027", "Washed", "Drying beds", "4,110", "12.8%", "info", "Day 8"],
    ["L-2026-024", "Natural", "Drying beds", "2,740", "16.5%", "info", "Day 11"],
    ["L-2026-019", "Washed", "Parchment store", "3,580", "11.4%", "success", "Ready"],
    ["L-2026-017", "Washed", "Parchment store", "3,215", "11.1%", "success", "Ready"],
  ] as const;
  return (
    <Shell active="Lots & inventory" title="Lots & inventory" subtitle="Traceability from intake to parchment">
      <div className="grid grid-cols-[1.7fr_1fr] gap-4">
        <Card title="Active lots" action="Sample data">
          <Table
            columns={[{ label: "Lot" }, { label: "Process" }, { label: "Stage" }, { label: "Cherry (kg)", align: "right" }, { label: "Moisture", align: "right" }, { label: "Status" }]}
            rows={lots.map(([id, p, s, kg, m, tone, st]) => [
              <span key="id" className="font-mono text-[11.5px]">{id}</span>,
              <span key="p" className="text-[var(--m-muted)]">{p}</span>,
              s,
              kg,
              m,
              <Pill key="s" tone={tone}>{st}</Pill>,
            ])}
          />
          <div className="mt-4 rounded-lg bg-[var(--m-surface2)] p-3">
            <div className="mb-2 text-[11px] text-[var(--m-muted)]">Lot L-2026-028 · journey</div>
            <div className="flex items-center">
              {["Received", "Pulped", "Fermented", "Washed", "Drying", "Stored"].map((s, i) => (
                <div key={s} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className={cn("size-3 rounded-full border-2", i <= 4 ? "border-[var(--m-accent)] bg-[var(--m-accent)]" : "border-[var(--m-border)]")} />
                    <span className="text-[10px] text-[var(--m-muted)]">{s}</span>
                  </div>
                  {i < 5 && <span className={cn("mb-4 h-0.5 flex-1", i < 4 ? "bg-[var(--m-accent)]" : "bg-[var(--m-border)]")} />}
                </div>
              ))}
            </div>
          </div>
        </Card>
        <div className="flex flex-col gap-4">
          <Card title="Parchment inventory" action="kg">
            <div className="text-[26px] font-semibold">14,860</div>
            <div className="mb-3 text-[11px] text-[var(--m-muted)]">in 3 warehouses</div>
            {[
              ["Warehouse A", 72],
              ["Warehouse B", 48],
              ["Warehouse C", 21],
            ].map(([l, v]) => (
              <div key={l as string} className="mb-2.5">
                <div className="mb-1 flex justify-between text-[11.5px]">
                  <span className="text-[var(--m-muted)]">{l}</span>
                  <span>{v}%</span>
                </div>
                <Progress value={v as number} />
              </div>
            ))}
          </Card>
          <Card title="Workforce today">
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                ["Sorting", "46"],
                ["Drying", "38"],
                ["Wet mill", "28"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-[var(--m-surface2)] p-2.5">
                  <div className="text-[18px] font-semibold">{v}</div>
                  <div className="text-[10.5px] text-[var(--m-muted)]">{k}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-lg border border-[var(--m-border)] p-2.5 text-[11.5px]">
              <ClipboardList className="size-3.5 text-[var(--m-accent)]" /> Daily production report ready
            </div>
          </Card>
        </div>
      </div>
    </Shell>
  );
}
