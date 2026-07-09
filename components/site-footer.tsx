import Link from "next/link";
import { Logo } from "@/components/brand";
import { Mail, Phone, WhatsApp, Pin } from "@/components/icons";
import { SITE, CONTACT, FOOTER_NAV } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-ink-2">
      <div className="mx-auto w-full max-w-[1536px] px-5 py-12 sm:px-6 lg:px-8">
        {/* Brand + 3 link columns + Get-in-touch = 5 columns, evenly aligned.
            (Was a 4-col grid holding 5 children, so Get-in-touch wrapped under
            the logo — that's what made it look lopsided.) */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_0.9fr_1.3fr] lg:gap-8">
          {/* Brand */}
          <div className="max-w-xs sm:col-span-2 lg:col-span-1">
            <Logo variant="compact" height={32} />
            <p className="mt-4 text-sm leading-6 text-muted">{SITE.shortDesc}</p>
            <p className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-bright">
              {SITE.tagline}
            </p>
          </div>

          {/* Nav groups */}
          {FOOTER_NAV.map((group) => (
            <div key={group.heading}>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-muted">{group.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-fg/80 transition hover:text-brand-bright">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Get in touch</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
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

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {SITE.legalName}. All rights reserved.</p>
          {/* Legal-only row (Contact now lives in the Company column above, so
              it's not duplicated here). */}
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy" className="transition hover:text-brand-bright">Privacy</Link>
            <Link href="/terms" className="transition hover:text-brand-bright">Terms</Link>
            <Link href="/refund" className="transition hover:text-brand-bright">Refund &amp; Cancellation</Link>
            <Link href="/shipping" className="transition hover:text-brand-bright">Shipping &amp; Delivery</Link>
            {/* Static file at /.well-known/ — plain anchor, not next/link (not a route). */}
            <a href="/.well-known/security.txt" className="transition hover:text-brand-bright">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
