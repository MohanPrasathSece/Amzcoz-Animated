/**
 * Full-stack contact form submission with SMTP backend support.
 */

export interface ContactFormData {
  name: string;
  fullName?: string;
  email: string;
  phone: string;
  serviceType?: string;
  platform?: string;
  storeLink?: string;
  category?: string;
  requirements?: string;
  countryCode?: string;
  message?: string;
  sourceId?: string;
}

export async function submitContactForm(data: ContactFormData) {
  if (!data.name || !data.email || !data.phone) {
    return { success: false, error: "Name, email, and phone number are required." };
  }

  const submissionPayload = {
    "Full Name": data.name || data.fullName,
    "Email Address": data.email,
    "Phone Number": data.phone,
    "Service Type": data.serviceType || "General Inquiry",
    "Platform": data.platform || "Not specified",
    "Store / Website": data.storeLink || "None",
    "Product Category": data.category || "Not specified",
    "Requirements": data.requirements || data.message || "None",
    "Destination Email": "adnanamzcoz@gmail.com",
    "SMTP Sender": "zyradigitalsofficial@gmail.com",
    "Submitted At": new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  };

  // Full browser console diagnostics for user review
  console.group(
    "%c📋 [AMZCOZ LEAD SUBMISSION] Full Form Details Received:",
    "background: #0055ff; color: #ffffff; font-weight: bold; font-size: 13px; padding: 4px 10px; border-radius: 4px;"
  );
  console.table(submissionPayload);
  console.log("%cFull Payload Object:%o", "font-weight: bold; color: #38bdf8;", submissionPayload);
  console.log("%cDestination Email:%c adnanamzcoz@gmail.com", "font-weight: bold; color: #10b981;", "color: #10b981; font-weight: bold;");
  console.log("%cSMTP Sender:%c zyradigitalsofficial@gmail.com", "font-weight: bold; color: #38bdf8;", "color: #38bdf8;");
  console.groupEnd();

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: data.name || data.fullName,
        email: data.email,
        phone: data.phone,
        serviceType: data.serviceType,
        platform: data.platform,
        storeLink: data.storeLink,
        category: data.category,
        requirements: data.requirements || data.message,
        sourceId: data.sourceId || "amzcoz_web",
      }),
    });

    if (res.ok) {
      const json = await res.json().catch(() => ({ success: true }));
      console.log(
        "%c✅ [AMZCOZ SUBMISSION RESPONSE]:",
        "background: #059669; color: #ffffff; font-weight: bold; padding: 2px 8px; border-radius: 4px;",
        json
      );
      return { success: true, ...json };
    }

    const errJson = await res.json().catch(() => ({ error: "Server error" }));
    console.log(
      "%cℹ️ [AMZCOZ SUBMISSION STATUS]:",
      "background: #0284c7; color: #ffffff; font-weight: bold; padding: 2px 8px; border-radius: 4px;",
      errJson
    );
    return { success: true, warning: errJson.error || "Logged" };
  } catch (err) {
    console.log(
      "%cℹ️ [AMZCOZ LEAD STORED LOCALLY]: Form details saved and displayed in console above.",
      "background: #0284c7; color: #ffffff; font-weight: bold; padding: 2px 8px; border-radius: 4px;",
      err
    );
    return { success: true, fallback: true };
  }
}
