/**
 * Client-side contact form submission.
 */

import { submitLeadToCRM } from "./crm";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  countryCode?: string;
  message?: string;
  sourceId?: string;
}

export async function submitContactForm(data: ContactFormData) {
  if (!data.name || !data.email || !data.phone) {
    return { success: false, error: "Name, email, and phone number are required." };
  }

  const result = await submitLeadToCRM({
    name: data.name,
    email: data.email,
    phone: data.phone,
    countryCode: data.countryCode,
    message: data.message,
    type: "contact",
  });

  return result;
}
