import {
  Armchair,
  Camera,
  ChevronRight,
  Heart,
  Laptop,
  MapPin,
  Monitor,
  Printer,
  Projector,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sofa,
  Speaker,
  Star,
  Truck,
  WashingMachine,
  type LucideIcon,
} from "lucide-react";
import { AppWindow, Avatar, themes } from "./kit";
import { cn } from "@/lib/utils";

const t = themes.ethirent;

function TopNav() {
  return (
    <div className="flex h-16 items-center gap-6 border-b border-[var(--m-border)] bg-[var(--m-surface)] px-8">
      <span className="flex items-center gap-2 text-[16px] font-bold tracking-tight">
        <span className="grid size-7 place-items-center rounded-lg bg-[var(--m-accent)] text-[12px] text-white">E</span>
        ETHIRENT
      </span>
      <nav className="flex gap-5 text-[12.5px] text-[var(--m-muted)]">
        <span className="font-medium text-[var(--m-text)]">Browse</span>
        <span>Office</span>
        <span>Home</span>
        <span>Events</span>
        <span>How it works</span>
      </nav>
      <div className="ml-auto flex items-center gap-4 text-[12.5px]">
        <span className="text-[var(--m-muted)]">List your equipment</span>
        <Heart className="size-4 text-[var(--m-muted)]" />
        <Avatar initials="BT" size={30} />
      </div>
    </div>
  );
}

const tints = ["#E8EEFF", "#FFF3D9", "#E5F6EF", "#F3E8FF", "#FFE8E5", "#E6F4F7"];

function ItemArt({ icon: I, tint, className }: { icon: LucideIcon; tint: string; className?: string }) {
  return (
    <div className={cn("relative grid place-items-center overflow-hidden rounded-xl", className)} style={{ background: tint }}>
      <div className="absolute inset-x-6 bottom-5 h-3 rounded-full bg-black/[0.06] blur-sm" />
      <I className="relative size-[42%] text-[#2A2A33]" strokeWidth={1.1} />
    </div>
  );
}

interface Listing {
  name: string;
  icon: LucideIcon;
  price: string;
  per: string;
  area: string;
  rating: string;
  tag?: string;
}

const listings: Listing[] = [
  { name: "Epson Full-HD Projector", icon: Projector, price: "650", per: "day", area: "Bole", rating: "4.9", tag: "Popular" },
  { name: "Ergonomic Office Chair", icon: Armchair, price: "1,200", per: "month", area: "Kazanchis", rating: "4.8" },
  { name: "Business Laptop 14”", icon: Laptop, price: "900", per: "day", area: "Piassa", rating: "4.7" },
  { name: "Laser Printer & Scanner", icon: Printer, price: "2,400", per: "month", area: "CMC", rating: "4.8", tag: "Delivery" },
  { name: "3-Seater Fabric Sofa", icon: Sofa, price: "3,500", per: "month", area: "Sarbet", rating: "4.6" },
  { name: "PA Speaker Set", icon: Speaker, price: "1,800", per: "day", area: "Megenagna", rating: "4.9", tag: "Events" },
  { name: "27” 4K Monitor", icon: Monitor, price: "250", per: "day", area: "Bole", rating: "4.8" },
  { name: "Front-load Washer", icon: WashingMachine, price: "2,900", per: "month", area: "Ayat", rating: "4.5" },
];

