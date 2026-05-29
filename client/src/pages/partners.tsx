import { useState } from "react";
import { PageHeader } from "@/components/CockpitShell";
import { Panel, StatusChip, CtaButton, Divider } from "@/components/primitives";
import { partners } from "@/data/hive";
import {
  Award,
  ArrowRight,
  CheckCircle2,
  FileText,
  Handshake,
  Lock,
} from "lucide-react";

const tierMatrix = [
  {
    tier: "Authorized",
    permissions: ["50X T1–T2 referral", "Discovery + handover"],
    discount: "Referral fee",
    requirements: "Active reseller agreement",
  },
  {
    tier: "Certified",
    permissions: ["50X / PRO T1–T4 sell", "Guided quote", "ProCare attach"],
    discount: "Class C",
    requirements: "≥1 certified technician, 2 reference deals",
  },
  {
    tier: "Advanced",
    permissions: [
      "50X / PRO up to R8",
      "DataCenterCare attach",
      "Build authority",
    ],
    discount: "Class B",
    requirements: "≥3 technicians, completed cooling certification, €500k YTD",
  },
  {
    tier: "Elite",
    permissions: ["H2 quote authority", "MissionCare attach", "POC lead"],
    discount: "Class A",
    requirements: "≥5 technicians, EK + LM Tek joint validation, €1.5M YTD",
  },
];

const assetLibrary = [
  { name: "AI Hive overview one-pager", type: "PDF", tier: "Authorized" },
  { name: "PRO line one-pager", type: "PDF", tier: "Certified" },
  { name: "H200 enterprise one-pager", type: "PDF", tier: "Elite" },
  { name: "Lambda migration playbook", type: "DOCX", tier: "Certified" },
  { name: "Comino battlecard (Q1 FY26)", type: "PDF", tier: "Certified" },
  { name: "Cloud bill review template", type: "XLSX", tier: "Certified" },
  { name: "TCO worksheet", type: "XLSX", tier: "Authorized" },
  { name: "Facility checklist — rack & power", type: "PDF", tier: "Advanced" },
  { name: "MissionCare statement of work", type: "DOCX", tier: "Elite" },
  { name: "EK Fluid Works cooling validation", type: "PDF", tier: "Advanced" },
];

const registrations = [
  {
    id: "REG-1019",
    partner: "Synthesis SI",
    account: "Banca Popolare Toscana",
    value: 412000,
    line: "H2",
    status: "Approved",
    until: "2026-05-14",
  },
  {
    id: "REG-1024",
    partner: "Boston AI Hive",
    account: "Hibernia Bank",
    value: 305000,
    line: "H2",
    status: "Approved",
    until: "2026-05-20",
  },
  {
    id: "REG-1031",
    partner: "FjordIT",
    account: "Norsk Skyfabrikk MSP",
    value: 285000,
    line: "PRO",
    status: "Approved",
    until: "2026-07-22",
  },
  {
    id: "REG-1037",
    partner: "Iberian Compute",
    account: "ClinicaRete Pharma",
    value: 220000,
    line: "PRO",
    status: "Pending",
    until: "—",
  },
  {
    id: "REG-1039",
    partner: "Helvetia GPU Lab",
    account: "ETH Zurich Imaging",
    value: 145000,
    line: "PRO",
    status: "Info requested",
    until: "—",
  },
];

