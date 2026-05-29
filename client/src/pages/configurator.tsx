import { useMemo, useState } from "react";
import { PageHeader } from "@/components/CockpitShell";
import { Panel, StatusChip, CtaButton, Divider } from "@/components/primitives";
import { skus, careTiers, softwareImages } from "@/data/hive";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Circle,
  Copy,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

type Form = {
  workload: string;
  modelSize: string;
  concurrency: string;
  environment: string;
  compliance: string[];
  software: string;
  careTier: string;
  budget: string;
  timing: string;
  gpuRequest: string;
};

const initial: Form = {
  workload: "",
  modelSize: "",
  concurrency: "",
  environment: "",
  compliance: [],
  software: "",
  careTier: "",
  budget: "",
  timing: "",
    gpuRequest: "2 GPUs",
};

const steps = [
  { id: "workload", label: "Workload" },
  { id: "model", label: "Model + concurrency" },
  { id: "facility", label: "Environment" },
  { id: "compliance", label: "Compliance" },
  { id: "software", label: "Software + care" },
  { id: "budget", label: "Budget + timing" },
  { id: "result", label: "Recommendation" },
];

export default function Configurator() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(initial);

  const update = <K extends keyof Form>(k: K, v: Form[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggleCompliance = (v: string) =>
    setForm((f) => ({
      ...f,
      compliance: f.compliance.includes(v)
        ? f.compliance.filter((x) => x !== v)
        : [...f.compliance, v],
    }));

  const reco = useMemo(() => deriveRecommendation(form), [form]);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const reset = () => {
    setForm(initial);
    setStep(0);
  };

  return (
    <>
      <PageHeader
        eyebrow="CFG · Configurator"
        title="Workload-first recommendation engine"
        description="Same logic powers public guided configurator, partner configurator, and internal quote builder. 50X, A6000/PRO, and H200 all scale from 1x through 8x cards; guardrails block unsupported memory and quote claims."
        actions={
          <>
            <StatusChip tone="cyan">{steps[step].label}</StatusChip>
            <CtaButton variant="outline" onClick={reset} testId="button-config-reset">
              Reset
            </CtaButton>
          </>
        }
      />

      {/* Progress strip */}
      <Panel className="mb-4" testId="panel-config-progress">
        <ol className="flex flex-wrap items-center gap-3">
          {steps.map((s, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <li key={s.id} className="flex items-center gap-2">
                <button
                  onClick={() => setStep(i)}
                  data-testid={`step-${s.id}`}
                  className={`flex items-center gap-2 rounded-sm border px-2.5 py-1 text-[12px] hover-elevate ${
                    active
                      ? "border-hive-cyan/60 bg-hive-cyan/10 text-hive-cyan"
                      : done
                        ? "border-status-ok/40 bg-status-ok/10 text-status-ok"
                        : "border-border text-muted-foreground"
                  }`}
                >
                  {done ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <Circle className="h-3.5 w-3.5" />
                  )}
                  <span className="mono text-[10px] uppercase tracking-widest">
                    0{i + 1}
                  </span>
                  <span>{s.label}</span>
                </button>
                {i < steps.length - 1 && (
                  <span className="text-muted-foreground">/</span>
                )}
              </li>
            );
          })}
        </ol>
      </Panel>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_440px]">
        <Panel
          title={steps[step].label}
          actions={
            <div className="flex gap-2">
              <CtaButton variant="outline" onClick={back} testId="button-config-back">
                Back
              </CtaButton>
              <CtaButton variant="primary" onClick={next} testId="button-config-next">
                Next <ArrowRight className="h-3 w-3" />
              </CtaButton>
            </div>
          }
          testId="panel-config-form"
        >
          {step === 0 && (
            <RadioBlock
              label="Primary workload"
              hint="What will the system mainly do?"
              testId="field-workload"
              value={form.workload}
              onChange={(v) => update("workload", v)}
              options={[
                "Inference (chat / RAG)",
                "Fine-tuning",
                "Diffusion / image / video",
                "Rendering / VFX",
                "VDI / vGPU",
                "Research / mixed",
                "MSP / multi-tenant",
              ]}
            />
          )}

          {step === 1 && (
            <div className="space-y-5">
              <RadioBlock
                label="Largest model"
                hint="Sets memory and topology guidance."
                testId="field-model"
                value={form.modelSize}
                onChange={(v) => update("modelSize", v)}
                options={[
                  "Small (≤13B params)",
                  "Medium (13–70B params)",
                  "Large (>70B params, ≥400GB unified memory)",
                  "Training-class (>200B, multi-node)",
                ]}
              />
              <RadioBlock
                label="Concurrency"
                hint="Users / jobs simultaneously."
                testId="field-concurrency"
                value={form.concurrency}
                onChange={(v) => update("concurrency", v)}
                options={[
                  "1 user / single job",
                  "2–10 users",
                  "10–50 users",
                  "50+ users or MSP queue",
                ]}
              />
              <RadioBlock
                label="GPU count requested"
                hint="50X, A6000/PRO, and H200 all support 1x through 8x card configurations."
                testId="field-gpu"
                value={form.gpuRequest}
                onChange={(v) => update("gpuRequest", v)}
                options={[
                  "1 GPU",
                  "2 GPUs",
                  "3 GPUs",
                  "4 GPUs",
                  "5 GPUs",
                  "6 GPUs",
                  "7 GPUs",
                  "8 GPUs",
                ]}
              />
            </div>
          )}

          {step === 2 && (
            <RadioBlock
              label="Environment"
              hint="Drives form factor + cooling."
              testId="field-env"
              value={form.environment}
              onChange={(v) => update("environment", v)}
              options={[
                "Under desk / office",
                "Office tower with low noise",
                "Deskside lab / studio",
                "Server room rack",
                "Data center rack",
              ]}
            />
          )}

          {step === 3 && (
            <CheckBlock
              label="Compliance drivers (select all)"
              hint="At least one driver triggers audit + care recommendations."
              testId="field-compliance"
              values={form.compliance}
              onToggle={toggleCompliance}
              options={[
                "GDPR",
                "DORA (financial)",
                "AI Act",
                "NIS2",
                "Healthcare / GxP",
                "Defense / classified",
                "Data residency (EU only)",
                "Internal audit only",
              ]}
            />
          )}

          {step === 4 && (
            <div className="space-y-5">
              <RadioBlock
                label="Software image"
                hint="Pre-installed AI stack on first boot."
                testId="field-software"
                value={form.software}
                onChange={(v) => update("software", v)}
                options={softwareImages.map((s) => s.id)}
                describe={(v) =>
                  softwareImages.find((s) => s.id === v)?.tagline
                }
              />
              <RadioBlock
                label="Care tier"
                hint="Service SLA and spares model."
                testId="field-care"
                value={form.careTier}
                onChange={(v) => update("careTier", v)}
                options={careTiers.map((c) => c.id)}
                describe={(v) =>
                  careTiers.find((c) => c.id === v)?.sla
                }
              />
            </div>
          )}

          {step === 5 && (
            <div className="space-y-5">
              <RadioBlock
                label="Budget band"
                testId="field-budget"
                value={form.budget}
                onChange={(v) => update("budget", v)}
                options={[
                  "< €25k",
                  "€25–60k",
                  "€60–150k",
                  "€150–400k",
                  "€400k+",
                ]}
              />
              <RadioBlock
                label="Procurement timing"
                testId="field-timing"
                value={form.timing}
                onChange={(v) => update("timing", v)}
                options={[
                  "This quarter",
                  "Next quarter",
                  "6–9 months",
                  "Budget cycle / FY",
                ]}
              />
            </div>
          )}

          {step === 6 && <ResultView reco={reco} form={form} />}
        </Panel>

        {/* Recommendation panel */}
        <Panel
          title="Live recommendation"
          meta={reco ? "ready" : "fill workload + model"}
          testId="panel-config-recommendation"
        >
          {!reco ? (
            <div className="space-y-3 text-[13px] text-muted-foreground">
              <p>
                Choose workload, model size, and environment to generate a
                recommended SKU, rationale, software image, and care tier.
              </p>
              <div className="rounded-sm border border-dashed border-border p-3 text-[12px]">
                Sample rules respected: 50X never claims unified VRAM, PRO-T2 /
                T4 are B2B heroes, H2-R4 / R8 required above 400GB unified
                memory, H200 is quote-only, and every line supports 1x-8x
                card scaling.
              </div>
            </div>
          ) : (
            <RecommendationCard reco={reco} />
          )}
        </Panel>
      </div>
    </>
  );
}

