import {
  BarChart3,
  Bell,
  Boxes,
  CalendarDays,
  Download,
  FileText,
  LayoutDashboard,
  Package,
  Plus,
  Receipt,
  Settings,
  ShieldCheck,
  Truck,
  Users,
  Wallet,
  Weight,
} from "lucide-react";
import {
  AppWindow,
  AreaChart,
  Avatar,
  BarChart,
  Card,
  Donut,
  Kpi,
  Legend,
  Pill,
  Progress,
  SearchBox,
  Sidebar,
  Table,
  Topbar,
  UserChip,
  themes,
  type NavEntry,
} from "./kit";

const t = themes.prms;

const nav = (active: string): NavEntry[] =>
  [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Materials", icon: Package },
    { label: "Suppliers", icon: Truck },
    { label: "Production", icon: Boxes },
    { label: "Employees", icon: Users },
    { label: "Expenses", icon: Receipt },
    { label: "Reports", icon: FileText },
    { label: "Access control", icon: ShieldCheck },
    { label: "Settings", icon: Settings },
  ].map((n) => ({ ...n, active: n.label === active }));

function Shell({ active, title, subtitle, children, actions }: { active: string; title: string; subtitle: string; children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <AppWindow theme={t} url="prms.app / operations">
      <div className="flex h-full">
        <Sidebar
          brand="P"
          brandSub="PRMS"
          items={nav(active)}
          footer={
            <div className="rounded-lg border border-[var(--m-border)] bg-[var(--m-surface2)] p-3">
              <UserChip initials="MT" name="Meron T." role="Operations manager" />
            </div>
          }
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar
            title={title}
            subtitle={subtitle}
            right={
              <>
                <SearchBox placeholder="Search batches, suppliers…" width={230} />
                {actions}
                <span className="relative grid size-9 place-items-center rounded-lg border border-[var(--m-border)]">
                  <Bell className="size-4 text-[var(--m-muted)]" />
                  <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[var(--m-accent)]" />
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

const PrimaryBtn = ({ children }: { children: React.ReactNode }) => (
  <span className="flex h-9 items-center gap-1.5 rounded-lg bg-[var(--m-accent)] px-3 text-[12px] font-semibold text-[var(--m-accent-text)]">
    <Plus className="size-3.5" strokeWidth={2.4} />
    {children}
  </span>
);

const materialColors = ["#36D6C5", "#4285FF", "#A78BFA", "#F5A524", "#64748B"];

export function PrmsDashboard() {
  return (
    <Shell active="Dashboard" title="Operations overview" subtitle="Main facility · This month" actions={<PrimaryBtn>New intake</PrimaryBtn>}>
      <div className="grid grid-cols-4 gap-4">
        <Kpi label="Material received" value="48.6" unit="t" delta="8.2% vs last month" icon={Weight} spark={[12, 18, 15, 22, 19, 26, 30]} />
        <Kpi label="Processed output" value="41.3" unit="t" delta="5.4% vs last month" icon={Boxes} spark={[10, 14, 13, 18, 17, 21, 24]} />
        <Kpi label="Active employees" value="64" delta="3 new this month" icon={Users} spark={[58, 58, 60, 61, 61, 63, 64]} />
        <Kpi label="Operating expenses" value="312K" unit="ETB" delta="2.1% vs last month" positive={false} icon={Wallet} spark={[30, 28, 31, 29, 33, 32, 34]} />
      </div>

      <div className="mt-4 grid grid-cols-[1.65fr_1fr] gap-4">
        <Card
          title="Material intake vs processed"
          action={
            <span className="flex gap-3">
              <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 bg-[var(--m-accent)]" />Intake</span>
              <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 border-t border-dashed border-[var(--m-accent2)]" />Processed</span>
            </span>
          }
        >
          <AreaChart
            h={196}
            labels={["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6", "Wk 7", "Wk 8"]}
            series={[
              { data: [6.1, 7.4, 6.8, 8.9, 8.2, 10.1, 9.6, 11.2], color: t.accent },
              { data: [5.2, 6.1, 6.3, 7.2, 7.6, 8.4, 8.9, 9.7], color: t.accent2 },
            ]}
          />
        </Card>
        <Card title="Stock by material" action="Tonnes">
          <div className="flex items-center gap-5">
            <Donut
              size={138}
              segments={[
                { value: 38, color: materialColors[0]! },
                { value: 24, color: materialColors[1]! },
                { value: 17, color: materialColors[2]! },
                { value: 13, color: materialColors[3]! },
                { value: 8, color: materialColors[4]! },
              ]}
              center={
                <div>
                  <div className="text-[19px] font-semibold">126.4</div>
                  <div className="text-[10px] text-[var(--m-muted)]">tonnes</div>
                </div>
              }
            />
            <div className="flex-1">
              <Legend
                items={[
                  { label: "PET", color: materialColors[0]!, value: "48.0" },
                  { label: "HDPE", color: materialColors[1]!, value: "30.3" },
                  { label: "PP", color: materialColors[2]!, value: "21.5" },
                  { label: "LDPE film", color: materialColors[3]!, value: "16.4" },
                  { label: "Mixed", color: materialColors[4]!, value: "10.2" },
                ]}
              />
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-[1.65fr_1fr] gap-4">
        <Card title="Recent intake" action="View all">
          <Table
            columns={[{ label: "Batch" }, { label: "Supplier" }, { label: "Material" }, { label: "Weight", align: "right" }, { label: "Status" }]}
            rows={[
              ["#B-2417", "Bole Collectors", "PET bottles", "2,340 kg", <Pill key="a" tone="success">Sorted</Pill>],
              ["#B-2416", "Kality Depot", "HDPE", "1,120 kg", <Pill key="b" tone="info">Washing</Pill>],
              ["#B-2415", "Merkato Traders", "PP crates", "860 kg", <Pill key="c" tone="warn">Inspection</Pill>],
            ]}
          />
        </Card>
        <Card title="Shift attendance" action="Today">
          <div className="flex flex-col gap-3">
            {[
              ["Morning · Sorting", 92],
              ["Morning · Washing", 86],
              ["Afternoon · Shredding", 78],
              ["Night · Pelletizing", 64],
            ].map(([l, v]) => (
              <div key={l as string}>
                <div className="mb-1.5 flex justify-between text-[11.5px]">
                  <span className="text-[var(--m-muted)]">{l}</span>
                  <span className="tabular-nums">{v}%</span>
                </div>
                <Progress value={v as number} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Shell>
  );
}

export function PrmsMaterials() {
  const rows = [
    ["PET", "Clear bottles", "Grade A", 48.0, 80, "success", "In stock"],
    ["HDPE", "Containers", "Grade A", 30.3, 62, "success", "In stock"],
    ["PP", "Crates & caps", "Grade B", 21.5, 44, "info", "Reorder soon"],
    ["LDPE", "Film & bags", "Grade B", 16.4, 33, "warn", "Low"],
    ["PET", "Coloured bottles", "Grade C", 6.8, 18, "warn", "Low"],
    ["Mixed", "Unsorted", "—", 10.2, 26, "neutral", "Awaiting sort"],
  ] as const;
  return (
    <Shell active="Materials" title="Raw materials" subtitle="Stock, grades and intake by type" actions={<PrimaryBtn>Record intake</PrimaryBtn>}>
      <div className="grid grid-cols-5 gap-3">
        {[
          ["PET", "54.8 t"],
          ["HDPE", "30.3 t"],
          ["PP", "21.5 t"],
          ["LDPE", "16.4 t"],
          ["Mixed", "10.2 t"],
        ].map(([k, v], i) => (
          <div key={k} className="rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] p-3.5">
            <div className="flex items-center gap-2 text-[11.5px] text-[var(--m-muted)]">
              <span className="size-2 rounded-sm" style={{ background: materialColors[i] }} />
              {k}
            </div>
            <div className="mt-1.5 text-[20px] font-semibold">{v}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-[1.8fr_1fr] gap-4">
        <Card
          title="Inventory"
          action={
            <span className="flex gap-2">
              <span className="rounded-md border border-[var(--m-border)] px-2 py-1">All grades</span>
              <span className="rounded-md border border-[var(--m-border)] px-2 py-1">Main facility</span>
            </span>
          }
        >
          <Table
            columns={[
              { label: "Type", width: "70px" },
              { label: "Description" },
              { label: "Grade" },
              { label: "Stock (t)", align: "right" },
              { label: "Capacity", width: "150px" },
              { label: "Status" },
            ]}
            rows={rows.map(([type, desc, grade, stock, cap, tone, status]) => [
              <span key="t" className="font-medium">{type}</span>,
              desc,
              <span key="g" className="text-[var(--m-muted)]">{grade}</span>,
              stock.toFixed(1),
              <div key="c" className="flex items-center gap-2 pr-4">
                <Progress value={cap} />
                <span className="w-8 text-right text-[11px] text-[var(--m-muted)]">{cap}%</span>
              </div>,
              <Pill key="s" tone={tone}>{status}</Pill>,
            ])}
          />
        </Card>
        <div className="flex flex-col gap-4">
          <Card title="Weekly intake by type" action="Tonnes">
            <BarChart
              h={150}
              stacked
              colors={materialColors}
              labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
              data={[
                [3.1, 1.6, 0.9, 0.6],
                [2.6, 1.9, 1.2, 0.8],
                [3.8, 1.4, 0.7, 0.5],
                [3.2, 2.2, 1.1, 0.9],
                [4.1, 1.8, 1.4, 0.7],
                [2.2, 0.9, 0.6, 0.4],
              ]}
            />
          </Card>
          <Card title="Top suppliers" action="This month">
            <div className="flex flex-col gap-2.5">
              {[
                ["Bole Collectors", "12.4 t"],
                ["Kality Depot", "9.8 t"],
                ["Merkato Traders", "7.1 t"],
              ].map(([n, v], i) => (
                <div key={n} className="flex items-center gap-2.5 text-[12px]">
                  <Avatar initials={n!.slice(0, 2).toUpperCase()} size={24} tone={i} />
                  <span>{n}</span>
                  <span className="ml-auto tabular-nums text-[var(--m-muted)]">{v}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Shell>
  );
}

export function PrmsEmployees() {
  const people = [
    ["Abebe Kebede", "Shift supervisor", "Sorting", "Morning", "success", "On shift"],
    ["Hana Girma", "Machine operator", "Shredding", "Afternoon", "info", "Scheduled"],
    ["Dawit Alemu", "Quality inspector", "Inspection", "Morning", "success", "On shift"],
    ["Selam Tesfaye", "Store keeper", "Warehouse", "Morning", "success", "On shift"],
    ["Yonas Bekele", "Machine operator", "Pelletizing", "Night", "neutral", "Off today"],
    ["Tigist Haile", "Sorter", "Sorting", "Morning", "warn", "On leave"],
    ["Samuel Tadesse", "Driver", "Logistics", "Morning", "success", "On shift"],
  ] as const;
  return (
    <Shell active="Employees" title="Employees" subtitle="64 staff · 4 shifts" actions={<PrimaryBtn>Add employee</PrimaryBtn>}>
      <div className="grid grid-cols-[1fr_300px] gap-4">
        <Card
          title="Team directory"
          action={
            <span className="flex gap-1">
              {["All", "Sorting", "Washing", "Shredding", "Logistics"].map((f, i) => (
                <span key={f} className={i === 0 ? "rounded-md bg-[var(--m-surface2)] px-2 py-1 text-[var(--m-text)]" : "px-2 py-1"}>
                  {f}
                </span>
              ))}
            </span>
          }
        >
          <Table
            columns={[{ label: "Name" }, { label: "Role" }, { label: "Department" }, { label: "Shift" }, { label: "Status" }]}
            rows={people.map(([n, r, d, s, tone, st], i) => [
              <span key="n" className="flex items-center gap-2.5">
                <Avatar initials={n.split(" ").map((x) => x[0]).join("")} size={26} tone={i} />
                <span className="font-medium">{n}</span>
              </span>,
              r,
              <span key="d" className="text-[var(--m-muted)]">{d}</span>,
              s,
              <Pill key="s" tone={tone}>{st}</Pill>,
            ])}
          />
        </Card>
        <div className="flex flex-col gap-4">
          <Card title="Headcount by department">
            <div className="flex flex-col gap-3">
              {[
                ["Sorting", 22],
                ["Washing", 14],
                ["Shredding & pellets", 12],
                ["Warehouse", 8],
                ["Logistics & admin", 8],
              ].map(([l, v]) => (
                <div key={l as string}>
                  <div className="mb-1.5 flex justify-between text-[11.5px]">
                    <span className="text-[var(--m-muted)]">{l}</span>
                    <span>{v}</span>
                  </div>
                  <Progress value={((v as number) / 22) * 100} color="var(--m-accent2)" />
                </div>
              ))}
            </div>
          </Card>
          <Card title="This week" action={<CalendarDays className="size-3.5" />}>
            <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] text-[var(--m-muted)]">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  {d}
                  <span
                    className="h-12 w-full rounded-md"
                    style={{ background: `color-mix(in srgb, var(--m-accent) ${[70, 85, 90, 80, 75, 40, 10][i]}%, var(--m-surface2))` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-3 text-[11px] text-[var(--m-muted)]">Attendance rate by day</div>
          </Card>
        </div>
      </div>
    </Shell>
  );
}

export function PrmsExpenses() {
  return (
    <Shell
      active="Expenses"
      title="Expenses"
      subtitle="Operating costs · Last 6 months"
      actions={
        <span className="flex h-9 items-center gap-1.5 rounded-lg border border-[var(--m-border)] px-3 text-[12px]">
          <Download className="size-3.5" /> Export
        </span>
      }
    >
      <div className="grid grid-cols-3 gap-4">
        <Kpi label="This month" value="312,400" unit="ETB" delta="2.1%" positive={false} icon={Wallet} />
        <Kpi label="Average / month" value="298,900" unit="ETB" icon={BarChart3} />
        <Kpi label="Pending approvals" value="7" icon={Receipt} />
      </div>
      <div className="mt-4 grid grid-cols-[1.4fr_1fr] gap-4">
        <Card title="Monthly spending by category" action="ETB ’000">
          <BarChart
            h={210}
            stacked
            colors={["#36D6C5", "#4285FF", "#A78BFA", "#F5A524"]}
            labels={["Apr", "May", "Jun", "Jul", "Aug", "Sep"]}
            data={[
              [120, 80, 46, 34],
              [126, 78, 52, 30],
              [131, 84, 44, 38],
              [128, 90, 49, 33],
              [134, 86, 51, 35],
              [138, 92, 47, 36],
            ]}
          />
          <div className="mt-3 flex gap-4 text-[11px] text-[var(--m-muted)]">
            {[
              ["Payroll", "#36D6C5"],
              ["Material purchase", "#4285FF"],
              ["Energy & water", "#A78BFA"],
              ["Transport", "#F5A524"],
            ].map(([l, c]) => (
              <span key={l} className="flex items-center gap-1.5">
                <span className="size-2 rounded-sm" style={{ background: c }} />
                {l}
              </span>
            ))}
          </div>
        </Card>
        <Card title="Recent expenses" action="View all">
          <div className="flex flex-col">
            {[
              ["Electricity — September", "Energy & water", "28,450", "success", "Approved"],
              ["Diesel for pickup truck", "Transport", "9,800", "warn", "Pending"],
              ["Material purchase #B-2417", "Material purchase", "46,800", "success", "Approved"],
              ["Shredder blade replacement", "Maintenance", "15,200", "warn", "Pending"],
              ["Protective equipment", "Safety", "6,350", "success", "Approved"],
            ].map(([n, c, a, tone, s]) => (
              <div key={n} className="flex items-center gap-3 border-b border-[var(--m-border)] py-2.5 last:border-0">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[12px] font-medium">{n}</div>
                  <div className="text-[10.5px] text-[var(--m-muted)]">{c}</div>
                </div>
                <div className="text-right">
                  <div className="text-[12px] tabular-nums">{a} ETB</div>
                  <Pill tone={tone as "success" | "warn"}>{s}</Pill>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Shell>
  );
}
