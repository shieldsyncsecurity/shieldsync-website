import Link from "next/link";
import { Logo } from "@/components/brand";
import { Mail, Phone, WhatsApp, Pin } from "@/components/icons";
import { SITE, CONTACT, FOOTER_NAV } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-ink-2">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="max-w-xs">
            <Logo variant="compact" height={32} />
            <p className="mt-4 text-base leading-7 text-muted">{SITE.shortDesc}</p>
            <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
              {SITE.tagline}
            </p>
          </div>

          {/* Nav groups */}
          {FOOTER_NAV.map((group) => (
            <div key={group.heading}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">{group.heading}</h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-base text-fg/80 transition hover:text-brand-bright">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-base">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 text-fg/80 transition hover:text-brand-bright">
                  <Mail className="h-4 w-4 text-brand" /> {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-fg/80 transition hover:text-brand-bright">
                  <WhatsApp className="h-4 w-4 text-brand" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={CONTACT.phoneHref} className="inline-flex items-center gap-2 text-fg/80 transition hover:text-brand-bright">
                  <Phone className="h-4 w-4 text-brand" /> {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="inline-flex items-start gap-2 text-muted">
                <Pin className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {CONTACT.addressLine}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {2026} {SITE.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy" className="transition hover:text-brand-bright">Privacy</Link>
            <Link href="/terms" className="transition hover:text-brand-bright">Terms</Link>
            <Link href="/refund" className="transition hover:text-brand-bright">Refund</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