// --------- Recommendation engine ---------

type Reco = {
  sku: typeof skus[number];
  displayName: string;
  configCode: string;
  gpuCount: number;
  placement: Placement;
  bom: BomItem[];
  rationale: string[];
  warnings: { tone: "warn" | "risk" | "info"; msg: string }[];
  software: string;
  care: string;
  quoteOnly: boolean;
  needsApproval: boolean;
  partnerMinTier: string;
  proposalBlock: string;
};

type Placement = {
  formCode: string;
  label: string;
  requirement: string;
  coolingKit: "WS Cooling Kit" | "Server Cooling Kit";
  siteCheck: boolean;
};

type BomItem = {
  group: string;
  item: string;
  detail: string;
};

function deriveRecommendation(form: Form): Reco | null {
  if (!form.workload || !form.modelSize) return null;

  const warnings: Reco["warnings"] = [];
  let skuId = "hive-pro-t2";
  const requestedGpuCount = parseGpuCount(form.gpuRequest);

  // model size dominant
  const isLarge = form.modelSize.startsWith("Large");
  const isTraining = form.modelSize.startsWith("Training");
  const isMedium = form.modelSize.startsWith("Medium");
  const isSmall = form.modelSize.startsWith("Small");

  const isRack =
    form.environment === "Server room rack" ||
    form.environment === "Data center rack";

  const heavyConc =
    form.concurrency === "50+ users or MSP queue" ||
    form.concurrency === "10–50 users";

  // Core decision tree, lifted from blueprint configurator rules
  if (isLarge || isTraining) {
    skuId = heavyConc || isTraining ? "hive-h2-r8" : "hive-h2-r4";
    warnings.push({
      tone: "warn",
      msg: "H200 path is quote-only. Requires SE technical approval and facility validation.",
    });
  } else if (form.workload.startsWith("Rendering") || form.workload.startsWith("Diffusion")) {
    skuId = isRack ? "hive-50x-t2" : "hive-50x-t2";
    if (isMedium) skuId = "hive-pro-t4";
  } else if (form.workload.startsWith("VDI")) {
    skuId = "hive-pro-r4";
  } else if (form.workload.startsWith("MSP")) {
    skuId = "hive-pro-r8";
  } else if (heavyConc && (isMedium || isLarge)) {
    skuId = isRack ? "hive-pro-r4" : "hive-pro-t4";
  } else if (isMedium) {
    skuId = isRack ? "hive-pro-r4" : "hive-pro-t4";
  } else if (isSmall) {
    skuId = "hive-pro-t2";
  }

  if (skuId.startsWith("hive-50x") && form.modelSize.startsWith("Large")) {
    warnings.push({
      tone: "risk",
      msg: "50X line has no NVLink unified memory pool — do not claim unified VRAM in this configuration.",
    });
  }

  if (
    form.environment === "Under desk / office" &&
    (skuId.endsWith("r4") || skuId.endsWith("r8"))
  ) {
    warnings.push({
      tone: "warn",
      msg: "Rack form factor selected but environment is office. Switch to T-form or arrange a server-room location.",
    });
  }

  if (
    skuId.startsWith("hive-h2") &&
    form.compliance.length === 0
  ) {
    warnings.push({
      tone: "info" as const,
      msg: "H200 deals usually carry a compliance driver (DORA, GxP, residency). Confirm sponsor and audit posture before quote.",
    });
  }

  const sku = skus.find((s) => s.id === skuId)!;
  const placement = derivePlacement(sku.line, requestedGpuCount, form.environment);
  const lineCode = sku.line;
  const displayName = `HIVE ${lineCode}-${placement.formCode}`;
  const configCode = `HIVE-${lineCode}-${placement.formCode}-${requestedGpuCount}-${sku.cooling}-FULL-BOM`;

  if (sku.line === "H2" && !isRack) {
    warnings.push({
      tone: "risk",
      msg: "H200 is rack-only. Route to server room or data center rack; do not position H200 as a tower workstation.",
    });
  }

  if (sku.line !== "H2" && requestedGpuCount >= 5 && !isRack) {
    warnings.push({
      tone: "warn",
      msg: "5x-8x 50X or A6000/PRO builds require rack, towerized rack, or deskside liquid platform. They are not normal office towers.",
    });
  }

  if (sku.line !== "H2" && requestedGpuCount <= 4 && !isRack) {
    warnings.push({
      tone: "info",
      msg: "Tower path is available for 1x-4x 50X and A6000/PRO configurations. Validate power, acoustics, and service access for T4.",
    });
  }

  const rationale = [
    `Workload: ${form.workload}`,
    `Model: ${form.modelSize}, concurrency: ${form.concurrency || "—"}`,
    `GPU count: ${requestedGpuCount} card${requestedGpuCount === 1 ? "" : "s"} selected; this is a supported 1x-8x configuration.`,
    `Placement: ${placement.label}. ${placement.requirement}`,
    `Cooling kit: ${placement.coolingKit}`,
    sku.line === "H2"
      ? "≥400GB unified memory or enterprise pooling required → H2 path"
      : sku.line === "PRO"
        ? "Departmental / professional fit → PRO line as B2B hero"
        : "Cost-sensitive throughput or rendering → 50X volume line",
  ];

  const software = form.software || sku.defaultImage;
  const care = form.careTier || sku.defaultCare;

  const quoteOnly = sku.quotePolicy === "quote_only";
  const needsApproval =
    sku.line === "H2";

  const bom = buildBom({ sku, gpuCount: requestedGpuCount, placement, software, care });
  const proposalBlock = buildProposal({ form, sku, software, care, displayName, configCode, placement, bom });

  return {
    sku,
    displayName,
    configCode,
    gpuCount: requestedGpuCount,
    placement,
    bom,
    rationale,
    warnings,
    software,
    care,
    quoteOnly,
    needsApproval,
    partnerMinTier: sku.partnerMinTier,
    proposalBlock,
  };
}

