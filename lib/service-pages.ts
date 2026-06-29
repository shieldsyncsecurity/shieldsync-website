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
      { title: "Misconfiguration review", desc: "We audit cloud resource and service configurations across your accounts for the gaps attackers reach first." },
      { title: "IAM and identity", desc: "We map roles, policies, and trust relationships to find over-broad access and privilege-escalation paths." },
      { title: "Network exposure", desc: "We check what's reachable from the internet and how far an attacker moves once inside." },
      { title: "Data exposure", desc: "We trace where sensitive data lives and whether storage, keys, and encryption actually protect it." },
      { title: "Prioritized remediation", desc: "Every finding comes ranked by real risk with concrete steps to fix it, not just a severity label." },
      { title: "Multi-cloud and on-prem", desc: "We cover AWS, Azure, and GCP plus the on-premise infrastructure they connect to, as one attack surface." },
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
      { title: "Continuous monitoring", desc: "We monitor your cloud, identity, and endpoint telemetry continuously, with on-call escalation for the signals that precede a real intrusion." },
      { title: "Detection engineering", desc: "We build and tune SIEM and SOAR detections mapped to MITRE ATT&CK so they fire on real attacker behaviour, not noise." },
      { title: "Proactive threat hunting", desc: "We hunt for compromise that slips past automated alerts, using hypotheses drawn from your environment and current attacker tradecraft." },
      { title: "Incident response", desc: "When something real fires, we investigate, scope the blast radius, and drive containment alongside your team." },
      { title: "Alert triage", desc: "We separate the signal from the noise so your team only sees incidents that actually warrant their attention." },
      { title: "Response automation", desc: "We wire SOAR playbooks to isolate hosts, revoke sessions, and shut down attacker access in the first minutes, not hours." },
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
      { title: "Secure SDLC design", desc: "We map your build-to-deploy flow and define where security gates belong, who owns them, and what blocks a release versus what just warns." },
      { title: "Threat modeling", desc: "We work through your architecture to find the trust boundaries, abuse cases, and design flaws that scanners can't see." },
      { title: "SAST and DAST", desc: "We tune static and dynamic analysis to your stack so it catches real issues without drowning developers in false positives." },
      { title: "Dependency and supply chain", desc: "We set up software composition analysis and policy for third-party packages, so a known-vulnerable dependency fails the build, not production." },
      { title: "Pipeline and IaC security", desc: "We harden the CI/CD pipeline itself and scan Terraform and other infrastructure-as-code before misconfigurations reach your cloud." },
      { title: "Developer enablement", desc: "We give your engineers the secure-coding guidance and triage workflow to own findings instead of routing everything back to security." },
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
      { title: "LLM threat modeling", desc: "We map your AI features against prompt injection, jailbreaks, data leakage, insecure tool use, and supply-chain risks in models and dependencies." },
      { title: "AI guardrails review", desc: "We assess input and output filtering, system-prompt handling, retrieval and RAG boundaries, and the blast radius of any agent that can take actions." },
      { title: "Zero Trust design", desc: "We design identity-centric access, segmentation, and least-privilege policies so lateral movement stops at the first compromised account." },
      { title: "Attack-surface management", desc: "We continuously discover your internet-facing assets, shadow infrastructure, and exposures before someone else maps them for you." },
      { title: "Cloud-native controls", desc: "We tie the above into your AWS, Azure, or GCP environment so detections, identity, and policy enforcement live where your workloads run." },
      { title: "Risk-ranked roadmap", desc: "We hand you a prioritized plan that separates what to fix this week from what belongs in the next quarter." },
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
      { title: "Readiness gap assessment", desc: "We measure your current state against SOC 2 or ISO 27001 and tell you plainly what's in place, what's missing, and what an auditor will push on." },
      { title: "Risk assessment", desc: "A real assessment of the threats to your environment and data, scored and prioritized so you fix what actually matters first." },
      { title: "Control mapping", desc: "We map your existing tooling and processes to framework controls so you reuse what you have instead of buying duplicate systems." },
      { title: "Policies that match reality", desc: "Policies and procedures written to describe how you actually operate, not generic templates that fall apart under scrutiny." },
      { title: "Data protection program", desc: "Practical GDPR and DPDP work covering data mapping, lawful basis, consent, retention, and subject-rights handling." },
      { title: "Evidence and audit prep", desc: "We set up evidence collection and walk you through what the auditor will ask, so the assessment isn't a scramble." },
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
      { q: "Which frameworks do you cover?", a: "SOC 2 and ISO 27001 readiness, GDPR and DPDP data protection, plus PCI DSS and NIST CSF. We map controls across them so overlapping requirements are handled once." },
      { q: "How long does readiness take?", a: "It depends on your starting point and scope, but most teams reach audit-ready in a few months. The gap assessment gives you a realistic timeline before you commit." },
    ],
    metaDescription: "Get audit-ready for SOC 2, ISO 27001, GDPR, and DPDP with practitioner-led risk assessments, control mapping, and evidence, not paperwork. Readiness, not certification.",
  },
];
