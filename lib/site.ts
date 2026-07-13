/* ----------------------------------------------------------------------------
   Central content + config for the ShieldSync company website.
   Keep copy here so pages stay clean and content is editable in one place.
---------------------------------------------------------------------------- */

import { applyLabSettings } from "./lab-settings";

export const SITE = {
  name: "ShieldSync",
  nameFull: "ShieldSync Security",
  legalName: "ShieldSync Security Private Limited",
  tagline: "Empowering Cybersecurity Futures",
  shortDesc:
    "A global cybersecurity company securing the cloud and building the talent that defends it.",
  description:
    "ShieldSync is a global cybersecurity company. We help businesses secure their cloud and help professionals build real, job-ready security skills through hands-on services, training, and labs.",
  url: "https://shieldsyncsecurity.com",
  labsUrl: "https://labs.shieldsyncsecurity.com",
  // B2B hiring-assessment product — employers test candidates on real cloud
  // security tasks in isolated AWS accounts. Separate app (enterprise. subdomain).
  enterpriseUrl: "https://enterprise.shieldsyncsecurity.com",
  // The guided wizard (plan/lab chooser) — used by the PAID path (Explore → lab detail).
  // Track slugs are descriptive (owner, 2026-07-07): aws-security-labs,
  // ai-security-labs, azure-security-labs, soc-labs, free-security-labs
  // (legacy short values aws/soc still accepted by the launcher).
  startUrl: "/labs-wizard?track=aws-security-labs",
  // Every "Start free lab" CTA routes through the wizard's free view (owner,
  // 2026-07-10: free/paid is surfaced ONLY via the wizard, uniformly across every
  // track). The free view lists the live free labs; the learner picks one and
  // launches it on the platform. There are no standalone /free-labs pages anymore.
  freeLabUrl: "/labs-wizard?track=free-security-labs",
} as const;

export const CONTACT = {
  email: "info@shieldsyncsecurity.com",
  phoneDisplay: "+91 97174 33114",
  phoneHref: "tel:+919717433114",
  whatsappHref: "https://wa.me/919717433114",
  addressLine: "Noida, Uttar Pradesh, India",
  addressNote: "Registered: ShieldSync Security Private Limited",
} as const;

export type NavItem = { label: string; href: string };

// Top-nav (Model B — audience-first, owner call 2026-07-07). TWO doors matching
// the homepage fork: "Businesses" (services + hiring assessments)
// and "Learners" (labs + certification + foundation program), plus Blog. Both doors are
// dropdowns (BUSINESSES_MENU / LEARNERS_MENU below, rendered by site-header).
// The labs USP stays instantly reachable via the header's primary
// "Start free lab" button — if that button ever goes away, Labs must return to
// the top level. Contact is covered by the "Book a call" button.
export const NAV: NavItem[] = [
  { label: "Businesses", href: "/services" },
  { label: "Learners", href: "/labs-wizard" },
  { label: "Security Blog", href: "/blog" },
];

/* Social proof ---------------------------------------------------------------- */

export const SOCIAL_PROOF = {
  count: "100+",
  label: "learners and teams trained with ShieldSync",
};

/* Services -------------------------------------------------------------------- */

export type Service = {
  icon: "cloud" | "shield" | "flask" | "compliance" | "cap" | "radar" | "code" | "lock";
  title: string;
  desc: string;
  points: string[];
  href: string;
  featured?: boolean;
};