function derivePlacement(line: string, gpuCount: number, environment: string): Placement {
  const rackEnvironment =
    environment === "Server room rack" || environment === "Data center rack";

  if (line === "H2") {
    return {
      formCode: `R${gpuCount}`,
      label: `Rack-only R${gpuCount}`,
      requirement: "H200 configurations are rack systems from 1x through 8x GPUs.",
      coolingKit: "Server Cooling Kit",
      siteCheck: true,
    };
  }

  if (rackEnvironment) {
    return {
      formCode: `R${gpuCount}`,
      label: `Rack R${gpuCount}`,
      requirement: "Selected environment is server room or data center, so the system is configured as rack.",
      coolingKit: "Server Cooling Kit",
      siteCheck: gpuCount >= 4,
    };
  }

  if (gpuCount <= 2) {
    return {
      formCode: `T${gpuCount}`,
      label: `Tower T${gpuCount}`,
      requirement: "Standard tower path for 1x-2x 50X or A6000/PRO.",
      coolingKit: "WS Cooling Kit",
      siteCheck: false,
    };
  }

  if (gpuCount <= 4) {
    return {
      formCode: `T${gpuCount}`,
      label: `Tower XL / deskside T${gpuCount}`,
      requirement: "Tower path is possible for 3x-4x 50X or A6000/PRO, but requires power, acoustics, and service-clearance validation.",
      coolingKit: "WS Cooling Kit",
      siteCheck: true,
    };
  }

  return {
    formCode: `R${gpuCount}`,
    label: `Rack / towerized rack R${gpuCount}`,
    requirement: "5x-8x 50X or A6000/PRO moves to rack, towerized rack, or deskside liquid platform.",
    coolingKit: "Server Cooling Kit",
    siteCheck: true,
  };
}

