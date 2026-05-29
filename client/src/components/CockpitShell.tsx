import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Sliders,
  Boxes,
  ScrollText,
  Calculator,
  Handshake,
  FolderTree,
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { HiveLogo } from "./HiveLogo";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Configurator", icon: Sliders, code: "CFG", testId: "nav-configurator" },
  { href: "/portfolio", label: "Portfolio Hub", icon: Boxes, code: "POR", testId: "nav-portfolio" },
  { href: "/products", label: "Product Pages", icon: ScrollText, code: "PRD", testId: "nav-products" },
  { href: "/tco", label: "TCO & ROI Studio", icon: Calculator, code: "TCO", testId: "nav-tco" },
  { href: "/partners", label: "Partner Portal", icon: Handshake, code: "PTR", testId: "nav-partners" },
  { href: "/site-structure", label: "AI Hive Site Structure", icon: FolderTree, code: "SIT", testId: "nav-site" },
];

const roles = ["CRO", "Sales Leader", "Account Exec", "Sales Engineer", "Partner", "Product Ops", "Marketing"];

export function CockpitShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [role, setRole] = useState("CRO");
  const [open, setOpen] = useState(false);
  const active = nav.find((n) => n.href === location) ?? nav[0];

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-60 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        data-testid="sidebar"
      >
        <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4">
          <Link
            href="/"
            data-testid="link-home"
            className="flex items-center gap-2 text-sidebar-foreground"
          >
            <HiveLogo className="h-7 w-auto" />
          </Link>
          <button
            className="rounded p-1 hover-elevate lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-4 py-3">
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Cockpit modules
          </div>
        </div>

        <nav className="flex flex-col gap-0.5 px-2 pb-6">
          {nav.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-testid={item.testId}
                onClick={() => setOpen(false)}
                className={cn(
                  "group flex items-center gap-2.5 rounded-sm border border-transparent px-2 py-1.5 text-[13px] hover-elevate",
                  isActive &&
                    "border-sidebar-accent-border bg-sidebar-accent text-sidebar-accent-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isActive ? "text-hive-cyan" : "text-muted-foreground",
                  )}
                />
                <span className="flex-1 truncate">{item.label}</span>
                <span className="mono text-[9px] uppercase tracking-widest text-muted-foreground">
                  {item.code}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute inset-x-0 bottom-2 border-t border-sidebar-border bg-sidebar px-3 py-2 text-[11px] text-muted-foreground">
          <div className="flex items-center justify-between">
            <span className="mono">v0.9.3 · prototype</span>
            <span className="hive-chip border-sidebar-border text-hive-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-hive-cyan" /> live
            </span>
          </div>
          <div className="mt-1.5 leading-snug">
            EU-built. Liquid-cooled. <br />
            Yours, not the cloud&apos;s.
          </div>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main column */}
      <div className="lg:pl-60">
        {/* Top header */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur" data-testid="topbar">
          <button
            className="rounded p-1 hover-elevate lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>

          <div className="hidden items-center gap-2 md:flex">
            <span className="mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {active.code}
            </span>
            <span className="text-sm font-semibold">{active.label}</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-sm border border-border bg-card px-2.5 py-1.5 text-xs text-muted-foreground md:flex">
              <Search className="h-3.5 w-3.5" />
              <input
                data-testid="input-search"
                className="w-48 bg-transparent outline-none placeholder:text-muted-foreground"
                placeholder="Search account, SKU, partner…"
              />
              <kbd className="mono rounded border border-border px-1 text-[9px]">⌘K</kbd>
            </div>

            <div className="hidden items-center gap-1.5 rounded-sm border border-border bg-card px-2 py-1 lg:flex">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Role</span>
              <select
                data-testid="select-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-transparent text-xs font-medium outline-none"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </div>

            <button
              data-testid="button-notifications"
              className="relative rounded-sm border border-border bg-card p-1.5 hover-elevate"
              aria-label="Alerts"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-hive-cyan" />
            </button>

            <div className="flex items-center gap-2 rounded-sm border border-border bg-card px-2 py-1">
              <div className="grid h-6 w-6 place-items-center rounded-sm bg-hive-cyan/15 text-[10px] font-bold text-hive-cyan">
                MB
              </div>
              <div className="hidden text-left text-[11px] leading-tight md:block">
                <div className="font-medium">M. Bianchi</div>
                <div className="text-muted-foreground">{role} · IT</div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-5 lg:px-8 lg:py-7">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 border-b border-border pb-5 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && (
          <div className="mono text-[10px] uppercase tracking-[0.22em] text-hive-cyan">
            {eyebrow}
          </div>
        )}
        <h1 className="mt-1 text-xl font-semibold leading-tight tracking-tight">{title}</h1>
        {description && (
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
