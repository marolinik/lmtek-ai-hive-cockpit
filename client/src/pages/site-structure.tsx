import { useState } from "react";
import { PageHeader } from "@/components/CockpitShell";
import { Panel, StatusChip } from "@/components/primitives";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  FileJson,
  FileCog,
} from "lucide-react";

type Node = {
  name: string;
  kind: "dir" | "md" | "yml" | "json" | "spec";
  children?: Node[];
  desc?: string;
};

const tree: Node = {
  name: "ai-hive-site",
  kind: "dir",
  children: [
    { name: "README.md", kind: "md", desc: "Folder overview and update rules" },
    {
      name: "content",
      kind: "dir",
      desc: "Approved human-readable content",
      children: [
        { name: "navigation.yml", kind: "yml" },
        { name: "home.md", kind: "md" },
        {
          name: "category",
          kind: "dir",
          children: [
            { name: "ai-hive.md", kind: "md" },
            { name: "sovereign-ai.md", kind: "md" },
            { name: "cloud-vs-local-tco.md", kind: "md" },
            { name: "local-ai-models.md", kind: "md" },
            { name: "lambda-migration.md", kind: "md" },
          ],
        },
        {
          name: "products",
          kind: "dir",
          children: [
            {
              name: "50x",
              kind: "dir",
              children: ["t1", "t2", "t4", "t8", "r4", "r8"].map((f) => ({
                name: `50x-${f}.md`,
                kind: "md" as const,
              })),
            },
            {
              name: "pro",
              kind: "dir",
              children: ["t1", "t2", "t4", "t8", "r4", "r8"].map((f) => ({
                name: `pro-${f}.md`,
                kind: "md" as const,
              })),
            },
            {
              name: "h2",
              kind: "dir",
              children: ["r1", "r2", "r4", "r8"].map((f) => ({
                name: `h2-${f}.md`,
                kind: "md" as const,
              })),
            },
          ],
        },
        {
          name: "solutions",
          kind: "dir",
          children: [
            "banking-insurance",
            "sovereign-ai-labs",
            "telecom-broadcast",
            "healthcare-biotech-pharma",
            "manufacturing",
            "universities-research",
            "vfx-render",
            "aec",
            "msp-gpu-cloud",
            "government-defense",
          ].map((f) => ({ name: `${f}.md`, kind: "md" as const })),
        },
        {
          name: "partners",
          kind: "dir",
          children: [
            { name: "partner-program.md", kind: "md" },
            { name: "deal-registration.md", kind: "md" },
            { name: "certification.md", kind: "md" },
          ],
        },
        {
          name: "resources",
          kind: "dir",
          children: [
            { name: "tco-guide.md", kind: "md" },
            { name: "model-fit-guide.md", kind: "md" },
            { name: "liquid-cooling-guide.md", kind: "md" },
            { name: "procurement-guide.md", kind: "md" },
            { name: "ai-act-readiness.md", kind: "md" },
          ],
        },
      ],
    },
    {
      name: "pages",
      kind: "dir",
      desc: "Route-level page composition",
      children: [
        { name: "ai-hive.md", kind: "md" },
        { name: "configurator.md", kind: "md" },
        { name: "tco.md", kind: "md" },
        { name: "workstations.md", kind: "md" },
        { name: "servers.md", kind: "md" },
        { name: "partners.md", kind: "md" },
        { name: "resources.md", kind: "md" },
      ],
    },
    {
      name: "components",
      kind: "dir",
      desc: "Reusable LM Tek shell + AI Hive blocks",
      children: [
        "lmtek-shell",
        "ai-hive-hero",
        "product-card",
        "sku-spec-table",
        "model-fit-matrix",
        "configurator-step",
        "tco-block",
        "partner-cta",
        "compliance-badges",
        "powered-by-ek",
        "kvark-bundle",
        "care-tier-table",
      ].map((c) => ({ name: `${c}.md`, kind: "md" as const })),
    },
    {
      name: "data",
      kind: "dir",
      desc: "Structured source-of-truth used by pages and configurator",
      children: [
        "sku-catalog",
        "configurator-rules",
        "price-bands",
        "model-compatibility",
        "vertical-map",
        "partner-tiers",
        "care-tiers",
        "software-images",
        "competitors",
        "faq-bank",
      ].map((d) => ({ name: `${d}.json`, kind: "json" as const })),
    },
    {
      name: "sales-tools",
      kind: "dir",
      desc: "Internal and partner-ready enablement assets",
      children: [
        {
          name: "one-pagers",
          kind: "dir",
          children: [
            "ai-hive-overview",
            "pro-line-one-pager",
            "h200-enterprise-one-pager",
            "lambda-migration-one-pager",
          ].map((c) => ({ name: `${c}.md`, kind: "md" as const })),
        },
        {
          name: "battlecards",
          kind: "dir",
          children: ["comino", "cloud", "dell-hp-lenovo", "lambda", "dgx"].map(
            (c) => ({ name: `${c}.md`, kind: "md" as const }),
          ),
        },
        {
          name: "scripts",
          kind: "dir",
          children: [
            "discovery-questions",
            "objection-handling",
            "cloud-bill-review",
            "demo-follow-up",
          ].map((c) => ({ name: `${c}.md`, kind: "md" as const })),
        },
        {
          name: "quote-blocks",
          kind: "dir",
          children: [
            "executive-summary",
            "technical-assumptions",
            "facility-requirements",
            "care-tier-language",
            "kvark-option",
          ].map((c) => ({ name: `${c}.md`, kind: "md" as const })),
        },
        {
          name: "poc-templates",
          kind: "dir",
          children: ["poc-plan", "success-criteria", "validation-report"].map(
            (c) => ({ name: `${c}.md`, kind: "md" as const }),
          ),
        },
      ],
    },
    {
      name: "cockpit",
      kind: "dir",
      desc: "Product requirements and operational specs",
      children: [
        "product-requirements",
        "data-model",
        "user-roles",
        "workflows",
        "dashboard-spec",
        "configurator-spec",
        "partner-portal-spec",
      ].map((c) => ({ name: `${c}.md`, kind: "spec" as const })),
    },
    {
      name: "governance",
      kind: "dir",
      desc: "Update rules, approvals, SEO map, risk, decisions",
      children: [
        "style-guide",
        "seo-map",
        "content-workflow",
        "update-cadence",
        "qa-checklist",
        "decision-log",
        "risk-register",
      ].map((c) => ({ name: `${c}.md`, kind: "md" as const })),
    },
  ],
};

