import type { Inquiry } from "./schema";

/**
 * Delivery abstraction for project inquiries.
 *
 * No email service is connected yet. To add one (Resend, Postmark, SendGrid,
 * SES, a CRM webhook…), implement `InquiryProvider` and return it from
 * `getInquiryProvider()` based on an environment variable, e.g.:
 *
 *   const resendProvider: InquiryProvider = {
 *     name: "resend",
 *     async send(inquiry) {
 *       const res = await fetch("https://api.resend.com/emails", {
 *         method: "POST",
 *         headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
 *         body: JSON.stringify({ from: "...", to: process.env.INQUIRY_TO, subject: `New inquiry — ${inquiry.name}`, text: formatInquiry(inquiry) }),
 *       });
 *       if (!res.ok) throw new Error(`Resend responded ${res.status}`);
 *     },
 *   };
 */
export interface InquiryProvider {
  name: string;
  send(inquiry: Inquiry): Promise<void>;
}

export function formatInquiry(i: Inquiry): string {
  return [
    `Name: ${i.name}`,
    `Company: ${i.company || "—"}`,
    `Email: ${i.email}`,
    `Phone: ${i.phone || "—"}`,
    `Project type: ${i.projectType}`,
    `Budget: ${i.budget || "—"}`,
    "",
    i.message,
  ].join("\n");
}

/** Development default: logs the inquiry on the server. */
const consoleProvider: InquiryProvider = {
  name: "console",
  async send(inquiry) {
    console.info("[inquiry] New project inquiry\n" + formatInquiry(inquiry));
  },
};

export function getInquiryProvider(): InquiryProvider {
  // switch (process.env.INQUIRY_PROVIDER) { case "resend": return resendProvider; }
  return consoleProvider;
}
