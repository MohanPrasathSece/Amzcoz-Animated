import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { submitContactForm } from "@/lib/contact";

interface ContactSectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  sourceId?: string;
}

const SERVICE_OPTIONS = [
  "Select a service",
  "E-commerce Management",
  "Advertising & Marketing",
  "Brand Enhancement",
  "Website Development",
  "E-commerce Website",
  "Social Media Marketing",
  "Other",
];

const PLATFORM_OPTIONS = [
  "Select a platform",
  "Amazon",
  "Flipkart",
  "Blinkit",
  "Zepto",
  "Swiggy Instamart",
  "BigBasket",
  "Flipkart Minutes",
  "Amazon Now",
  "Nykaa",
  "Myntra",
  "Ajio",
  "Jio Mart",
  "Meesho",
  "Walmart",
  "eBay",
  "Etsy",
  "Other",
];

const CATEGORY_OPTIONS = [
  "Select a category",
  "Electronics",
  "Fashion & Apparel",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Sports & Outdoors",
  "Toys & Games",
  "Books & Media",
  "Health & Wellness",
  "Automotive",
  "Other",
];

export function ContactSection({
  eyebrow = "◆ Dedicated Inquiry",
  title = "Direct Consultation & Free Channel Audit",
  subtitle = "Tell us about your brand. We will review your listings, dark-store positioning, and PPC structure within 24 hours.",
  sourceId = "amzcoz_contact_form",
}: ContactSectionProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState("Select a service");
  const [platform, setPlatform] = useState("Select a platform");
  const [storeLink, setStoreLink] = useState("");
  const [category, setCategory] = useState("Select a category");
  const [requirements, setRequirements] = useState("");

  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      toast.error("Please fill in your name, email, and phone number.");
      return;
    }

    if (serviceType === "Select a service") {
      toast.error("Please choose a primary service type.");
      return;
    }

    setSending(true);

    try {
      const fullMessage = [
        `Service Type: ${serviceType}`,
        platform !== "Select a platform" ? `Platform: ${platform}` : null,
        category !== "Select a category" ? `Category: ${category}` : null,
        storeLink.trim() ? `Store / Website: ${storeLink.trim()}` : null,
        requirements.trim() ? `Requirements: ${requirements.trim()}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      const res = await submitContactForm({
        name: fullName,
        fullName,
        email,
        phone,
        serviceType: serviceType !== "Select a service" ? serviceType : "General Inquiry",
        platform: platform !== "Select a platform" ? platform : undefined,
        storeLink: storeLink.trim() || undefined,
        category: category !== "Select a category" ? category : undefined,
        requirements: requirements.trim() || undefined,
        message: fullMessage,
        sourceId,
      });

      if (res.success !== false) {
        setSubmitted(true);
        toast.success("Thank you! Your requirements have been submitted successfully.");
      } else {
        toast.error("Could not send message. Please reach us directly at +91 80072 08742");
      }
    } catch {
      setSubmitted(true);
      toast.success("Thank you! Your requirements have been submitted successfully.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="relative z-10 py-20 md:py-28 border-t border-white/5 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* LEFT COLUMN: Clean Brand & Direct Contact Details */}
          <div className="lg:col-span-5 space-y-6 text-left pt-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full surface-glass px-3.5 py-1 text-[13px] uppercase tracking-[0.25em] text-primary font-semibold mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                {eyebrow}
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
                {title}
              </h2>
              <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Direct Contact Links */}
            <div className="pt-4 border-t border-white/10 space-y-3.5 text-sm text-foreground/90">
              <a
                href="tel:+918007208742"
                className="flex items-center gap-3 hover:text-primary transition font-medium"
              >
                <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <span>+91 80072 08742</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>Pune, Maharashtra · India</span>
              </div>
            </div>

            {/* Trust badge */}
            <div className="pt-2 flex items-center gap-2 text-xs text-muted-foreground/80">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Strict NDA & confidentiality guaranteed. Your catalog data is 100% secure.</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Full Required Field Form */}
          <div className="lg:col-span-7">
            <div className="contact-card surface-glass bg-white/[0.03] rounded-3xl p-6 sm:p-9 shadow-xl border border-white/10 relative overflow-hidden backdrop-blur-xl">
              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="h-16 w-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">Inquiry Received</h3>
                  <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                    Thank you! Our growth strategists will review your brand details and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="hero-btn hero-btn-ghost text-xs px-5 py-2.5 mt-4 inline-flex"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  {/* Row 1: Full Name & Email Address */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-[13px] font-semibold text-foreground/90 block mb-1.5">
                        Full Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition focus:border-primary/60 focus:bg-white/[0.08]"
                      />
                    </div>
                    <div>
                      <label className="text-[13px] font-semibold text-foreground/90 block mb-1.5">
                        Email Address <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition focus:border-primary/60 focus:bg-white/[0.08]"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone Number & Service Type */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-[13px] font-semibold text-foreground/90 block mb-1.5">
                        Phone Number <span className="text-primary">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition focus:border-primary/60 focus:bg-white/[0.08]"
                      />
                    </div>
                    <div>
                      <label className="text-[13px] font-semibold text-foreground/90 block mb-1.5">
                        Service Type <span className="text-primary">*</span>
                      </label>
                      <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="custom-select appearance-none w-full rounded-xl border border-white/15 bg-[oklch(0.14_0.015_270)] px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary/60 cursor-pointer"
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} disabled={opt === "Select a service"}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Platform (Optional) & Store/Website Link (Optional) */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-[13px] font-semibold text-foreground/90 block mb-1.5">
                        Platform <span className="text-muted-foreground font-normal">(Optional)</span>
                      </label>
                      <select
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className="custom-select appearance-none w-full rounded-xl border border-white/15 bg-[oklch(0.14_0.015_270)] px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary/60 cursor-pointer"
                      >
                        {PLATFORM_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[13px] font-semibold text-foreground/90 block mb-1.5">
                        Store/Website Link <span className="text-muted-foreground font-normal">(Optional)</span>
                      </label>
                      <input
                        type="url"
                        value={storeLink}
                        onChange={(e) => setStoreLink(e.target.value)}
                        placeholder="https://..."
                        className="w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition focus:border-primary/60 focus:bg-white/[0.08]"
                      />
                    </div>
                  </div>

                  {/* Row 4: Product/Business Category (Optional) */}
                  <div>
                    <label className="text-[13px] font-semibold text-foreground/90 block mb-1.5">
                      Product/Business Category <span className="text-muted-foreground font-normal">(Optional)</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="custom-select appearance-none w-full rounded-xl border border-white/15 bg-[oklch(0.14_0.015_270)] px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary/60 cursor-pointer"
                    >
                      {CATEGORY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Row 5: Tell us about your requirements */}
                  <div>
                    <label className="text-[13px] font-semibold text-foreground/90 block mb-1.5">
                      Tell us about your requirements
                    </label>
                    <textarea
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      placeholder="Tell us about your current challenges, goals, or what you're looking to achieve..."
                      rows={3}
                      className="w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition focus:border-primary/60 focus:bg-white/[0.08] resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={sending}
                      className="hero-btn hero-btn-primary w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg"
                    >
                      {sending ? "Submitting Requirements..." : "Submit Requirements"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
