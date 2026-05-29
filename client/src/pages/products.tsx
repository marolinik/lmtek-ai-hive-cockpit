import { useState } from "react";
import { useSearch } from "wouter";
import { PageHeader } from "@/components/CockpitShell";
import { Panel, StatusChip, CtaButton } from "@/components/primitives";
import { skus, Sku, softwareImages, careTiers } from "@/data/hive";
import {
  CheckCircle2,
  ChevronRight,
  Cpu,
  Droplet,
  Layers,
  Server,
  ShieldCheck,
} from "lucide-react";

const heroIds = ["hive-pro-t2", "hive-pro-t4", "hive-h2-r4", "hive-50x-t2"];

export default function ProductPages() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const initial =
    params.get("sku") &&
    skus.find((s) => s.id === params.get("sku"))
      ? (params.get("sku") as string)
      : heroIds[0];
  const [active, setActive] = useState(initial);
  const sku = skus.find((s) => s.id === active)!;

  return (
    <>
      <PageHeader
        eyebrow="PRD · Product pages preview"
        title="Buyer-facing pages, sales-grade content"
        description="Each page follows the same 12-block product template: hero, best-for, why this system, spec, model fit, cooling, software, KVARK, TCO, compare, FAQ, CTA."
        actions={<StatusChip tone="cyan">{heroIds.length} hero pages</StatusChip>}
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {heroIds.map((id) => {
          const s = skus.find((x) => x.id === id)!;
          return (
            <button
              key={id}
              data-testid={`tab-product-${id}`}
              onClick={() => setActive(id)}
              className={`rounded-sm border px-3 py-1.5 text-[12px] hover-elevate ${
                active === id
                  ? "border-hive-cyan/60 bg-hive-cyan/10 text-hive-cyan"
                  : "border-border bg-card"
              }`}
            >
              <span className="mono text-[10px] uppercase tracking-widest mr-1.5 text-muted-foreground">
                {s.line}
              </span>
              {s.display}
            </button>
          );
        })}
      </div>

      <ProductPage sku={sku} />
    </>
  );
}

