/**
 * StoreFront.et — screens based on the project's own design: shops sell from
 * their Telegram channel through their own AI-assisted bot, staff handle
 * orders in a group, and the owner sees stock and sales on the phone.
 * Chat UI is drawn generically; all shop names and numbers are demo data.
 */
import { BarChart3, Bot, Check, Image as ImageIcon, Package, Send, ShoppingCart, Users } from "lucide-react";
import type { ReactNode } from "react";
import { themeVars, themes } from "./kit";
import { cn } from "@/lib/utils";

const t = themes.storefront;

/** Presentation stage (no browser chrome): this product lives inside a chat app. */
function Stage({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div
      style={themeVars(t)}
      className="relative flex h-full w-full flex-col overflow-hidden bg-[radial-gradient(120%_90%_at_50%_0%,#FFFFFF_0%,var(--m-bg)_60%)] px-12 pb-0 pt-9 font-sans text-[13px] text-[var(--m-text)] antialiased"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[20px] font-extrabold tracking-tight">
            StoreFront<span className="text-[var(--m-accent)]">.et</span>
          </span>
          <span className="h-5 w-px bg-[var(--m-border)]" />
          <div className="leading-tight">
            <div className="text-[14px] font-semibold">{title}</div>
            <div className="text-[11.5px] text-[var(--m-muted)]">{subtitle}</div>
          </div>
        </div>
        <span className="rounded border border-[var(--m-border)] bg-white px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-[var(--m-muted)]">
          Demo data
        </span>
      </div>
      <div className="mt-7 flex min-h-0 flex-1 items-start justify-center gap-7">{children}</div>
    </div>
  );
}

/** A phone frame cut off at the bottom edge of the stage, like a product shot. */
function Phone({ header, sub, icon, children, dark = false }: { header: string; sub: string; icon: ReactNode; children: ReactNode; dark?: boolean }) {
  return (
    <div className="flex h-[720px] w-[330px] shrink-0 flex-col overflow-hidden rounded-t-[40px] border-[9px] border-b-0 border-[#111114] bg-[#111114] shadow-[0_30px_80px_-30px_rgba(17,17,20,0.45)]">
      <div className={cn("flex items-center gap-2.5 rounded-t-[31px] px-4 pb-3 pt-5", dark ? "bg-[#1C1C21] text-white" : "bg-white")}>
        <span className="grid size-9 place-items-center rounded-full bg-[var(--m-accent)] text-white">{icon}</span>
        <div className="leading-tight">
          <div className="text-[13px] font-semibold">{header}</div>
          <div className={cn("text-[11px]", dark ? "text-white/60" : "text-[var(--m-muted)]")}>{sub}</div>
        </div>
      </div>
      <div className={cn("flex flex-1 flex-col gap-2.5 overflow-hidden px-3 py-3", dark ? "bg-[#26262C]" : "bg-[#DCE6EF]")}>{children}</div>
    </div>
  );
}

function ProductPhoto({ className, label = "Product photo" }: { className?: string; label?: string }) {
  return (
    <div className={cn("relative grid place-items-center overflow-hidden bg-[linear-gradient(135deg,#E9E2D6,#D8CDBB)]", className)}>
      <svg viewBox="0 0 120 60" className="w-[62%] drop-shadow-[0_10px_10px_rgba(0,0,0,0.18)]" aria-hidden="true">
        <path d="M8 44c0-8 8-11 18-13l26-6c10-2 16-12 26-12 8 0 12 6 18 10 6 4 16 6 16 14v5c0 3-2 5-5 5H13c-3 0-5-1-5-3z" fill="#3B2A1E" />
        <path d="M8 47h105v4c0 2-2 3-4 3H12c-2 0-4-1-4-3z" fill="#1E1510" />
      </svg>
      <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/35 px-1.5 py-0.5 text-[9.5px] text-white">
        <ImageIcon className="size-3" /> {label}
      </span>
    </div>
  );
}

const Bubble = ({ me, children }: { me?: boolean; children: ReactNode }) => (
  <div
    className={cn(
      "max-w-[85%] rounded-2xl px-3 py-2 text-[12px] leading-snug shadow-sm",
      me ? "self-end rounded-br-md bg-[#E1F3D6]" : "self-start rounded-bl-md bg-white",
    )}
  >
    {children}
  </div>
);

