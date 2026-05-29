// LM Tek AI Hive — single source of truth for the cockpit prototype.
// All values are sample data lifted from the operating blueprint.

export type Stage =
  | "Discovery"
  | "Qualified"
  | "Validation"
  | "Proposal"
  | "Procurement"
  | "Closed Won"
  | "Closed Lost";

export type ProductLine = "50X" | "PRO" | "H2";

export type CareTier = "BasicCare" | "ProCare" | "DataCenterCare" | "MissionCare";

export type SoftwareImage = "DevKit" | "ProAI" | "EnterpriseAI" | "VDI/vGPU";

export type Sku = {
  id: string;
  display: string;
  fullCode: string;
  line: ProductLine;
  form: string;
  gpuCount: number | string;
  gpuRange?: string;
  cooling: "LQ" | "AIR";
  memory: string;
  storage: string;
  network: string;
  defaultImage: SoftwareImage;
  defaultCare: CareTier;
  priceBand: string;
  quotePolicy: "published_range" | "guided_quote" | "quote_only";
  partnerMinTier: "Authorized" | "Certified" | "Advanced" | "Elite";
  hero: boolean;
  headline: string;
  bestFor: string[];
  caveat?: string;
};

export const skus: Sku[] = [
  {
    id: "hive-50x-t2",
    display: "HIVE 50X-T2",
    fullCode: "HIVE-50X-T2-2-LQ-128G-4N-10G-BC",
    line: "50X",
    form: "T2",
    gpuCount: 2,
    gpuRange: "1x-8x cards",
    cooling: "LQ",
    memory: "128 GB",
    storage: "4 TB NVMe",
    network: "10 GbE",
    defaultImage: "DevKit",
    defaultCare: "BasicCare",
    priceBand: "Published range",
    quotePolicy: "published_range",
    partnerMinTier: "Authorized",
    hero: true,
    headline: "High-throughput local AI and rendering without cloud lock-in",
    bestFor: ["Diffusion + rendering", "Solo AI developers", "Render farms", "Cost-sensitive labs"],
    caveat: "50X line has no NVLink unified memory pool — do not claim unified VRAM.",
  },
  {
    id: "hive-pro-t2",
    display: "HIVE PRO-T2",
    fullCode: "HIVE-PRO-T2-2-LQ-256G-8N-25G-PC",
    line: "PRO",
    form: "T2",
    gpuCount: 2,
    gpuRange: "1x-8x cards",
    cooling: "LQ",
    memory: "256 GB",
    storage: "8 TB NVMe",
    network: "25 GbE",
    defaultImage: "ProAI",
    defaultCare: "ProCare",
    priceBand: "Published range",
    quotePolicy: "guided_quote",
    partnerMinTier: "Certified",
    hero: true,
    headline: "Departmental AI workstation for serious local models",
    bestFor: ["Departmental AI", "RAG and fine-tuning", "Local 70B-class inference", "AEC and VFX"],
  },
  {
    id: "hive-pro-t4",
    display: "HIVE PRO-T4",
    fullCode: "HIVE-PRO-T4-4-LQ-512G-16N-25G-PC",
    line: "PRO",
    form: "T4",
    gpuCount: 4,
    gpuRange: "1x-8x cards",
    cooling: "LQ",
    memory: "512 GB",
    storage: "16 TB NVMe",
    network: "25 GbE",
    defaultImage: "ProAI",
    defaultCare: "ProCare",
    priceBand: "Quote",
    quotePolicy: "guided_quote",
    partnerMinTier: "Certified",
    hero: true,
    headline: "The sweet spot for team-scale sovereign AI",
    bestFor: ["Team fine-tuning", "Mid-size inference clusters", "Research labs", "Departmental MLOps"],
  },
  {
    id: "hive-pro-r4",
    display: "HIVE PRO-R4",
    fullCode: "HIVE-PRO-R4-4-LQ-512G-16N-100G-DCC",
    line: "PRO",
    form: "R4",
    gpuCount: 4,
    gpuRange: "1x-8x cards",
    cooling: "LQ",
    memory: "512 GB",
    storage: "16 TB NVMe",
    network: "100 GbE",
    defaultImage: "EnterpriseAI",
    defaultCare: "DataCenterCare",
    priceBand: "Quote",
    quotePolicy: "guided_quote",
    partnerMinTier: "Advanced",
    hero: false,
    headline: "Rack-ready professional AI for controlled enterprise environments",
    bestFor: ["Enterprise AI services", "VDI/vGPU", "Banking analytics", "Regulated departmental AI"],
  },
  {
    id: "hive-pro-r8",
    display: "HIVE PRO-R8",
    fullCode: "HIVE-PRO-R8-8-LQ-1T-32N-100G-DCC",
    line: "PRO",
    form: "R8",
    gpuCount: 8,
    gpuRange: "1x-8x cards",
    cooling: "LQ",
    memory: "1 TB",
    storage: "32 TB NVMe",
    network: "100 GbE",
    defaultImage: "EnterpriseAI",
    defaultCare: "DataCenterCare",
    priceBand: "Quote",
    quotePolicy: "guided_quote",
    partnerMinTier: "Advanced",
    hero: false,
    headline: "Dense 8-GPU rack for MSP, VFX, and university scale",
    bestFor: ["MSP capacity", "VFX render", "University clusters", "Diffusion at scale"],
  },
  {
    id: "hive-h2-r4",
    display: "HIVE H2-R4",
    fullCode: "HIVE-H2-R4-4-LQ-1T-32N-400G-MC",
    line: "H2",
    form: "R4",
    gpuCount: 4,
    gpuRange: "1x-8x cards",
    cooling: "LQ",
    memory: "1 TB",
    storage: "32 TB NVMe",
    network: "400 GbE",
    defaultImage: "EnterpriseAI",
    defaultCare: "MissionCare",
    priceBand: "Quote-only",
    quotePolicy: "quote_only",
    partnerMinTier: "Elite",
    hero: true,
    headline: "Enterprise H200 platform for regulated high-memory AI",
    bestFor: ["Regulated enterprise AI", "≥400 GB unified memory", "Sovereign AI factory", "Multi-tenant inference"],
    caveat: "Quote-only. Requires SE technical approval and facility validation.",
  },
  {
    id: "hive-h2-r8",
    display: "HIVE H2-R8",
    fullCode: "HIVE-H2-R8-8-LQ-2T-64N-400G-MC",
    line: "H2",
    form: "R8",
    gpuCount: 8,
    gpuRange: "1x-8x cards",
    cooling: "LQ",
    memory: "2 TB",
    storage: "64 TB NVMe",
    network: "400 GbE",
    defaultImage: "EnterpriseAI",
    defaultCare: "MissionCare",
    priceBand: "Quote-only",
    quotePolicy: "quote_only",
    partnerMinTier: "Elite",
    hero: false,
    headline: "Sovereign AI factory node, 8x H200 with mission-grade support",
    bestFor: ["Sovereign AI programs", "Defense and government", "Banking risk + analytics", "Training-class workloads"],
    caveat: "Quote-only. Requires Elite partner or LM Tek-led delivery.",
  },
];