function ProductPage({ sku }: { sku: Sku }) {
  return (
    <article className="space-y-4">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-md border border-border bg-card">
        <div className="absolute inset-0 hive-grid-fine opacity-30" aria-hidden />
        <div className="relative grid grid-cols-1 gap-6 p-6 md:grid-cols-[1.4fr_1fr] md:p-8">
          <div>
            <div className="mono text-[10px] uppercase tracking-[0.22em] text-hive-cyan">
              AI HIVE / {sku.line} LINE / {sku.form}
            </div>
            <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
              {sku.display}
            </h2>
            <p className="mt-2 max-w-xl text-base text-foreground/85">
              {sku.headline}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <StatusChip tone="cyan">{sku.priceBand}</StatusChip>
              <StatusChip tone="neutral">
                Partner ≥ {sku.partnerMinTier}
              </StatusChip>
              <StatusChip tone="gold">Powered by EK Fluid Works</StatusChip>
              {sku.caveat && <StatusChip tone="warn">Guardrail</StatusChip>}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href="#/configurator">
                <CtaButton variant="primary" testId={`button-cta-config-${sku.id}`}>
                  Configure {sku.display}
                </CtaButton>
              </a>
              <CtaButton variant="outline" testId={`button-cta-quote-${sku.id}`}>
                Request quote
              </CtaButton>
              <CtaButton variant="ghost" testId={`button-cta-demo-${sku.id}`}>
                Book technical fit call
              </CtaButton>
            </div>
            {sku.caveat && (
              <div className="mt-4 rounded-sm border border-status-warn/40 bg-status-warn/10 p-3 text-[12.5px] text-status-warn">
                <strong className="font-semibold">Configurator guardrail.</strong>{" "}
                {sku.caveat}
              </div>
            )}
          </div>

          {/* Mock hero card */}
          <div className="relative">
            <div className="rounded-md border border-border bg-background p-5">
              <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Operational SKU
              </div>
              <div className="mono mt-1 break-all text-[13px]">{sku.fullCode}</div>

              <div className="my-4 cyan-rule" />

              <div className="grid grid-cols-2 gap-3 text-[12.5px]">
                <SpecCell label="GPU options" value={sku.gpuRange ?? `${sku.gpuCount}`} />
                <SpecCell label="Form factor" value={sku.form} />
                <SpecCell label="Placement rule" value={placementRule(sku)} />
                <SpecCell label="Cooling" value={sku.cooling === "LQ" ? "Liquid" : "Air"} />
                <SpecCell label="Memory" value={sku.memory} />
                <SpecCell label="Storage" value={sku.storage} />
                <SpecCell label="Network" value={sku.network} />
                <SpecCell label="Image" value={sku.defaultImage} />
                <SpecCell label="Care tier" value={sku.defaultCare} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best for + why */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Panel title="Best for" testId={`panel-bestfor-${sku.id}`}>
          <ul className="space-y-2 text-[13px]">
            {sku.bestFor.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-hive-cyan" />
                {b}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Why this system" testId={`panel-why-${sku.id}`}>
          <div className="space-y-3 text-[13px]">
            <WhyRow
              icon={<Cpu className="h-4 w-4 text-hive-cyan" />}
              label="Workload"
              text={`${sku.gpuRange ?? `${sku.gpuCount} GPU`} supported. The product page shows an anchor SKU, while final quote selects the exact 1x-8x card count.`}
            />
            <WhyRow
              icon={<Layers className="h-4 w-4 text-hive-cyan" />}
              label="Memory & model fit"
              text={
                sku.line === "H2"
                  ? "True H200 memory pooling — designed for >400GB unified workloads."
                  : sku.line === "PRO"
                    ? "96GB-class professional GPUs, sized for 70B-class inference and fine-tuning."
                    : "High-throughput GPU memory for diffusion, video, and rendering pipelines."
              }
            />
            <WhyRow
              icon={<Server className="h-4 w-4 text-hive-cyan" />}
              label="Facility fit"
              text={placementDetail(sku)}
            />
            <WhyRow
              icon={<ShieldCheck className="h-4 w-4 text-hive-cyan" />}
              label="Sovereign + compliant"
              text="EU-built, EU-serviced. Compatible with DORA, GDPR, AI Act and NIS2 readiness narratives."
            />
          </div>
        </Panel>
      </div>

      <Panel title="Full configuration and cooling kits" testId={`panel-bom-${sku.id}`}>
        <div className="mb-3 rounded-sm border border-hive-gold/30 bg-hive-gold/5 p-3">
          <div className="mono mb-1 text-[10px] uppercase tracking-widest text-hive-gold">
            Tower vs rack rule
          </div>
          <p className="text-[12.5px] leading-relaxed">
            {placementDetail(sku)} Cooling is quoted as a kit, not hidden inside a generic chassis line.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {productBom(sku).map((item) => (
            <div key={item.group} className="rounded-sm border border-border bg-card p-2.5">
              <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {item.group}
              </div>
              <div className="mt-0.5 text-[12.5px] font-medium">{item.item}</div>
              <div className="mt-1 text-[11px] text-muted-foreground">{item.detail}</div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Cooling + software */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Panel title="Cooling & reliability" testId={`panel-cool-${sku.id}`}>
          <div className="rounded-sm border border-hive-gold/30 bg-hive-gold/5 p-3">
            <div className="mono mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-hive-gold">
              <Droplet className="h-3 w-3" /> Powered by EK Fluid Works
            </div>
            <p className="text-[12.5px] leading-relaxed">
              Every {sku.line} system ships with a named cooling kit:{" "}
              {coolingKitForSku(sku)}. The kit includes EK-grade loop hardware,
              coolant path components, leak-pressure validation, factory burn-in,
              and serviceability documented per chassis. Cooling fluid
              replacement is covered by {sku.defaultCare} or higher.
            </p>
          </div>
        </Panel>

        <Panel title="Software image" testId={`panel-software-${sku.id}`}>
          <div className="space-y-2">
            {softwareImages.map((img) => (
              <div
                key={img.id}
                className={`rounded-sm border p-2.5 ${
                  img.id === sku.defaultImage
                    ? "border-hive-cyan/40 bg-hive-cyan/5"
                    : "border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-[13px] font-semibold">{img.id}</div>
                  {img.id === sku.defaultImage && (
                    <StatusChip tone="cyan">Default</StatusChip>
                  )}
                </div>
                <div className="text-[11.5px] text-muted-foreground">
                  {img.tagline}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* TCO + care + FAQ + compare */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Panel title="TCO & procurement" testId={`panel-tco-${sku.id}`}>
          <p className="text-[12.5px] leading-relaxed text-foreground/85">
            For workloads above ~30% utilisation, ownership of {sku.display}{" "}
            typically beats equivalent public-cloud GPU on a 3-year horizon,
            once egress, support, and compliance overhead are included.
          </p>
          <a href="#/tco">
            <CtaButton variant="primary" testId={`button-product-tco-${sku.id}`}>
              Run TCO scenario
            </CtaButton>
          </a>
        </Panel>

        <Panel title="Care tier" testId={`panel-care-${sku.id}`}>
          <ul className="space-y-2 text-[12.5px]">
            {careTiers.map((c) => (
              <li
                key={c.id}
                className={`rounded-sm border px-2.5 py-1.5 ${
                  c.id === sku.defaultCare
                    ? "border-hive-cyan/40 bg-hive-cyan/5"
                    : "border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{c.id}</span>
                  {c.id === sku.defaultCare && (
                    <StatusChip tone="cyan">Default</StatusChip>
                  )}
                </div>
                <div className="text-[11px] text-muted-foreground">{c.sla}</div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Compare adjacent" testId={`panel-compare-${sku.id}`}>
          <ul className="space-y-1.5 text-[12.5px]">
            {skus
              .filter((s) => s.line === sku.line && s.id !== sku.id)
              .slice(0, 4)
              .map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between rounded-sm border border-border bg-card px-2.5 py-1.5"
                >
                  <span className="font-medium">{s.display}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                </li>
              ))}
          </ul>
        </Panel>
      </div>

      <Panel title="FAQ" testId={`panel-faq-${sku.id}`}>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {faqFor(sku).map((q) => (
            <div key={q.q} className="rounded-sm border border-border bg-card p-3">
              <div className="text-[12.5px] font-semibold">{q.q}</div>
              <div className="mt-1 text-[12px] text-muted-foreground leading-relaxed">
                {q.a}
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </article>
  );
}

function SpecCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 font-semibold">{value}</div>
    </div>
  );
}

function WhyRow({
  icon,
  label,
  text,
}: {
  icon: any;
  label: string;
  text: string;
}) {
  return (
    <div className="flex gap-2.5">
      <div className="mt-0.5">{icon}</div>
      <div>
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
        <div className="text-[12.5px] leading-relaxed text-foreground/90">
          {text}
        </div>
      </div>
    </div>
  );
}

function placementRule(sku: Sku) {
  if (sku.line === "H2") return "Rack only";
  if (sku.form.startsWith("R")) return "Rack / towerized rack";
  if (sku.form === "T1" || sku.form === "T2") return "Tower";
  return "Tower XL / deskside";
}

function placementDetail(sku: Sku) {
  if (sku.line === "H2") {
    return "H200 systems are rack-only from 1x through 8x cards and require server-room or data-center placement, facility validation, and the Server Cooling Kit.";
  }
  if (sku.form.startsWith("R") || sku.form.endsWith("8")) {
    return "5x-8x 50X or A6000/PRO builds move to rack, towerized rack, or deskside liquid platform and use the Server Cooling Kit.";
  }
  if (sku.form === "T4") {
    return "1x-4x 50X or A6000/PRO can run as Tower XL or deskside, with power, acoustics, service clearance, and the WS Cooling Kit validated before quote.";
  }
  return "1x-2x 50X or A6000/PRO can run as standard tower systems with the WS Cooling Kit.";
}

function coolingKitForSku(sku: Sku) {
  if (sku.line === "H2" || sku.form.startsWith("R") || sku.form.endsWith("8")) {
    return "Server Cooling Kit";
  }
  return "WS Cooling Kit";
}

function productBom(sku: Sku) {
  const kit = coolingKitForSku(sku);
  const gpu =
    sku.line === "50X"
      ? "1x-8x NVIDIA RTX 50X-class GPU cards"
      : sku.line === "H2"
        ? "1x-8x NVIDIA H200 accelerator cards"
        : "1x-8x NVIDIA RTX PRO 6000 Blackwell or A6000 BTO cards";
  const platform =
    sku.line === "H2"
      ? "Enterprise H200 rack server platform"
      : sku.form.startsWith("R")
        ? "Rack GPU server platform"
        : "Workstation / deskside GPU platform";
  const coolingDetail =
    kit === "WS Cooling Kit"
      ? "GPU blocks, CPU block, pump/reservoir, radiator stack, fans, tubing, fittings, coolant, leak-test kit."
      : "GPU cold plates, manifold, pump/reservoir or facility interface, radiator/CDU interface, tubing, quick disconnects, coolant, spare fittings, leak-test kit.";

  return [
    { group: "Placement", item: placementRule(sku), detail: placementDetail(sku) },
    { group: "GPU", item: gpu, detail: "Exact card count selected in configurator or quote." },
    { group: "Platform", item: platform, detail: "CPU, motherboard, PCIe layout, risers, and chassis matched to the selected card count." },
    { group: "Memory", item: sku.memory, detail: "Anchor configuration baseline; final capacity confirmed in quote." },
    { group: "Storage", item: sku.storage, detail: "NVMe baseline for models, datasets, scratch, checkpoints, or render cache." },
    { group: "Network", item: sku.network, detail: "Networking matched to inference, storage, VDI, or cluster traffic." },
    { group: "Power", item: "High-efficiency PSU set", detail: "Sized to GPU count, pumps, fans, and facility power envelope." },
    { group: "Cooling kit", item: kit, detail: coolingDetail },
    { group: "Validation", item: "LM Tek assembly + burn-in pack", detail: "Thermal soak, leak-pressure validation, GPU stress, and acceptance report." },
    { group: "Software", item: sku.defaultImage, detail: "Default preinstalled image; KVARK and VDI/vGPU can be added." },
    { group: "Care", item: sku.defaultCare, detail: "Support tier and spares model attached to quote." },
  ];
}

function faqFor(sku: Sku) {
  const base = [
    {
      q: "What cooling does this system use?",
      a: "Liquid cooling powered by EK Fluid Works, burn-in tested at LM Tek before shipment. Coolant maintenance is covered through the care tier.",
    },
    {
      q: "What is the lead time?",
      a: "8–12 weeks from PO for guided-quote systems. Quote-only configurations are scheduled after technical fit and facility validation.",
    },
    {
      q: "Can a partner deliver this SKU?",
      a: `Yes — minimum partner tier ${sku.partnerMinTier}. Higher-care attach and H2 deals require Elite tier or LM Tek-led delivery.`,
    },
    {
      q: "Which software ships pre-installed?",
      a: `${sku.defaultImage} ships by default. EnterpriseAI, KVARK, or VDI/vGPU images can be requested at configuration time.`,
    },
  ];
  if (sku.line === "H2") {
    base.unshift({
      q: "Why is H200 quote-only?",
      a: "H2 platforms enter a gated enterprise workflow (business fit → technical fit → facility fit → commercial fit → success plan) before any quote is produced.",
    });
  }
  if (sku.id === "hive-50x-t2") {
    base.push({
      q: "Does this system support unified VRAM across GPUs?",
      a: "No. The 50X line does not offer NVLink unified memory pooling. For workloads requiring >96 GB single-pool memory, move to the PRO or H2 line.",
    });
  }
  return base;
}
