/**
 * Furniture ERP — screens based on the project's own UI design
 * (multi-branch stock, stock requests, transfers, sales and credit).
 * All names, numbers and documents are fictional demo data.
 */
import { LogOut, Search } from "lucide-react";
import type { ReactNode } from "react";
import { AppWindow, themes } from "./kit";
import { cn } from "@/lib/utils";

const t = themes.erp;

type ChipTone = "grey" | "blue" | "green" | "amber" | "red";
const chipTone: Record<ChipTone, string> = {
  grey: "bg-[#ECEEEA] text-[#4A534E]",
  blue: "bg-[#E3ECFB] text-[#1E4FA8]",
  green: "bg-[#E2F2E7] text-[#1B6B3A]",
  amber: "bg-[#FCEFD6] text-[#8A5300]",
  red: "bg-[#FBE4E1] text-[#A8261B]",
};

function Chip({ tone, children }: { tone: ChipTone; children: ReactNode }) {
  return (
    <span className={cn("inline-flex h-[22px] items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-[11px] font-semibold", chipTone[tone])}>
      <span className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

function Doc({ children }: { children: ReactNode }) {
  return <span className="font-mono text-[12px] font-medium text-[#1E4FA8]">{children}</span>;
}

interface NavSection {
  label: string;
  items: { t: string; active?: boolean; badge?: string }[];
}

function Shell({
  nav,
  user,
  role,
  children,
}: {
  nav: NavSection[];
  user: string;
  role: string;
  children: ReactNode;
}) {
  return (
    <AppWindow theme={t} url="erp.app / branches">
      <div className="flex h-full">
        <aside className="flex w-[212px] shrink-0 flex-col gap-5 bg-[#16201C] px-3 py-4 text-[#C9D2CC]">
          <div className="flex items-center gap-2.5 px-2">
            <span className="grid size-8 place-items-center rounded-md bg-[#24332D] text-[14px] font-bold text-[#E0A24F]">F</span>
            <span className="text-[13px] font-semibold text-white">[Company]</span>
          </div>
          {nav.map((sec) => (
            <div key={sec.label} className="flex flex-col gap-0.5">
              <span className="px-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7C8C83]">{sec.label}</span>
              {sec.items.map((it) => (
                <span
                  key={it.t}
                  className={cn(
                    "flex h-[34px] items-center justify-between rounded-md px-2.5 text-[12.5px]",
                    it.active && "bg-[#24332D] font-semibold text-white",
                  )}
                >
                  {it.t}
                  {it.badge && (
                    <span className="rounded-full bg-[#E0A24F] px-2 text-[10.5px] font-bold text-[#16201C]">{it.badge}</span>
                  )}
                </span>
              ))}
            </div>
          ))}
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-[60px] shrink-0 items-center gap-4 border-b border-[var(--m-border)] bg-white px-6">
            <div className="flex h-9 w-[380px] items-center gap-2 rounded-lg border border-[#C9CEC6] bg-[#F8F9F7] px-3 text-[12px] text-[var(--m-muted)]">
              <Search className="size-3.5" />
              Search product code, customer, SO / SR / TR number…
            </div>
            <div className="ml-auto flex items-center gap-4">
              <div className="text-right leading-tight">
                <div className="text-[12.5px] font-semibold">{user}</div>
                <div className="text-[11px] text-[var(--m-muted)]">{role}</div>
              </div>
              <span className="flex h-8 items-center gap-1.5 rounded-lg border border-[#C9CEC6] px-3 text-[12px] font-semibold">
                <LogOut className="size-3.5" /> Log out
              </span>
            </div>
          </header>
          <div className="min-h-0 flex-1 overflow-hidden p-6">{children}</div>
        </div>
      </div>
    </AppWindow>
  );
}

const Btn = ({ kind = "sec", children }: { kind?: "pri" | "sec" | "dan"; children: ReactNode }) => (
  <span
    className={cn(
      "inline-flex h-8 items-center justify-center whitespace-nowrap rounded-lg border px-3 text-[12px] font-semibold",
      kind === "pri" && "border-transparent bg-[#1E4D40] text-white",
      kind === "sec" && "border-[#C9CEC6] bg-white",
      kind === "dan" && "border-[#E8B4AD] bg-white text-[#A8261B]",
    )}
  >
    {children}
  </span>
);

const card = "rounded-[10px] border border-[var(--m-border)] bg-white";

/* -------------------------------------------------------------------------- */
/*  Storekeeper home                                                          */
/* -------------------------------------------------------------------------- */

const storeNav: NavSection[] = [
  { label: "Work", items: [{ t: "Home", active: true }, { t: "Stock requests", badge: "4" }, { t: "Transfers" }, { t: "Goods receipts" }] },
  { label: "Stock", items: [{ t: "Stock (all locations)" }, { t: "Stock movements" }, { t: "Stock adjustments" }, { t: "Products" }] },
  { label: "Other", items: [{ t: "Reports" }, { t: "My profile" }] },
];

export function ErpStorekeeper() {
  const queue = [
    { no: "SR-2026-00021", status: "Pending", tone: "grey" as const, isNew: true, when: "Today 09:12", branch: "Denbel", cust: "ABC Furniture · phone order", sales: "Meron Tesfaye", lines: "20 × VC-001 · 2 × DS-003", act: ["Reject…", "Acknowledge"] },
    { no: "SR-2026-00020", status: "Pending", tone: "grey" as const, when: "Today 08:47", branch: "Piassa", cust: "Walk-in", sales: "Dawit Alemu", lines: "6 × OC-115", act: ["Reject…", "Acknowledge"] },
    { no: "SR-2026-00018", status: "Acknowledged", tone: "blue" as const, when: "Yesterday 16:30", branch: "Piassa", cust: "Selam Office Supplies", sales: "Dawit Alemu", lines: "10 × BS-012", act: ["Reject…", "Release"] },
  ];
  return (
    <Shell nav={storeNav} user="Yonas Girma" role="Storekeeper · Pawlos (PAW)">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[12px] text-[var(--m-muted)]">Monday 05/10/2026 · Pawlos warehouse</div>
          <div className="text-[24px] font-semibold tracking-tight">Requests waiting</div>
        </div>
        <div className="flex gap-2">
          <Btn>Propose adjustment</Btn>
          <Btn kind="pri">New goods receipt</Btn>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {[
          ["Pending", "2", "Acknowledge or reject"],
          ["Acknowledged", "1", "Ready to release"],
          ["Partially released", "1", "Release the rest or close"],
          ["Low stock", "3", "Products below minimum"],
        ].map(([k, v, s], i) => (
          <div key={k} className={cn(card, "p-4", i === 3 && "border-[#F2D9A8] bg-[#FFFBF2]")}>
            <div className="text-[11.5px] font-semibold text-[var(--m-muted)]">{k}</div>
            <div className="mt-1 text-[26px] font-semibold">{v}</div>
            <div className="text-[11px] text-[var(--m-muted)]">{s}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-[1.55fr_1fr] gap-4">
        <div className="flex flex-col gap-3">
          {queue.map((r) => (
            <div key={r.no} className={cn(card, "p-4", r.isNew && "border-[#9DB6E6] shadow-[0_0_0_3px_#E3ECFB]")}>
              <div className="flex items-center gap-2.5">
                <Doc>{r.no}</Doc>
                <Chip tone={r.tone}>{r.status}</Chip>
                {r.isNew && <span className="rounded bg-[#1E4FA8] px-1.5 text-[10px] font-bold text-white">NEW</span>}
                <span className="ml-auto text-[11px] text-[var(--m-muted)]">{r.when}</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3 text-[11.5px]">
                <div><div className="text-[var(--m-muted)]">From</div><div className="font-medium">{r.branch}</div></div>
                <div><div className="text-[var(--m-muted)]">Customer / ref</div><div className="font-medium">{r.cust}</div></div>
                <div><div className="text-[var(--m-muted)]">Salesperson</div><div className="font-medium">{r.sales}</div></div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[12.5px] font-semibold">{r.lines}</span>
                <span className="flex gap-2">
                  <Btn kind="dan">{r.act[0]}</Btn>
                  <Btn kind="pri">{r.act[1]}</Btn>
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <div className={cn(card, "p-4")}>
            <div className="mb-2 flex justify-between text-[13px] font-semibold">Low stock at Pawlos <span className="text-[11px] font-normal text-[#1E4FA8]">All</span></div>
            {[
              ["EC-021", "Executive chair", "2", "15"],
              ["MT-200", "Meeting table 8-seat", "2", "4"],
              ["SF-105", "3-seat sofa", "3", "8"],
            ].map(([c, n, q, m]) => (
              <div key={c} className="flex items-center gap-3 border-b border-[#ECEEEA] py-2 text-[12px] last:border-0">
                <span className="font-mono font-semibold">{c}</span>
                <span className="text-[var(--m-muted)]">{n}</span>
                <span className="ml-auto font-semibold text-[#A8261B]">{q}</span>
                <span className="text-[var(--m-muted)]">/ min {m}</span>
              </div>
            ))}
          </div>
          <div className={cn(card, "p-4")}>
            <div className="mb-2 text-[13px] font-semibold">Sent, not yet received</div>
            {[
              ["TR-2026-00033", "To Piassa · 6 × OC-115 · since 08:58"],
              ["TR-2026-00032", "To Denbel · 4 × EC-021 · since yesterday"],
            ].map(([n, d]) => (
              <div key={n} className="border-b border-[#ECEEEA] py-2 last:border-0">
                <div className="flex items-center gap-2"><Doc>{n}</Doc><Chip tone="blue">In transit</Chip></div>
                <div className="mt-1 text-[11.5px] text-[var(--m-muted)]">{d}</div>
              </div>
            ))}
          </div>
          <div className={cn(card, "p-4")}>
            <div className="mb-2 text-[13px] font-semibold">Recent movements</div>
            {[
              ["08:58", "Transfer out → Piassa · OC-115", "−6"],
              ["08:30", "Receipt GR-2026-00006 · BS-012", "+40"],
              ["Sat", "Customer pickup · VC-001", "−5"],
            ].map(([tm, w, q]) => [tm ?? "", w ?? "", q ?? ""] as const).map(([tm, w, q]) => (
              <div key={w} className="flex gap-3 py-1.5 text-[11.5px]">
                <span className="w-9 text-[var(--m-muted)]">{tm}</span>
                <span className="flex-1">{w}</span>
                <span className={cn("font-semibold", q.startsWith("+") ? "text-[#1B6B3A]" : "text-[#A8261B]")}>{q}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stock across all locations                                                */
/* -------------------------------------------------------------------------- */

export function ErpStockMatrix() {
  const data: [string, string, string, number, number, number, number, number, number, number][] = [
    ["VC-001", "Visitor chair", "pcs", 25, 0, 5, 85, 5, 0, 30],
    ["DS-003", "Office desk 160 cm", "pcs", 4, 2, 3, 22, 2, 0, 10],
    ["EC-021", "Executive chair", "pcs", 3, 0, 1, 2, 0, 4, 15],
    ["CB-010", "Filing cabinet 4-drawer", "pcs", 6, 1, 2, 15, 0, 0, 8],
    ["SF-105", "3-seat sofa", "set", 1, 0, 0, 3, 0, 2, 8],
    ["CT-040", "Coffee table", "pcs", 7, 3, 4, 18, 0, 0, 10],
    ["MT-200", "Meeting table 8-seat", "pcs", 0, 0, 1, 2, 0, 0, 4],
    ["BS-012", "Bookshelf 5-tier", "pcs", 9, 2, 5, 40, 10, 0, 15],
    ["WS-300", "Workstation 4-person", "set", 1, 0, 0, 6, 0, 3, 5],
    ["OC-115", "Office chair, mesh", "pcs", 18, 6, 10, 60, 15, 6, 25],
  ];
  const nav: NavSection[] = [
    { label: "Money", items: [{ t: "Home" }, { t: "Payments", badge: "6" }, { t: "Customers & credit" }, { t: "Sales / Orders" }] },
    { label: "Stock", items: [{ t: "Stock (all locations)", active: true }, { t: "Transfers" }, { t: "Stock movements" }, { t: "Products" }] },
    { label: "Other", items: [{ t: "Reports" }, { t: "My profile" }] },
  ];
  const cell = (n: number) => <span className={n === 0 ? "text-[#A7AFA9]" : undefined}>{n}</span>;
  return (
    <Shell nav={nav} user="Hiwot Bekele" role="Accountant · Office">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[12px] text-[var(--m-muted)]">Stock · all locations</div>
          <div className="text-[24px] font-semibold tracking-tight">Current stock</div>
        </div>
        <div className="flex gap-2">
          <Btn>Export Excel</Btn>
          <Btn kind="pri">New transfer</Btn>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-[12px]">
        {["All categories", "Chairs", "Desks & tables", "Storage", "Sofas"].map((c, i) => (
          <span key={c} className={cn("rounded-full border px-3 py-1.5", i === 0 ? "border-[#1E4D40] bg-[#1E4D40] text-white" : "border-[#C9CEC6] bg-white")}>
            {c}
          </span>
        ))}
        <span className="ml-auto flex items-center gap-2 text-[var(--m-muted)]">
          <span className="size-3.5 rounded border border-[#C9CEC6] bg-white" /> Low stock only
        </span>
      </div>
      <div className={cn(card, "mt-4 overflow-hidden")}>
        <table className="w-full border-collapse text-[12.5px] tabular-nums">
          <thead>
            <tr className="bg-[#F8F9F7] text-left text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#4A534E]">
              {["Product", "Piassa", "Underground", "Denbel", "Pawlos", "In transit", "Total", "Min"].map((h, i) => (
                <th key={h} className={cn("border-b border-[var(--m-border)] px-4 py-2.5", i > 0 && "text-right")}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(([code, name, unit, pia, ug, den, paw, res, tr, min]) => {
              const total = pia + ug + den + paw + tr;
              const low = total < min;
              return (
                <tr key={code} className={cn("border-b border-[#ECEEEA] last:border-0", low && "bg-[#FFFBF2]")}>
                  <td className="px-4 py-2.5">
                    <span className="font-mono font-semibold">{code}</span>
                    <span className="ml-2 text-[var(--m-muted)]">{name}</span>
                    <span className="ml-1.5 text-[10.5px] text-[var(--m-muted)]">{unit}</span>
                  </td>
                  <td className="px-4 text-right">{cell(pia)}</td>
                  <td className="px-4 text-right">{cell(ug)}</td>
                  <td className="px-4 text-right">{cell(den)}</td>
                  <td className="px-4 text-right">
                    {cell(paw)}
                    {res > 0 && <span className="ml-1 text-[10.5px] text-[#1E4FA8]">{res} res.</span>}
                  </td>
                  <td className="px-4 text-right">{cell(tr)}</td>
                  <td className={cn("px-4 text-right font-semibold", low && "text-[#A8261B]")}>{total}</td>
                  <td className="px-4 text-right text-[var(--m-muted)]">{min}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-between bg-[#F8F9F7] px-4 py-2.5 text-[11.5px] text-[var(--m-muted)]">
          <span>Total includes goods in transit · “res.” = reserved for stock requests</span>
          <span>1–10 of 64 products</span>
        </div>
      </div>
    </Shell>
  );
}

/* -------------------------------------------------------------------------- */
/*  New sale (salesperson, branch)                                            */
/* -------------------------------------------------------------------------- */

export function ErpNewSale() {
  const nav: NavSection[] = [
    { label: "Sell", items: [{ t: "Home" }, { t: "New sale", active: true }, { t: "Sales / Orders" }, { t: "Payments" }, { t: "Customers & credit" }] },
    { label: "Stock", items: [{ t: "Stock (all locations)" }, { t: "Stock requests" }, { t: "Transfers" }, { t: "Products" }] },
    { label: "Other", items: [{ t: "Reports" }, { t: "My profile" }] },
  ];
  const lines = [
    ["VC-001", "Visitor chair", "3,800.00", "25 / 80", "15", "From Pawlos", "0.00", "57,000.00"],
    ["DS-003", "Office desk 160 cm", "14,500.00", "4 / 20", "2", "From this branch", "500.00", "28,500.00"],
    ["CB-010", "Filing cabinet 4-drawer", "9,200.00", "6 / 15", "1", "From this branch", "0.00", "9,200.00"],
  ];
  return (
    <Shell nav={nav} user="Dawit Alemu" role="Salesperson · Piassa (PIA)">
      <div className="grid grid-cols-[1fr_300px] gap-5">
        <div className="flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[12px] text-[var(--m-muted)]">Piassa · 05/10/2026</div>
              <div className="text-[24px] font-semibold tracking-tight">New sale</div>
            </div>
            <span className="flex overflow-hidden rounded-lg border border-[#C9CEC6] text-[12px] font-semibold">
              <span className="bg-[#1E4D40] px-3.5 py-2 text-white">Walk-in</span>
              <span className="bg-white px-3.5 py-2">Phone order</span>
            </span>
          </div>
          <div className={cn(card, "p-4")}>
            <div className="text-[13px] font-semibold">1 · Customer</div>
            <div className="mt-3 flex items-center gap-8 rounded-lg border border-[var(--m-border)] bg-[#F8F9F7] px-4 py-3">
              <div className="flex-1">
                <div className="text-[14px] font-semibold">ABC Furniture</div>
                <div className="text-[11.5px] text-[#4A534E]">Reseller · Merkato, Addis Ababa</div>
              </div>
              <div><div className="text-[10.5px] text-[var(--m-muted)]">Outstanding</div><div className="text-[12.5px] font-semibold">150,000.00 ETB</div></div>
              <div><div className="text-[10.5px] text-[var(--m-muted)]">Credit limit</div><div className="text-[12.5px] font-semibold">200,000.00 ETB</div></div>
            </div>
          </div>
          <div className={cn(card, "overflow-hidden")}>
            <div className="border-b border-[var(--m-border)] px-4 py-3 text-[13px] font-semibold">2 · Products</div>
            <table className="w-full border-collapse text-[12px] tabular-nums">
              <thead>
                <tr className="bg-[#F8F9F7] text-left text-[10px] font-semibold uppercase tracking-[0.06em] text-[#4A534E]">
                  {["Product", "Unit price", "Stock PIA / PAW", "Qty", "Source", "Discount", "Line total"].map((h) => (
                    <th key={h} className="border-b border-[var(--m-border)] px-3 py-2">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lines.map(([c, n, p, s, q, src, d, tot]) => (
                  <tr key={c} className="border-b border-[#ECEEEA] last:border-0">
                    <td className="px-3 py-2.5"><div className="font-mono font-semibold">{c}</div><div className="text-[11px] text-[#4A534E]">{n}</div></td>
                    <td className="px-3">{p}</td>
                    <td className="px-3">{s}</td>
                    <td className="px-3"><span className="inline-block w-12 rounded-md border border-[#C9CEC6] px-2 py-1 text-right">{q}</span></td>
                    <td className="px-3">
                      <span className={cn("inline-block whitespace-nowrap rounded-md border px-2 py-1", src === "From Pawlos" ? "border-[#9DB6E6] bg-[#F3F7FE]" : "border-[#C9CEC6]")}>{src}</span>
                    </td>
                    <td className="px-3">{d}</td>
                    <td className="px-3 font-semibold">{tot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-[#F8F9F7] px-4 py-2.5 text-[11.5px] text-[#4A534E]">
              Prices come from the product and can’t be typed. Lines from Pawlos create a stock request when the sale is confirmed.
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-[52px]">
          <div className={cn(card, "flex flex-col gap-2 p-4")}>
            <div className="text-[13px] font-semibold">Receipt type</div>
            <div className="grid grid-cols-2 gap-2 text-[11.5px]">
              <span className="rounded-lg border-2 border-[#1E4D40] p-2.5 font-semibold">Official receipt</span>
              <span className="rounded-lg border border-[#C9CEC6] p-2.5">Without receipt</span>
            </div>
          </div>
          <div className={cn(card, "flex flex-col gap-2.5 p-4 text-[12.5px] tabular-nums")}>
            <div className="text-[13px] font-semibold">Summary</div>
            <div className="flex justify-between"><span className="text-[#4A534E]">Subtotal (3 lines, 18 pcs)</span><span>95,200.00</span></div>
            <div className="flex justify-between"><span className="text-[#4A534E]">Discounts</span><span>−500.00</span></div>
            <div className="flex items-baseline justify-between border-t border-[var(--m-border)] pt-2.5"><span className="font-semibold">Total</span><span className="text-[20px] font-bold">94,700.00 <span className="text-[11px] font-medium text-[var(--m-muted)]">ETB</span></span></div>
            <div className="flex justify-between"><span className="text-[#4A534E]">Paid now</span><span className="font-semibold text-[#1B6B3A]">50,000.00</span></div>
            <div className="flex justify-between"><span className="font-semibold">Remaining (credit)</span><span className="font-bold">44,700.00</span></div>
            <div className="flex flex-col gap-1.5 rounded-lg bg-[#FCEFD6] p-2.5 text-[11px] text-[#5E3A00]">
              <span className="font-semibold">Close to credit limit</span>
              <span>After this sale ABC Furniture owes 194,700.00 of 200,000.00 ETB.</span>
              <span className="h-1.5 overflow-hidden rounded-full bg-[#F2D9A8]"><span className="block h-full w-[97%] bg-[#B87100]" /></span>
            </div>
            <span className="mt-1 flex h-10 items-center justify-center rounded-lg bg-[#1E4D40] text-[13px] font-semibold text-white">Confirm sale</span>
            <span className="flex h-9 items-center justify-center rounded-lg border border-[#C9CEC6] text-[12px] font-semibold">Save as draft</span>
          </div>
        </div>
      </div>
    </Shell>
  );
}
