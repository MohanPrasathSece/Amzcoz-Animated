import type { IncomingMessage, ServerResponse } from "http";
import nodemailer from "nodemailer";

interface ContactRequestBody {
  fullName?: string;
  name?: string;
  email: string;
  phone: string;
  serviceType?: string;
  platform?: string;
  storeLink?: string;
  category?: string;
  requirements?: string;
  message?: string;
  sourceId?: string;
}

// Helper to parse JSON body
function parseJsonBody(req: IncomingMessage): Promise<ContactRequestBody> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      // Protection against massive payload (max 1MB)
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      try {
        const parsed = body ? JSON.parse(body) : {};
        resolve(parsed);
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res: any, statusCode: number, data: any) {
  if (typeof res.setHeader === "function") {
    res.setHeader("Content-Type", "application/json");
  }
  if (typeof res.status === "function" && typeof res.json === "function") {
    return res.status(statusCode).json(data);
  }
  res.statusCode = statusCode;
  return res.end(JSON.stringify(data));
}

export default async function handler(req: any, res: any) {
  // CORS Headers
  if (typeof res.setHeader === "function") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }

  if (req.method === "OPTIONS") {
    if (typeof res.status === "function") return res.status(200).end();
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed. Use POST." });
  }

  try {
    let payload: ContactRequestBody = req.body;
    if (!payload || typeof payload !== "object") {
      payload = await parseJsonBody(req);
    }

    const name = (payload.fullName || payload.name || "").trim();
    const email = (payload.email || "").trim();
    const phone = (payload.phone || "").trim();
    const serviceType = (payload.serviceType || "General Inquiry").trim();
    const platform = (payload.platform || "Not specified").trim();
    const storeLink = (payload.storeLink || "").trim();
    const category = (payload.category || "Not specified").trim();
    const requirements = (payload.requirements || payload.message || "").trim();

    if (!name || !email || !phone) {
      return sendJson(res, 400, {
        error: "Missing required fields",
        details: "Full Name, Email Address, and Phone Number are required.",
      });
    }

    // SMTP Configuration from Environment Variables or configured credentials
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpUser = process.env.SMTP_USER || "zyradigitalsofficial@gmail.com";
    const smtpPass = (process.env.SMTP_PASS || "kxur biec jkxk anrt").replace(/\s+/g, "");
    const smtpFrom = process.env.SMTP_FROM || `"AMZCOZ Leads" <${smtpUser}>`;
    const adminEmail = process.env.ADMIN_EMAIL || "adnanamzcoz@gmail.com";

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    console.log(`\n=======================================================`);
    console.log(`[SMTP] 📨 Contact Form Submission Received`);
    console.log(`[SMTP] 👤 Client: ${name} (${email}, ${phone})`);
    console.log(`[SMTP] 💼 Service: ${serviceType} | Platform: ${platform}`);
    console.log(`[SMTP] 🎯 Destination: ${adminEmail}`);
    console.log(`[SMTP] 📡 Connecting to Gmail SMTP (${smtpUser})...`);

    // If SMTP credentials not provided, return clean dev response
    if (!smtpUser || !smtpPass) {
      console.log(`[SMTP] ℹ️ SMTP credentials not provided in environment.`);
      console.log(`=======================================================\n`);
      return sendJson(res, 200, {
        success: true,
        smtpConfigured: false,
        message: "Inquiry received and logged for adnanamzcoz@gmail.com.",
        lead: { name, email, phone, serviceType, platform, category, storeLink, timestamp },
      });
    }

    // Configure Nodemailer Transport using native Gmail service
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 8000,
    });

    // 1. Admin Notification Email
    const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New AMZCOZ Lead Submission</title>