// ---------- Opportunities ----------

export type Opp = {
  id: string;
  account: string;
  vertical: string;
  region: string;
  stage: Stage;
  amount: number;
  closeDate: string;
  line: ProductLine;
  sku: string;
  competitor: string;
  meddpicc: number; // 0–100
  nextStep: string;
  owner: string;
  partner?: string;
  risk: "Low" | "Medium" | "High";
};

export const opportunities: Opp[] = [
  {
    id: "OPP-1042",
    account: "Banca Popolare Toscana",
    vertical: "Banking & Insurance",
    region: "IT",
    stage: "Proposal",
    amount: 412000,
    closeDate: "2026-02-14",
    line: "H2",
    sku: "hive-h2-r4",
    competitor: "AWS / Lambda Cloud",
    meddpicc: 78,
    nextStep: "DORA workshop with risk & ops on 15 Jan",
    owner: "M. Bianchi",
    partner: "Synthesis SI (Elite)",
    risk: "Medium",
  },
  {
    id: "OPP-1051",
    account: "Helmholtz Imaging Lab",
    vertical: "Universities & Research",
    region: "DE",
    stage: "Validation",
    amount: 168000,
    closeDate: "2026-03-04",
    line: "PRO",
    sku: "hive-pro-t4",
    competitor: "Lambda on-prem",
    meddpicc: 64,
    nextStep: "SE technical fit review — Llama 3.1 70B + diffusion",
    owner: "F. Keller",
    partner: "Direct",
    risk: "Low",
  },
  {
    id: "OPP-1062",
    account: "Norsk Skyfabrikk MSP",
    vertical: "MSP & GPU Cloud",
    region: "NO",
    stage: "Discovery",
    amount: 285000,
    closeDate: "2026-04-22",
    line: "PRO",
    sku: "hive-pro-r8",
    competitor: "Comino + Supermicro",
    meddpicc: 41,
    nextStep: "Density & cooling assessment site survey",
    owner: "I. Solberg",
    partner: "FjordIT (Advanced)",
    risk: "Medium",
  },
  {
    id: "OPP-1078",
    account: "Stadtwerke München Mobility",
    vertical: "Manufacturing",
    region: "DE",
    stage: "Qualified",
    amount: 96000,
    closeDate: "2026-02-28",
    line: "PRO",
    sku: "hive-pro-t2",
    competitor: "Dell / Lenovo",
    meddpicc: 55,
    nextStep: "Cloud bill review — Azure ML utilisation",
    owner: "F. Keller",
    partner: "Direct",
    risk: "Low",
  },
  {
    id: "OPP-1091",
    account: "Studio Octave VFX",
    vertical: "VFX & Render",
    region: "FR",
    stage: "Procurement",
    amount: 134000,
    closeDate: "2026-01-30",
    line: "50X",
    sku: "hive-50x-t2",
    competitor: "BOXX / Puget",
    meddpicc: 82,
    nextStep: "PO confirmation — pending procurement signature",
    owner: "C. Laurent",
    partner: "Direct",
    risk: "Low",
  },
  {
    id: "OPP-1108",
    account: "Sovrana Difesa Italia",
    vertical: "Government & Defense",
    region: "IT",
    stage: "Validation",
    amount: 920000,
    closeDate: "2026-05-12",
    line: "H2",
    sku: "hive-h2-r8",
    competitor: "DGX SuperPOD",
    meddpicc: 70,
    nextStep: "Facility survey + security clearance review",
    owner: "M. Bianchi",
    partner: "Synthesis SI (Elite)",
    risk: "High",
  },
  {
    id: "OPP-1115",
    account: "ClinicaRete Pharma",
    vertical: "Healthcare & Biotech",
    region: "ES",
    stage: "Discovery",
    amount: 220000,
    closeDate: "2026-04-08",
    line: "PRO",
    sku: "hive-pro-r4",
    competitor: "GCP Vertex AI",
    meddpicc: 38,
    nextStep: "Audit of GxP data residency requirements",
    owner: "C. Laurent",
    partner: "Iberian Compute (Certified)",
    risk: "Medium",
  },
  {
    id: "OPP-1124",
    account: "Boston AI Hive — Hibernia Bank",
    vertical: "Banking & Insurance",
    region: "IE",
    stage: "Proposal",
    amount: 305000,
    closeDate: "2026-02-20",
    line: "H2",
    sku: "hive-h2-r4",
    competitor: "Lambda Cloud",
    meddpicc: 72,
    nextStep: "Procurement security review with InfoSec",
    owner: "K. Murphy",
    partner: "Boston AI Hive (Elite)",
    risk: "Low",
  },
];

