import { useMemo, useState } from "react";
import { PageHeader } from "@/components/CockpitShell";
import { Panel, StatusChip, CtaButton, Divider } from "@/components/primitives";
import { Cloud, Server, GitMerge, Info, ArrowRight } from "lucide-react";

export default function TcoStudio() {
  const [monthlyCloud, setMonthlyCloud] = useState(18000); // €
  const [utilization, setUtilization] = useState(45);
  const [years, setYears] = useState(3);
  const [egressPct, setEgressPct] = useState(12);
  const [compliance, setCompliance] = useState<"none" | "internal" | "regulated">(
    "regulated",
  );

  const result = useMemo(() => {
    // simple but defensible sample model
    const cloud3y = monthlyCloud * 12 * years;
    const utilFactor = Math.min(1, utilization / 100);
    // capex ~ a fraction of equivalent cloud spend; less efficient at low util
    const capex = Math.max(60000, monthlyCloud * 12 * 1.6);
    const energy = capex * 0.03 * years;
    const care = capex * 0.05 * years;
    const local3y = capex + energy + care;
    const hybridLocal =
      monthlyCloud * 12 * Math.max(0.2, utilFactor) * years * 0.55 + capex * 0.6;
    const breakeven = Math.round(
      (capex / (monthlyCloud * 12 * Math.max(0.1, utilFactor))) * 12,
    );
    const winner =
      utilization >= 30
        ? local3y < cloud3y
          ? "local"
          : "hybrid"
        : "cloud-or-hybrid";

    return {
      cloud3y,
      local3y,
      hybridLocal,
      breakeven,
      winner,
      compliance,
    };
  }, [monthlyCloud, utilization, years, egressPct, compliance]);

  return (
    <>
      <PageHeader
        eyebrow="TCO · Cloud vs Local studio"
        title="Honest model: own what should not live in the cloud"
        description="Embedded in cockpit and public site. Above ~30% utilisation lead with ownership. Below, lead with cloud or hybrid and use the honesty to build trust."
        actions={<StatusChip tone="cyan">Sample model · 3-year horizon</StatusChip>}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1.2fr]">
        {/* Inputs */}
        <Panel title="Inputs" testId="panel-tco-inputs">
          <div className="space-y-5">
            <NumberField
              label="Monthly cloud GPU spend"
              hint="Combined compute, storage, support and reserved discounts."
              unit="€ / month"
              value={monthlyCloud}
              min={0}
              max={200000}
              step={500}
              onChange={setMonthlyCloud}
              testId="input-monthly-cloud"
            />

            <SliderField
              label="GPU utilisation"
              hint="Critical break-even driver. Above ~30%, ownership becomes attractive."
              unit="%"
              value={utilization}
              onChange={setUtilization}
              min={5}
              max={95}
              step={1}
              testId="input-utilization"
            />

            <SliderField
              label="Egress / data movement"
              hint="Share of cloud bill spent on data egress."
              unit="%"
              value={egressPct}
              onChange={setEgressPct}
              min={0}
              max={40}
              step={1}
              testId="input-egress"
            />

            <div>
              <div className="mono mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                Compliance driver
              </div>
              <div className="flex flex-wrap gap-1.5" data-testid="input-compliance">
                {(["none", "internal", "regulated"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCompliance(c)}
                    className={`rounded-sm border px-2.5 py-1 text-[12px] hover-elevate ${
                      compliance === c
                        ? "border-hive-cyan/60 bg-hive-cyan/10 text-hive-cyan"
                        : "border-border"
                    }`}
                  >
                    {c === "none"
                      ? "None"
                      : c === "internal"
                        ? "Internal audit"
                        : "Regulated (DORA / GxP / NIS2)"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mono mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                Horizon
              </div>
              <div className="flex gap-1.5">
                {[3, 4, 5].map((y) => (
                  <button
                    key={y}
                    data-testid={`input-years-${y}`}
                    onClick={() => setYears(y)}
                    className={`rounded-sm border px-2.5 py-1 text-[12px] hover-elevate ${
                      years === y
                        ? "border-hive-cyan/60 bg-hive-cyan/10 text-hive-cyan"
                        : "border-border"
                    }`}
                  >
                    {y} years
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Panel>

        {/* Outputs */}
        <Panel title="Result" testId="panel-tco-result">
          {/* Verdict */}
          <div
            className={`mb-4 rounded-sm border p-4 ${
              result.winner === "local"
                ? "border-status-ok/40 bg-status-ok/10"
                : result.winner === "hybrid"
                  ? "border-hive-cyan/40 bg-hive-cyan/10"
                  : "border-status-warn/40 bg-status-warn/10"
            }`}
          >
            <div className="mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Recommendation
            </div>
            <div className="mt-1 flex items-center gap-2 text-base font-semibold">
              {result.winner === "local" && (
                <>
                  <Server className="h-4 w-4 text-status-ok" /> Own capacity —
                  lead with TCO + sovereignty
                </>
              )}
              {result.winner === "hybrid" && (
                <>
                  <GitMerge className="h-4 w-4 text-hive-cyan" /> Hybrid —
                  local for steady-state, cloud for burst
                </>
              )}
              {result.winner === "cloud-or-hybrid" && (
                <>
                  <Cloud className="h-4 w-4 text-status-warn" /> Stay cloud
                  or hybrid — utilisation too low for ownership case
                </>
              )}
            </div>
            <div className="mt-1.5 text-[12.5px] text-foreground/85">
              Break-even at this utilisation arrives in approximately{" "}
              <span className="mono font-semibold">{result.breakeven}</span>{" "}
              months. Compliance driver:{" "}
              <span className="font-semibold">{result.compliance}</span>.
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <ScenarioCard
              icon={<Cloud className="h-4 w-4" />}
              tone="warn"
              title="Stay in cloud"
              total={result.cloud3y}
              years={years}
              caption="Public cloud GPU + storage + egress + support"
              testId="scenario-cloud"
            />
            <ScenarioCard
              icon={<Server className="h-4 w-4" />}
              tone="ok"
              title="Own with AI Hive"
              total={result.local3y}
              years={years}
              caption="Capex + energy + DataCenterCare. PRO / H2 path."
              testId="scenario-local"
            />
            <ScenarioCard
              icon={<GitMerge className="h-4 w-4" />}
              tone="cyan"
              title="Hybrid"
              total={result.hybridLocal}
              years={years}
              caption="Local steady-state + cloud burst for peaks."
              testId="scenario-hybrid"
            />
          </div>

          <Divider label="What this tells sales" />
          <ul className="space-y-1.5 text-[12.5px]">
            <li className="flex items-start gap-2">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-hive-cyan" />
              At {utilization}% utilisation and €
              {monthlyCloud.toLocaleString()}/month, the ownership case{" "}
              {result.winner === "local"
                ? "is strong — push to configurator and quote."
                : "is borderline — route to hybrid or nurture."}
            </li>
            <li className="flex items-start gap-2">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-hive-cyan" />
              Egress at {egressPct}% of the cloud bill —{" "}
              {egressPct >= 10
                ? "use this as a residency + cost wedge against cloud."
                : "small lever; lead with compliance instead."}
            </li>
            <li className="flex items-start gap-2">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-hive-cyan" />
              Compliance =&nbsp;
              {compliance === "regulated"
                ? "regulated → lead with DORA / GxP / data residency narrative."
                : "general → lead with workload economics and KVARK enablement."}
            </li>
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            <a href="#/configurator">
              <CtaButton variant="primary" testId="button-tco-to-config">
                Open configurator <ArrowRight className="h-3 w-3" />
              </CtaButton>
            </a>
            <a href="#/partners">
              <CtaButton variant="outline" testId="button-tco-to-partners">
                Route to partner portal
              </CtaButton>
            </a>
          </div>
        </Panel>
      </div>
    </>
  );
}

function NumberField({
  label,
  hint,
  unit,
  value,
  onChange,
  min,
  max,
  step,
  testId,
}: {
  label: string;
  hint?: string;
  unit?: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  testId: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
        <div className="mono text-[12px] font-semibold">
          €{value.toLocaleString()}
          {unit && <span className="text-muted-foreground"> {unit.replace("€ /", "/")}</span>}
        </div>
      </div>
      {hint && (
        <p className="mb-1.5 text-[11.5px] text-muted-foreground">{hint}</p>
      )}
      <input
        data-testid={testId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="hive-range w-full accent-[hsl(var(--hive-cyan))]"
      />
    </div>
  );
}

function SliderField({
  label,
  hint,
  unit,
  value,
  onChange,
  min,
  max,
  step,
  testId,
}: {
  label: string;
  hint?: string;
  unit?: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  testId: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
        <div className="mono text-[12px] font-semibold">
          {value}
          {unit}
        </div>
      </div>
      {hint && (
        <p className="mb-1.5 text-[11.5px] text-muted-foreground">{hint}</p>
      )}
      <input
        data-testid={testId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[hsl(var(--hive-cyan))]"
      />
    </div>
  );
}

function ScenarioCard({
  icon,
  tone,
  title,
  total,
  years,
  caption,
  testId,
}: {
  icon: any;
  tone: "ok" | "warn" | "cyan";
  title: string;
  total: number;
  years: number;
  caption: string;
  testId: string;
}) {
  const map = {
    ok: "border-status-ok/40 bg-status-ok/5 text-status-ok",
    warn: "border-status-warn/40 bg-status-warn/5 text-status-warn",
    cyan: "border-hive-cyan/40 bg-hive-cyan/5 text-hive-cyan",
  };
  return (
    <div
      data-testid={testId}
      className={`rounded-sm border p-3 ${map[tone]}`}
    >
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest">
        {icon}
        {title}
      </div>
      <div className="mono mt-1 text-2xl font-semibold tracking-tight text-foreground">
        €{(total / 1000).toFixed(0)}k
      </div>
      <div className="text-[11px] text-muted-foreground">
        {years}-yr total · {caption}
      </div>
    </div>
  );
}