export const SERVICES: Service[] = [
  {
    icon: "cloud",
    title: "Cloud & Infrastructure Security",
    desc: "Practitioner-led security for your cloud and the infrastructure under it — AWS, Azure, and GCP plus on-premise — reviewed and hardened against real attack paths, not checklists.",
    points: ["Cloud misconfiguration & IAM review", "Network, identity & data-exposure hardening", "Prioritized, fix-first remediation"],
    href: "/services/cloud-infrastructure-security",
    featured: true,
  },
  {
    icon: "radar",
    title: "SOC & Managed Detection",
    desc: "Around-the-clock threat monitoring, hunting, and incident response — so attacks are detected and contained in real time, not discovered weeks later.",
    points: ["24/7 threat monitoring & hunting", "SIEM / SOAR detection engineering", "Incident response & containment"],
    href: "/services/soc-managed-detection",
  },
  {
    icon: "code",
    title: "Application Security & DevSecOps",
    desc: "Build security into the SDLC — secure code from design to deploy, with controls wired into your pipelines instead of bolted on at the end.",
    points: ["Secure SDLC & threat modeling", "SAST / DAST & dependency scanning", "CI/CD pipeline & IaC security"],
    href: "/services/application-security-devsecops",
  },
  {
    icon: "lock",
    title: "Advanced & Emerging Security",
    desc: "Next-generation defense for a shifting threat landscape — AI and LLM security, Zero Trust architecture, and continuous attack-surface management.",
    points: ["AI & LLM security (security for AI)", "Zero Trust architecture", "Attack-surface management"],
    href: "/services/advanced-emerging-security",
  },
  {
    icon: "compliance",
    title: "Governance, Risk & Compliance",
    desc: "Get audit-ready against the frameworks your customers ask about — with risk assessments, control mapping, and evidence, not paperwork.",
    points: ["SOC 2 & ISO 27001 readiness", "GDPR & DPDP data protection", "Risk assessments & control mapping"],
    href: "/services/governance-risk-compliance",
  },
  {
    icon: "flask",
    title: "Labs-as-a-Service",
    desc: "Managed, real-world cyber ranges your team launches on demand — cloud security, SIEM, and SOAR scenarios in isolated environments.",
    points: ["AWS security scenarios", "SIEM detection labs", "SOAR automation labs"],
    href: "/labs-wizard?track=aws-security-labs",
  },
];

/* (The old per-product header dropdowns — SERVICES_MENU / LABS_MENU /
   CERTIFICATIONS_MENU — were deleted 2026-07-08 after the Model B audience-first
   nav made them unreferenced. See BUSINESSES_MENU / LEARNERS_MENU below; the
   old arrays live in git history if a product-first nav ever returns.) */

/* Why ShieldSync -------------------------------------------------------------- */

export type Why = { title: string; desc: string };

export const WHY: Why[] = [
  {
    title: "Global by design",
    desc: "Built for learners and teams worldwide. Remote-first delivery, English-first content, and pricing that works across markets.",
  },
  {
    title: "Real environments, not theory",
    desc: "Everything we teach and test runs in managed, production-like cloud — the same surfaces real attackers and defenders work on.",
  },
  {
    title: "Multi-framework compliance",
    desc: "Fluent across SOC 2, ISO 27001, GDPR, PCI DSS, and DPDP — so security work maps cleanly to the audits that matter to you.",
  },
  {
    title: "Built by practitioners",
    desc: "Working cloud and security engineers build the labs and teach the training. You get senior, hands-on depth — not a content mill.",
  },
];

/* Audience dropdowns (header, Model B) ---------------------------------------- */

// KEEP THESE SHORT (owner, 2026-07-07: "so many links"). One row per offering
// category — the detail lives on the landing pages, not in the menu.

// "Businesses" door — 2 rows (corporate training removed 2026-07-08, owner:
// "we don't do that"). The five individual service pages are listed on
// /services; do NOT spread SERVICES_MENU here again.
export const BUSINESSES_MENU: { label: string; desc: string; href: string; tag?: string }[] = [
  { label: "Security Services", desc: "Assessments, SOC, AppSec, GRC — practitioner-led", href: "/services" },
  { label: "Hiring Assessments", desc: "Test candidates on real cloud-security tasks before you hire", href: SITE.enterpriseUrl },
];