// ---------- Partners ----------

export type Partner = {
  name: string;
  tier: "Authorized" | "Certified" | "Advanced" | "Elite";
  region: string;
  certifiedTechs: number;
  ytdPipeline: number;
  ytdBookings: number;
  registeredDeals: number;
  permissions: string[];
};

export const partners: Partner[] = [
  {
    name: "Synthesis SI",
    tier: "Elite",
    region: "IT / EU South",
    certifiedTechs: 8,
    ytdPipeline: 2_180_000,
    ytdBookings: 940_000,
    registeredDeals: 6,
    permissions: ["50X / PRO / H2", "H200 quote authority", "MissionCare attach"],
  },
  {
    name: "Boston AI Hive",
    tier: "Elite",
    region: "UK / IE",
    certifiedTechs: 6,
    ytdPipeline: 1_410_000,
    ytdBookings: 520_000,
    registeredDeals: 4,
    permissions: ["50X / PRO / H2", "H200 quote authority", "VDI/vGPU"],
  },
  {
    name: "FjordIT",
    tier: "Advanced",
    region: "NO / SE / DK",
    certifiedTechs: 4,
    ytdPipeline: 740_000,
    ytdBookings: 280_000,
    registeredDeals: 3,
    permissions: ["50X / PRO up to R8", "DataCenterCare attach"],
  },
  {
    name: "Iberian Compute",
    tier: "Certified",
    region: "ES / PT",
    certifiedTechs: 2,
    ytdPipeline: 360_000,
    ytdBookings: 92_000,
    registeredDeals: 2,
    permissions: ["50X / PRO T1–T4", "ProCare attach"],
  },
  {
    name: "Helvetia GPU Lab",
    tier: "Certified",
    region: "CH / AT",
    certifiedTechs: 2,
    ytdPipeline: 220_000,
    ytdBookings: 0,
    registeredDeals: 1,
    permissions: ["50X / PRO T1–T4"],
  },
  {
    name: "Cracovia Systems",
    tier: "Authorized",
    region: "PL / CZ",
    certifiedTechs: 0,
    ytdPipeline: 120_000,
    ytdBookings: 0,
    registeredDeals: 1,
    permissions: ["50X T1–T2 referral only"],
  },
];

