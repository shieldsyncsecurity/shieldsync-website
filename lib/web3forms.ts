// Shared Web3Forms submit helper for every marketing-site form (internship,
// contact, …). Web3Forms is a client-side form backend: a POST with a PUBLIC
// access key (bound to a destination inbox) emails the submission there — no
// backend, no secrets, no email-client popup.
//
// Keys are PUBLIC form identifiers (safe in client code). Set them via env at
// build time (preferred) or paste into the fallback. Each key is tied to ONE
// inbox, so you can route forms to different addresses:
//   NEXT_PUBLIC_WEB3FORMS_KEY          → internship@shieldsyncsecurity.com
//   NEXT_PUBLIC_WEB3FORMS_KEY_CONTACT  → your general/contact inbox
// If the contact key isn't set, contact falls back to the internship key.
//
// Get a key free (no signup) at https://web3forms.com: enter the destination
// email → the key is emailed there → set it below.

const PLACEHOLDER = "PASTE_WEB3FORMS_ACCESS_KEY_HERE";

export const WEB3FORMS_KEY_INTERNSHIP =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || PLACEHOLDER;

export const WEB3FORMS_KEY_CONTACT =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY_CONTACT ||
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
  PLACEHOLDER;

/** A real Web3Forms key is a UUID-ish hex string; the placeholder isn't. */
export function isWeb3FormsConfigured(key: string): boolean {
  return /^[0-9a-f-]{20,}$/i.test(key);
}

export type Web3FormsResult = { ok: boolean; message?: string };

/**
 * POST a submission to Web3Forms. `fields` are emailed verbatim to the inbox
 * the access key is bound to. Includes the spam honeypot. Returns {ok} so the
 * caller can drive success/error UI.
 */
export async function submitWeb3Forms(
  accessKey: string,
  subject: string,
  fields: Record<string, string>
): Promise<Web3FormsResult> {
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject,
        from_name: "ShieldSync Website",
        botcheck: "", // honeypot
        ...fields,
      }),
    });
    const data = (await res.json()) as { success?: boolean; message?: string };
    if (res.ok && data.success) return { ok: true };
    return { ok: false, message: data.message || "Something went wrong. Please try again." };
  } catch {
    return { ok: false, message: "Couldn't reach the server. Check your connection and try again." };
  }
}