const connections = [
  {
    from: "data/sku-catalog.json",
    to: "Product pages, configurator, partner assets",
    why: "One SKU truth — every quote, page, and partner asset pulls from this file.",
  },
  {
    from: "data/configurator-rules.json",
    to: "Configurator widget, partner configurator, internal quote builder",
    why: "Recommendation logic and guardrails (1x-8x GPU scaling, 50X no-NVLink unified VRAM, H200 quote-only) live here.",
  },
  {
    from: "content/products/**",
    to: "Public product pages + sales one-pagers",
    why: "Marketing pages and quote blocks both render from the same product markdown.",
  },
  {
    from: "sales-tools/**",
    to: "Partner portal asset library",
    why: "Battlecards, discovery, proposal blocks, and POC templates remain structured assets, but are not exposed as a cockpit module in this version.",
  },
  {
    from: "cockpit/**",
    to: "Configurator, product pages, TCO studio, partner portal",
    why: "Product requirements + workflow specs version-controlled with the rest of the site.",
  },
  {
    from: "governance/**",
    to: "All other folders",
    why: "Update cadence, SEO map, QA checklist, risk register, and decision log govern every other change.",
  },
];

export default function SiteStructure() {
  return (
    <>
      <PageHeader
        eyebrow="SIT · AI Hive site structure"
        title="/ai-hive-site/ — one folder, three jobs"
        description="Public website, sales cockpit, and partner enablement stay aligned by reading from one folder. Content for humans, data for systems, sales-tools for enablement, cockpit for ops, governance for control."
        actions={<StatusChip tone="cyan">Proposed layout</StatusChip>}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.1fr_1fr]">
        <Panel title="Folder tree" testId="panel-folder-tree">
          <TreeView node={tree} depth={0} initiallyOpen />
        </Panel>

        <div className="space-y-4">
          <Panel title="How folders connect" testId="panel-connections">
            <ul className="space-y-3">
              {connections.map((c) => (
                <li
                  key={c.from}
                  className="rounded-sm border border-border bg-card p-3 text-[12.5px]"
                >
                  <div className="mono text-[11px] text-hive-cyan">{c.from}</div>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <ChevronRight className="h-3 w-3" /> {c.to}
                  </div>
                  <div className="mt-1.5 text-foreground/90">{c.why}</div>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Folder rules" testId="panel-folder-rules">
            <ul className="space-y-2 text-[12.5px]">
              <Rule k="content/" v="Approved human-readable content for the public site." />
              <Rule k="data/" v="Structured source-of-truth used by pages, configurator, sales tools." />
              <Rule k="sales-tools/" v="Internal and partner-ready enablement assets." />
              <Rule k="cockpit/" v="Product requirements and operational specs for the sales cockpit app." />
              <Rule k="governance/" v="Update rules, approvals, SEO map, risk, decision tracking." />
            </ul>
          </Panel>
        </div>
      </div>
    </>
  );
}

function Rule({ k, v }: { k: string; v: string }) {
  return (
    <li className="flex gap-2">
      <span className="mono shrink-0 rounded-sm border border-hive-cyan/40 bg-hive-cyan/10 px-1.5 py-0.5 text-[10px] uppercase tracking-widest text-hive-cyan">
        {k}
      </span>
      <span>{v}</span>
    </li>
  );
}

function TreeView({
  node,
  depth,
  initiallyOpen = false,
}: {
  node: Node;
  depth: number;
  initiallyOpen?: boolean;
}) {
  const [open, setOpen] = useState(initiallyOpen || depth < 1);
  const Icon =
    node.kind === "dir"
      ? open
        ? FolderOpen
        : Folder
      : node.kind === "json"
        ? FileJson
        : node.kind === "spec"
          ? FileCog
          : node.kind === "yml"
            ? FileCode
            : FileText;

  const isDir = node.kind === "dir";

  return (
    <div data-testid={`tree-${node.name}`}>
      <button
        onClick={() => isDir && setOpen(!open)}
        className={`flex w-full items-center gap-1.5 rounded-sm px-1.5 py-1 text-left text-[12.5px] hover-elevate ${
          isDir ? "font-medium" : ""
        }`}
        style={{ paddingLeft: `${depth * 14 + 6}px` }}
      >
        {isDir ? (
          open ? (
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          )
        ) : (
          <span className="inline-block h-3 w-3" />
        )}
        <Icon
          className={`h-3.5 w-3.5 ${
            isDir ? "text-hive-cyan" : "text-muted-foreground"
          }`}
        />
        <span className={isDir ? "" : "mono text-foreground/85"}>
          {node.name}
        </span>
        {node.desc && (
          <span className="ml-2 truncate text-[10.5px] text-muted-foreground">
            — {node.desc}
          </span>
        )}
      </button>
      {open && node.children && (
        <div>
          {node.children.map((c) => (
            <TreeView key={c.name} node={c} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