function parseGpuCount(value: string): number {
  const match = value.match(/\d+/);
  if (!match) return 2;
  return Math.max(1, Math.min(8, Number(match[0])));
}

function buildProposal({
  form,
  sku,
  software,
  care,
  displayName,
  configCode,
  placement,
  bom,
}: {
  form: Form;
  sku: typeof skus[number];
  software: string;
  care: string;
  displayName: string;
  configCode: string;
  placement: Placement;
  bom: BomItem[];
}): string {
  const compliance =
    form.compliance.length > 0
      ? form.compliance.join(", ")
      : "internal audit baseline";
  return `Recommended path: ${displayName} (${configCode}).
Workload context: ${form.workload || "—"} at ${form.concurrency || "TBC"} concurrency, ${form.modelSize || "model size TBC"}.
Placement: ${placement.label}. ${placement.requirement}
Cooling: ${placement.coolingKit} powered by EK Fluid Works.
Software image: ${software}. Care tier: ${care}.
Compliance drivers: ${compliance}.
Core BOM: ${bom.map((b) => `${b.item}`).join("; ")}.
${sku.line === "H2" ? "Quote-only path. Engages enterprise workflow with facility survey, security review, and POC plan." : "Configurable via guided quote with partner routing."}
Next step: confirm facility readiness, software image selection, care tier, and TCO inputs.`;
}

