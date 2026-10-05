import type { Inquiry, InquiryErrors } from "./schema";

export type SubmitResult = { ok: true } | { ok: false; error?: string; errors?: InquiryErrors };

/** Client-side submit. Swap the endpoint here if inquiries move elsewhere. */
export async function submitInquiry(data: Inquiry & { website?: string }): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = (await res.json().catch(() => ({}))) as Partial<{ ok: boolean; error: string; errors: InquiryErrors }>;
    if (res.ok && json.ok) return { ok: true };
    return { ok: false, error: json.error, errors: json.errors };
  } catch {
    return { ok: false, error: "Network error — check your connection and try again." };
  }
}
