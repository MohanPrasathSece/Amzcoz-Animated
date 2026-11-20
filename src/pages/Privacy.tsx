import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPage() {
  return (
    <SmoothScroll>
      <SEO
        title="Privacy Policy | Amzcoz"
        description="AMZCOZ Privacy Policy. Learn how we handle client data, catalog confidentiality under NDA, cookie policies, and merchandise order information."
        canonical="/privacy"
      />
      <main className="relative min-h-screen bg-background text-foreground overflow-x-clip">
        <Navbar />

        {/* Hero Section */}
        <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 border-b border-white/5 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="mx-auto max-w-4xl px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full surface-glass px-4 py-1.5 text-[13px] uppercase tracking-[0.25em] text-primary font-semibold mb-6">
              <ShieldCheck className="h-4 w-4" />
              <span>Legal & Transparency</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Privacy <span className="gradient-text">Policy</span>
            </h1>

            <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Last updated: March 2025 · AMZCOZ ("we", "our", or "us") respects your privacy and is committed to protecting your personal data, agency credentials, and merchandise order details.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <div className="surface-glass bg-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-12 space-y-12 backdrop-blur-xl">

              {/* 1. Introduction */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <span className="text-primary font-mono text-lg">01.</span> Introduction & Scope
                </h2>
                <div className="space-y-3.5 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  <p>
                    AMZCOZ is a full-stack e-commerce management and quick-commerce growth agency headquartered in Pune, Maharashtra, India. We provide marketplace acceleration services (Amazon, Blinkit, Zepto, Flipkart, Swiggy Instamart, Myntra, and more) as well as direct-to-consumer physical merchandise and branded products.
                  </p>
                  <p>
                    This Privacy Policy governs how we collect, store, handle, and protect data when you visit <strong className="text-foreground">amzcoz.com</strong>, request a diagnostic audit, enter into a growth retainer, or purchase physical merchandise through our platform.
                  </p>
                </div>
              </div>

              {/* 2. Information We Collect */}
              <div className="border-t border-white/10 pt-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <span className="text-primary font-mono text-lg">02.</span> Information We Collect
                </h2>
                <div className="space-y-4 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  <p>Depending on how you interact with us, we collect the following categories of information:</p>
                  <ul className="space-y-2.5 pl-2">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span><strong className="text-foreground">Inquiry & Consultation Data:</strong> Full name, corporate email address, phone number, company website/store link, primary category, and custom project requirements.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span><strong className="text-foreground">Agency & Account Performance Data:</strong> Seller Central / Vendor Central delegated user permissions, read-only analytics, ad console campaign records, buy-box metrics, and catalog SKU files provided under strict mutual confidentiality.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span><strong className="text-foreground">Merchandise & Order Details:</strong> Delivery address, billing address, contact phone number, and transaction receipt data for apparel or physical merchandise orders. We do not store raw credit card or net-banking numbers on our servers; payments are processed directly through secure, RBI-compliant PCI-DSS payment gateways.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span><strong className="text-foreground">Technical Device Data:</strong> IP address, browser type, device identifiers, and anonymous browsing telemetry to ensure site security and prevent abusive traffic.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 3. How We Use Your Information */}
              <div className="border-t border-white/10 pt-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <span className="text-primary font-mono text-lg">03.</span> How We Use Your Information
                </h2>
                <div className="space-y-3.5 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  <p>We use your information exclusively for legitimate agency and operational purposes:</p>
                  <ul className="space-y-2 pl-2">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span>Delivering customized marketplace audits, PPC diagnostic roadmaps, and quick-commerce dark store mapping.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span>Fulfilling and dispatching physical merchandise, providing tracking updates, and handling warranty or return requests.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span>Complying with statutory tax, invoicing (GST), and regulatory requirements in India.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 4. Strict Confidentiality & NDA */}
              <div className="border-t border-white/10 pt-10">
                <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 space-y-3">
                  <div className="flex items-center gap-2.5 text-foreground font-semibold text-base">
                    <Lock className="h-5 w-5 text-primary" />
                    <span>Strict Mutual NDA & Zero Data Resale Policy</span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    We never rent, trade, lease, or sell client data, sales figures, margin structures, supplier lists, or consumer contacts to third parties. All operational information shared with AMZCOZ during diagnostic audits or active retainers is protected by our standard Non-Disclosure Agreement (NDA).
                  </p>
                </div>
              </div>

              {/* 5. Merchandise & Logistics Data Sharing */}
              <div className="border-t border-white/10 pt-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <span className="text-primary font-mono text-lg">04.</span> Merchandise Logistics & Third-Party Service Providers
                </h2>
                <div className="space-y-3.5 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  <p>
                    For merchandise purchases, your name, shipping address, and phone number are shared solely with verified logistics partners (such as Blue Dart, Delhivery, DTDC, Xpressbees, or Shadowfax) strictly for dispatch, doorstep delivery, and SMS/WhatsApp tracking notifications.
                  </p>
                  <p>
                    All payment processing is executed over 256-bit SSL encrypted channels via accredited payment service providers. AMZCOZ never retains payment card CVVs or net banking credentials.
                  </p>
                </div>
              </div>

              {/* 6. Cookies & Analytics */}
              <div className="border-t border-white/10 pt-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <span className="text-primary font-mono text-lg">05.</span> Cookies & Analytics
                </h2>
                <div className="space-y-3.5 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  <p>
                    We use minimal, performance-optimized first-party and third-party cookies to remember session preferences, analyze traffic flow, and ensure page speed. You can configure your browser to reject cookies, though certain site features may have reduced functionality.
                  </p>
                </div>
              </div>

              {/* 7. Contact Information */}
              <div className="border-t border-white/10 pt-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <span className="text-primary font-mono text-lg">06.</span> Grievance Officer & Contact
                </h2>
                <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed mb-6">
                  For privacy queries, data deletion requests, or questions regarding our handling of your data, please contact our Privacy & Compliance Officer:
                </p>

                <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3 text-sm">
                  <div className="font-semibold text-foreground">AMZCOZ Digital Media & Commerce</div>
                  <div className="flex items-center gap-2.5 text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary" />
                    <a href="mailto:adnan@amzcoz.com" className="hover:text-primary transition font-medium">adnan@amzcoz.com</a>
                  </div>
                  <div className="flex items-center gap-2.5 text-muted-foreground">
                    <Phone className="h-4 w-4 text-primary" />
                    <a href="tel:+918007208742" className="hover:text-primary transition font-mono">+91 80072 08742</a>
                  </div>
                  <div className="flex items-center gap-2.5 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Pune, Maharashtra · 411001, India</span>
                  </div>
                </div>
              </div>

            </div>
            </Reveal>

            {/* Quick Navigation Footer */}
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground border-t border-white/10 pt-6">
              <div>Questions about our practices? <Link to="/contact" className="text-primary hover:underline">Contact our team</Link></div>
              <div className="flex items-center gap-4">
                <Link to="/terms" className="hover:text-foreground transition">Terms & Conditions</Link>
                <span>•</span>
                <Link to="/shipping" className="hover:text-foreground transition">Shipping Policy</Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <ScrollToTop />
      </main>
    </SmoothScroll>
  );
}
