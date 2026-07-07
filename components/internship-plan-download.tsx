"use client";

import { useState } from "react";
import { Download } from "@/components/icons";
import { INTERNSHIP, SITE, CONTACT } from "@/lib/site";

/* One-click PDF of the 8-week internship plan, generated client-side from the
 * INTERNSHIP data so it never drifts from the page. jsPDF is dynamic-imported
 * on click — it stays out of the initial bundle. */

const BRAND: [number, number, number] = [79, 70, 229]; // #4f46e5
const INK: [number, number, number] = [17, 24, 39];
const MUTED: [number, number, number] = [100, 116, 139];

export function InternshipPlanDownload({ className = "" }: { className?: string }) {
  const [busy, setBusy] = useState(false);

  async function generate() {
    setBusy(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const M = 48;
      const W = pageW - M * 2;
      let y = M;

      const ensure = (space: number) => {
        if (y + space > pageH - M) {
          doc.addPage();
          y = M;
        }
      };
      const text = (
        s: string,
        size: number,
        color: [number, number, number],
        opts: { bold?: boolean; italic?: boolean; gap?: number; indent?: number } = {}
      ) => {
        doc.setFont("helvetica", opts.bold ? "bold" : opts.italic ? "italic" : "normal");
        doc.setFontSize(size);
        doc.setTextColor(color[0], color[1], color[2]);
        const x = M + (opts.indent ?? 0);
        const lines = doc.splitTextToSize(s, W - (opts.indent ?? 0)) as string[];
        for (const line of lines) {
          ensure(size + 4);
          doc.text(line, x, y);
          y += size + 3;
        }
        y += opts.gap ?? 0;
      };

      // ── Header band ──
      doc.setFillColor(BRAND[0], BRAND[1], BRAND[2]);
      doc.rect(0, 0, pageW, 86, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(255, 255, 255);
      doc.text("ShieldSync Security", M, 40);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text("Cybersecurity Foundation Program — 8-Week Guided Plan", M, 62);
      y = 110;

      // ── Intro ──
      text(INTERNSHIP.subtitle, 14, INK, { bold: true, gap: 2 });
      text(`${INTERNSHIP.price} ${INTERNSHIP.priceNote}  ·  ${INTERNSHIP.commitment}`, 10, BRAND, { bold: true, gap: 6 });
      text(INTERNSHIP.summary, 10.5, MUTED, { gap: 10 });

      // ── What you get ──
      text("What you get", 13, INK, { bold: true, gap: 4 });
      for (const g of INTERNSHIP.whatYouGet) text(`•  ${g}`, 10.5, INK, { indent: 6 });
      y += 8;

      // ── Certificate ──
      ensure(60);
      text("Your certificate", 13, INK, { bold: true, gap: 4 });
      text(INTERNSHIP.certificate.title, 10.5, INK, { bold: true });
      text(INTERNSHIP.certificate.detail, 10, MUTED, { gap: 4 });
      text(INTERNSHIP.certificate.examReadiness, 10, MUTED, { gap: 12 });

      // ── Week-by-week ──
      text("The 8-week plan", 14, BRAND, { bold: true, gap: 6 });
      INTERNSHIP.curriculum.forEach((w, i) => {
        ensure(90);
        text(`${w.week} — ${w.title}`, 12, INK, { bold: true, gap: 1 });
        text(w.focus, 10, BRAND, { italic: true, gap: 3 });
        for (const l of w.learn) text(`•  ${l}`, 10, INK, { indent: 8 });
        text(`Build: ${w.project}`, 10, MUTED, { italic: true, indent: 8, gap: i === INTERNSHIP.curriculum.length - 1 ? 4 : 12 });
      });

      // ── Footer on every page ──
      const pages = doc.getNumberOfPages();
      for (let p = 1; p <= pages; p++) {
        doc.setPage(p);
        doc.setDrawColor(226, 232, 240);
        doc.line(M, pageH - 34, pageW - M, pageH - 34);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
        doc.text(`Apply: ${SITE.url}/internship   ·   ${CONTACT.email}`, M, pageH - 20);
        doc.text(`${p} / ${pages}`, pageW - M, pageH - 20, { align: "right" });
      }

      doc.save("ShieldSync-Cybersecurity-Foundation-Program-Plan.pdf");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={generate}
      disabled={busy}
      className={`inline-flex items-center gap-2 rounded-xl border border-line-strong bg-panel px-4 py-2.5 text-sm font-semibold text-fg transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      <Download className="h-4 w-4" />
      {busy ? "Preparing…" : "Download the 8-week plan (PDF)"}
    </button>
  );
}
