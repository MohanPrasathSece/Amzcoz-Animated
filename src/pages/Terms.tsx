import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { FileText, Scale, CheckCircle2, AlertCircle, ShoppingBag, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function TermsPage() {
  return (
    <SmoothScroll>
      <SEO
        title="Terms & Conditions | AMZCOZ"
        description="AMZCOZ Terms and Conditions of service, client scope of work, NDA guidelines, performance media terms, and merchandise sales policies."
        canonical="/terms"
      />
      <main className="relative min-h-screen bg-background text-foreground overflow-x-clip">
        <Navbar />

        {/* Hero Section */}
        <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 border-b border-white/5 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="mx-auto max-w-4xl px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full surface-glass px-4 py-1.5 text-[13px] uppercase tracking-[0.25em] text-primary font-semibold mb-6">
              <Scale className="h-4 w-4" />
              <span>Terms of Engagement</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Terms & <span className="gradient-text">Conditions</span>
            </h1>

            <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Effective Date: March 2025 · Please review these Terms and Conditions carefully before engaging AMZCOZ for marketplace growth services or purchasing physical merchandise.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <div className="surface-glass bg-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-12 space-y-12 backdrop-blur-xl">

              {/* 1. Acceptance */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <span className="text-primary font-mono text-lg">01.</span> Acceptance of Terms
                </h2>
                <div className="space-y-3.5 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  <p>
                    By accessing or using <strong className="text-foreground">amzcoz.com</strong>, submitting a contact inquiry, signing a statement of work (SOW), or ordering physical merchandise from AMZCOZ ("Company", "we", "us", or "our"), you agree to be bound by these Terms and Conditions.
                  </p>
                  <p>
                    If you are entering into this agreement on behalf of a company, brand, or other legal entity, you represent that you have the authority to bind such entity to these terms.
                  </p>
                </div>
              </div>

              {/* 2. Agency Services & Retainers */}
              <div className="border-t border-white/10 pt-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <span className="text-primary font-mono text-lg">02.</span> Agency Growth Services & Scope
                </h2>
                <div className="space-y-4 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  <p>
                    AMZCOZ delivers multi-channel e-commerce growth services, including:
                  </p>
                  <ul className="space-y-2.5 pl-2">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span><strong className="text-foreground">Marketplace Management:</strong> End-to-end cataloging, listing optimization, price surveillance, brand defense, and customer support across Amazon, Flipkart, Myntra, Ajio, JioMart, and Meesho.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span><strong className="text-foreground">Quick Commerce Scaling:</strong> Dark-store footprint mapping, local inventory replenishment, and 10-minute search placement on Blinkit, Zepto, and Swiggy Instamart.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span><strong className="text-foreground">Performance Advertising:</strong> Amazon Sponsored Ads, Blinkit Brand Booster, Meta D2C ads, and DSP programmatic campaign execution.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span><strong className="text-foreground">Creative & Brand Enhancement:</strong> Premium A+ content, Brand Stores, product 3D renders, infographics, and packaging design.</span>
                    </li>
                  </ul>
                  <p className="text-xs text-muted-foreground/90 italic">
                    Specific scopes, project milestones, performance metrics, and pricing are formalised in an individual Statement of Work (SOW) executed between AMZCOZ and the client.
                  </p>
                </div>
              </div>

              {/* 3. Account Access & Delegated Permissions */}
              <div className="border-t border-white/10 pt-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <span className="text-primary font-mono text-lg">03.</span> Client Responsibilities & Account Access
                </h2>
                <div className="space-y-3.5 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  <p>
                    To execute agency services, the client agrees to provide delegated, secondary user permissions (e.g., Amazon Seller Central User Permissions or Quick Commerce portal accounts) with minimum required roles.
                  </p>
                  <p>
                    The client remains the sole legal owner of their marketplace accounts, seller credentials, brand registrations, and inventory. The client is responsible for maintaining active platform compliance and paying all platform-specific vendor fees.
                  </p>
                </div>
              </div>

              {/* 4. Merchandise Sales & Ordering */}
              <div className="border-t border-white/10 pt-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  <span>04. Physical Merchandise & E-Commerce Sales</span>
                </h2>
                <div className="space-y-3.5 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  <p>
                    AMZCOZ produces and sells physical merchandise, branded apparel, packaging gear, and promotional items directly to customers:
                  </p>
                  <ul className="space-y-2 pl-2">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span><strong className="text-foreground">Product Availability:</strong> All merchandise orders are subject to stock availability and confirmation of order price.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span><strong className="text-foreground">Pricing & Billing:</strong> All prices are displayed in Indian Rupees (INR) and are inclusive of applicable GST unless explicitly stated otherwise.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span><strong className="text-foreground">Shipping & Fulfillment:</strong> Merchandise fulfillment is conducted in strict accordance with our dedicated <Link to="/shipping" className="text-primary underline hover:text-primary/80">Shipping & Delivery Policy</Link>.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 5. Invoicing & Payment Terms */}
              <div className="border-t border-white/10 pt-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <span className="text-primary font-mono text-lg">05.</span> Invoicing, Retainers & Payment Terms
                </h2>
                <div className="space-y-3.5 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  <p>
                    Agency retainer invoices are generated monthly in advance or as defined in the client's SOW. Invoices are payable within 7 business days from the date of issue.
                  </p>
                  <p>
                    Late payments may result in a temporary pause of active campaign management and listing surveillance until outstanding dues are cleared. All agency fees are subject to 18% GST as per Indian tax regulations.
                  </p>
                </div>
              </div>

              {/* 6. Intellectual Property */}
              <div className="border-t border-white/10 pt-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <span className="text-primary font-mono text-lg">06.</span> Intellectual Property Rights
                </h2>
                <div className="space-y-3.5 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  <p>
                    Upon receipt of full payment, all customized creative deliverables (A+ Content, infographics, brand store assets, and custom copy) become the exclusive intellectual property of the client.
                  </p>
                  <p>
                    AMZCOZ retains ownership of its proprietary auditing scripts, predictive algorithms, internal SOPs, and marketing frameworks utilized during service execution.
                  </p>
                </div>
              </div>

              {/* 7. Limitation of Liability */}
              <div className="border-t border-white/10 pt-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <span className="text-primary font-mono text-lg">07.</span> Third-Party Marketplaces & Liability
                </h2>
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <div className="flex items-center gap-2 text-foreground font-semibold">
                    <AlertCircle className="h-5 w-5 text-amber-400" />
                    <span>Independent Service Provider Notice</span>
                  </div>
                  <p>
                    AMZCOZ is an independent e-commerce consultancy and is not affiliated, endorsed, or sponsored by Amazon, Blinkit, Zepto, Flipkart, Swiggy, or Walmart. Marketplaces operate autonomous ranking algorithms and internal compliance teams. While we apply proven growth strategies, AMZCOZ does not guarantee specific external algorithm outcomes, suspension reversals, or third-party platform policy shifts beyond our direct control.
                  </p>
                </div>
              </div>

              {/* 8. Governing Law & Dispute Resolution */}
              <div className="border-t border-white/10 pt-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <span className="text-primary font-mono text-lg">08.</span> Governing Law & Jurisdiction
                </h2>
                <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  These Terms and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of the Republic of India. The courts located in <strong className="text-foreground">Pune, Maharashtra, India</strong> shall have exclusive jurisdiction over any legal proceedings.
                </p>
              </div>

              {/* 9. Contact */}
              <div className="border-t border-white/10 pt-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <span className="text-primary font-mono text-lg">09.</span> Inquiries Regarding Terms
                </h2>
                <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3 text-sm">
                  <div className="font-semibold text-foreground">AMZCOZ Legal & Contracts Department</div>
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
              <div>Need a custom enterprise agreement? <Link to="/contact" className="text-primary hover:underline">Speak with leadership</Link></div>
              <div className="flex items-center gap-4">
                <Link to="/privacy" className="hover:text-foreground transition">Privacy Policy</Link>
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
