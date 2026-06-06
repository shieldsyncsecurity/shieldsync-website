import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Sora, Manrope } from "next/font/google";
import { DOORS, LAB_TRACKS, SOCIAL_PROOF, SITE, CONTACT } from "@/lib/site";

const sora = Sora({ subsets: ["latin"], weight: ["600", "700", "800"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Emerald & Ink theme (preview)",
  robots: { index: false, follow: false },
};

const LAB_IMG: Record<string, string> = { Cloud: "/labs/aws.webp", SIEM: "/labs/siem.webp", SOAR: "/labs/soar.webp" };
const GRAD = "bg-gradient-to-r from-emerald-600 to-teal-500";
const GRAD_TEXT = "bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent";

function Glow() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-40 -top-44 h-[34rem] w-[34rem] rounded-full bg-emerald-300/30 blur-[130px]" />
      <div className="absolute -right-24 top-24 h-[26rem] w-[26rem] rounded-full bg-teal-300/25 blur-[130px]" />
      <div className="absolute bottom-10 left-1/2 h-[24rem] w-[24rem] rounded-full bg-lime-300/20 blur-[130px]" />
    </div>
  );
}

function Switcher() {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-stone-200 bg-white/90 p-1.5 text-sm font-semibold shadow-xl backdrop-blur">
      <Link href="/" className="rounded-full px-4 py-2 text-stone-500 hover:bg-stone-100">Current</Link>
      <span className={`rounded-full ${GRAD} px-4 py-2 text-white`}>Emerald</span>
      <Link href="/preview2" className="rounded-full px-4 py-2 text-stone-500 hover:bg-stone-100">Midnight</Link>
    </div>
  );
}

export default function EmeraldPreview() {
  return (
    <div className={`${manrope.className} relative min-h-screen overflow-hidden bg-stone-50 text-stone-600`}>
      <Glow />

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-stone-50/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/preview" className={`${sora.className} text-xl font-extrabold tracking-tight text-stone-900`}>
            Shield<span className={GRAD_TEXT}>Sync</span>
          </Link>
          <nav className="hidden items-center gap-7 text-base font-medium text-stone-600 lg:flex">
            <span className="cursor-default hover:text-stone-900">Services</span>
            <span className="cursor-default hover:text-stone-900">Training</span>
            <span className="cursor-default hover:text-stone-900">Hands-on Labs</span>
            <span className="cursor-default hover:text-stone-900">About us</span>
            <span className="cursor-default hover:text-stone-900">Blog</span>
          </nav>
          <span className={`rounded-xl ${GRAD} px-5 py-2.5 text-base font-semibold text-white shadow-lg shadow-emerald-600/25`}>
            Book a call
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-6 pt-16 sm:pt-24">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Global cybersecurity services &amp; training
          </span>

          <h1 className={`${sora.className} mx-auto mt-7 max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight text-stone-900 sm:text-6xl lg:text-7xl`}>
            Secure the cloud. <span className={GRAD_TEXT}>Build the talent</span> that defends it.
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-xl leading-9 text-stone-600">
            {SITE.nameFull} helps businesses harden their cloud and individuals grow into real security
            roles — through hands-on services, training, and realistic, scenario-based labs.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <span className={`rounded-2xl ${GRAD} px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-emerald-600/25`}>
              Book a call →
            </span>
            <span className="rounded-2xl border border-stone-300 bg-white px-8 py-4 text-lg font-semibold text-stone-700 shadow-sm">
              Explore hands-on labs
            </span>
          </div>

          <div className="mt-7 flex items-center justify-center gap-3 text-lg text-stone-500">
            <span className="text-amber-400">★★★★★</span>
            <span><span className="font-bold text-stone-800">{SOCIAL_PROOF.count}</span> {SOCIAL_PROOF.label}</span>
          </div>
        </div>

        {/* Flagship card */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-3 shadow-2xl shadow-emerald-600/5">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem]">
              <Image src="/labs/aws.webp" alt="AWS Security Labs" fill priority sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
              <span className={`absolute left-4 top-4 rounded-xl ${GRAD} px-3 py-1.5 text-sm font-bold text-white shadow-lg`}>
                ★ Flagship — AWS Security Labs
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Two doors */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <h2 className={`${sora.className} text-center text-base font-bold uppercase tracking-[0.2em] text-stone-500`}>
            Where would you like to start?
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {DOORS.map((d) => (
              <div key={d.audience} className="group rounded-[1.75rem] border border-stone-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-600/5 sm:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">{d.audience}</p>
                <h3 className={`${sora.className} mt-4 text-3xl font-extrabold text-stone-900`}>{d.title}</h3>
                <p className="mt-4 text-lg leading-8 text-stone-600">{d.desc}</p>
                <ul className="mt-6 space-y-3">
                  {d.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-lg text-stone-700">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <span className={`mt-8 inline-block text-lg font-bold ${GRAD_TEXT}`}>{d.cta} →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Labs */}
      <section className="px-6 pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl">
          <h2 className={`${sora.className} text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl`}>
            Real cyber ranges — <span className={GRAD_TEXT}>led by AWS</span>.
          </h2>
          <p className="mt-4 max-w-2xl text-xl leading-9 text-stone-600">
            AWS cloud security is the flagship; SIEM &amp; SOAR complete a full SOC skill set.
          </p>

          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {LAB_TRACKS.map((lab) => {
              const flagship = lab.tag === "Cloud";
              return (
                <div key={lab.title} className={`group overflow-hidden rounded-[1.5rem] border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${flagship ? "border-emerald-300 ring-2 ring-emerald-500/30 hover:shadow-emerald-600/10" : "border-stone-200"}`}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={LAB_IMG[lab.tag] ?? "/labs/aws.webp"} alt={lab.title} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="text-sm font-bold uppercase tracking-wide text-emerald-600">{lab.tag}</span>
                      {flagship ? <span className={`ml-auto rounded-full ${GRAD} px-2.5 py-0.5 text-xs font-bold text-white`}>Flagship</span> : <span className="ml-auto text-sm text-stone-400">{lab.status}</span>}
                    </div>
                    <h3 className={`${sora.className} mt-3 text-xl font-bold text-stone-900`}>{lab.title}</h3>
                    <p className="mt-2 text-base leading-7 text-stone-600">{lab.desc}</p>
                    <span className={`mt-4 inline-block text-base font-bold ${GRAD_TEXT}`}>Launch lab →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className={`mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] ${GRAD} px-8 py-16 text-center text-white shadow-2xl shadow-emerald-600/25 sm:px-16`}>
          <h2 className={`${sora.className} mx-auto max-w-2xl text-4xl font-extrabold sm:text-5xl`}>
            Ready to secure your cloud — or your career?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-xl leading-9 text-white/90">
            Book a call and we&apos;ll point you to the right next step.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <span className="rounded-2xl bg-white px-8 py-4 text-lg font-bold text-emerald-700 shadow-lg">Book a call</span>
            <span className="rounded-2xl border border-white/60 px-8 py-4 text-lg font-bold text-white">WhatsApp</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 text-center text-base text-stone-500">
          <p className={`${sora.className} font-bold text-stone-700`}>{SITE.tagline}</p>
          <p>© 2026 {SITE.legalName} · {CONTACT.email}</p>
        </div>
      </footer>

      <Switcher />
    </div>
  );
}