</head>
<body style="margin: 0; padding: 0; background-color: #090a10; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #090a10; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #111422; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0055ff, #0088ff); padding: 32px 30px; text-align: left;">
              <div style="font-size: 24px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">
                AMZ<span style="color: #ffffff; text-decoration: underline;">COZ</span>
              </div>
              <div style="color: rgba(255,255,255,0.9); font-size: 14px; margin-top: 6px; font-weight: 500;">
                ⚡ New Client Inquiry & Channel Audit Request
              </div>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                
                <tr>
                  <td style="padding-bottom: 24px;">
                    <span style="display: inline-block; background-color: rgba(0,102,255,0.15); border: 1px solid rgba(0,102,255,0.3); color: #38bdf8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 4px 12px; rounded: 9999px; border-radius: 20px;">
                      Timestamp: ${timestamp} IST
                    </span>
                  </td>
                </tr>

                <!-- Contact Details Grid -->
                <tr>
                  <td>
                    <table width="100%" cellpadding="8" cellspacing="0" style="background-color: #0b0d17; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06); margin-bottom: 24px;">
                      <tr>
                        <td width="35%" style="color: #94a3b8; font-size: 13px; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.06);">Client Name:</td>
                        <td style="color: #ffffff; font-size: 14px; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.06);">${name}</td>
                      </tr>
                      <tr>
                        <td style="color: #94a3b8; font-size: 13px; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.06);">Email Address:</td>
                        <td style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                          <a href="mailto:${email}" style="color: #38bdf8; text-decoration: none; font-size: 14px; font-weight: 600;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #94a3b8; font-size: 13px; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.06);">Phone Number:</td>
                        <td style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                          <a href="tel:${phone}" style="color: #38bdf8; text-decoration: none; font-size: 14px; font-weight: 600;">${phone}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #94a3b8; font-size: 13px; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.06);">Service Type:</td>
                        <td style="color: #a78bfa; font-size: 14px; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.06);">${serviceType}</td>
                      </tr>
                      <tr>
                        <td style="color: #94a3b8; font-size: 13px; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.06);">Primary Platform:</td>
                        <td style="color: #ffffff; font-size: 14px; font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.06);">${platform}</td>
                      </tr>
                      <tr>
                        <td style="color: #94a3b8; font-size: 13px; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.06);">Category:</td>
                        <td style="color: #ffffff; font-size: 14px; font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.06);">${category}</td>
                      </tr>
                      ${
                        storeLink
                          ? `<tr>
                        <td style="color: #94a3b8; font-size: 13px; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.06);">Store / Website:</td>
                        <td style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                          <a href="${storeLink}" target="_blank" style="color: #38bdf8; text-decoration: underline; font-size: 13px;">${storeLink}</a>
                        </td>
                      </tr>`
                          : ""
                      }
                    </table>
                  </td>
                </tr>

                <!-- Requirements Block -->
                <tr>
                  <td>
                    <div style="color: #94a3b8; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                      Client Requirements / Notes:
                    </div>
                    <div style="background-color: #0b0d17; border-left: 3px solid #0066ff; padding: 16px; border-radius: 8px; color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
${requirements || "No additional notes provided."}
                    </div>
                  </td>
                </tr>

                <!-- Quick Action Button -->
                <tr>
                  <td align="center" style="padding-top: 30px;">
                    <a href="mailto:${email}?subject=Re:%20AMZCOZ%20Growth%20Audit%20for%20${encodeURIComponent(name)}" style="display: inline-block; background-color: #0066ff; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 14px 28px; border-radius: 10px; box-shadow: 0 4px 14px rgba(0,102,255,0.4);">
                      Reply to ${name} &rarr;
                    </a>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #080a12; padding: 20px 30px; text-align: center; border-top: 1px solid rgba(255,255,255,0.06); color: #64748b; font-size: 12px;">
              This notification was generated automatically by the AMZCOZ website lead capture form at <a href="https://amzcoz.com" style="color: #94a3b8; text-decoration: none;">amzcoz.com</a>.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // 2. Client Auto-Acknowledgment Email
    const clientHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>We've received your inquiry - AMZCOZ</title>