const Chips = ({ items, active }: { items: string[]; active?: string }) => (
  <div className="flex flex-wrap gap-1.5">
    {items.map((i) => (
      <span
        key={i}
        className={cn(
          "rounded-lg px-2.5 py-1.5 text-[11.5px] font-medium",
          i === active ? "bg-[var(--m-accent)] text-white" : "bg-white/90 text-[var(--m-accent)]",
        )}
      >
        {i}
      </span>
    ))}
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Order flow: channel post → bot → staff group                              */
/* -------------------------------------------------------------------------- */

export function StorefrontFlow() {
  return (
    <Stage title="From channel post to confirmed order" subtitle="Customer · Bot · Staff group">
      <Phone header="Selam Shoes" sub="channel · 12.4K subscribers" icon={<span className="text-[13px] font-bold">S</span>}>
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <ProductPhoto className="h-[190px]" />
          <div className="flex flex-col gap-1 p-3 text-[12px]">
            <div className="font-semibold">Leather loafers · የቆዳ ጫማ</div>
            <div className="text-[15px] font-bold">2,400 ብር</div>
            <div className="text-[var(--m-muted)]">Black · Brown</div>
            <div className="text-[var(--m-muted)]">Sizes 39 · 40 · 41 · 42 · 43</div>
            <div className="text-right text-[10px] text-[var(--m-muted)]">10:42 PM</div>
          </div>
          <div className="flex items-center justify-center gap-1.5 border-t border-[var(--m-border)] py-2.5 text-[12.5px] font-semibold text-[var(--m-accent)]">
            <ShoppingCart className="size-3.5" /> እዘዝ / Order
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <ProductPhoto className="h-[110px] grayscale-[0.4]" />
          <div className="flex items-center justify-between p-3 text-[12px]">
            <span className="font-semibold">Brown · 40</span>
            <span className="rounded-md bg-[#FBE4E2] px-2 py-0.5 text-[11px] font-bold text-[#C0352B]">ተሽጧል / SOLD OUT</span>
          </div>
        </div>
      </Phone>

      <Phone header="Selam Shoes bot" sub="bot · replies instantly" icon={<Bot className="size-4" />}>
        <Bubble>ሰላም! Welcome to Selam Shoes. Choose a colour for <b>Leather loafers</b>:</Bubble>
        <Chips items={["Black", "Brown"]} active="Black" />
        <Bubble>Which size? Only sizes in stock are shown.</Bubble>
        <Chips items={["39", "40", "41", "42"]} active="41" />
        <Bubble me>ጥቁር 41 ለቦሌ ማድረስ ይቻላል?</Bubble>
        <Bubble>
          Yes, delivery to Bole is available. Black · 41 is held for you for 5 minutes.
          <div className="mt-2 rounded-lg bg-[#EFEFF4] p-2 text-[11.5px]">
            <div className="flex justify-between"><span>Leather loafers · Black · 41</span><span>2,400</span></div>
            <div className="flex justify-between text-[var(--m-muted)]"><span>Delivery · Bole</span><span>paid on arrival</span></div>
          </div>
        </Bubble>
        <Chips items={["Telebirr", "CBE transfer"]} active="Telebirr" />
        <Bubble me>
          <span className="flex items-center gap-1.5"><ImageIcon className="size-3.5" /> payment_screenshot.jpg</span>
        </Bubble>
      </Phone>

      <Phone header="Selam Shoes · Staff" sub="group · 4 members" icon={<Users className="size-4" />} dark>
        <div className="rounded-2xl bg-[#34343C] p-3 text-[12px] text-white">
          <div className="flex items-center gap-1.5 font-semibold"><Package className="size-3.5" /> New order #1042</div>
          <div className="mt-2 flex flex-col gap-1 text-white/85">
            <span>Leather loafers · Black · 41 × 1</span>
            <span>Delivery · Bole · 2,400 ብር</span>
            <span>Hana T. · 09•• ••• 214</span>
          </div>
          <div className="mt-2 rounded-lg bg-[#2B7A3A]/30 px-2 py-1.5 text-[11.5px] text-[#B9E6C2]">Payment screenshot received — check Telebirr</div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[12px] font-semibold">
            <span className="flex items-center justify-center gap-1 rounded-lg bg-[#2B7A3A] py-2"><Check className="size-3.5" /> Confirm</span>
            <span className="flex items-center justify-center rounded-lg bg-white/10 py-2">Reject</span>
          </div>
        </div>
        <div className="rounded-2xl bg-[#34343C] p-3 text-[12px] text-white/85">
          <div className="font-semibold text-white">Order #1041 · confirmed by Dawit</div>
          <div className="mt-1">Leather bag · Tan × 1 · Pickup</div>
          <div className="mt-1 text-[11px] text-white/50">Stock updated · channel post updated</div>
        </div>
        <div className="rounded-2xl bg-[#34343C] p-3 text-[12px] text-white/85">
          <div className="flex items-center gap-1.5 font-semibold text-white"><Bot className="size-3.5" /> Bot needs a person</div>
          <div className="mt-1">A customer wants to bargain on “Suede boots”. Reply in the chat →</div>
        </div>
      </Phone>
    </Stage>
  );
}

/* -------------------------------------------------------------------------- */
/*  Owner: dashboard + stock by colour and size                               */
/* -------------------------------------------------------------------------- */

export function StorefrontOwner() {
  const sizes = ["39", "40", "41", "42", "43"];
  const stock: [string, number[]][] = [
    ["Black", [4, 6, 1, 3, 2]],
    ["Brown", [2, 0, 5, 2, 1]],
  ];
  return (
    <Stage title="The owner’s view" subtitle="Dashboard and stock, on the phone">
      <Phone header="Selam Shoes · Dashboard" sub="mini app · owner" icon={<BarChart3 className="size-4" />}>
        <div className="rounded-2xl bg-white p-3.5 shadow-sm">
          <div className="text-[11px] text-[var(--m-muted)]">Sales · this week</div>
          <div className="text-[22px] font-bold">38,600 ብር</div>
          <div className="mt-3 flex h-2.5 overflow-hidden rounded-full">
            <span className="w-[64%] bg-[var(--m-accent)]" />
            <span className="w-[36%] bg-[var(--m-accent2)]" />
          </div>
          <div className="mt-2 flex justify-between text-[11px]">
            <span className="flex items-center gap-1"><span className="size-2 rounded-sm bg-[var(--m-accent)]" />Telegram 64%</span>
            <span className="flex items-center gap-1"><span className="size-2 rounded-sm bg-[var(--m-accent2)]" />In shop 36%</span>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-3.5 shadow-sm">
          <div className="mb-2 text-[12px] font-semibold">Best sellers</div>
          {[
            ["Leather loafers", "14"],
            ["Leather bag", "9"],
            ["Canvas sneakers", "7"],
          ].map(([n, q]) => (
            <div key={n} className="flex justify-between border-b border-[var(--m-border)] py-1.5 text-[12px] last:border-0">
              <span>{n}</span><span className="font-semibold">{q} sold</span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-white p-3.5 shadow-sm">
          <div className="mb-2 text-[12px] font-semibold">Discounts by staff</div>
          {[
            ["Hana", "320 ብር"],
            ["Dawit", "150 ብር"],
          ].map(([n, q]) => (
            <div key={n} className="flex justify-between py-1 text-[12px]"><span>{n}</span><span>{q}</span></div>
          ))}
        </div>
        <div className="rounded-2xl bg-[#FDF0D5] p-3 text-[11.5px] text-[#8A5A00]">
          <b>Low stock:</b> Leather loafers · Black · 41 (1 left)
        </div>
      </Phone>

      <div className="flex w-[560px] flex-col gap-4">
        <div className="rounded-2xl border border-[var(--m-border)] bg-white p-5 shadow-[0_20px_50px_-30px_rgba(17,17,20,0.35)]">
          <div className="flex items-center gap-4">
            <ProductPhoto className="size-[76px] shrink-0 rounded-xl" label="Photo" />
            <div className="flex-1">
              <div className="text-[16px] font-semibold">Leather loafers</div>
              <div className="text-[12px] text-[var(--m-muted)]">2,400 ብር · by colour and size</div>
            </div>
            <span className="flex items-center gap-1.5 rounded-lg bg-[var(--m-accent)] px-3 py-2 text-[12px] font-semibold text-white">
              <Send className="size-3.5" /> Post to channel
            </span>
          </div>
          <table className="mt-4 w-full border-collapse text-center text-[12.5px] tabular-nums">
            <thead>
              <tr className="text-[11px] text-[var(--m-muted)]">
                <th className="py-2 text-left font-medium">Colour / size</th>
                {sizes.map((s) => <th key={s} className="py-2 font-medium">{s}</th>)}
              </tr>
            </thead>
            <tbody>
              {stock.map(([c, qs]) => (
                <tr key={c} className="border-t border-[var(--m-border)]">
                  <td className="py-2.5 text-left font-medium">{c}</td>
                  {qs.map((q, i) => (
                    <td key={i} className="py-2">
                      <span
                        className={cn(
                          "inline-grid h-8 w-11 place-items-center rounded-lg border",
                          q === 0 ? "border-[#F2C9C4] bg-[#FBE4E2] text-[#C0352B]" : q <= 1 ? "border-[#F2D9A8] bg-[#FDF0D5] text-[#8A5A00]" : "border-[var(--m-border)]",
                        )}
                      >
                        {q}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3 text-[11.5px] text-[var(--m-muted)]">0 = shown as SOLD OUT on the channel post automatically.</div>
        </div>

        <div className="rounded-2xl border border-[var(--m-border)] bg-white p-5">
          <div className="mb-3 text-[13px] font-semibold">Recent orders</div>
          {[
            ["#1042", "Hana T.", "Delivery · Bole", "Awaiting payment check", "warn"],
            ["#1041", "Bereket A.", "Pickup", "Confirmed", "ok"],
            ["Shop sale", "Walk-in · by Dawit", "In shop · −150 ብር discount", "Completed", "ok"],
          ].map(([n, c, d, s, tone]) => (
            <div key={n} className="flex items-center gap-3 border-b border-[var(--m-border)] py-2.5 text-[12px] last:border-0">
              <span className="w-[72px] font-semibold">{n}</span>
              <span className="flex-1">{c}<span className="ml-2 text-[var(--m-muted)]">{d}</span></span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                  tone === "ok" ? "bg-[#E3F1E6] text-[#2B7A3A]" : "bg-[#FDF0D5] text-[#8A5A00]",
                )}
              >
                {s}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-3 rounded-2xl bg-[#E2EEFA] p-4 text-[12px] leading-relaxed text-[#1A4E80]">
          <Bot className="mt-0.5 size-4 shrink-0" />
          <span>
            AI helps the bot understand customers’ own words in Amharic or English. <b>Prices, stock and payments always come from the shop.</b>
          </span>
        </div>
      </div>
    </Stage>
  );
}
