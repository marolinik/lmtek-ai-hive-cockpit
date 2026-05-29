import { PageHeader } from "@/components/CockpitShell";
import { Panel, StatusChip, CtaButton } from "@/components/primitives";
import { skus, ProductLine } from "@/data/hive";
import { ArrowRight, Cpu, Server, Snowflake } from "lucide-react";
import { Link } from "wouter";

const lines: {
  line: ProductLine;
  promise: string;
  role: string;
  gpuRange: string;
  icon: any;
}[] = [
  {
    line: "50X",
    promise:
      "High-throughput AI dev, rendering, diffusion, cost-sensitive local AI.",
    role: "Entry + volume line for creators, labs, render and price-sensitive teams.",
    gpuRange: "1x-8x RTX 50X cards",
    icon: Cpu,
  },
  {
    line: "PRO",
    promise:
      "A6000 / professional 96GB GPU systems for departmental AI, VDI, visualisation, serious local model work.",
    role: "Hero B2B line. A6000 and PRO-class configurations both scale across the same 1x-8x pattern.",
    gpuRange: "1x-8x A6000 / PRO cards",
    icon: Server,
  },
  {
    line: "H2",
    promise:
      "H200 enterprise systems for regulated, high-memory, multi-user, sovereign AI factory.",
    role: "Strategic enterprise line. Quote-only, partner-qualified, facility-validated.",
    gpuRange: "1x-8x H200 cards",
    icon: Snowflake,
  },
];

export default function Portfolio() {
  return (
    <>
      <PageHeader
        eyebrow="POR · Portfolio Hub"
        title="Three lines. 1x-8x GPU scaling. One operating SKU language."
        description="50X, A6000/PRO, and H200 can each be configured from 1x through 8x cards. The visible SKUs are anchor configurations; the cockpit now treats every intermediate GPU count as supported, not exceptional."
        actions={<StatusChip tone="cyan">1x-8x supported</StatusChip>}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {lines.map((l) => {
          const list = skus.filter((s) => s.line === l.line);
          const Icon = l.icon;
          return (
            <Panel
              key={l.line}
              title={`${l.line} line`}
              meta={l.gpuRange}
              testId={`panel-line-${l.line}`}
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-sm border border-hive-cyan/40 bg-hive-cyan/10 text-hive-cyan">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-semibold">{l.promise}</div>
                  <div className="text-[12px] text-muted-foreground">{l.role}</div>
                </div>
              </div>

              <div className="space-y-2">
                {list.map((s) => (
                  <Link
                    key={s.id}
                    href={`/products?sku=${s.id}`}
                    data-testid={`portfolio-sku-${s.id}`}
                    className="block rounded-sm border border-border bg-card p-2.5 hover-elevate"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[13px] font-semibold">
                          {s.display}
                        </div>
                        <div className="mono text-[10px] text-muted-foreground">
                          {s.fullCode}
                        </div>
                      </div>
                      {s.hero && (
                        <StatusChip tone="cyan">Hero</StatusChip>
                      )}
                    </div>
                    <div className="mt-1.5 text-[11.5px] text-foreground/80">
                      {s.headline}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5 text-[10px]">
                      <Tag>{s.gpuCount} GPU</Tag>
                      <Tag>{s.gpuRange}</Tag>
                      <Tag>{s.memory}</Tag>
                      <Tag>{s.network}</Tag>
                      <Tag>{s.defaultImage}</Tag>
                      <Tag>{s.defaultCare}</Tag>
                    </div>
                    <div className="mt-2 flex items-center justify-between border-t border-border pt-2 text-[11px]">
                      <div className="text-muted-foreground">
                        {s.priceBand}
                      </div>
                      <div className="flex items-center gap-1 text-hive-cyan">
                        Open product page <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Panel>
          );
        })}
      </div>

      <Panel title="Full operational table" className="mt-4" testId="panel-portfolio-table">
        <div className="overflow-x-auto">
          <table className="w-full text-[12.5px]">
            <thead className="border-b border-border bg-muted/30 text-left">
              <tr className="text-[10px] uppercase tracking-widest text-muted-foreground">
                <th className="px-3 py-2 font-medium">SKU</th>
                <th className="px-3 py-2 font-medium">Full code</th>
                <th className="px-3 py-2 font-medium">Line / form</th>
                <th className="px-3 py-2 font-medium">GPU options</th>
                <th className="px-3 py-2 font-medium">Mem</th>
                <th className="px-3 py-2 font-medium">Net</th>
                <th className="px-3 py-2 font-medium">Image</th>
                <th className="px-3 py-2 font-medium">Care</th>
                <th className="px-3 py-2 font-medium">Quote policy</th>
                <th className="px-3 py-2 font-medium">Partner ≥</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {skus.map((s) => (
                <tr key={s.id} data-testid={`portfolio-row-${s.id}`}>
                  <td className="px-3 py-2 font-medium">{s.display}</td>
                  <td className="px-3 py-2 mono text-[10.5px] text-muted-foreground">
                    {s.fullCode}
                  </td>
                  <td className="px-3 py-2">
                    {s.line} / {s.form}
                  </td>
                  <td className="px-3 py-2">{s.gpuRange ?? `${s.gpuCount}`}</td>
                  <td className="px-3 py-2">{s.memory}</td>
                  <td className="px-3 py-2">{s.network}</td>
                  <td className="px-3 py-2">{s.defaultImage}</td>
                  <td className="px-3 py-2">{s.defaultCare}</td>
                  <td className="px-3 py-2">{policyLabel(s.quotePolicy)}</td>
                  <td className="px-3 py-2">{s.partnerMinTier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <a href="#/products" data-testid="link-portfolio-to-pages">
            <CtaButton variant="primary" testId="button-portfolio-to-pages">
              Open product pages
            </CtaButton>
          </a>
          <a href="#/configurator" data-testid="link-portfolio-to-config">
            <CtaButton variant="outline" testId="button-portfolio-to-config">
              Open configurator
            </CtaButton>
          </a>
        </div>
      </Panel>
    </>
  );
}

function Tag({ children }: { children: any }) {
  return (
    <span className="mono rounded-sm border border-border bg-muted/40 px-1.5 py-0.5 text-[10px] uppercase tracking-widest text-foreground/80">
      {children}
    </span>
  );
}

function policyLabel(p: string) {
  return p === "quote_only"
    ? "Quote-only"
    : p === "guided_quote"
      ? "Guided quote"
      : "Published range";
}
