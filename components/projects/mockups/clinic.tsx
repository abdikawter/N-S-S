import {
  Activity,
  Bell,
  CalendarClock,
  ClipboardList,
  CreditCard,
  FileBarChart,
  FlaskConical,
  HeartPulse,
  LayoutDashboard,
  Plus,
  Send,
  Stethoscope,
  Thermometer,
  UserPlus,
  Users,
} from "lucide-react";
import {
  AppWindow,
  Avatar,
  BarChart,
  Card,
  Kpi,
  Pill,
  SearchBox,
  Sidebar,
  Table,
  Topbar,
  UserChip,
  themes,
  type NavEntry,
} from "./kit";
import { cn } from "@/lib/utils";

const t = themes.clinic;

const nav = (active: string): NavEntry[] =>
  [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Reception", icon: ClipboardList, badge: "6" },
    { label: "Patients", icon: Users },
    { label: "Consultations", icon: Stethoscope },
    { label: "Laboratory", icon: FlaskConical, badge: "3" },
    { label: "Payments", icon: CreditCard },
    { label: "Reports", icon: FileBarChart },
  ].map((n) => ({ ...n, active: n.label === active }));

function Shell({
  active,
  title,
  subtitle,
  user,
  children,
  actions,
}: {
  active: string;
  title: string;
  subtitle: string;
  user: [string, string, string];
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <AppWindow theme={t} url="clinic.app / workspace">
      <div className="flex h-full">
        <Sidebar
          brand={<HeartPulse className="size-4" />}
          brandSub="CareFlow Clinic"
          items={nav(active)}
          footer={
            <div className="rounded-lg bg-[var(--m-surface2)] p-3">
              <UserChip initials={user[0]} name={user[1]} role={user[2]} />
            </div>
          }
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar
            title={title}
            subtitle={subtitle}
            right={
              <>
                <SearchBox placeholder="Search patient name or ID" width={250} />
                {actions}
                <span className="relative grid size-9 place-items-center rounded-lg border border-[var(--m-border)] bg-white">
                  <Bell className="size-4 text-[var(--m-muted)]" />
                  <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-[#E5484D] text-[9px] font-semibold text-white">
                    4
                  </span>
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

const Primary = ({ children, icon: I = Plus }: { children: React.ReactNode; icon?: typeof Plus }) => (
  <span className="flex h-9 items-center gap-1.5 rounded-lg bg-[var(--m-accent)] px-3 text-[12px] font-semibold text-white">
    <I className="size-3.5" strokeWidth={2.2} />
    {children}
  </span>
);

const stages = ["Registered", "Triage", "Consultation", "Laboratory", "Payment"];

function StageTrack({ at }: { at: number }) {
  return (
    <div className="flex items-center gap-1">
      {stages.map((s, i) => (
        <span
          key={s}
          className={cn("h-1.5 w-6 rounded-full", i < at ? "bg-[var(--m-accent2)]" : i === at ? "bg-[var(--m-accent)]" : "bg-[var(--m-surface2)]")}
        />
      ))}
    </div>
  );
}

export function ClinicReception() {
  const queue = [
    ["Q-014", "Mekdes Assefa", "F · 34", "Dr. Bekele", 2, "info", "Consultation"],
    ["Q-015", "Henok Tadesse", "M · 52", "Dr. Bekele", 3, "warn", "Awaiting lab"],
    ["Q-016", "Ruth Mengistu", "F · 27", "Dr. Alem", 1, "accent", "Triage"],
    ["Q-017", "Bereket Solomon", "M · 8", "Dr. Alem", 0, "neutral", "Waiting"],
    ["Q-018", "Liya Fekadu", "F · 61", "Dr. Bekele", 4, "success", "At payment"],
    ["Q-019", "Kidus Wolde", "M · 45", "—", 0, "neutral", "Waiting"],
  ] as const;
  return (
    <Shell
      active="Reception"
      title="Reception"
      subtitle="Today’s patient flow"
      user={["SA", "Sara A.", "Receptionist"]}
      actions={<Primary icon={UserPlus}>Register patient</Primary>}
    >
      <div className="grid grid-cols-4 gap-4">
        <Kpi label="Patients today" value="38" icon={Users} delta="6 more than yesterday" />
        <Kpi label="In queue" value="6" icon={ClipboardList} />
        <Kpi label="Avg. wait" value="18" unit="min" icon={CalendarClock} delta="4 min faster" />
        <Kpi label="Lab requests" value="11" icon={FlaskConical} />
      </div>
      <div className="mt-4 grid grid-cols-[1fr_290px] gap-4">
        <Card title="Live queue" action="Auto-updating">
          <Table
            columns={[{ label: "Ticket" }, { label: "Patient" }, { label: "Doctor" }, { label: "Progress" }, { label: "Status" }]}
            rows={queue.map(([q, n, meta, d, at, tone, st], i) => [
              <span key="q" className="font-mono text-[11px] text-[var(--m-muted)]">{q}</span>,
              <span key="n" className="flex items-center gap-2.5">
                <Avatar initials={n.split(" ").map((x) => x[0]).join("")} size={26} tone={i} />
                <span>
                  <span className="block font-medium">{n}</span>
                  <span className="block text-[10.5px] text-[var(--m-muted)]">{meta}</span>
                </span>
              </span>,
              d,
              <StageTrack key="s" at={at} />,
              <Pill key="p" tone={tone}>{st}</Pill>,
            ])}
          />
        </Card>
        <Card title="Notifications" action="Mark all read">
          <div className="flex flex-col gap-3">
            {[
              [FlaskConical, "Lab results ready", "CBC for Henok Tadesse", "2 min"],
              [Stethoscope, "Patient sent to lab", "Dr. Bekele · Q-015", "9 min"],
              [CreditCard, "Payment pending", "Liya Fekadu · 850 ETB", "12 min"],
              [UserPlus, "New appointment", "Tomorrow, 9:30", "25 min"],
            ].map(([I, title, sub, time]) => {
              const Ico = I as typeof Bell;
              return (
                <div key={title as string} className="flex gap-3 rounded-lg border border-[var(--m-border)] p-2.5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[color-mix(in_srgb,var(--m-accent)_10%,white)] text-[var(--m-accent)]">
                    <Ico className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-medium">{title as string}</div>
                    <div className="truncate text-[11px] text-[var(--m-muted)]">{sub as string}</div>
                  </div>
                  <span className="text-[10px] text-[var(--m-muted)]">{time as string}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </Shell>
  );
}

export function ClinicDoctor() {
  return (
    <Shell
      active="Consultations"
      title="Consultation"
      subtitle="Mekdes Assefa · Q-014"
      user={["YB", "Dr. Yared B.", "General practitioner"]}
      actions={<Primary icon={Send}>Complete visit</Primary>}
    >
      <div className="grid grid-cols-[270px_1fr_270px] gap-4">
        <div className="flex flex-col gap-4">
          <Card>
            <div className="flex items-center gap-3">
              <Avatar initials="MA" size={44} />
              <div>
                <div className="text-[14px] font-semibold">Mekdes Assefa</div>
                <div className="text-[11px] text-[var(--m-muted)]">Female · 34 yrs · PT-20391</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
              {[
                ["Blood type", "O+"],
                ["Allergies", "Penicillin"],
                ["Last visit", "12 Jun"],
                ["Visits", "5"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-[var(--m-surface2)] p-2">
                  <div className="text-[var(--m-muted)]">{k}</div>
                  <div className="mt-0.5 font-medium">{v}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Vitals" action="Triage · 10:42">
            <div className="flex flex-col gap-2.5 text-[12px]">
              {[
                [Activity, "Blood pressure", "118/76"],
                [HeartPulse, "Heart rate", "82 bpm"],
                [Thermometer, "Temperature", "37.9 °C"],
                [Activity, "SpO₂", "98%"],
              ].map(([I, k, v]) => {
                const Ico = I as typeof Activity;
                return (
                  <div key={k as string} className="flex items-center gap-2">
                    <Ico className="size-3.5 text-[var(--m-accent2)]" />
                    <span className="text-[var(--m-muted)]">{k as string}</span>
                    <span className="ml-auto font-medium">{v as string}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <Card title="Clinical notes" action="Autosaved">
          <div className="flex flex-col gap-3">
            {[
              ["Chief complaint", "Fever and headache for 3 days, mild body aches."],
              ["Examination", "Alert, mildly febrile. No neck stiffness. Chest clear."],
              ["Assessment", "Suspected febrile illness — rule out malaria and infection."],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-[var(--m-muted)]">{k}</div>
                <div className="rounded-lg border border-[var(--m-border)] bg-[var(--m-surface2)] p-3 text-[12.5px] leading-relaxed">{v}</div>
              </div>
            ))}
            <div>
              <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-[var(--m-muted)]">Prescription</div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-lg border border-[var(--m-border)] px-2.5 py-1.5 text-[12px]">Paracetamol 500 mg · 3×/day · 3 days</span>
                <span className="rounded-lg border border-dashed border-[var(--m-border)] px-2.5 py-1.5 text-[12px] text-[var(--m-muted)]">+ Add medication</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <Card title="Lab requests">
            <div className="flex flex-col gap-2">
              {[
                ["Complete blood count", true],
                ["Malaria RDT", true],
                ["Urinalysis", false],
                ["Blood glucose", false],
              ].map(([n, on]) => (
                <div key={n as string} className="flex items-center gap-2.5 text-[12px]">
                  <span
                    className={cn(
                      "grid size-4 place-items-center rounded border",
                      on ? "border-[var(--m-accent)] bg-[var(--m-accent)] text-white" : "border-[var(--m-border)]",
                    )}
                  >
                    {on && <svg viewBox="0 0 12 12" className="size-2.5"><path d="M2 6.5 5 9l5-6" stroke="currentColor" strokeWidth="2" fill="none" /></svg>}
                  </span>
                  {n as string}
                </div>
              ))}
            </div>
            <span className="mt-4 flex h-9 items-center justify-center gap-1.5 rounded-lg border border-[var(--m-accent)] text-[12px] font-medium text-[var(--m-accent)]">
              <FlaskConical className="size-3.5" /> Send to laboratory
            </span>
          </Card>
          <Card title="History">
            <div className="flex flex-col gap-3 border-l border-[var(--m-border)] pl-3 text-[11.5px]">
              {[
                ["12 Jun", "Follow-up · Dr. Alem"],
                ["03 Apr", "Consultation · Dr. Bekele"],
                ["18 Jan", "Lab · Lipid profile"],
              ].map(([d, v]) => (
                <div key={d} className="relative">
                  <span className="absolute -left-[16.5px] top-1 size-2 rounded-full bg-[var(--m-accent2)]" />
                  <div className="font-medium">{v}</div>
                  <div className="text-[var(--m-muted)]">{d}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Shell>
  );
}

export function ClinicLab() {
  return (
    <Shell active="Laboratory" title="Laboratory" subtitle="Results & billing" user={["NK", "Nardos K.", "Lab technician"]} actions={<Primary>New sample</Primary>}>
      <div className="grid grid-cols-[1.5fr_1fr] gap-4">
        <Card title="Complete blood count — Henok Tadesse" action={<Pill tone="success">Verified</Pill>}>
          <Table
            columns={[{ label: "Test" }, { label: "Result", align: "right" }, { label: "Unit" }, { label: "Reference" }, { label: "Flag" }]}
            rows={[
              ["Hemoglobin", "13.8", "g/dL", "13.0 – 17.0", <Pill key="1" tone="success">Normal</Pill>],
              ["WBC", "11.9", "×10³/µL", "4.0 – 10.0", <Pill key="2" tone="danger">High</Pill>],
              ["Platelets", "245", "×10³/µL", "150 – 400", <Pill key="3" tone="success">Normal</Pill>],
              ["Neutrophils", "74", "%", "40 – 70", <Pill key="4" tone="warn">Borderline</Pill>],
              ["Lymphocytes", "21", "%", "20 – 40", <Pill key="5" tone="success">Normal</Pill>],
            ].map((r) => r.map((c, i) => (i === 0 ? <span key="n" className="font-medium">{c}</span> : c)))}
          />
          <div className="mt-4 flex items-center gap-3 rounded-lg bg-[var(--m-surface2)] p-3 text-[12px]">
            <Send className="size-4 text-[var(--m-accent)]" />
            Results sent to <b className="font-semibold">Dr. Bekele</b> · Patient moved to consultation
          </div>
        </Card>
        <div className="flex flex-col gap-4">
          <Card title="Today’s payments" action="ETB">
            <div className="text-[26px] font-semibold tracking-tight">24,650</div>
            <div className="text-[11px] text-[var(--m-muted)]">38 transactions</div>
            <div className="mt-3">
              <BarChart
                h={96}
                colors={["var(--m-accent)"]}
                labels={["8", "9", "10", "11", "12", "1", "2", "3"]}
                data={[[1.2], [3.4], [4.1], [3.8], [2.2], [2.9], [3.6], [3.4]]}
              />
            </div>
          </Card>
          <Card title="Invoices" action="View all">
            {[
              ["Liya Fekadu", "Consultation + CBC", "850", "warn", "Pending"],
              ["Mekdes Assefa", "Consultation", "300", "success", "Paid"],
              ["Ruth Mengistu", "Ultrasound", "1,200", "success", "Paid"],
            ].map(([n, s, a, tone, st]) => (
              <div key={n} className="flex items-center gap-3 border-b border-[var(--m-border)] py-2 last:border-0">
                <div className="flex-1">
                  <div className="text-[12px] font-medium">{n}</div>
                  <div className="text-[10.5px] text-[var(--m-muted)]">{s}</div>
                </div>
                <span className="text-[12px] tabular-nums">{a}</span>
                <Pill tone={tone as "warn" | "success"}>{st}</Pill>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </Shell>
  );
}