function buildBom({
  sku,
  gpuCount,
  placement,
  software,
  care,
}: {
  sku: typeof skus[number];
  gpuCount: number;
  placement: Placement;
  software: string;
  care: string;
}): BomItem[] {
  const gpuName =
    sku.line === "50X"
      ? "NVIDIA RTX 50X-class GPU cards"
      : sku.line === "H2"
        ? "NVIDIA H200 accelerator cards"
        : "NVIDIA RTX PRO 6000 Blackwell or A6000 BTO cards";

  const platform =
    sku.line === "H2"
      ? "Enterprise server platform with PCIe/SXM H200 support"
      : placement.formCode.startsWith("R")
        ? "Rack server GPU platform"
        : "Workstation GPU platform";

  const coolingDetail =
    placement.coolingKit === "WS Cooling Kit"
      ? "EK Fluid Works workstation loop: GPU blocks, CPU block, pump/reservoir, radiator stack, fans, tubing, fittings, coolant, leak-test kit"
      : "EK Fluid Works server loop: GPU cold plates, manifold, pump/reservoir or facility interface, radiator/CDU interface, tubing, quick disconnects, coolant, spare fittings, leak-test kit";

  return [
    { group: "Chassis", item: placement.label, detail: placement.requirement },
    { group: "GPU", item: `${gpuCount}x ${gpuName}`, detail: "Selected 1x-8x supported GPU count." },
    { group: "Compute platform", item: platform, detail: "CPU, motherboard, PCIe layout, and risers matched to GPU count and chassis." },
    { group: "System memory", item: sku.memory, detail: "Baseline memory from anchor family; final capacity confirmed during quote." },
    { group: "Storage", item: sku.storage, detail: "NVMe baseline; expandable for datasets, checkpoints, scratch, or render cache." },
    { group: "Networking", item: sku.network, detail: "Network option matched to inference, storage, cluster, or VDI traffic." },
    { group: "Power", item: "Redundant / high-efficiency PSU set", detail: "Sized to GPU count, CPU platform, pumps, fans, and facility power limits." },
    { group: "Cooling kit", item: placement.coolingKit, detail: coolingDetail },
    { group: "Validation", item: "LM Tek assembly + burn-in + leak-pressure validation pack", detail: "Includes thermal soak, GPU stress, coolant inspection, and acceptance report." },
    { group: "Software", item: software, detail: "Preinstalled AI image selected for workload." },
    { group: "Care", item: care, detail: "Support tier and spares model attached to quote." },
  ];
}

// --------- UI helpers ---------