// "Learners" door — ALL FOUR tracks in flagship order (owner call 2026-07-07:
// AI -> AWS -> Azure -> SOC; Azure/SOC stay listed even pre-launch), then the
// free funnel, certification prep, and internship.
export const LEARNERS_MENU: { label: string; desc: string; href: string; tag?: string }[] = [
  // Every track row leads into the WIZARD funnel with a descriptive ?track=
  // slug (owner, 2026-07-07); the catalog/SEO pages stay, linked elsewhere.
  { label: "AI Security", desc: "Secure Bedrock, LLM apps & agents — free hands-on lab live", href: "/labs-wizard?track=ai-security-labs", tag: "Flagship" },
  { label: "AWS Security Labs", desc: "Cloud security in real AWS — pick a lab or go monthly", href: "/labs-wizard?track=aws-security-labs" },
  { label: "Azure Security Labs", desc: "Cloud security in real Azure — storage exposure & more", href: "/labs-wizard?track=azure-security-labs", tag: "Coming soon" },
  { label: "SOC Labs", desc: "Blue-team detection & response — SIEM & SOAR", href: "/labs-wizard?track=soc-labs", tag: "Coming soon" },
  // Free labs aren't a separate row — every track leads into the wizard, whose
  // free view is the single place free/paid is surfaced (owner, 2026-07-10).
  // Foundation Program removed from nav + hidden 2026-07-10 (owner); page still
  // exists at /cybersecurity-foundation-program but is noindexed + unlinked.
];

/* Cybersecurity Foundation Program (dedicated page) ---------------------------
   Renamed from "Cybersecurity Internship" (owner call 2026-07-07): charging
   ₹9,999 for something called an internship read as pay-to-intern; the honest
   category is a beginner training program. The PAGE still intercepts
   "cybersecurity internship" searches with an explicit why-not-an-internship
   line — keep that framing. Const name FOUNDATION_PROGRAM kept (internal only). */

