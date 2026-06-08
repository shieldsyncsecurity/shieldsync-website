import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import "./v4.css";

export const metadata: Metadata = {
  title: "v4 Preview — Enterprise Theme",
  robots: { index: false, follow: false },
};

export default function V4Preview() {
  return (
    <div className="v4-root">
      {/* ═══════ Top announcement strip ═══════ */}
      <div className="v4-announce">
        <span>New: 2026 Cloud Security Skills Gap Report</span>
        <a href="#">Download the report →</a>
      </div>

      {/* ═══════ Header ═══════ */}
      <header className="v4-header">
        <div className="v4-container v4-nav">
          <Link href="/v4" className="v4-logo">
            <span className="v4-logo-mark">S</span>
            <span className="v4-logo-name">
              ShieldSync<span className="v4-logo-acc">.</span>
            </span>
          </Link>

          <nav className="v4-nav-links">
            <Link href="/start-here" className="v4-nav-link">Start Here</Link>

            <div className="v4-nav-item">
              <a className="v4-nav-link">Services <span className="v4-caret">▼</span></a>
              <div className="v4-dropdown">
                <Link className="v4-dd-item" href="/services">
                  <span className="v4-dd-icon">☁</span>
                  <span className="v4-dd-text">
                    <strong>Cloud Security Assessments</strong>
                    <span>AWS posture reviews, attack-path analysis</span>
                  </span>
                </Link>
                <Link className="v4-dd-item alt" href="/services">
                  <span className="v4-dd-icon">📋</span>
                  <span className="v4-dd-text">
                    <strong>Compliance Readiness</strong>
                    <span>SOC 2 / ISO 27001 / GDPR / PCI DSS</span>
                  </span>
                </Link>
                <Link className="v4-dd-item" href="/training">
                  <span className="v4-dd-icon">🎓</span>
                  <span className="v4-dd-text">
                    <strong>Corporate Training</strong>
                    <span>Cohorts, custom curricula, on-site</span>
                  </span>
                </Link>
                <Link className="v4-dd-item alt" href="/labs">
                  <span className="v4-dd-icon">🧪</span>
                  <span className="v4-dd-text">
                    <strong>Labs-as-a-Service</strong>
                    <span>Hands-on environments for your team</span>
                  </span>
                </Link>
              </div>
            </div>

            <div className="v4-nav-item">
              <a className="v4-nav-link">Training <span className="v4-caret">▼</span></a>
              <div className="v4-dropdown">
                <Link className="v4-dd-item" href="/internship">
                  <span className="v4-dd-icon">🎯</span>
                  <span className="v4-dd-text">
                    <strong>8-Week Internship</strong>
                    <span>AWS labs · mentorship · certificate</span>
                  </span>
                </Link>
                <Link className="v4-dd-item alt" href="/training">
                  <span className="v4-dd-icon">📈</span>
                  <span className="v4-dd-text">
                    <strong>Career Tracks</strong>
                    <span>Job-ready paths from zero to hired</span>
                  </span>
                </Link>
                <Link className="v4-dd-item" href="/training">
                  <span className="v4-dd-icon">👥</span>
                  <span className="v4-dd-text">
                    <strong>Corporate Cohorts</strong>
                    <span>Team learning with manager visibility</span>
                  </span>
                </Link>
                <Link className="v4-dd-item alt" href="/start-here">
                  <span className="v4-dd-icon">🗺</span>
                  <span className="v4-dd-text">
                    <strong>Learning Roadmap</strong>
                    <span>Skill paths mapped to labs &amp; jobs</span>
                  </span>
                </Link>
              </div>
            </div>

            <div className="v4-nav-item">
              <a className="v4-nav-link">Hands-on Labs <span className="v4-caret">▼</span></a>
              <div className="v4-dropdown">
                <Link className="v4-dd-item" href="/labs">
                  <span className="v4-dd-icon">☁</span>
                  <span className="v4-dd-text">
                    <strong>AWS Security Labs</strong>
                    <span>6 flagship labs · S3 · IAM · KMS · CloudTrail</span>
                  </span>
                </Link>
                <Link className="v4-dd-item alt" href="/labs/soc">
                  <span className="v4-dd-icon">🛡</span>
                  <span className="v4-dd-text">
                    <strong>SOC Labs (SIEM + SOAR)</strong>
                    <span>Detection engineering · response playbooks</span>
                  </span>
                </Link>
                <Link className="v4-dd-item" href="/labs-wizard">
                  <span className="v4-dd-icon">🚀</span>
                  <span className="v4-dd-text">
                    <strong>Start a Lab</strong>
                    <span>Guided wizard · pick track, plan, lab</span>
                  </span>
                </Link>
                <Link className="v4-dd-item alt" href="/labs">
                  <span className="v4-dd-icon">💳</span>
                  <span className="v4-dd-text">
                    <strong>Pricing</strong>
                    <span>Pay-per-lab or monthly all-access</span>
                  </span>
                </Link>
              </div>
            </div>

            <Link href="/blog" className="v4-nav-link">Blog</Link>
            <Link href="/contact" className="v4-nav-link">Contact</Link>
          </nav>

          <div className="v4-nav-right">
            <Link href="/internship" className="v4-nav-sub">Apply for internship</Link>
            <Link href="/contact" className="v4-nav-sub">Book a call</Link>
            <Link href={SITE.startUrl} className="v4-btn-primary">Start free lab →</Link>
          </div>
        </div>
      </header>

      {/* ═══════ Hero ═══════ */}
      <section className="v4-hero">
        <div className="v4-container">
          <div className="v4-hero-grid">
            <div>
              <div className="v4-eyebrow-pill">▲ Trusted by security teams in 12+ countries</div>
              <h1 className="v4-h1">
                Enterprise-grade <em>cloud security</em> capability — built on real labs.
              </h1>
              <p className="v4-hero-sub">
                Equip your security organization with the practical skills, certifications, and
                hands-on environments to defend modern cloud infrastructure — at the scale your
                business demands.
              </p>
              <div className="v4-hero-ctas">
                <Link href="/contact" className="v4-btn-primary v4-btn-lg">Request a demo →</Link>
                <Link href="/labs" className="v4-btn-ghost v4-btn-lg">View pricing</Link>
              </div>
              <div className="v4-hero-meta">
                <span><span className="v4-check">✓</span> SOC 2 aligned</span>
                <span><span className="v4-check">✓</span> 99.99% lab SLA</span>
                <span><span className="v4-check">✓</span> SSO + SCIM</span>
                <span><span className="v4-check">✓</span> Dedicated CSM</span>
              </div>
            </div>

            <div>
              <div className="v4-hero-visual">
                <div className="v4-hv-head">
                  <div className="v4-hv-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <span>admin.shieldsyncsecurity.com / cohort-dashboard</span>
                </div>
                <div className="v4-hv-body">
                  <div className="v4-hv-title">Acme Corp · Security Cohort Q2 2026</div>
                  <div className="v4-hv-tag">142 engineers enrolled · 6 tracks · last 30 days</div>
                  <div className="v4-hv-stats">
                    <div className="v4-hv-stat">
                      <div className="v4-hv-num">87%</div>
                      <div className="v4-hv-lbl">Completion</div>
                    </div>
                    <div className="v4-hv-stat">
                      <div className="v4-hv-num">2,341</div>
                      <div className="v4-hv-lbl">Labs run</div>
                    </div>
                    <div className="v4-hv-stat">
                      <div className="v4-hv-num">+34</div>
                      <div className="v4-hv-lbl">Certified</div>
                    </div>
                  </div>
                  <div className="v4-hv-prog">
                    <div className="v4-hv-prog-head"><span className="who">Cloud Security Foundations</span><span className="pct">92%</span></div>
                    <div className="v4-hv-bar"><div className="v4-hv-bar-fill" style={{ width: "92%" }} /></div>
                  </div>
                  <div className="v4-hv-prog">
                    <div className="v4-hv-prog-head"><span className="who">Production Defender</span><span className="pct">68%</span></div>
                    <div className="v4-hv-bar"><div className="v4-hv-bar-fill t" style={{ width: "68%" }} /></div>
                  </div>
                  <div className="v4-hv-prog">
                    <div className="v4-hv-prog-head"><span className="who">SOC Operator</span><span className="pct">45%</span></div>
                    <div className="v4-hv-bar"><div className="v4-hv-bar-fill n" style={{ width: "45%" }} /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="v4-trust">
          <div className="v4-container">
            <div className="v4-trust-label">Trusted by security and engineering teams at</div>
            <div className="v4-trust-logos">
              <div>NIMBUS</div>
              <div className="alt">VERTEX</div>
              <div>Harbour &amp; Co.</div>
              <div className="alt">PRAXIS</div>
              <div>Arclight</div>
              <div className="alt">MERIDIAN</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ Stats band ═══════ */}
      <div className="v4-container">
        <div className="v4-stats">
          <div>
            <div className="v4-stat-num">10,000+</div>
            <div className="v4-stat-lbl">Practitioners trained on real cloud scenarios</div>
          </div>
          <div>
            <div className="v4-stat-num">200+</div>
            <div className="v4-stat-lbl">Enterprise security teams onboarded</div>
          </div>
          <div>
            <div className="v4-stat-num">99.99%</div>
            <div className="v4-stat-lbl">Lab environment uptime SLA</div>
          </div>
          <div>
            <div className="v4-stat-num">3 mo</div>
            <div className="v4-stat-lbl">Average time-to-productivity for hires</div>
          </div>
        </div>
      </div>

      {/* ═══════ Solutions ═══════ */}
      <section className="v4-section">
        <div className="v4-container">
          <div className="v4-section-head">
            <div className="v4-eyebrow">— Solutions for the modern security org —</div>
            <h2 className="v4-h2">One platform. <em>Three measurable outcomes.</em></h2>
            <p>Whether you&apos;re closing a skill gap, prepping for a cloud migration, or building a SOC — every program is grounded in real, hands-on work.</p>
          </div>

          <div className="v4-sol-grid">
            <div className="v4-sol-card">
              <div className="v4-sol-icon">☁</div>
              <h3>Cloud security upskilling</h3>
              <p>Get your team production-ready on AWS security. Hands-on labs on real cloud environments — no toy scenarios.</p>
              <ul>
                <li>10 progressive AWS labs</li>
                <li>Mapped to job roles</li>
                <li>Outcome-tracked certificates</li>
                <li>Manager dashboards</li>
              </ul>
              <Link href="/labs" className="v4-sol-link">Explore the platform →</Link>
            </div>
            <div className="v4-sol-card">
              <div className="v4-sol-icon t">🛡</div>
              <h3>SOC team enablement</h3>
              <p>Build the muscle to triage real incidents. SIEM detection engineering and SOAR automation, in realistic environments.</p>
              <ul>
                <li>SIEM + SOAR lab tracks</li>
                <li>Realistic incident telemetry</li>
                <li>End-to-end blue-team workflow</li>
                <li>Tier-2/3 skill development</li>
              </ul>
              <Link href="/labs/soc" className="v4-sol-link">See SOC programs →</Link>
            </div>
            <div className="v4-sol-card">
              <div className="v4-sol-icon n">📋</div>
              <h3>Compliance readiness</h3>
              <p>Audit-ready evidence of practical skill across SOC 2, ISO 27001, PCI DSS, HIPAA, GDPR, and DPDP frameworks.</p>
              <ul>
                <li>Framework-mapped scenarios</li>
                <li>Per-engineer completion records</li>
                <li>Auditor-friendly exports</li>
                <li>Annual recertification flow</li>
              </ul>
              <Link href="/services" className="v4-sol-link">View compliance tracks →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ Industries ═══════ */}
      <section className="v4-section v4-tint">
        <div className="v4-container">
          <div className="v4-section-head">
            <div className="v4-eyebrow">Built for regulated industries</div>
            <h2 className="v4-h2">Wherever your <em>compliance</em> lives — we have a track for it.</h2>
          </div>
          <div className="v4-industries">
            <div className="v4-industry"><div className="v4-ind-icon">🏦</div><div>Financial Services</div></div>
            <div className="v4-industry"><div className="v4-ind-icon">🏥</div><div>Healthcare</div></div>
            <div className="v4-industry"><div className="v4-ind-icon">💻</div><div>SaaS &amp; Tech</div></div>
            <div className="v4-industry"><div className="v4-ind-icon">🏛</div><div>Government</div></div>
            <div className="v4-industry"><div className="v4-ind-icon">🏭</div><div>Manufacturing</div></div>
          </div>
        </div>
      </section>

      {/* ═══════ Customer quote ═══════ */}
      <section className="v4-section">
        <div className="v4-container">
          <div className="v4-quote">
            <div className="v4-quote-text">
              &ldquo;ShieldSync gave our cloud security team something CBT-style training never could — <em>real evidence of capability</em>. Onboarding time dropped from six months to ten weeks.&rdquo;
            </div>
            <div className="v4-quote-author">
              <div className="v4-quote-avatar">P</div>
              <div className="v4-quote-meta">
                <div className="v4-quote-name">Priya Rajagopal</div>
                <div className="v4-quote-title">VP Cybersecurity · Vertex Financial</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ Platform features ═══════ */}
      <section className="v4-section v4-tint">
        <div className="v4-container">
          <div className="v4-section-head">
            <div className="v4-eyebrow">— The platform —</div>
            <h2 className="v4-h2">Built for the way <em>enterprise teams</em> actually learn.</h2>
            <p>Self-paced. Manager-visible. Audit-ready. No tooling sprawl for your L&amp;D ops team.</p>
          </div>

          <div className="v4-features">
            <ul className="v4-feat-list">
              <li>
                <div className="v4-feat-num">01</div>
                <div>
                  <h4>Single sign-on, day one</h4>
                  <p>SAML and OIDC SSO across Okta, Azure AD, Google Workspace, and PingFederate. SCIM-based provisioning. No spreadsheets.</p>
                </div>
              </li>
              <li>
                <div className="v4-feat-num">02</div>
                <div>
                  <h4>Manager &amp; admin dashboards</h4>
                  <p>Track completion, time-to-skill, and certification status across cohorts. Drill down to per-engineer evidence in seconds.</p>
                </div>
              </li>
              <li>
                <div className="v4-feat-num">03</div>
                <div>
                  <h4>Procurement-friendly contracts</h4>
                  <p>MSAs, DPAs, and security questionnaires pre-completed. SOC 2 report under NDA on request.</p>
                </div>
              </li>
              <li>
                <div className="v4-feat-num">04</div>
                <div>
                  <h4>Dedicated success manager</h4>
                  <p>From rollout to quarterly business review — a named CSM ensures your team gets to measurable outcomes.</p>
                </div>
              </li>
            </ul>

            <div className="v4-feat-visual">
              <div className="v4-fv-h">Vertex Financial · Q1 outcomes</div>
              <div className="v4-fv-t">Quarterly business review snapshot</div>
              <ul className="v4-fv-list">
                <li><b>Engineers certified (AWS Foundations)</b><span>+38 ↑</span></li>
                <li><b>Average completion time</b><span>4.2 wks ↓</span></li>
                <li><b>Manager satisfaction (NPS)</b><span>+74 ↑</span></li>
                <li><b>Audit evidence packages</b><span>3 ✓</span></li>
                <li><b>Skill gap closure rate</b><span>83% ↑</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ Compliance ═══════ */}
      <section className="v4-section">
        <div className="v4-container">
          <div className="v4-compliance">
            <div>
              <h3 className="v4-h3">Compliance is built in — not bolted on.</h3>
              <p>Every lab scenario is mapped to the frameworks your auditors care about. Per-learner completion records become audit-ready evidence packages.</p>
            </div>
            <div className="v4-badge-grid">
              <div className="v4-comp-badge"><div className="lbl">SOC 2</div><div className="sub">Aligned</div></div>
              <div className="v4-comp-badge"><div className="lbl">ISO 27001</div><div className="sub">Aligned</div></div>
              <div className="v4-comp-badge"><div className="lbl">GDPR</div><div className="sub">Ready</div></div>
              <div className="v4-comp-badge"><div className="lbl">PCI DSS</div><div className="sub">Mapped</div></div>
              <div className="v4-comp-badge"><div className="lbl">HIPAA</div><div className="sub">Mapped</div></div>
              <div className="v4-comp-badge"><div className="lbl">NIST CSF</div><div className="sub">Aligned</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CTA band ═══════ */}
      <div className="v4-container">
        <div className="v4-cta-band">
          <h2 className="v4-h2-cta">See the platform <em>in 30 minutes.</em></h2>
          <p>Talk to our team about your security upskilling goals. We&apos;ll show you how leading enterprises measurably close their cloud-security skill gap.</p>
          <div className="v4-cta-row">
            <Link href="/contact" className="v4-btn-primary v4-btn-lg v4-btn-gold">Request a demo →</Link>
            <Link href="/contact" className="v4-btn-ghost-light v4-btn-lg">Talk to sales</Link>
          </div>
        </div>
      </div>

      {/* ═══════ Footer ═══════ */}
      <footer className="v4-footer">
        <div className="v4-container">
          <div className="v4-foot-grid">
            <div className="v4-foot-col">
              <div className="v4-foot-brand">ShieldSync<span className="v4-foot-acc">.</span></div>
              <p className="v4-foot-tag">
                Enterprise-grade hands-on cloud and SOC security capability — built on real labs, measured by real outcomes.
              </p>
              <div className="v4-foot-contact">
                info@shieldsyncsecurity.com<br />
                +91 9717 433 114<br />
                ShieldSync Security Pvt Ltd · Noida, India
              </div>
              <div className="v4-foot-cert">
                <span>SOC 2</span>
                <span>ISO 27001</span>
                <span>GDPR</span>
              </div>
            </div>
            <div className="v4-foot-col">
              <h4>Platform</h4>
              <ul>
                <li><Link href="/labs">AWS Labs</Link></li>
                <li><Link href="/labs/soc">SOC Labs</Link></li>
                <li><Link href="/services">Compliance</Link></li>
                <li><Link href="/labs-wizard">Start a lab</Link></li>
                <li><Link href="/labs">Pricing</Link></li>
              </ul>
            </div>
            <div className="v4-foot-col">
              <h4>Solutions</h4>
              <ul>
                <li><Link href="/services">Upskilling</Link></li>
                <li><Link href="/services">Migration readiness</Link></li>
                <li><Link href="/labs/soc">SOC enablement</Link></li>
                <li><Link href="/services">Compliance training</Link></li>
              </ul>
            </div>
            <div className="v4-foot-col">
              <h4>Learn</h4>
              <ul>
                <li><Link href="/start-here">Start here</Link></li>
                <li><Link href="/training">Training</Link></li>
                <li><Link href="/internship">Internship</Link></li>
                <li><Link href="/blog">Blog</Link></li>
              </ul>
            </div>
            <div className="v4-foot-col">
              <h4>Company</h4>
              <ul>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/services">For business</Link></li>
                <li><Link href="/internship">Careers</Link></li>
              </ul>
            </div>
            <div className="v4-foot-col">
              <h4>Legal</h4>
              <ul>
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
                <li><Link href="/refund">Refund</Link></li>
              </ul>
            </div>
          </div>
          <div className="v4-foot-bottom">
            <div>© 2026 ShieldSync Security Pvt Ltd · All rights reserved</div>
            <div>v4 enterprise preview · not yet live</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
