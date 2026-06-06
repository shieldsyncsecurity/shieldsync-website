/* ----------------------------------------------------------------------------
   JSON-LD schema helpers — centralised so every page can pull what it needs.
   These are deterministic functions (no LLM, no runtime fetch) — safe to call
   in Next.js Server Components and layout.tsx.
---------------------------------------------------------------------------- */

import { SITE, CONTACT } from "@/lib/site";

// ---------------------------------------------------------------------------
// Organization — rendered on every page via layout.tsx
// ---------------------------------------------------------------------------
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.legalName,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE.url}/#logo`,
      url: `${SITE.url}/logo.svg`,
      contentUrl: `${SITE.url}/logo.svg`,
      caption: SITE.nameFull,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: CONTACT.phoneDisplay,
        contactType: "customer service",
        availableLanguage: "English",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    email: CONTACT.email,
    description: SITE.description,
    // Add your social handles to SITE.social in lib/site.ts and uncomment:
    // sameAs: Object.values(SITE.social ?? {}),
  };
}

// ---------------------------------------------------------------------------
// WebSite — rendered on every page, enables potential Sitelinks Search Box
// ---------------------------------------------------------------------------
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.nameFull,
    url: SITE.url,
    description: SITE.description,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en",
  };
}

// ---------------------------------------------------------------------------
// WebPage — use on each individual page component
// ---------------------------------------------------------------------------
export function webPageSchema(opts: {
  url: string;
  name: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  breadcrumb?: BreadcrumbItem[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${opts.url}#webpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en",
    ...(opts.datePublished && { datePublished: opts.datePublished }),
    ...(opts.dateModified && { dateModified: opts.dateModified }),
    ...(opts.breadcrumb && {
      breadcrumb: {
        "@id": `${opts.url}#breadcrumb`,
      },
    }),
  };
}

// ---------------------------------------------------------------------------
// BreadcrumbList — use on inner pages
// ---------------------------------------------------------------------------
export type BreadcrumbItem = { name: string; url: string };

export function breadcrumbSchema(id: string, items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${id}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ---------------------------------------------------------------------------
// EducationalOccupationalProgram — for /internship page
// Enables rich results for educational offers in Google Search.
// ---------------------------------------------------------------------------
export function internshipProgramSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "@id": `${SITE.url}/internship#program`,
    name: "Cybersecurity Internship — ShieldSync Security",
    description:
      "A focused, hands-on 8-week internship in cloud and cybersecurity. Real AWS security projects, managed cyber-range labs, 1:1 mentorship, and a completion certificate from ShieldSync Security Private Limited.",
    url: `${SITE.url}/internship`,
    provider: {
      "@id": `${SITE.url}/#organization`,
    },
    programPrerequisites: "Basic IT knowledge; no prior cybersecurity experience required.",
    occupationalCategory: "15-1299.09",
    educationalProgramMode: "online",
    timeToComplete: "P2M",
    numberOfCredits: 0,
    startDate: "2026-07-01",
    offers: {
      "@type": "Offer",
      price: "9999",
      priceCurrency: "INR",
      availability: "https://schema.org/LimitedAvailability",
      validFrom: "2026-01-01",
      category: "Internship",
      seller: { "@id": `${SITE.url}/#organization` },
    },
    hasCourse: [
      {
        "@type": "Course",
        name: "Cloud Security Projects",
        description:
          "Audit and harden real AWS environments — IAM, S3, encryption, and logging — the way working security teams do.",
      },
      {
        "@type": "Course",
        name: "Hands-on Cyber Range Labs",
        description:
          "Practice in managed cyber ranges across AWS security, SIEM, and SOAR.",
      },
      {
        "@type": "Course",
        name: "Detection & Response",
        description:
          "Exposure to SIEM and SOAR workflows to understand the blue-team picture end to end.",
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// FAQPage — pass an array of {q, a} pairs to generate FAQ rich results
// ---------------------------------------------------------------------------
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

// ---------------------------------------------------------------------------
// BlogPosting — article rich-results for individual blog posts
// ---------------------------------------------------------------------------
export function blogPostingSchema(opts: {
  url: string;
  title: string;
  description: string;
  image: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${opts.url}#article`,
    headline: opts.title,
    description: opts.description,
    image: opts.image.startsWith("http") ? opts.image : `${SITE.url}${opts.image}`,
    datePublished: opts.datePublished,
    dateModified: opts.datePublished,
    author: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
    mainEntityOfPage: opts.url,
    inLanguage: "en",
  };
}
