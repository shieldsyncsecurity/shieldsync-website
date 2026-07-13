import blogExtra from "./blog-extra.json";

/* Blog content + types — kept in their OWN module (not lib/site.ts). lib/site.ts is
 * imported by CLIENT components (site-header nav, etc.), so co-locating the ~500 KB
 * blog-extra.json there shipped every article body in the shared client chunk. Only
 * SERVER components import the runtime BLOG_* values from here; client components
 * receive body-stripped cards as props. */

export type BlogBlock =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "code"; code: string }
  | { t: "callout"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  read: string;
  image: string;
  body: BlogBlock[];
};

const BLOG_SEED: BlogPost[] = [
  {
    slug: "aws-iam-least-privilege",
    title: "IAM least-privilege without breaking production",
    excerpt: "How to cut over-broad AWS permissions methodically — driven by what your workloads actually do — without taking prod down.",
    category: "Cloud Security",
    date: "Jun 4, 2026",
    read: "7 min",
    image: "/blog/iam-least-privilege.webp",
    body: [
      { t: "p", text: "Over-broad IAM permissions are the most common — and most exploited — weakness in AWS. The fix isn't to lock everything down overnight; that breaks production. It's to tighten permissions methodically, driven by what your workloads actually do." },
      { t: "h2", text: "Start from real usage, not guesses" },
      { t: "p", text: "Don't hand-write policies from memory. Let AWS tell you what an identity actually used. IAM Access Analyzer can generate a scoped policy from your CloudTrail history, and the IAM console flags permissions a role hasn't touched in months." },
      { t: "ul", items: ["Enable an all-region CloudTrail trail if you haven't already.", "Use Access Analyzer policy generation to draft a policy from a role's real activity.", "Review 'last accessed' data to find services an identity never uses."] },
      { t: "h2", text: "Replace wildcards deliberately" },
      { t: "p", text: "Action '*' and Resource '*' are where breaches start. Scope actions to what's needed and resources to specific ARNs. Where a broad action is unavoidable, fence it with conditions." },
      { t: "code", code: `{
  "Effect": "Allow",
  "Action": ["s3:GetObject", "s3:PutObject"],
  "Resource": "arn:aws:s3:::app-prod-assets/*",
  "Condition": { "Bool": { "aws:SecureTransport": "true" } }
}` },
      { t: "h2", text: "Add guardrails above identities" },
      { t: "p", text: "Even a perfect policy can be widened later. Set ceilings individual policies can't exceed: Service Control Policies (SCPs) at the org level, and permission boundaries on the roles your developers are allowed to create." },
      { t: "callout", text: "Roll out in staging first, watch CloudTrail for access-denied errors for a few days, then promote. Least-privilege is a process, not a one-time edit." },
      { t: "h2", text: "Catch drift before it bites" },
      { t: "p", text: "Permissions creep back. Have Access Analyzer flag resources shared outside your account, and review unused access on a schedule. Tightening once and never looking again is how you end up back where you started." },
    ],
  },
  {
    slug: "secure-s3-from-data-leaks",
    title: "Secure S3: the settings that stop a data leak",
    excerpt: "Almost every S3 breach is a misconfiguration, not a hack. Here are the few settings that prevent nearly all of them.",
    category: "Cloud Security",
    date: "Jun 2, 2026",
    read: "6 min",
    image: "/blog/s3-data-leak.webp",
    body: [
      { t: "p", text: "Almost every S3 'breach' you read about is a misconfiguration, not a clever hack — a bucket left open, an ACL no one reviewed, or data sent in the clear. A handful of settings prevent nearly all of it." },
      { t: "h2", text: "1. Turn on Block Public Access — everywhere" },
      { t: "p", text: "Enable S3 Block Public Access at the account level, not just per bucket. It overrides any policy or ACL that would otherwise make objects public, so a future mistake can't quietly expose data." },
      { t: "h2", text: "2. Disable ACLs, use one bucket policy" },
      { t: "p", text: "Legacy ACLs are an easy way to leak objects by accident. Set Object Ownership to 'Bucket owner enforced' to switch ACLs off entirely, and express all access through a single, reviewable bucket policy." },
      { t: "h2", text: "3. Encrypt by default and require TLS" },
      { t: "p", text: "Turn on default encryption (SSE-KMS for sensitive data) and deny any request that isn't over TLS. This bucket policy refuses plaintext connections outright:" },
      { t: "code", code: `{
  "Sid": "DenyInsecureTransport",
  "Effect": "Deny",
  "Principal": "*",
  "Action": "s3:*",
  "Resource": [
    "arn:aws:s3:::my-bucket",
    "arn:aws:s3:::my-bucket/*"
  ],
  "Condition": { "Bool": { "aws:SecureTransport": "false" } }
}` },
      { t: "h2", text: "4. Share with presigned URLs, not public buckets" },
      { t: "p", text: "Need to hand someone a file? Generate a time-limited presigned URL instead of making the object public. The link expires; the bucket stays private." },
      { t: "callout", text: "Turn on IAM Access Analyzer for S3 and GuardDuty S3 Protection — they flag buckets exposed outside your account and alert on suspicious access before it becomes an incident." },
      { t: "p", text: "None of this is exotic. It's a checklist — and running it beats discovering an open bucket the way attackers do." },
    ],
  },
  {
    slug: "respond-to-aws-key-compromise",
    title: "Respond to a leaked AWS access key — fast",
    excerpt: "A step-by-step incident playbook for a leaked AWS key: contain, scope the blast radius, eradicate, and prevent the next one.",
    category: "Cloud Security",
    date: "May 30, 2026",
    read: "8 min",
    image: "/blog/credential-compromise.webp",
    body: [
      { t: "p", text: "Leaked AWS keys are everywhere — committed to GitHub, baked into mobile apps, lifted from a developer's laptop. When one leaks, the gap between a non-event and a breach is how fast you respond. Here's the playbook." },
      { t: "h2", text: "1. Contain first, investigate second" },
      { t: "p", text: "Don't wait to understand everything. Immediately deactivate the exposed access key, and if it belongs to an IAM user, attach a deny-all 'quarantine' policy so it can do nothing while you dig in." },
      { t: "code", code: `aws iam update-access-key \\
  --access-key-id AKIA... \\
  --status Inactive \\
  --user-name compromised-user` },
      { t: "h2", text: "2. Map the blast radius" },
      { t: "p", text: "Use CloudTrail to reconstruct exactly what the key did: which APIs, from which IPs, starting when. Check GuardDuty for findings like anomalous API calls or credential exfiltration. Hunt specifically for persistence the attacker may have planted:" },
      { t: "ul", items: ["New IAM users, roles, or access keys you didn't create.", "Changed trust policies or freshly attached admin policies.", "Resources launched in unusual regions — often crypto-mining."] },
      { t: "h2", text: "3. Eradicate and rotate" },
      { t: "p", text: "Delete the leaked key, rotate related secrets, revoke active sessions, and remove anything the attacker created. Assume one foothold leads to others until CloudTrail proves otherwise." },
      { t: "h2", text: "4. Make the next leak harmless" },
      { t: "ul", items: ["Stop issuing long-lived keys — prefer IAM roles and IAM Identity Center (SSO) with short-lived credentials.", "Enforce IMDSv2 so a stolen instance can't have its role credentials trivially scraped.", "Add secret scanning to your repos and CI to catch keys before they ship."] },
      { t: "callout", text: "Rehearse this as a drill before you need it. A team that has practiced key-compromise response contains it in minutes; one that hasn't loses hours — and that's where the damage happens." },
    ],
  },
];

// Combine the 3 seed posts with the file-based articles (content/blog/*.json,
// merged into blog-extra.json by scripts/build-blog.mjs) — newest first.
export const BLOG_POSTS: BlogPost[] = [...BLOG_SEED, ...(blogExtra as unknown as BlogPost[])].sort(
  (a, b) => +new Date(b.date) - +new Date(a.date),
);

// Body-free projection for every preview surface (carousels, explorer, card
// grids). Full bodies belong only to /blog/[slug] — passing BLOG_POSTS into a
// client component serializes every post's full body into that page's RSC
// payload (the /blog explorer alone was ~576 KB of HTML because of this).
export type BlogPostCard = Omit<BlogPost, "body">;
export const BLOG_POST_CARDS: BlogPostCard[] = BLOG_POSTS.map(({ body: _body, ...card }) => card);
