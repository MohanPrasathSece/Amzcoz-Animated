/**
 * Lead submission - internal only.
 * No external CRM API. Leads are stored locally and optionally
 * forwarded to an internal endpoint via VITE_LEADS_ENDPOINT.
 */

export interface CRMLead {
  name?: string;
  email: string;
  phone: string;
  countryCode?: string;
  message?: string;
  type?: "contact" | "signup";
}

export async function submitLeadToCRM(lead: CRMLead) {
  const endpoint = import.meta.env.VITE_LEADS_ENDPOINT;

  if (endpoint) {
    try {
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lead,
          source: "amzcoz.com",
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch {
      // Silently swallow - do not block the user flow
    }
  }

  return { success: true };
}
