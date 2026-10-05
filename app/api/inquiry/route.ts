import { NextResponse } from "next/server";
import { parseInquiry, validateInquiry } from "@/lib/inquiry/schema";
import { getInquiryProvider } from "@/lib/inquiry/provider";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (typeof body === "object" && body !== null && (body as Record<string, unknown>).website) {
    return NextResponse.json({ ok: true });
  }

  const inquiry = parseInquiry(body);
  const errors = validateInquiry(inquiry);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  try {
    await getInquiryProvider().send(inquiry);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[inquiry] delivery failed", err);
    return NextResponse.json({ ok: false, error: "We couldn't send your inquiry. Please try again." }, { status: 502 });
  }
}