export const FOUNDATION_PROGRAM = {
  badge: "Limited seats",
  title: "Cybersecurity Foundation Program",
  subtitle: "From motivated to job-ready in 8 weeks.",
  price: "₹9,999",
  priceNote: "all-inclusive · certificate included",
  summary:
    "A focused, hands-on foundation program in cloud and cybersecurity — real projects, real AWS labs, and 1:1 mentorship that prepares you for an actual security role.",
  whatYouGet: [
    "8-week structured program",
    "Hands-on AWS & cloud security projects",
    "1:1 career mentorship",
    "Access to real cyber-range labs",
    "Certificate from ShieldSync Security Private Limited",
    "Resume, portfolio & interview guidance",
  ],
  workOn: [
    {
      title: "Cloud security projects",
      desc: "Audit and harden real AWS environments — IAM, S3, encryption, and logging — the way working security teams do.",
    },
    {
      title: "Hands-on labs",
      desc: "Practice in managed cyber ranges instead of slides, building the skills employers actually test for.",
    },
    {
      title: "Detection & response",
      desc: "Get exposure to SIEM and SOAR workflows so you understand the blue-team picture end to end.",
    },
  ],
  forWho: [
    "Students and final-year graduates",
    "Career-changers entering cybersecurity",
    "Early-career IT professionals moving into cloud security",
  ],

  // Time commitment + what the certificate actually is (answers the two
  // questions every prospect asks: "what will I learn?" and "what cert?").
  commitment: "8 weeks · ~10–15 hrs/week · remote · 1:1 mentorship",
  certificate: {
    title: "ShieldSync Cybersecurity Foundation Program — Completion Certificate",
    detail:
      "Issued by ShieldSync Security Private Limited on completing the capstone. It verifies hands-on cloud security work in real AWS accounts — not attendance.",
    examReadiness:
      "The curriculum maps to the AWS Security Specialty (SCS-C03) exam domains, so you finish exam-ready. The AWS certification itself is sat separately with AWS — we prepare you for it, we don't issue it.",
  },

  // Week-by-week guided plan. Each week = a focus, what you learn, and the
  // hands-on deliverable that goes into your portfolio.
  curriculum: [
    {
      week: "Week 1",
      title: "Foundations & the security mindset",
      focus: "Get fluent in the cloud + the attacker's-eye view.",
      learn: [
        "Cloud, Linux & networking essentials for security",
        "How an AWS account is structured (regions, services, billing)",
        "Reading the shared-responsibility model the way auditors do",
        "Setting up your own AWS account safely",
      ],
      project: "Stand up a clean AWS account with billing alarms and a baseline security checklist.",
    },
    {
      week: "Week 2",
      title: "Identity & Access Management (IAM)",
      focus: "The control plane every breach goes through.",
      learn: [
        "IAM users, roles, policies & policy evaluation logic",
        "Least privilege, permissions boundaries & conditions",
        "Trust policies, cross-account access & the confused-deputy problem",
        "Spotting and closing privilege-escalation paths",
      ],
      project: "Complete the IAM privilege-escalation lab — find the path to admin, prove it, then remediate.",
    },
    {
      week: "Week 3",
      title: "Data protection",
      focus: "Stop the leaks that make headlines.",
      learn: [
        "S3 security — public buckets, ACLs, bucket policies, Block Public Access",
        "Encryption with KMS — keys, key policies vs IAM, grants",
        "Secrets management & in-transit encryption (TLS-only)",
        "Data classification & lifecycle (Object Lock, versioning)",
      ],
      project: "Complete the S3 misconfiguration lab — find and fix public buckets, missing encryption, and over-broad access.",
    },
    {
      week: "Week 4",
      title: "Network security",
      focus: "Control what can reach what.",
      learn: [
        "VPC design — subnets, route tables, NAT",
        "Security groups vs NACLs (and the trick questions)",
        "VPC endpoints & endpoint policies to keep traffic private",
        "Edge protection — WAF and Shield basics",
      ],
      project: "Lock down an exposed service so it's reachable only over a private S3 endpoint with a restrictive policy.",
    },
    {
      week: "Week 5",
      title: "Logging, monitoring & detection",
      focus: "See the attack while it's happening.",
      learn: [
        "CloudTrail — management vs data events, multi-region trails",
        "CloudWatch metric filters → alarms",
        "GuardDuty findings & Security Hub aggregation",
        "Querying CloudTrail history with Athena",
      ],
      project: "Build a detection pipeline: a suspicious action triggers a CloudWatch alarm and a notification.",
    },
    {
      week: "Week 6",
      title: "Incident response & forensics",
      focus: "What to do when the alert fires.",
      learn: [
        "The IR runbook order — isolate, preserve, investigate, eradicate, recover",
        "Containing a compromised instance / revoking sessions",
        "Capturing forensic evidence before teardown",
        "Reconstructing a breach timeline from CloudTrail + Athena",
      ],
      project: "Walk a simulated key-compromise end to end and write a short incident report.",
    },
    {
      week: "Week 7",
      title: "Governance, compliance & emerging risk",
      focus: "Make security provable — and look ahead.",
      learn: [
        "AWS Organizations, OUs & Service Control Policies (guardrails)",
        "AWS Config & conformance packs for continuous compliance",
        "Mapping controls to SOC 2 / ISO 27001 / GDPR / DPDP",
        "Intro to AI/LLM security — where the field is heading",
      ],
      project: "Apply org-level guardrails (e.g. a region-lock SCP) and map five controls to a compliance framework.",
    },
    {
      week: "Week 8",
      title: "Capstone, portfolio & career",
      focus: "Turn 7 weeks of work into a job.",
      learn: [
        "Assess a mock environment end to end, like a real engagement",
        "Write a professional findings report with prioritised remediation",
        "Build a GitHub portfolio from your lab work",
        "Resume, LinkedIn & mock interview; your cert roadmap",
      ],
      project: "Deliver a full capstone assessment + report, and present it in a 1:1 review — your completion milestone.",
    },
  ],
};