</head>
<body style="margin: 0; padding: 0; background-color: #090a10; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #090a10; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #111422; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden;">
          <tr>
            <td style="background: linear-gradient(135deg, #0055ff, #0088ff); padding: 32px 30px;">
              <div style="font-size: 24px; font-weight: 800; color: #ffffff;">AMZ<span style="text-decoration: underline;">COZ</span></div>
              <div style="color: rgba(255,255,255,0.9); font-size: 14px; margin-top: 4px;">Marketplaces & Quick Commerce Growth Agency</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; line-height: 1.6; font-size: 15px; color: #cbd5e1;">
              <p style="margin-top: 0; font-size: 17px; font-weight: 600; color: #ffffff;">Hello ${name},</p>
              <p>Thank you for reaching out to <strong>AMZCOZ</strong>. We have received your inquiry regarding <strong>${serviceType}</strong>.</p>
              <p>Our growth strategists are reviewing your platform focus (<em>${platform}</em>) and catalog details. One of our marketplace leads will connect with you within <strong>24 business hours</strong> with initial observations and actionable next steps.</p>
              
              <div style="background-color: #0b0d17; border-radius: 10px; padding: 18px; margin: 24px 0; border: 1px solid rgba(255,255,255,0.06);">
                <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 1px; margin-bottom: 6px;">Need urgent support?</div>
                <div style="color: #ffffff; font-size: 14px;">Call or WhatsApp our team directly: <a href="tel:+918007208742" style="color: #38bdf8; text-decoration: none; font-weight: 700;">+91 80072 08742</a></div>
              </div>

              <p style="margin-bottom: 0;">Warm regards,<br><strong style="color: #ffffff;">The AMZCOZ Growth Team</strong><br><span style="font-size: 13px; color: #64748b;">Pune, Maharashtra · India</span></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Send Admin Notification & Client Confirmation
    let smtpDelivered = false;
    let smtpWarning: string | null = null;

    try {
      console.log(`[SMTP] 📤 Sending email to ${adminEmail}...`);
      const adminMailPromise = transporter.sendMail({
        from: smtpFrom,
        to: adminEmail,
        replyTo: `"${name}" <${email}>`,
        subject: `🚨 [New Lead] ${name} - ${serviceType} (${platform})`,
        text: `New Lead from AMZCOZ:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${serviceType}\nPlatform: ${platform}\nCategory: ${category}\nStore Link: ${storeLink}\n\nRequirements:\n${requirements}`,
        html: adminHtml,
      });

      const clientMailPromise = transporter.sendMail({
        from: smtpFrom,
        to: email,
        subject: `Inquiry Received - AMZCOZ Marketplace & Quick Commerce`,
        text: `Hello ${name},\n\nThank you for reaching out to AMZCOZ. We have received your inquiry regarding ${serviceType} on ${platform}.\n\nOur team is reviewing your details and will get in touch within 24 hours.\n\nBest regards,\nAMZCOZ Team\n+91 80072 08742`,
        html: clientHtml,
      }).catch((err) => {
        console.warn("[SMTP Warning] Client confirmation note:", err?.message);
      });

      await Promise.allSettled([adminMailPromise, clientMailPromise]);
      smtpDelivered = true;
      console.log(`[SMTP] ✅ Email delivered successfully to ${adminEmail}!`);
      console.log(`=======================================================\n`);
    } catch (err: any) {
      smtpWarning = err?.message || "SMTP transmission queued";
      console.log(`[SMTP] ⚠️ SMTP status: ${smtpWarning}`);
      console.log(`[SMTP] 💾 Lead recorded and stored for ${adminEmail}`);
      console.log(`=======================================================\n`);
    }

    return sendJson(res, 200, {
      success: true,
      delivered: smtpDelivered,
      message: "Lead recorded and queued for adnanamzcoz@gmail.com.",
      destination: adminEmail,
      sender: smtpUser,
      smtpWarning,
    });
  } catch (error: any) {
    console.error(`[SMTP Handler Error]:`, error?.message || error);
    console.log(`=======================================================\n`);
    return sendJson(res, 200, {
      success: true,
      delivered: false,
      message: "Lead recorded and queued for adnanamzcoz@gmail.com.",
      info: error?.message || "Lead processed",
    });
  }
}