function RadioBlock({
  label,
  hint,
  value,
  onChange,
  options,
  describe,
  testId,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  describe?: (v: string) => string | undefined;
  testId: string;
}) {
  return (
    <fieldset data-testid={testId}>
      <legend className="mono mb-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </legend>
      {hint && (
        <p className="mb-2 text-[12px] text-muted-foreground">{hint}</p>
      )}
      <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2">
        {options.map((o) => (
          <label
            key={o}
            data-testid={`option-${testId}-${slug(o)}`}
            className={`flex cursor-pointer items-start gap-2 rounded-sm border px-3 py-2 text-[12.5px] hover-elevate ${
              value === o
                ? "border-hive-cyan/60 bg-hive-cyan/10"
                : "border-border bg-card"
            }`}
          >
            <input
              type="radio"
              className="mt-1 accent-[hsl(var(--hive-cyan))]"
              checked={value === o}
              onChange={() => onChange(o)}
            />
            <div>
              <div className="font-medium">{o}</div>
              {describe && describe(o) && (
                <div className="text-[11px] text-muted-foreground">
                  {describe(o)}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function CheckBlock({
  label,
  hint,
  values,
  onToggle,
  options,
  testId,
}: {
  label: string;
  hint?: string;
  values: string[];
  onToggle: (v: string) => void;
  options: string[];
  testId: string;
}) {
  return (
    <fieldset data-testid={testId}>
      <legend className="mono mb-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </legend>
      {hint && (
        <p className="mb-2 text-[12px] text-muted-foreground">{hint}</p>
      )}
      <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2">
        {options.map((o) => (
          <label
            key={o}
            data-testid={`option-${testId}-${slug(o)}`}
            className={`flex cursor-pointer items-start gap-2 rounded-sm border px-3 py-2 text-[12.5px] hover-elevate ${
              values.includes(o)
                ? "border-hive-cyan/60 bg-hive-cyan/10"
                : "border-border bg-card"
            }`}
          >
            <input
              type="checkbox"
              className="mt-1 accent-[hsl(var(--hive-cyan))]"
              checked={values.includes(o)}
              onChange={() => onToggle(o)}
            />
            <div className="font-medium">{o}</div>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function RecommendationCard({ reco }: { reco: Reco }) {
  return (
    <div className="space-y-3 text-[13px]">
      <div className="rounded-sm border border-hive-cyan/40 bg-hive-cyan/5 p-3">
        <div className="mono text-[10px] uppercase tracking-[0.2em] text-hive-cyan">
          Recommended SKU
        </div>
        <div className="mt-0.5 text-base font-semibold">{reco.displayName}</div>
        <div className="mono text-[11px] text-muted-foreground">
          {reco.configCode}
        </div>
        <div className="mt-1.5 text-[12.5px]">
          {reco.gpuCount}x card variant from the {reco.sku.display} anchor family. {reco.sku.headline}
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <StatusChip tone={reco.placement.formCode.startsWith("R") ? "warn" : "cyan"}>
            {reco.placement.label}
          </StatusChip>
          {reco.quoteOnly && <StatusChip tone="warn">Quote-only</StatusChip>}
          {reco.needsApproval && (
            <StatusChip tone="warn">SE approval required</StatusChip>
          )}
          <StatusChip tone="cyan">
            Partner ≥ {reco.partnerMinTier}
          </StatusChip>
        </div>
      </div>

      <div>
        <div className="mono mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">
          Rationale
        </div>
        <ul className="space-y-1 text-[12.5px]">
          {reco.rationale.map((r) => (
            <li key={r} className="flex items-start gap-1.5">
              <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-hive-cyan" />
              {r}
            </li>
          ))}
        </ul>
      </div>

      {reco.warnings.length > 0 && (
        <div className="space-y-1.5">
          <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Guardrails
          </div>
          {reco.warnings.map((w, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 rounded-sm border p-2 text-[12px] ${
                w.tone === "risk"
                  ? "border-status-risk/40 bg-status-risk/10 text-status-risk"
                  : w.tone === "warn"
                    ? "border-status-warn/40 bg-status-warn/10 text-status-warn"
                    : "border-border bg-muted/40 text-foreground/85"
              }`}
            >
              {w.tone === "risk" ? (
                <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              ) : (
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              )}
              <div>{w.msg}</div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 text-[12px]">
        <Field k="Placement" v={reco.placement.label} />
        <Field k="Cooling kit" v={reco.placement.coolingKit} />
        <Field k="Software image" v={reco.software} />
        <Field k="Care tier" v={reco.care} />
      </div>

      <div>
        <div className="mono mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">
          Full configuration BOM
        </div>
        <div className="divide-y divide-border rounded-sm border border-border bg-card">
          {reco.bom.map((b) => (
            <div key={`${b.group}-${b.item}`} className="grid grid-cols-[96px_1fr] gap-2 px-2.5 py-2">
              <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {b.group}
              </div>
              <div>
                <div className="text-[12.5px] font-medium">{b.item}</div>
                <div className="text-[11px] text-muted-foreground">{b.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultView({ reco, form }: { reco: Reco | null; form: Form }) {
  if (!reco)
    return (
      <div className="text-[13px] text-muted-foreground">
        Complete workload and model size to see the proposal-ready block.
      </div>
    );

  return (
    <div className="space-y-4">
      <RecommendationCard reco={reco} />
      <Divider label="Proposal-ready block" />
      <div className="rounded-sm border border-border bg-muted/30 p-3 text-[12.5px]">
        <pre className="mono whitespace-pre-wrap leading-relaxed">{reco.proposalBlock}</pre>
        <div className="mt-3 flex flex-wrap gap-2">
          <CtaButton
            variant="primary"
            onClick={() => navigator.clipboard?.writeText(reco.proposalBlock)}
            testId="button-copy-proposal"
          >
            <Copy className="h-3 w-3" /> Copy block
          </CtaButton>
          <a href="#/products">
            <CtaButton variant="outline" testId="button-open-products">
              Open product pages
            </CtaButton>
          </a>
          <a href="#/tco">
            <CtaButton variant="outline" testId="button-config-to-tco">
              Run TCO scenario
            </CtaButton>
          </a>
        </div>
      </div>
      <div className="rounded-sm border border-border bg-card p-3 text-[12px]">
        <div className="mono mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">
          Captured inputs
        </div>
        <pre className="mono whitespace-pre-wrap text-[11.5px] leading-relaxed text-muted-foreground">
{JSON.stringify(form, null, 2)}
        </pre>
      </div>
    </div>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-sm border border-border bg-muted/30 p-2">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {k}
      </div>
      <div className="font-medium">{v}</div>
    </div>
  );
}