function ListingCard({ l, i }: { l: Listing; i: number }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="relative">
        <ItemArt icon={l.icon} tint={tints[i % tints.length]!} className="h-[148px]" />
        {l.tag && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-white px-2 py-0.5 text-[10.5px] font-medium shadow-sm">{l.tag}</span>
        )}
        <span className="absolute right-2.5 top-2.5 grid size-7 place-items-center rounded-full bg-white/90">
          <Heart className="size-3.5" />
        </span>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-medium">{l.name}</span>
          <span className="flex items-center gap-1 text-[11.5px]">
            <Star className="size-3 fill-[var(--m-accent2)] text-[var(--m-accent2)]" />
            {l.rating}
          </span>
        </div>
        <div className="mt-0.5 flex items-center gap-1 text-[11.5px] text-[var(--m-muted)]">
          <MapPin className="size-3" /> {l.area}, Addis Ababa
        </div>
        <div className="mt-1.5 text-[13px]">
          <b className="font-semibold">{l.price} ETB</b>
          <span className="text-[var(--m-muted)]"> / {l.per}</span>
        </div>
      </div>
    </div>
  );
}

export function EthirentBrowse() {
  const cats: [string, LucideIcon][] = [
    ["Projectors", Projector],
    ["Furniture", Armchair],
    ["Computers", Laptop],
    ["Printers", Printer],
    ["Audio", Speaker],
    ["Cameras", Camera],
    ["Appliances", WashingMachine],
  ];
  return (
    <AppWindow theme={t} url="ethirent.app">
      <TopNav />
      <div className="px-8 pt-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[26px] font-semibold tracking-tight">Rent what you need, when you need it.</div>
            <div className="mt-1 text-[13px] text-[var(--m-muted)]">Office and home equipment from verified owners near you.</div>
          </div>
        </div>
        <div className="mt-5 flex h-14 items-center rounded-2xl border border-[var(--m-border)] bg-white pl-5 pr-2 shadow-[0_6px_24px_-12px_rgba(0,0,0,0.15)]">
          <div className="flex flex-1 items-center gap-2.5 text-[13px]">
            <Search className="size-4 text-[var(--m-muted)]" />
            <span>projector</span>
          </div>
          <div className="flex items-center gap-2 border-l border-[var(--m-border)] px-5 text-[12.5px]">
            <MapPin className="size-4 text-[var(--m-muted)]" /> Bole, Addis Ababa
          </div>
          <div className="border-l border-[var(--m-border)] px-5 text-[12.5px]">Oct 12 – Oct 14</div>
          <span className="flex h-10 items-center rounded-xl bg-[var(--m-accent)] px-5 text-[12.5px] font-semibold text-white">Search</span>
        </div>
        <div className="mt-5 flex items-center gap-2">
          {cats.map(([c, I], i) => (
            <span
              key={c}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3.5 py-2 text-[12px]",
                i === 0 ? "border-[var(--m-text)] bg-[var(--m-text)] text-white" : "border-[var(--m-border)] bg-white",
              )}
            >
              <I className="size-3.5" strokeWidth={1.8} /> {c}
            </span>
          ))}
          <span className="ml-auto flex items-center gap-2 rounded-full border border-[var(--m-border)] bg-white px-3.5 py-2 text-[12px]">
            <SlidersHorizontal className="size-3.5" /> Filters
          </span>
        </div>
        <div className="mt-5 flex items-center justify-between text-[12px] text-[var(--m-muted)]">
          <span>Equipment near Bole</span>
          <span>Sort: Recommended</span>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-5">
          {listings.map((l, i) => (
            <ListingCard key={l.name} l={l} i={i} />
          ))}
        </div>
      </div>
    </AppWindow>
  );
}