// ---------- Verticals ----------

export const verticalMap = [
  { vertical: "Banking & Insurance", pains: ["DORA", "AI Act", "data residency", "cloud GPU cost"], skus: ["hive-pro-t4", "hive-h2-r4"], motion: "Enterprise POC" },
  { vertical: "Sovereign AI Labs", pains: ["EU funding", "high-memory training", "data sovereignty"], skus: ["hive-h2-r4", "hive-h2-r8"], motion: "Strategic account" },
  { vertical: "Universities & Research", pains: ["model experimentation", "grants", "open-source stack"], skus: ["hive-pro-t4", "hive-50x-t2"], motion: "Direct + partner" },
  { vertical: "Healthcare & Biotech", pains: ["GxP", "GDPR", "imaging models"], skus: ["hive-pro-r4", "hive-h2-r4"], motion: "Enterprise consultative" },
  { vertical: "Manufacturing", pains: ["edge AI", "predictive maintenance", "OT isolation"], skus: ["hive-pro-t2", "hive-pro-r4"], motion: "Direct" },
  { vertical: "Telecom & Broadcast", pains: ["always-on inference", "latency", "VDI"], skus: ["hive-pro-r4", "hive-pro-r8"], motion: "Strategic" },
  { vertical: "VFX & Render", pains: ["throughput", "predictable cost", "local stack"], skus: ["hive-50x-t2", "hive-pro-t4"], motion: "Fast B2B" },
  { vertical: "AEC", pains: ["visualisation", "diffusion", "VDI"], skus: ["hive-50x-t2", "hive-pro-t2"], motion: "Fast B2B" },
  { vertical: "MSP & GPU Cloud", pains: ["density", "utilisation", "serviceability"], skus: ["hive-pro-r8", "hive-h2-r4"], motion: "Strategic account" },
  { vertical: "Government & Defense", pains: ["sovereignty", "clearance", "facility security"], skus: ["hive-h2-r4", "hive-h2-r8"], motion: "Gated enterprise" },
];

// ---------- KPIs ----------