/* Footer nav groups ----------------------------------------------------------- */

// Three balanced footer columns (≈4 links each) → rendered as: Brand · Explore ·
// Learn · Company · Get-in-touch. Keep the groups roughly even so the footer
// reads as a clean grid, not a lopsided one.
export const FOOTER_NAV: { heading: string; links: NavItem[] }[] = [
  {
    heading: "Explore",
    links: [
      { label: "Services", href: "/services" },
      { label: "AI Security", href: "/ai-security" },
      { label: "Hands-on Labs", href: "/labs-wizard?track=aws-security-labs" },
      { label: "Hiring Assessments", href: SITE.enterpriseUrl },
    ],
  },
  {
    heading: "Learn",
    links: [
      { label: "Start here", href: "/start-here" },
      { label: "Security Blog", href: "/blog" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/* Learning roadmap ("Start here") -------------------------------------------- */

export type RoadmapStage = {
  step: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "SOC";
  track: "aws" | "soc";
  title: string;
  goal: string;
  skills: string[];
  time: string;
};

export const ROADMAP: RoadmapStage[] = [
  {
    step: "01",
    level: "Beginner",
    track: "aws",
    title: "Cloud Security Foundations",
    goal: "Lock down the basics attackers go for first — and stop being scared of the AWS console.",
    skills: [
      "IAM least-privilege & policy analysis",
      "Find & fix public S3 exposure",
      "Security groups & network basics",
      "Turn on and actually read CloudTrail",
      "Root / MFA hardening & KMS basics",
    ],
    time: "~1–2 weeks",
  },
  {
    step: "02",
    level: "Intermediate",
    track: "aws",
    title: "Detect & Defend",
    goal: "Spot and stop an attack inside a live AWS account.",
    skills: [
      "Trigger & triage threat-detection findings",
      "Hunt threats in VPC flow logs",
      "Auto-remediate misconfig with Config",
      "Exploit & contain an IMDS / SSRF flaw",
      "Vulnerability scanning & secrets exposure",
    ],
    time: "~2–3 weeks",
  },
  {
    step: "03",
    level: "Advanced",
    track: "aws",
    title: "Attack, Detect, Respond",
    goal: "Run a full breach-and-incident-response the way a real engineer does.",
    skills: [
      "Multi-tier breach + incident response",
      "Privilege-escalation chains (and detection)",
      "Write & validate detection rules",
      "Container / Kubernetes security",
      "CloudTrail forensics & timeline reconstruction",
    ],
    time: "~3–4 weeks",
  },
  {
    step: "04",
    level: "SOC",
    track: "soc",
    title: "Round out the SOC — SIEM & SOAR",
    goal: "Complete the blue-team picture: detection at scale and automated response.",
    skills: [
      "Detection engineering & rule tuning",
      "Log analysis & threat hunting",
      "Automated response playbooks",
      "Alert enrichment & case workflows",
    ],
    time: "~2 weeks",
  },
];

export const ROADMAP_ROLES = [
  "Cloud Security Engineer",
  "Cloud Security Analyst",
  "SOC Analyst",
  "Security Engineer (Cloud)",
];

/* Labs catalog ---------------------------------------------------------------- */

export type LabLevel = "Beginner" | "Intermediate" | "Advanced";

export type LabItem = {
  slug: string;
  title: string;
  level: LabLevel;
  desc: string;
  tags: string[];
  added: string;
  minutes: number; // typical hands-on time
  skills: string[]; // concrete skills the learner walks away with
  roles: string[]; // job roles this lab maps to
  free?: boolean; // the first beginner lab is free (tighter launch cap)
};

// Launch caps surfaced on lab pages so the limit isn't a surprise. MIRRORS
// labs-platform/app/lib/access-rules.ts (FREE_RULE / ACCESS_RULES) — keep in sync.
const LAUNCH_RULES: Record<LabLevel, { maxLaunches: number; windowHours: number }> = {
  Beginner: { maxLaunches: 3, windowHours: 72 },
  Intermediate: { maxLaunches: 2, windowHours: 48 },
  Advanced: { maxLaunches: 2, windowHours: 48 },
};
const FREE_LAUNCH_RULE = { maxLaunches: 2, windowHours: 24 }; // KEEP IN SYNC w/ labs FREE_RULE (temporarily 2)

export function launchPolicyText(level: LabLevel, free?: boolean): string {
  const r = free ? FREE_LAUNCH_RULE : LAUNCH_RULES[level];
  return `${r.maxLaunches} launch${r.maxLaunches === 1 ? "" : "es"} / ${r.windowHours}h`;
}

// Flagship: AWS security labs (our #1 USP). `added` = date the lab went live (ISO).
// CANONICAL shared fields (slug/title/level/free/tags/minutes) mirror each lab's
// labs-platform/app/content/labs/<slug>/lab.json — keep them in sync; `desc`,
// `added`, `skills`, `roles` are marketing-only and live here.
const AWS_LABS_BASE: LabItem[] = [
  {
    slug: "s3-misconfiguration-audit",
    title: "S3 misconfiguration & data exposure",
    level: "Beginner",
    free: true,
    desc: "Find and fix public buckets, weak ACLs, and missing encryption in a realistic account.",
    tags: ["S3", "IAM", "Encryption", "CloudTrail"],
    added: "2026-05-28",
    minutes: 30,
    skills: [
      "S3 Block Public Access & bucket policies",
      "Default encryption (SSE) enforcement",
      "TLS-only bucket policies",
      "Least-privilege IAM remediation",
    ],
    roles: ["Cloud Security Engineer", "Cloud Security Analyst", "DevSecOps Engineer"],
  },
  {
    slug: "iam-privilege-escalation",
    title: "IAM privilege escalation",
    level: "Intermediate",
    desc: "Trace and break real IAM escalation chains, then apply least-privilege.",
    tags: ["IAM", "Privilege Escalation", "Least Privilege", "Policy Analysis"],
    added: "2026-03-10",
    minutes: 75,
    skills: [
      "Identifying IAM privilege-escalation paths",
      "Policy analysis with SimulatePrincipalPolicy",
      "Least-privilege policy design",
      "STS & role-assumption controls",
    ],
    roles: ["Cloud Security Engineer", "Penetration Tester", "Security Consultant"],
  },
];
// Settings overrides (keywords/free) applied — see lib/lab-settings.ts.
export const AWS_LABS: LabItem[] = AWS_LABS_BASE.map(applyLabSettings);

// AI security labs — the FLAGSHIP track (owner, 2026-07-07). One free lab live on
// the platform today; paid AI labs follow. CANONICAL shared fields mirror
// labs-platform/app/content/labs/<slug>/lab.json.
const AI_LABS_BASE: LabItem[] = [
  {
    slug: "bedrock-prompt-injection",
    title: "Bedrock assistant — prompt injection & lockdown",
    level: "Beginner",
    free: true,
    desc: "Prompt-inject a live LLM support assistant into leaking secrets, then lock it down with Guardrails, least-privilege IAM, and model-invocation logging.",
    tags: ["Bedrock", "GenAI", "Guardrails", "IAM"],
    added: "2026-07-06",
    minutes: 35,
    skills: [
      "Bedrock Guardrails configuration",
      "Prompt-injection attack & defense",
      "Least-privilege IAM for AI apps",
      "Model-invocation logging",
    ],
    roles: ["AI Security Engineer", "Cloud Security Engineer", "GenAI Developer"],
  },
];
// Settings overrides (keywords/free) applied — see lib/lab-settings.ts.
export const AI_LABS: LabItem[] = AI_LABS_BASE.map(applyLabSettings);

// Azure security labs — the SECOND cloud track (mirrors AWS_LABS shape). The lab is
// built in labs-platform; surfaced here as "Coming soon" until the Azure engine path
// is wired live (no purchase/launch route yet — a coming-soon card only, not a live
// CTA). CANONICAL shared fields mirror labs-platform/app/content/labs/<slug>/lab.json.
const AZURE_LABS_BASE: LabItem[] = [
  {
    slug: "storage-public-exposure-audit",
    title: "Storage account public exposure & data leak",
    level: "Beginner",
    free: true,
    desc: "Find and fix a leaky Azure Storage account — anonymous blob access, insecure HTTP, and account-key access left on.",
    tags: ["Azure Storage", "Blob", "Public Access", "Shared Key"],
    added: "2026-07-07",
    minutes: 30,
    skills: [
      "Blob anonymous/public access lockdown",
      "Secure transfer (HTTPS-only) enforcement",
      "Shared Key lockdown (require Microsoft Entra ID)",
      "Data-plane exposure verification (not just the config flag)",
    ],
    roles: ["Cloud Security Engineer", "Cloud Security Analyst", "DevSecOps Engineer"],
  },
];
// Settings overrides (keywords/free) applied — see lib/lab-settings.ts.
export const AZURE_LABS: LabItem[] = AZURE_LABS_BASE.map(applyLabSettings);

// SOC track: SIEM + SOAR, under one roof.
// NOTE: underlying tool names stay hidden on the public site until a user is inside the lab.
export type SocLab = { slug: string; product: "SIEM" | "SOAR"; title: string; desc: string; tags: string[]; minutes: number; skills: string[]; roles: string[] };

export const SOC_LABS: SocLab[] = [
  { slug: "siem-detection-engineering", product: "SIEM", title: "Detection engineering", desc: "Build rules, tune noise, and triage alerts across host and cloud telemetry.", tags: ["SIEM", "Detection"], minutes: 60, skills: ["Detection-rule authoring", "Alert tuning & noise reduction", "Host + cloud telemetry triage"], roles: ["SOC Analyst", "Detection Engineer", "Security Analyst"] },
  { slug: "siem-threat-hunting", product: "SIEM", title: "Log analysis & threat hunting", desc: "Pivot through logs to find attacker activity and write durable detections.", tags: ["Hunting", "Logs"], minutes: 60, skills: ["Log pivoting & threat hunting", "Attacker TTP identification", "Writing durable detections"], roles: ["SOC Analyst", "Threat Hunter", "Incident Responder"] },
  { slug: "soar-response-playbooks", product: "SOAR", title: "Automated response playbooks", desc: "Wire detections to automated actions and cut mean-time-to-respond.", tags: ["SOAR", "Automation"], minutes: 45, skills: ["SOAR playbook design", "Detection-to-action automation", "Mean-time-to-respond reduction"], roles: ["SOC Analyst", "Security Automation Engineer", "SOAR Engineer"] },
  { slug: "soar-enrichment-workflows", product: "SOAR", title: "Enrichment & case workflows", desc: "Auto-enrich alerts and orchestrate end-to-end incident workflows.", tags: ["SOAR", "IR"], minutes: 45, skills: ["Alert auto-enrichment", "Case & incident orchestration", "End-to-end IR workflows"], roles: ["SOC Analyst", "Incident Responder", "Security Automation Engineer"] },
];

/* Blog — content + types moved to ./blog (keeps the blog corpus out of the client
   bundle). Types re-exported for back-compat with existing type-only importers. */
export type { BlogBlock, BlogPost, BlogPostCard } from "./blog";

/* About ----------------------------------------------------------------------- */

export const ABOUT = {
  mission:
    "Make hands-on cloud security skills accessible worldwide — and help businesses defend the cloud with practitioner-led work, not theory.",
  values: [
    { title: "Hands-on over theory", desc: "We teach and work in real, production-like environments — never slideware." },
    { title: "AWS-deep, SOC-complete", desc: "Cloud security on AWS is our core; SIEM and SOAR complete the SOC picture." },
    { title: "Global, remote-first", desc: "Built for learners and teams worldwide, delivered remotely." },
    { title: "Outcomes, not vanity", desc: "We measure success by job-ready learners and real security improvements." },
  ],
  // Company-led, anonymous by design — role-based, no individual names/photos.
  team: [
    { name: "Cloud Security team", role: "AWS & cloud security", bio: "Working practitioners who design our AWS security labs and lead client cloud assessments." },
    { name: "SOC team", role: "SIEM & SOAR", bio: "Detection & response engineers who build and run our SIEM and SOAR labs." },
  ],
};

/* FAQs (used with faqSchema for rich results) --------------------------------- */

export const FAQS: Record<string, { q: string; a: string }[]> = {
  services: [
    { q: "Which clouds do you cover?", a: "AWS today — Azure, GCP and more are on our roadmap." },
    { q: "Do you do penetration testing?", a: "We offer it on request through trusted partners; our core is cloud security and detection & response." },
    { q: "Can you help with SOC 2 / ISO 27001 / GDPR readiness?", a: "Yes — we map security work to the frameworks your customers ask about, with evidence and control mapping." },
  ],
  labs: [
    { q: "What do I need to start a lab?", a: "Just a browser. Labs run in managed cloud environments — no AWS account, no install, no credit card for the free lab." },
    { q: "What exactly happens when I launch a lab?", a: "We provision a real, throwaway AWS account in your browser. You get actual AWS console access — not a simulator — to complete the scenario. When you finish (or the timer expires) the account is automatically wiped." },
    { q: "Is my real AWS account at risk?", a: "None at all. Every lab runs in its own isolated, throwaway account that we own and wipe after use. You never connect your personal or company AWS account." },
    { q: "Can I launch the same lab more than once?", a: "Yes — per-lab purchase includes multiple launches so you can retry if you get stuck or want to practise again from a clean state." },
    { q: "How does 'Check my work' grading work?", a: "When you click Check my work, our automated grader inspects your live AWS session through the AWS APIs and verifies whether the specific misconfigurations are actually fixed — not just ticked off a checklist. You get immediate, honest feedback on what's done and what's still open." },
    { q: "How is this different from video courses or platforms like ACloudGuru?", a: "Video courses teach you to watch someone else secure things. Our labs put you in a real AWS account with a real security scenario and grade your actual changes. The difference shows up in job interviews." },
    { q: "How long do I have access after buying a lab?", a: "Per-lab purchases include a set access window and a fixed number of launches from your first launch — enough to complete the lab, take a break, and revisit from a clean state. The exact window and launch count for each lab are shown on its page and at checkout. Monthly pass subscribers can launch any lab any time for the duration of their subscription." },
    { q: "Do I get a certificate?", a: "Yes — you receive a digitally signed completion certificate from ShieldSync Security Private Limited for each lab you complete." },
    { q: "What payment methods are accepted?", a: "We accept UPI, all major debit/credit cards, net banking, and popular wallets (Paytm, PhonePe, Google Pay) — secured through the Paytm payment gateway." },
    { q: "Can I cancel the monthly pass?", a: "Yes — cancel anytime and you won't be charged again. Your access continues to the end of the current paid cycle." },
    { q: "Are AWS labs the main focus?", a: "Yes — AWS cloud security is our flagship track and the deepest offering. A SOC track (SIEM & SOAR) is in development to round out the blue-team picture." },
    { q: "Can teams or companies use the labs for training?", a: "Yes — contact us for team access, volume pricing, and a custom labs-as-a-service arrangement tailored to your team's skill gaps." },
  ],
};