export default function PartnerPortal() {
  const [tab, setTab] = useState<"directory" | "register" | "assets">(
    "directory",
  );

  return (
    <>
      <PageHeader
        eyebrow="PTR · Partner portal"
        title="Channel-led growth with quality control"
        description="Tier, certification, deal registration, and asset gating. Every partner action respects the same configurator rules and quote policy."
        actions={
          <>
            <StatusChip tone="cyan">11 active SIs</StatusChip>
            <CtaButton variant="outline" testId="button-partner-onboard">
              Onboard new partner
            </CtaButton>
          </>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {(
          [
            ["directory", "Partner directory"],
            ["register", "Deal registration"],
            ["assets", "Asset library"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            data-testid={`tab-partner-${id}`}
            onClick={() => setTab(id)}
            className={`rounded-sm border px-3 py-1.5 text-[12px] hover-elevate ${
              tab === id
                ? "border-hive-cyan/60 bg-hive-cyan/10 text-hive-cyan"
                : "border-border bg-card"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "directory" && <Directory />}
      {tab === "register" && <Registration />}
      {tab === "assets" && <Assets />}
    </>
  );
}

function Directory() {
  return (
    <>
      <Panel title="Partner roster" testId="panel-partner-directory">
        <div className="overflow-x-auto">
          <table className="w-full text-[12.5px]">
            <thead className="border-b border-border bg-muted/30 text-left">
              <tr className="text-[10px] uppercase tracking-widest text-muted-foreground">
                <th className="px-3 py-2 font-medium">Partner</th>
                <th className="px-3 py-2 font-medium">Tier</th>
                <th className="px-3 py-2 font-medium">Region</th>
                <th className="px-3 py-2 font-medium">Certified techs</th>
                <th className="px-3 py-2 text-right font-medium">YTD pipeline</th>
                <th className="px-3 py-2 text-right font-medium">YTD bookings</th>
                <th className="px-3 py-2 font-medium">Permissions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {partners.map((p) => (
                <tr key={p.name} data-testid={`partner-row-${p.name}`}>
                  <td className="px-3 py-2 font-medium">{p.name}</td>
                  <td className="px-3 py-2">
                    <TierBadge tier={p.tier} />
                  </td>
                  <td className="px-3 py-2">{p.region}</td>
                  <td className="px-3 py-2 mono">{p.certifiedTechs}</td>
                  <td className="px-3 py-2 mono text-right">
                    €{(p.ytdPipeline / 1000).toFixed(0)}k
                  </td>
                  <td className="px-3 py-2 mono text-right">
                    €{(p.ytdBookings / 1000).toFixed(0)}k
                  </td>
                  <td className="px-3 py-2 text-[11.5px] text-foreground/80">
                    {p.permissions.join(" · ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Tier permissions matrix" className="mt-4" testId="panel-tier-matrix">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {tierMatrix.map((t) => (
            <div
              key={t.tier}
              className="rounded-sm border border-border bg-card p-3"
              data-testid={`tier-card-${t.tier}`}
            >
              <div className="mb-2 flex items-center justify-between">
                <TierBadge tier={t.tier as any} />
                <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {t.discount}
                </span>
              </div>
              <ul className="space-y-1 text-[12px]">
                {t.permissions.map((p) => (
                  <li key={p} className="flex items-start gap-1.5">
                    <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-hive-cyan" />
                    {p}
                  </li>
                ))}
              </ul>
              <Divider />
              <div className="text-[11px] text-muted-foreground">
                <span className="mono uppercase tracking-widest">Requires</span>{" "}
                — {t.requirements}
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

function Registration() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_360px]">
      <Panel title="Registered deals" testId="panel-registrations">
        <div className="overflow-x-auto">
          <table className="w-full text-[12.5px]">
            <thead className="border-b border-border bg-muted/30 text-left">
              <tr className="text-[10px] uppercase tracking-widest text-muted-foreground">
                <th className="px-3 py-2 font-medium">Reg ID</th>
                <th className="px-3 py-2 font-medium">Partner</th>
                <th className="px-3 py-2 font-medium">Account</th>
                <th className="px-3 py-2 font-medium">Line</th>
                <th className="px-3 py-2 text-right font-medium">Value</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium">Protected until</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {registrations.map((r) => (
                <tr key={r.id} data-testid={`reg-row-${r.id}`}>
                  <td className="px-3 py-2 mono">{r.id}</td>
                  <td className="px-3 py-2 font-medium">{r.partner}</td>
                  <td className="px-3 py-2">{r.account}</td>
                  <td className="px-3 py-2">{r.line}</td>
                  <td className="px-3 py-2 mono text-right">
                    €{(r.value / 1000).toFixed(0)}k
                  </td>
                  <td className="px-3 py-2">
                    <StatusChip
                      tone={
                        r.status === "Approved"
                          ? "ok"
                          : r.status === "Pending"
                            ? "warn"
                            : "neutral"
                      }
                    >
                      {r.status}
                    </StatusChip>
                  </td>
                  <td className="px-3 py-2 mono text-muted-foreground">
                    {r.until}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* Submit deal mock */}
      <Panel title="Submit a deal" meta="mockup" testId="panel-reg-form">
        <form
          className="space-y-3 text-[12.5px]"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Field label="End customer">
            <input
              data-testid="input-reg-customer"
              className="mt-1 w-full rounded-sm border border-border bg-card px-2 py-1.5 text-[12.5px] outline-none focus:border-hive-cyan/60"
              defaultValue="ClinicaRete Pharma"
            />
          </Field>
          <Field label="Use case">
            <textarea
              data-testid="input-reg-usecase"
              rows={2}
              className="mt-1 w-full rounded-sm border border-border bg-card px-2 py-1.5 text-[12.5px] outline-none focus:border-hive-cyan/60"
              defaultValue="GxP imaging inference, GDPR + data residency"
            />
          </Field>
          <Field label="Requested line">
            <select
              data-testid="select-reg-line"
              className="mt-1 w-full rounded-sm border border-border bg-card px-2 py-1.5 text-[12.5px] outline-none"
              defaultValue="PRO"
            >
              <option>50X</option>
              <option>PRO</option>
              <option>H2</option>
            </select>
          </Field>
          <Field label="Estimated value (€k)">
            <input
              data-testid="input-reg-value"
              type="number"
              className="mt-1 w-full rounded-sm border border-border bg-card px-2 py-1.5 text-[12.5px] outline-none focus:border-hive-cyan/60"
              defaultValue={220}
            />
          </Field>
          <Field label="Timeline">
            <select
              data-testid="select-reg-timeline"
              className="mt-1 w-full rounded-sm border border-border bg-card px-2 py-1.5 text-[12.5px] outline-none"
            >
              <option>This quarter</option>
              <option>Next quarter</option>
              <option>6–9 months</option>
            </select>
          </Field>
          <div className="rounded-sm border border-dashed border-border bg-muted/30 p-2 text-[11.5px] text-muted-foreground">
            Channel manager response SLA: 3 business days. Approved deals
            create a protection window matching tier rules.
          </div>
          <CtaButton variant="primary" testId="button-reg-submit" type="submit">
            <Handshake className="h-3 w-3" /> Submit registration
          </CtaButton>
        </form>
      </Panel>
    </div>
  );
}

function Assets() {
  return (
    <Panel title="Partner asset library" testId="panel-partner-assets">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
        {assetLibrary.map((a) => (
          <div
            key={a.name}
            className="flex items-start gap-2.5 rounded-sm border border-border bg-card p-2.5"
            data-testid={`asset-${a.name}`}
          >
            <FileText className="mt-0.5 h-4 w-4 text-hive-cyan shrink-0" />
            <div className="flex-1">
              <div className="text-[12.5px] font-medium">{a.name}</div>
              <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="mono uppercase tracking-widest">{a.type}</span>
                <span>·</span>
                <Lock className="h-3 w-3" /> requires{" "}
                <TierBadge tier={a.tier as any} small />
              </div>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        ))}
      </div>
    </Panel>
  );
}

function Field({ label, children }: { label: string; children: any }) {
  return (
    <div>
      <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      {children}
    </div>
  );
}

function TierBadge({
  tier,
  small = false,
}: {
  tier: "Authorized" | "Certified" | "Advanced" | "Elite";
  small?: boolean;
}) {
  const tone =
    tier === "Elite"
      ? "cyan"
      : tier === "Advanced"
        ? "ok"
        : tier === "Certified"
          ? "neutral"
          : "neutral";
  return (
    <StatusChip tone={tone as any}>
      <Award className={small ? "h-2.5 w-2.5" : "h-3 w-3"} /> {tier}
    </StatusChip>
  );
}