export const execKpis = {
  bookingsQ: { actual: 4.62, target: 6.0, unit: "€M", trend: "+18% QoQ" },
  pipeline: { actual: 15.8, target: 20.0, unit: "€M", trend: "+9% QoQ" },
  activeSiPartners: { actual: 11, target: 16, unit: "", trend: "+3 YTD" },
  certifiedTechs: { actual: 22, target: 35, unit: "", trend: "+5 QoQ" },
  systemsShipped: { actual: 84, target: 120, unit: "", trend: "+27% YoY" },
  grossMargin: { actual: 34.2, target: 36, unit: "%", trend: "+1.4 pp" },
  careAttach: { actual: 71, target: 80, unit: "%", trend: "+6 pp" },
  kvarkSeats: { actual: 412, target: 600, unit: "", trend: "+88 QoQ" },
  winRateComino: { actual: 58, target: 65, unit: "%", trend: "+4 pp" },
  lambdaDisplaced: { actual: 6, target: 12, unit: "", trend: "+2 QoQ" },
  h200Qualified: { actual: 9, target: 14, unit: "", trend: "+3 QoQ" },
  risksOpen: { actual: 4, target: 0, unit: "", trend: "1 new this week" },
  decisionsBlocked: { actual: 3, target: 0, unit: "", trend: "1 overdue" },
};

export const pipelineByStage = [
  { stage: "Discovery", count: 14, value: 1.9 },
  { stage: "Qualified", count: 11, value: 2.6 },
  { stage: "Validation", count: 8, value: 4.1 },
  { stage: "Proposal", count: 6, value: 5.8 },
  { stage: "Procurement", count: 3, value: 1.4 },
];

export const bookingsByLine = [
  { line: "50X", value: 0.92 },
  { line: "PRO", value: 2.51 },
  { line: "H2", value: 1.19 },
];

// ---------- Risks & decisions ----------

export const risks = [
  { id: "R-01", title: "H200 facility approval criteria not finalised", owner: "PMO", prob: "Med", impact: "High", mitigation: "Lock site-survey checklist v1 by 31 Jan", status: "Open" },
  { id: "R-02", title: "Certified technician pipeline below target", owner: "Channel", prob: "Med", impact: "Med", mitigation: "Two cohorts of EK + LM Tek cooling certification in Q1", status: "Open" },
  { id: "R-03", title: "PRO substitution for A6000 not yet announced externally", owner: "Product", prob: "High", impact: "Med", mitigation: "Communicate transition language with all partners by 21 Jan", status: "Open" },
  { id: "R-04", title: "Insurance cover for liquid cooling thermal events", owner: "Finance", prob: "Low", impact: "High", mitigation: "Broker quotes due 14 Feb", status: "Open" },
];

export const decisions = [
  { id: "D-01", title: "AI Hive brand consolidation across Boston AI Hive and EU pages", owner: "CEO", deadline: "2026-01-22", status: "Decision pending" },
  { id: "D-02", title: "PRO substitution for A6000 default in public catalog", owner: "Product Ops", deadline: "2026-01-15", status: "Overdue" },
  { id: "D-03", title: "Public price policy for T1/T2 systems", owner: "CRO", deadline: "2026-02-05", status: "Decision pending" },
  { id: "D-04", title: "HubSpot as sales system of record", owner: "Rev Ops", deadline: "2026-01-30", status: "Decision pending" },
  { id: "D-05", title: "Demo lab investment scope (Milan + Dublin)", owner: "CEO", deadline: "2026-02-15", status: "Decision pending" },
  { id: "D-06", title: "Lambda migration campaign budget", owner: "Marketing", deadline: "2026-02-12", status: "Approved" },
];

// ---------- Software & Care ----------

export const softwareImages: { id: SoftwareImage; tagline: string; includes: string[] }[] = [
  { id: "DevKit", tagline: "Lean dev image for solo and lab use", includes: ["Ubuntu LTS + CUDA", "PyTorch, JAX, vLLM", "Open-source model zoo"] },
  { id: "ProAI", tagline: "Departmental AI workspace, KVARK-ready", includes: ["DevKit baseline", "KVARK trial", "Ray + MLflow", "Identity + project quotas"] },
  { id: "EnterpriseAI", tagline: "NVIDIA AI Enterprise stack with full audit", includes: ["NVIDIA AI Enterprise license", "Triton + NIM", "Audit logging", "Air-gap option"] },
  { id: "VDI/vGPU", tagline: "Multi-tenant graphics and AI VDI", includes: ["NVIDIA vGPU", "Citrix / Omnissa profiles", "Per-seat allocation"] },
];

