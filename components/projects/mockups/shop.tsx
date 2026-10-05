import { Heart, Mic, Search, Send, ShoppingBag, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { AppWindow, themes } from "./kit";
import { cn } from "@/lib/utils";

const t = themes.shop;

type GarmentKind = "tee" | "shirt" | "jacket" | "dress" | "trousers" | "knit" | "coat";

const shapes: Record<GarmentKind, string> = {
  tee: "M31 20 45 13q5 6 10 0l14 7 11 15-11 6v46H31V41l-11-6z",
  shirt: "M32 18 44 12l6 8 6-8 12 6 10 20-9 4-3-8v54H34V34l-3 8-9-4z",
  jacket: "M30 18 44 11l6 10 6-10 14 7 9 38-9 2-4-20v50H34V38l-4 20-9-2z",
  dress: "M41 11h18l2 18 17 59H22l17-59z",
  trousers: "M30 11h40l5 79H57L50 38l-7 52H25z",
  knit: "M30 20 44 13q6 5 12 0l14 7 12 32-10 4-7-18v50H35V38l-7 18-10-4z",
  coat: "M30 15 43 10l7 12 7-12 13 5 9 44-9 2-3-18v49H33V43l-3 18-9-2z",
};

function Garment({ kind, color, bg, className }: { kind: GarmentKind; color: string; bg: string; className?: string }) {
  return (
    <div className={cn("relative grid place-items-center overflow-hidden rounded-lg", className)} style={{ background: bg }}>
      <svg viewBox="0 0 100 100" className="h-[78%] w-[78%] drop-shadow-[0_10px_14px_rgba(0,0,0,0.12)]">
        <path d={shapes[kind]} fill={color} />
        {(kind === "shirt" || kind === "jacket" || kind === "coat") && (
          <path d="M50 22v66" stroke="rgba(0,0,0,0.18)" strokeWidth="0.8" />
        )}
      </svg>
    </div>
  );
}

interface Product {
  name: string;
  price: string;
  kind: GarmentKind;
  color: string;
  bg: string;
  pick?: boolean;
}

const products: Product[] = [
  { name: "Linen Overshirt", price: "2,450", kind: "shirt", color: "#C9B79C", bg: "#ECE6DC", pick: true },
  { name: "Tailored Wool Trousers", price: "2,900", kind: "trousers", color: "#2E3440", bg: "#E4E4E6", pick: true },
  { name: "Merino Knit Polo", price: "1,850", kind: "knit", color: "#5C6B4E", bg: "#E5E8DF" },
  { name: "Unstructured Blazer", price: "4,600", kind: "jacket", color: "#3C4A63", bg: "#E1E5EC" },
  { name: "Cotton Crew Tee", price: "780", kind: "tee", color: "#EFEDE8", bg: "#DEDBD4", pick: true },
  { name: "Midi Wrap Dress", price: "3,200", kind: "dress", color: "#9E4A3A", bg: "#F0E2DD" },
];

function StoreNav() {
  return (
    <div className="flex h-14 items-center gap-8 border-b border-[var(--m-border)] bg-[var(--m-surface)] px-7">
      <span className="font-serif text-[18px] font-semibold tracking-[0.2em]">MERIDIAN</span>
      <nav className="flex gap-5 text-[12px] text-[var(--m-muted)]">
        <span className="font-medium text-[var(--m-text)]">Men</span>
        <span>Women</span>
        <span>New in</span>
        <span>Occasion</span>
      </nav>
      <div className="ml-auto flex items-center gap-4">
        <div className="flex h-8 w-56 items-center gap-2 rounded-full bg-[var(--m-surface2)] px-3 text-[11.5px] text-[var(--m-muted)]">
          <Search className="size-3.5" /> Search
        </div>
        <Heart className="size-4" />
        <span className="relative">
          <ShoppingBag className="size-4" />
          <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-[var(--m-accent2)] text-[9px] font-semibold text-white">2</span>
        </span>
      </div>
    </div>
  );
}

function AssistantHeader() {
  return (
    <div className="flex items-center gap-2.5 border-b border-[var(--m-border)] px-4 py-3">
      <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-[var(--m-accent2)] to-[#9A7CF7] text-white">
        <Sparkles className="size-4" />
      </span>
      <div className="leading-tight">
        <div className="text-[12.5px] font-semibold">Style assistant</div>
        <div className="text-[10.5px] text-[var(--m-muted)]">Knows the catalogue, your size & stock</div>
      </div>
      <X className="ml-auto size-4 text-[var(--m-muted)]" />
    </div>
  );
}

export function ShopAssistant() {
  return (
    <AppWindow theme={t} url="meridian.store / men / smart-casual">
      <StoreNav />
      <div className="flex h-[calc(100%-56px)]">
        {/* Filters */}
        <aside className="w-[178px] shrink-0 border-r border-[var(--m-border)] px-5 py-5 text-[12px]">
          <div className="mb-4 flex items-center gap-2 font-medium">
            <SlidersHorizontal className="size-3.5" /> Filters
          </div>
          {[
            ["Category", ["Shirts", "Trousers", "Knitwear", "Blazers"]],
            ["Size", ["S", "M", "L", "XL"]],
            ["Occasion", ["Work", "Dinner", "Weekend"]],
          ].map(([h, opts]) => (
            <div key={h as string} className="mb-5">
              <div className="mb-2 text-[10.5px] uppercase tracking-wider text-[var(--m-muted)]">{h as string}</div>
              <div className="flex flex-col gap-1.5">
                {(opts as string[]).map((o) => {
                  const on = ["M", "Dinner", "Shirts", "Trousers"].includes(o);
                  return (
                    <span key={o} className="flex items-center gap-2">
                      <span className={cn("size-3.5 rounded border", on ? "border-[var(--m-accent2)] bg-[var(--m-accent2)]" : "border-[var(--m-border)] bg-white")} />
                      {o}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="mb-2 text-[10.5px] uppercase tracking-wider text-[var(--m-muted)]">Price</div>
          <div className="relative h-1 rounded bg-[var(--m-surface2)]">
            <div className="absolute left-0 right-[35%] h-full rounded bg-[var(--m-accent2)]" />
          </div>
          <div className="mt-1.5 flex justify-between text-[10.5px] text-[var(--m-muted)]">
            <span>0</span>
            <span>6,000 ETB</span>
          </div>
        </aside>

        {/* Catalogue */}
        <div className="min-w-0 flex-1 px-6 py-5">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[22px] font-semibold tracking-tight">Smart casual</div>
              <div className="mt-1 text-[11.5px] text-[var(--m-muted)]">24 products · sorted by assistant relevance</div>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["Dinner", "Size M", "Under 6,000 ETB", "Neutral tones"].map((c) => (
              <span key={c} className="flex items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--m-accent2)_12%,white)] px-2.5 py-1 text-[11px] font-medium text-[var(--m-accent2)]">
                <Sparkles className="size-3" /> {c}
              </span>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.name}>
                <div className="relative">
                  <Garment kind={p.kind} color={p.color} bg={p.bg} className={cn("h-[172px]", p.pick && "ring-2 ring-[var(--m-accent2)] ring-offset-2 ring-offset-[var(--m-bg)]")} />
                  {p.pick && (
                    <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-[var(--m-accent2)] shadow-sm">
                      <Sparkles className="size-3" /> In your look
                    </span>
                  )}
                </div>
                <div className="mt-2 flex justify-between text-[12px]">
                  <span className="font-medium">{p.name}</span>
                  <span>{p.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integrated assistant */}
        <aside className="flex w-[340px] shrink-0 flex-col border-l border-[var(--m-border)] bg-[var(--m-surface)]">
          <AssistantHeader />
          <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 py-4 text-[12px] leading-relaxed">
            <div className="ml-8 rounded-2xl rounded-tr-sm bg-[var(--m-text)] px-3.5 py-2.5 text-white">
              I have a work dinner on Friday. Smart but not too formal, under 6,000 birr.
            </div>
            <div className="mr-4 rounded-2xl rounded-tl-sm bg-[var(--m-surface2)] px-3.5 py-2.5">
              I’ve filtered to <b>smart casual in size M</b> and built a look from items in stock:
            </div>
            <div className="mr-4 rounded-2xl border border-[var(--m-border)] bg-white p-3">
              <div className="grid grid-cols-3 gap-2">
                {[products[0]!, products[4]!, products[1]!].map((p) => (
                  <Garment key={p.name} kind={p.kind} color={p.color} bg={p.bg} className="h-[70px]" />
                ))}
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[11.5px]">
                <span className="text-[var(--m-muted)]">3 items · fits budget</span>
                <b>6,130 → 5,520 ETB</b>
              </div>
              <div className="mt-1 text-[10.5px] text-[var(--m-muted)]">Bundle offer applied on the trousers.</div>
              <span className="mt-2.5 flex h-8 items-center justify-center rounded-lg bg-[var(--m-text)] text-[11.5px] font-medium text-white">
                Add look to bag
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Show warmer options", "Swap the shirt", "Add shoes"].map((s) => (
                <span key={s} className="rounded-full border border-[var(--m-border)] bg-white px-2.5 py-1 text-[11px]">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="m-3 flex h-10 items-center gap-2 rounded-xl border border-[var(--m-border)] bg-white px-3 text-[11.5px] text-[var(--m-muted)]">
            Ask about fit, occasion, or style…
            <Mic className="ml-auto size-3.5" />
            <span className="grid size-6 place-items-center rounded-lg bg-[var(--m-accent2)] text-white">
              <Send className="size-3" />
            </span>
          </div>
        </aside>
      </div>
    </AppWindow>
  );
}

export function ShopProduct() {
  return (
    <AppWindow theme={t} url="meridian.store / product / linen-overshirt">
      <StoreNav />
      <div className="flex h-[calc(100%-56px)]">
        <div className="grid min-w-0 flex-1 grid-cols-[1.1fr_1fr] gap-7 px-7 py-6">
          <div className="grid grid-cols-[64px_1fr] gap-3">
            <div className="flex flex-col gap-3">
              {["#ECE6DC", "#E4DED2", "#EFE9E0", "#E7E1D6"].map((b, i) => (
                <Garment key={b} kind="shirt" color={i === 3 ? "#8E7F69" : "#C9B79C"} bg={b} className={cn("h-[76px]", i === 0 && "ring-2 ring-[var(--m-text)]")} />
              ))}
            </div>
            <Garment kind="shirt" color="#C9B79C" bg="#ECE6DC" className="h-full min-h-[480px]" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--m-muted)]">Meridian Essentials</div>
            <div className="mt-2 text-[26px] font-semibold tracking-tight">Linen Overshirt</div>
            <div className="mt-1 text-[16px]">2,450 ETB</div>
            <p className="mt-4 text-[12.5px] leading-relaxed text-[var(--m-muted)]">
              A relaxed overshirt in breathable linen. Wear it open over a tee or buttoned with tailored trousers.
            </p>
            <div className="mt-5 text-[11.5px] font-medium">Colour · Sand</div>
            <div className="mt-2 flex gap-2">
              {["#C9B79C", "#8E7F69", "#2E3440", "#F1EEE8"].map((c, i) => (
                <span key={c} className={cn("size-7 rounded-full border border-black/10", i === 0 && "ring-2 ring-[var(--m-text)] ring-offset-2")} style={{ background: c }} />
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between text-[11.5px] font-medium">
              Size <span className="font-normal text-[var(--m-muted)] underline">Size guide</span>
            </div>
            <div className="mt-2 grid grid-cols-5 gap-2">
              {["XS", "S", "M", "L", "XL"].map((s) => (
                <span
                  key={s}
                  className={cn(
                    "grid h-10 place-items-center rounded-lg border text-[12px]",
                    s === "M" ? "border-[var(--m-text)] bg-[var(--m-text)] text-white" : "border-[var(--m-border)] bg-white",
                    s === "XS" && "text-[var(--m-muted)] line-through",
                  )}
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-start gap-2 rounded-xl bg-[color-mix(in_srgb,var(--m-accent2)_10%,white)] p-3 text-[11.5px] leading-relaxed">
              <Sparkles className="mt-0.5 size-3.5 shrink-0 text-[var(--m-accent2)]" />
              <span>
                <b>M is your best fit.</b> It runs relaxed — you kept size M in your last two shirt orders.
              </span>
            </div>
            <span className="mt-5 flex h-11 items-center justify-center rounded-xl bg-[var(--m-text)] text-[13px] font-semibold text-white">
              Add to bag
            </span>
            <div className="mt-6 text-[11.5px] font-medium">Pairs well with</div>
            <div className="mt-2 grid grid-cols-3 gap-3">
              {[products[1]!, products[4]!, products[2]!].map((p) => (
                <div key={p.name}>
                  <Garment kind={p.kind} color={p.color} bg={p.bg} className="h-[86px]" />
                  <div className="mt-1.5 truncate text-[11px]">{p.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cart drawer */}
        <aside className="flex w-[300px] shrink-0 flex-col border-l border-[var(--m-border)] bg-[var(--m-surface)] px-5 py-5">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-semibold">Your bag (2)</span>
            <X className="size-4 text-[var(--m-muted)]" />
          </div>
          <div className="mt-4 flex flex-col gap-4">
            {[products[0]!, products[4]!].map((p) => (
              <div key={p.name} className="flex gap-3">
                <Garment kind={p.kind} color={p.color} bg={p.bg} className="size-[68px] shrink-0" />
                <div className="flex-1 text-[12px]">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-[11px] text-[var(--m-muted)]">Size M · Qty 1</div>
                  <div className="mt-1">{p.price} ETB</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-[var(--m-border)] p-3 text-[11.5px] leading-relaxed">
            <div className="mb-1.5 flex items-center gap-1.5 font-medium text-[var(--m-accent2)]">
              <Sparkles className="size-3.5" /> Assistant
            </div>
            Add the <b>Tailored Wool Trousers</b> to complete Friday’s look — bundle price brings the total to 5,520 ETB.
            <span className="mt-2.5 flex h-8 items-center justify-center rounded-lg border border-[var(--m-border)] bg-white text-[11.5px] font-medium">
              Add trousers · M
            </span>
          </div>
          <div className="mt-auto border-t border-[var(--m-border)] pt-4 text-[12.5px]">
            <div className="flex justify-between"><span className="text-[var(--m-muted)]">Subtotal</span><span>3,230 ETB</span></div>
            <div className="mt-1 flex justify-between"><span className="text-[var(--m-muted)]">Delivery</span><span>Free</span></div>
            <span className="mt-4 flex h-11 items-center justify-center rounded-xl bg-[var(--m-text)] text-[13px] font-semibold text-white">Checkout</span>
          </div>
        </aside>
      </div>
    </AppWindow>
  );
}
