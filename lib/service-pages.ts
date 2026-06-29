import type { Service } from "./site";

/* Full landing-page content for each in-house security service.
   Drafted + honesty-checked (no overclaiming) — see /services/<slug>. */

export type ServicePage = {
  slug: string;
  icon: Service["icon"];
  title: string;
  tagline: string;
  intro: string;
  whatsIncluded: { title: string; desc: string }[];
  approach: { title: string; desc: string }[];
  deliverables: string[];
  faqs: { q: string; a: string }[];
  metaDescription: string;
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "cloud-infrastructure-security",
    icon: "cloud",
    title: "Cloud & Infrastructure Security",
    tagline: "Practitioner-led review and hardening of your cloud and the infrastructure under it, mapped to how attackers actually get in.",
    intro: "We examine your AWS, Azure, GCP, and on-premise environments the way an attacker would, tracing real paths from exposed surface to sensitive data instead of running a generic checklist. The work is hands-on and senior throughout, with AWS as our deepest specialism. You get a clear picture of where you're actually exposed and a fix-first plan to close it.",
    whatsIncluded: [
      { title: "Cloud Security Assessment", desc: "A practitioner-led review of your cloud accounts covering misconfigurations, identity, network exposure, and data risk — mapped to real attack paths, not compliance checklists." },
      { title: "Cloud Security Posture Management (CSPM)", desc: "Continuous visibility into your cloud posture: drift detection, policy violations, and prioritised findings across AWS, Azure, and GCP." },
      { title: "Cloud Identity & Access Review", desc: "We map roles, policies, and trust relationships to find over-broad access, stale permissions, and privilege-escalation paths before attackers do." },
      { title: "IaC Security", desc: "We scan Terraform, CloudFormation, and other infrastructure-as-code before misconfigurations reach your cloud — integrated into CI/CD or as a point-in-time review." },
      { title: "Zero Trust Architecture", desc: "We design identity-centric access, micro-segmentation, and least-privilege policies so lateral movement stops at the first compromised account." },
      { title: "Attack Surface Management (ASM)", desc: "Continuous discovery of your internet-facing assets, shadow infrastructure, and exposures before someone else maps them for you." },
      { title: "Network Architecture Review", desc: "We audit your VPC design, security groups, peering, and ingress/egress controls to close the gaps that let attackers move laterally once inside." },
      { title: "Multi-Cloud & Migration Security", desc: "Security built into cloud migrations and multi-cloud architectures from day one — not retrofitted after the move." },
      { title: "DevSecOps for Cloud", desc: "We wire security guardrails into the cloud provisioning pipeline so every resource deployed is checked against policy before it goes live." },
    ],
    approach: [
      { title: "Scope", desc: "We agree on accounts, environments, and crown-jewel assets, then get the read access we need to look properly." },
      { title: "Review", desc: "We work through configurations, identity, network, and data exposure by hand, chaining findings into real attack paths." },
      { title: "Prioritize", desc: "We rank what we find by actual exploitability and blast radius, so you fix what matters first." },
      { title: "Remediate", desc: "We hand over fix-first guidance and stay available to validate the changes you make." },
    ],
    deliverables: [
      "A findings report with each issue tied to a concrete attack path",
      "A fix-first remediation plan ranked by real risk",
      "An attacker's-eye map of your exposed surface and reachable data",
      "A working session to walk your team through findings and fixes",
      "Validation support as you close the priority items",
    ],
    faqs: [
      { q: "Do you do the penetration testing too?", a: "Cloud and infrastructure review is delivered in-house by our senior team. Hands-on penetration testing is run through trusted partners, which we'll coordinate if you want it." },
      { q: "Is this just an automated scan?", a: "No. Tools help us cover ground, but the review and the attack-path analysis are done by practitioners, which is what surfaces the chained issues scanners miss." },
      { q: "We're mostly on AWS. Is that a fit?", a: "Yes. AWS is our deepest specialism, and most of our cloud work centers on it, though we cover Azure, GCP, and on-premise just as readily." },
    ],
    metaDescription: "Practitioner-led cloud and infrastructure security across AWS, Azure, GCP, and on-prem. We review and harden against real attack paths with fix-first remediation.",
  },
  {
    slug: "soc-managed-detection",
    icon: "radar",
    title: "SOC & Managed Detection",
    tagline: "Continuous detection, hunting, and response so attacks are caught and contained early, not discovered weeks later.",
    intro: "Most breaches aren't sophisticated; they're just unnoticed. We run managed detection and response across your cloud and endpoints, watching for the behaviour that precedes a real incident and stepping in to contain it before it spreads. You get a practitioner team tuning the detections, hunting for what alerts miss, and driving the response when something fires.",
    whatsIncluded: [
      { title: "Managed SOC & Co-Managed SOC", desc: "We run detection and response end to end, or plug into your existing team as a co-managed layer — owning the parts you don't have bandwidth for." },
      { title: "Managed Detection & Response (MDR)", desc: "Continuous monitoring of your cloud, identity, and endpoint telemetry with on-call escalation for the signals that precede a real intrusion." },
      { title: "SIEM Implementation & Optimisation", desc: "We deploy, tune, and operate your SIEM — cutting false positives, building a detection library mapped to MITRE ATT&CK, and keeping it current as your environment changes." },
      { title: "Use Case Development & Tuning", desc: "We build detection rules mapped to the attacker behaviour that matters in your environment, then tune them until the signal is worth acting on." },
      { title: "Threat Intelligence Integration", desc: "We wire threat intel feeds into your detections so emerging indicators surface in your environment before they become incidents." },
      { title: "Threat Hunting Services", desc: "We proactively hunt for compromise that slips past automated alerts, using hypotheses drawn from your environment and current attacker tradecraft." },
      { title: "Digital Forensics & Incident Response (DFIR)", desc: "When something real fires, we investigate, scope the blast radius, drive containment, and reconstruct the timeline with CloudTrail and endpoint forensics." },
      { title: "Incident Response Retainer", desc: "Pre-agreed access to our DFIR team when you need it — faster engagement, no procurement delay, and an onboarded team that already knows your environment." },
      { title: "SOC Maturity Assessment", desc: "We assess your current detection and response capability against what attackers actually do, and give you a prioritised roadmap to close the gaps." },
    ],
    approach: [
      { title: "Onboard", desc: "We connect your cloud, identity, and endpoint sources, baseline what normal looks like, and agree on what an incident means for you." },
      { title: "Tune", desc: "We build detections against your real attack surface and cut the false positives that train teams to ignore alerts." },
      { title: "Operate", desc: "We monitor and hunt continuously, triaging what fires and escalating only what's real and actionable." },
      { title: "Respond", desc: "When an incident is confirmed, we contain it, walk you through what happened, and harden against a repeat." },
    ],
    deliverables: [
      "Tuned detection rules mapped to MITRE ATT&CK across your environment",
      "SOAR playbooks for fast, repeatable containment",
      "Triaged alerts and confirmed incidents with clear context and next steps",
      "Incident reports covering timeline, blast radius, and root cause",
      "Recurring reviews of detection coverage and gaps",
    ],
    faqs: [
      { q: "Do you replace our security team or augment it?", a: "Either works. We can run detection and response end to end, or plug into your existing team and own the parts you don't have bandwidth for." },
      { q: "Which environments do you cover?", a: "Our deepest coverage is AWS, with Azure and GCP supported, plus identity and endpoint telemetry. We meet your stack rather than forcing a new one." },
      { q: "How fast do you respond to an incident?", a: "Containment timing depends on your environment and tooling, which we set during onboarding. We don't quote a one-size SLA we can't honestly stand behind." },
    ],
    metaDescription: "Managed detection and response from ShieldSync: continuous threat monitoring, hunting, SIEM/SOAR detection engineering, and rapid incident containment.",
  },
  {
    slug: "application-security-devsecops",
    icon: "code",
    title: "Application Security & DevSecOps",
    tagline: "We build security into your SDLC, so controls run inside your pipelines instead of getting bolted on after the code ships.",
    intro: "Most app risk doesn't come from exotic exploits. It comes from design decisions made before anyone wrote code, and from checks that get skipped under deadline pressure. We wire security into how your team already builds, from threat modeling at design time to automated scanning in CI/CD, so problems surface while they're cheap to fix instead of in a pentest report or an incident.",
    whatsIncluded: [
      { title: "Secure SDLC Implementation", desc: "We map your build-to-deploy flow and define where security gates belong, who owns them, and what blocks a release versus what just warns." },
      { title: "DevSecOps Implementation", desc: "We integrate security tooling and policy into your CI/CD pipeline — from first commit to production — so controls are automatic, not manual." },
      { title: "CI/CD Security Review", desc: "We audit your pipeline configuration for misconfigurations, secret exposure, and supply-chain risks that give attackers a path to production." },
      { title: "Threat Modeling", desc: "We work through your architecture to find the trust boundaries, abuse cases, and design flaws that scanners can't see — before a line of code is written." },
      { title: "SAST Implementation", desc: "We tune static analysis to your stack and codebase so it catches real issues without drowning developers in false positives that get ignored." },
      { title: "DAST Implementation", desc: "We configure and run dynamic testing against your running application to find the runtime vulnerabilities SAST misses." },
      { title: "SCA — Software Composition Analysis", desc: "We set up dependency scanning and policy for third-party packages, so a known-vulnerable library fails the build before it reaches production." },
      { title: "AppSec Maturity Assessment", desc: "We benchmark your current application security programme against what attackers exploit, and give you a prioritised roadmap to raise the bar." },
      { title: "Secure Coding Training & Developer Enablement", desc: "We give your engineers the secure-coding guidance and triage workflow to own findings instead of routing everything back to security." },
    ],
    approach: [
      { title: "Assess", desc: "We review your current SDLC, pipelines, and tooling to find where security is missing, noisy, or being worked around." },
      { title: "Model", desc: "We threat-model the critical applications and define the controls and gates that match your real risk and release cadence." },
      { title: "Integrate", desc: "We wire scanning and policy into your CI/CD with sane thresholds, then tune until the signal is worth acting on." },
      { title: "Hand off", desc: "We document the pipeline, train your team on triage, and leave you running it without us in the loop." },
    ],
    deliverables: [
      "Threat models for your critical applications with prioritized findings",
      "Security gates integrated into your CI/CD pipelines with tuned thresholds",
      "SAST, DAST, and dependency scanning configured and validated against your stack",
      "A secure SDLC playbook covering ownership, triage, and release criteria",
      "A remediation backlog ranked by exploitability and business impact",
    ],
    faqs: [
      { q: "Will this slow our releases down?", a: "No. The point is to catch issues automatically in the pipeline so they don't become release blockers later. We tune thresholds so only real, high-signal findings stop a build." },
      { q: "Do you do the penetration testing too?", a: "Application and pipeline security work is in-house. Penetration testing is delivered through trusted partners, which we'll coordinate and fold into your SDLC if you want it." },
      { q: "Which CI/CD and languages do you support?", a: "We work with mainstream stacks and pipelines like GitHub Actions, GitLab CI, and Jenkins. We assess your specific toolchain first and pick scanners that fit it rather than forcing a rip-and-replace." },
    ],
    metaDescription: "Build security into your SDLC with threat modeling, SAST/DAST, dependency scanning, and CI/CD and IaC controls wired into your pipelines, not bolted on later.",
  },
  {
    slug: "advanced-emerging-security",
    icon: "lock",
    title: "Advanced & Emerging Security",
    tagline: "Defense for the threats arriving now: securing AI and LLM systems, Zero Trust, and the attack surface you can't see.",
    intro: "The threats that matter most right now aren't in last year's playbook. We secure the AI and LLM systems you're building or buying, design Zero Trust so a single stolen credential doesn't hand over the whole network, and keep watch on the internet-facing footprint that keeps growing while you ship. AI/LLM security is our deepest emerging specialism, and it's delivered by the same senior team that does the work in-house.",
    whatsIncluded: [
      { title: "AI Security Assessment", desc: "We assess the security posture of the AI systems and pipelines you're building or procuring — covering model inputs, outputs, APIs, and the infrastructure they run on." },
      { title: "LLM Security Testing", desc: "We probe your LLM features against prompt injection, jailbreaks, indirect injection via RAG, insecure tool use, and data leakage — and tell you concretely what breaks and how to fix it." },
      { title: "AI Governance Framework", desc: "We help you define access controls, data boundaries, audit logging, and acceptable-use policy for AI systems before they're deployed at scale." },
      { title: "Zero Trust Strategy & Implementation", desc: "We design and implement identity-centric access, segmentation, and least-privilege policies so lateral movement stops at the first compromised account." },
      { title: "Enterprise Attack Surface Management (ASM)", desc: "Continuous discovery of your internet-facing assets, shadow infrastructure, and exposures before someone else maps them for you." },
      { title: "Continuous Security Validation", desc: "Ongoing testing of your controls against real attack techniques — so you know your defences hold, not just that they were configured correctly six months ago." },
      { title: "Digital Supply Chain Security", desc: "We assess third-party dependencies, SaaS integrations, and vendor access — the paths attackers increasingly use to reach enterprise environments." },
      { title: "Cyber Resilience Engineering", desc: "We harden your environment against the failure modes that matter: ransomware, credential compromise, and cloud-native attacks — with controls that hold when tested for real." },
    ],
    approach: [
      { title: "Scope", desc: "We start with your architecture, your AI use cases, and what an attacker would realistically target first." },
      { title: "Assess", desc: "We threat-model and test the systems in scope, mapping each finding to a concrete attack path rather than a generic checklist." },
      { title: "Design", desc: "We turn findings into specific controls — guardrails, identity policy, segmentation, monitoring — that fit how your team actually works." },
      { title: "Hand off", desc: "We walk your engineers through every recommendation and stay available as you implement, so nothing gets lost in a report." },
    ],
    deliverables: [
      "A threat model for your AI/LLM systems mapped to real attack paths",
      "A Zero Trust architecture design with identity, access, and segmentation specifics",
      "An attack-surface inventory of your exposed and shadow assets",
      "A risk-ranked remediation roadmap with clear near-term and longer-term work",
      "A working session with your engineers to drive the fixes",
    ],
    faqs: [
      { q: "Is this AI security, or security using AI?", a: "This is security for the AI you build and use — protecting LLM features, agents, and pipelines from attack and misuse. We're not selling an AI product; we're defending yours." },
      { q: "Do you actually do this in-house?", a: "Yes. AI/LLM security, Zero Trust, and attack-surface work are all delivered by our own senior team. The only thing we route to trusted partners is penetration testing." },
      { q: "We're early with AI — is it too soon?", a: "It's the right time. Building guardrails and identity boundaries while the system is still small is far cheaper than retrofitting them after something is in production." },
    ],
    metaDescription: "Security for AI and LLM systems, Zero Trust architecture, and attack-surface management — practitioner-led, in-house, from ShieldSync Security.",
  },
  {
    slug: "governance-risk-compliance",
    icon: "compliance",
    title: "Governance, Risk & Compliance",
    tagline: "Get audit-ready against the frameworks your customers ask about, with real risk work and evidence behind every control.",
    intro: "Most GRC work turns into a binder of policies nobody reads and controls nobody runs. We do the opposite: assess your actual risk, map it to the framework your buyers care about, and stand up controls that hold up when an auditor or a prospect's security team starts asking questions. You walk in to your SOC 2, ISO 27001, GDPR, or DPDP work knowing exactly where you stand and what's left to close.",
    whatsIncluded: [
      { title: "Enterprise Risk Assessment", desc: "A real assessment of the threats to your environment and data, scored and prioritised so you fix what actually matters first." },
      { title: "Cyber Maturity Assessment", desc: "We benchmark your security programme against industry frameworks and tell you plainly where you stand — and what it takes to move up." },
      { title: "ISO 27001 Implementation", desc: "We scope the ISMS, run the gap assessment, build the control set and evidence trail, and prepare you for certification — without the paperwork theatre." },
      { title: "SOC 2 Readiness", desc: "We assess your current state against the Trust Service Criteria, close the gaps, and walk you through the audit so the assessment isn't a scramble." },
      { title: "DPDP Assessment & Implementation", desc: "We map your data processing against India's Digital Personal Data Protection Act, identify obligations, and implement the controls and notices required." },
      { title: "GDPR & Data Privacy Advisory", desc: "Practical data protection work covering data mapping, lawful basis, consent, retention, subject-rights handling, and breach response." },
      { title: "Third-Party Risk Management", desc: "We assess the security posture of your vendors and supply chain — the risk that lives outside your perimeter but ends up in your incident." },
      { title: "Policy & Control Framework", desc: "Policies and procedures written to describe how you actually operate, not generic templates that fall apart under scrutiny from an auditor or a customer." },
      { title: "Security Awareness Training", desc: "Practical, scenario-based training that builds the behaviours your team needs — not a checkbox compliance video that everyone skips." },
    ],
    approach: [
      { title: "Assess", desc: "We scope the framework and systems in play, run the gap and risk assessments, and give you a clear picture of where you stand." },
      { title: "Map", desc: "We map risks and existing controls to the framework, then build a prioritized remediation plan with owners and effort estimates." },
      { title: "Remediate", desc: "We work alongside your team to close gaps, write the policies and procedures, and stand up the controls and evidence trail." },
      { title: "Audit support", desc: "We prep you for the auditor or assessment, run readiness reviews, and stay available through the audit itself." },
    ],
    deliverables: [
      "Gap assessment report with prioritized remediation plan",
      "Risk assessment with scored, ranked findings",
      "Control mapping to your chosen framework",
      "Policy and procedure set written to your operations",
      "Audit-ready evidence pack and readiness sign-off",
    ],
    faqs: [
      { q: "Can you certify or audit us?", a: "No. We're not a certification body or auditor, and keeping that separate protects your audit's independence. We get you ready and support you through the assessment, then a licensed auditor runs the formal audit." },
      { q: "Which frameworks do you cover?", a: "SOC 2 and ISO 27001 readiness, GDPR and DPDP data protection, plus PCI DSS and NIST CSF. For regulated Indian entities we also cover RBI, SEBI, and IRDA cyber compliance requirements. We map controls across them so overlapping requirements are handled once." },
      { q: "How long does readiness take?", a: "It depends on your starting point and scope, but most teams reach audit-ready in a few months. The gap assessment gives you a realistic timeline before you commit." },
    ],
    metaDescription: "Get audit-ready for SOC 2, ISO 27001, GDPR, and DPDP with practitioner-led risk assessments, control mapping, and evidence, not paperwork. Readiness, not certification.",
  },
];