export const careTiers: { id: CareTier; sla: string; coverage: string }[] = [
  { id: "BasicCare", sla: "Next business day, EU depot", coverage: "Hardware + cooling fluid replacement, 1 yr" },
  { id: "ProCare", sla: "4-hour business response, 3 yr", coverage: "Hardware, cooling, software image, partner-assisted" },
  { id: "DataCenterCare", sla: "Same-day onsite, 24×7", coverage: "Rack-aware spares kit, EK cooling validation" },
  { id: "MissionCare", sla: "1-hour critical response, named SE", coverage: "H200 platforms, facility audit, escalation hotline" },
];

// ---------- Competitor battlecards ----------

export const battlecards = [
  {
    competitor: "Comino",
    wedge: "Local EU support, KVARK option, EU partner ecosystem, lead-time discipline",
    pains: ["Long lead times", "Limited EU service footprint", "Software image gap"],
    handlers: [
      "We deliver in Italy and DACH with EK Fluid Works-grade cooling — same liquid discipline, more service density.",
      "KVARK gives you a packaged AI workspace; Comino leaves software stack to the customer.",
    ],
  },
  {
    competitor: "AWS / Azure / GCP / Lambda Cloud",
    wedge: "Utilisation break-even, DORA, data residency, hybrid honesty",
    pains: ["Egress cost", "Audit complexity", "Unpredictable bills"],
    handlers: [
      "Above ~30% utilisation, owning capacity beats renting on a 3-year TCO basis.",
      "Below ~30% utilisation, we recommend cloud or hybrid and route to our hybrid pattern.",
    ],
  },
  {
    competitor: "Dell / HP / Lenovo",
    wedge: "Liquid cooling discipline, EU AI focus, configurator-led",
    pains: ["Generic configs", "Limited liquid options", "No AI-specific software image"],
    handlers: [
      "Our SKUs are workload-validated, not catalog-sliced from an enterprise server line.",
      "Powered by EK Fluid Works gives sustained performance under multi-hour training runs.",
    ],
  },
  {
    competitor: "Lambda on-prem",
    wedge: "Migration mapping and orphan-risk reduction",
    pains: ["On-prem support uncertainty", "US-anchored service", "GPU topology gaps"],
    handlers: [
      "We map Vector / Scalar / Hyperplane to PRO and H2 equivalents in a single workshop.",
      "EU warranty and EU spares pool reduce orphan risk for regulated buyers.",
    ],
  },
  {
    competitor: "DGX Spark / DGX Station",
    wedge: "Feeder narrative, procurement speed, price-performance",
    pains: ["Long procurement cycles", "Premium pricing", "Vendor-managed stack"],
    handlers: [
      "PRO-T4 and H2-R4 give you 80% of DGX outcomes at faster procurement and EU local support.",
      "Use AI Hive as the feeder platform before scaling into DGX where genuinely justified.",
    ],
  },
];

// ---------- Configurator rules (lifted from blueprint) ----------

export type ConfigOutput = {
  recommendedSkuId: string;
  rationale: string[];
  warnings: string[];
  softwareImage: SoftwareImage;
  careTier: CareTier;
  quoteOnly: boolean;
  requiresSeApproval: boolean;
  partnerMinTier: string;
  proposalBlock: string;
};

export type ConfigInput = {
  workload: string;
  modelSize: string; // "small (<13B)" | "medium (13–70B)" | "large (>70B, >400GB unified)"
  concurrency: string;
  environment: string;
  compliance: string;
  software: SoftwareImage;
  careTier: CareTier;
  budgetBand: string;
  timing: string;
  gpuRequest: string;
};
