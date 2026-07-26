# Launch ad campaigns — draft for owner approval

**Status:** draft, awaiting your review + billing setup on each platform.
**Funnel target for all three:** `shieldsyncsecurity.com/labs-wizard?track=free-security-labs`
(the free-lab entry point — matches the existing 301s from `/free-lab`, `/free-labs`, etc.)
**Budget split (from the plan):** Google ₹60/day · Meta/Instagram ₹30/day · Reddit ₹10/day = **₹100/day (~₹3,000/mo)**.
**No LinkedIn paid** — per the existing plan, LinkedIn organic only for now.

Positioning is pulled from the live site's own copy ("real, isolated AWS accounts",
"first lab free", "not a quiz") — nothing invented here.

---

## 1. Google Ads — Search, ₹60/day

Search intent is the highest-value channel: people already looking for this
convert best. Budget goes to Search only, not Display, at this spend level.

**Campaign type:** Search, Manual CPC (switch to Maximize Conversions once you have
~30 conversions of data — too early on day 1).

### Ad groups + keywords

| Ad group | Keywords (phrase match) |
|---|---|
| AWS security hands-on | "aws security training", "aws security hands on", "aws security lab", "learn aws security", "aws security practice" |
| AWS security certification prep | "aws security specialty", "aws security certification", "scs-c02 practice" |
| Free security course | "free cybersecurity course india", "free aws course", "free cloud security training" |

**Negative keywords (add before launch, not after):** "job", "jobs", "salary",
"resume", "free ebook", "pdf download", "udemy", "coursera" (we're not competing
on price-for-a-video-course, and "job"/"salary" queries are candidates job-hunting,
not learners).

### Responsive Search Ad (per ad group — Google mixes these; give it options)

**Headlines** (15, pick any 3 shown at once):
1. Real AWS Security Labs — Not a Quiz
2. First Lab Free, No Card Needed
3. Fix Real AWS Misconfigurations
4. Hands-On AWS Security Training
5. Practice in a Real AWS Account
6. Isolated AWS Sandbox, Free Lab
7. Built by Practitioners, Not Slides
8. Learn AWS Security by Doing
9. AWS IAM, S3, Encryption Labs
10. ShieldSync — Real Cloud, Real Skills
11. Start Free — No Signup Cost
12. From ₹249 — Real AWS Labs
13. Get Certified, Prove It Live
14. Cloud Security Practice, Not Theory
15. Try It Free in 5 Minutes

**Descriptions** (4):
1. Work inside a real, isolated AWS account — find and fix an actual security misconfiguration. First lab is free.
2. Skip the slideshows. Every ShieldSync lab runs on a live AWS sandbox you can break and fix safely.
3. Built for people who secure real cloud environments — practitioner-authored, not generic MCQs.
4. Free S3 misconfiguration lab. No credit card. Certificate on completion.

**Final URL:** `https://shieldsyncsecurity.com/labs-wizard?track=free-security-labs`
**Display path:** `/free-labs`

---

## 2. Meta (Instagram + Facebook) — ₹30/day

Meta at this budget should run **Advantage+ placements** (let it optimize
across Feed/Reels/Stories) rather than hand-picking placements — manual
placement selection at ₹30/day starves individual placements of data.

**Campaign objective:** Traffic (not Conversions — you don't have enough
conversion volume yet for Meta's conversion optimization to learn properly;
switch to Conversions after ~50 site conversions tracked via the Pixel).

**Audience:** India, age 22–40, interests: AWS, cloud computing, cybersecurity,
information security, DevOps. Exclude "AWS Certified" job-title audiences that
skew senior/uninterested-in-free-content — target the learning-not-yet-certified segment.

### Creative — 3 variants to test (Instagram Reels-first, 9:16)

**Variant A — Screen recording** (highest expected performance: shows the actual product)
- 15–20 sec screen capture: land on a lab → see the public S3 bucket → fix it →
  green checkmark → certificate. Text overlay: "This is a REAL AWS account."
- Caption: "Free hands-on AWS security lab. Real cloud, real misconfiguration,
  real fix. No credit card. Link in bio → shieldsyncsecurity.com"

**Variant B — Static carousel** (3 slides)
- Slide 1: "Most security courses are slideshows." (dim, greyed-out mock quiz UI)
- Slide 2: "ShieldSync gives you a real, isolated AWS account." (bright screenshot)
- Slide 3: "First lab free. Fix it, get certified." (CTA button)

**Variant C — Founder-voice single image**
- You, or a clean product screenshot, with text: "I got tired of security
  courses that never touch a real cloud console. So we built one."
- Caption leans on credibility: practitioner-built, real infrastructure, first lab free.

**Primary text (all variants):** Real AWS security labs — not a quiz. Work
inside an isolated AWS sandbox, fix an actual misconfiguration, get a
verifiable certificate. First lab is free, no card required.

**CTA button:** "Learn More" → same funnel URL.

---

## 3. Reddit Ads — ₹10/day

Reddit users are allergic to marketing-speak — the ad that works here reads
like a genuine post, not a banner. Small budget, so **one ad, one placement type
(Promoted Post in feed), not a multi-creative test** — ₹10/day won't split
meaningfully across variants anyway.

**Subreddit targeting (interest-based, not manual subreddit list at this
budget):** cybersecurity, AWS, devops, sysadmin, ITCareerQuestions, netsec.

**Format:** Text post (Reddit's own ad-blindness data favors text over image
for security/tech audiences — reads as organic).

**Title:** We built a free AWS security lab that runs in a real, isolated AWS account — no quiz, no fake terminal

**Body:**
> Most "hands-on" security courses are a video of someone else's terminal, or a
> browser-based fake shell. We got annoyed enough by that to build ShieldSync:
> you get a real, isolated AWS account, seeded with an actual misconfiguration
> (public S3 bucket, over-broad IAM policy, that kind of thing), and you fix it
> for real using the actual AWS console.
>
> First lab is free, no card needed. If you break something, we tear the whole
> account down after — that's the safety net, not "don't actually touch
> anything."
>
> Would genuinely like feedback from this sub if you try it:
> shieldsyncsecurity.com

**Note:** this is written in first-person plural ("we") deliberately — Reddit
penalizes third-person corporate voice heavily. If you'd rather it read as
purely you, swap "we" → "I" throughout; either works, just be consistent.

---

## What I need from you to launch these

| Platform | What you do |
|---|---|
| Google Ads | Create/access the account, add billing, paste in the keywords + ad copy above, approve |
| Meta | Create/access Ads Manager + Business Manager, add billing, install/verify the Meta Pixel on the marketing site (I can wire the Pixel snippet if it's not there — say so), upload creative, approve |
| Reddit | Create/access Reddit Ads account, add billing, paste in the post, approve |

I can build the Meta Pixel + conversion tracking into the marketing site now if
you want — that's a code change I can do without waiting on you. Say the word.

## One flag before you spend money

All three point at the free-lab funnel, which currently surfaces **both** free
labs (`s3-misconfiguration-audit` and `bedrock-prompt-injection`) — and per the
dress-rehearsal doc, the Bedrock lab has never been owner-tested end-to-end.
Run Part 1 of the rehearsal before turning these on, or the ad spend is
literally paying to find that bug for you instead of you finding it first.