export function EthirentDetail() {
  const days = Array.from({ length: 35 }, (_, i) => i - 2);
  return (
    <AppWindow theme={t} url="ethirent.app / listing / projector">
      <TopNav />
      <div className="px-8 pt-5">
        <div className="flex items-center gap-1.5 text-[11.5px] text-[var(--m-muted)]">
          Browse <ChevronRight className="size-3" /> Projectors <ChevronRight className="size-3" />
          <span className="text-[var(--m-text)]">Epson Full-HD Projector</span>
        </div>
        <div className="mt-4 grid grid-cols-[1.25fr_1fr] gap-8">
          <div>
            <ItemArt icon={Projector} tint={tints[0]!} className="h-[330px]" />
            <div className="mt-3 grid grid-cols-4 gap-3">
              {[Projector, Speaker, Monitor, Laptop].map((I, i) => (
                <ItemArt key={i} icon={I} tint={tints[i]!} className={cn("h-[72px]", i === 0 && "ring-2 ring-[var(--m-accent)]")} />
              ))}
            </div>
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-[var(--m-border)] bg-white p-3.5">
              <Avatar initials="AT" size={36} tone={1} />
              <div className="flex-1">
                <div className="text-[12.5px] font-medium">Abel Tech Rentals</div>
                <div className="text-[11px] text-[var(--m-muted)]">Verified owner · Responds within 1 hour</div>
              </div>
              <span className="rounded-lg border border-[var(--m-border)] px-3 py-1.5 text-[12px]">Message</span>
            </div>
          </div>

          <div>
            <div className="text-[24px] font-semibold tracking-tight">Epson Full-HD Projector</div>
            <div className="mt-1 flex items-center gap-3 text-[12px] text-[var(--m-muted)]">
              <span className="flex items-center gap-1 text-[var(--m-text)]">
                <Star className="size-3.5 fill-[var(--m-accent2)] text-[var(--m-accent2)]" /> 4.9
              </span>
              42 rentals
              <span className="flex items-center gap-1"><MapPin className="size-3" /> Bole, Addis Ababa</span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                ["Daily", "650"],
                ["Weekly", "3,600"],
                ["Monthly", "11,500"],
              ].map(([k, v], i) => (
                <div
                  key={k}
                  className={cn(
                    "rounded-xl border p-3",
                    i === 0 ? "border-[var(--m-accent)] bg-[color-mix(in_srgb,var(--m-accent)_6%,white)]" : "border-[var(--m-border)] bg-white",
                  )}
                >
                  <div className="text-[11px] text-[var(--m-muted)]">{k}</div>
                  <div className="text-[15px] font-semibold">{v} ETB</div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-[var(--m-border)] bg-white p-4">
              <div className="mb-3 flex items-center justify-between text-[12.5px] font-medium">
                October
                <span className="text-[11px] font-normal text-[var(--m-muted)]">Select dates</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[11px]">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <span key={i} className="pb-1 text-[var(--m-muted)]">{d}</span>
                ))}
                {days.map((d) => {
                  const inRange = d >= 12 && d <= 14;
                  const booked = d === 6 || d === 7 || d === 20 || d === 21 || d === 22;
                  return (
                    <span
                      key={d}
                      className={cn(
                        "grid h-7 place-items-center rounded-md",
                        d < 1 || d > 31 ? "opacity-0" : "",
                        inRange && "bg-[var(--m-accent)] font-semibold text-white",
                        booked && "text-[var(--m-muted)] line-through opacity-60",
                      )}
                    >
                      {d}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-[var(--m-surface2)] p-4 text-[12.5px]">
              {[
                ["650 ETB × 3 days", "1,950 ETB"],
                ["Refundable deposit", "2,000 ETB"],
                ["Delivery to Bole", "150 ETB"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-1">
                  <span className="text-[var(--m-muted)]">{k}</span>
                  <span>{v}</span>
                </div>
              ))}
              <div className="mt-2 flex justify-between border-t border-[var(--m-border)] pt-2.5 font-semibold">
                <span>Total</span>
                <span>4,100 ETB</span>
              </div>
            </div>
            <span className="mt-4 flex h-11 items-center justify-center rounded-xl bg-[var(--m-accent)] text-[13px] font-semibold text-white">
              Request booking
            </span>
            <div className="mt-3 flex justify-center gap-5 text-[11px] text-[var(--m-muted)]">
              <span className="flex items-center gap-1"><ShieldCheck className="size-3.5" /> Verified owner</span>
              <span className="flex items-center gap-1"><Truck className="size-3.5" /> Delivery available</span>
            </div>
          </div>
        </div>
      </div>
    </AppWindow>
  );
}
