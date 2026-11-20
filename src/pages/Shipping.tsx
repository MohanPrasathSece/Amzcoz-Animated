import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { HeroGlassFold } from "@/components/HeroGlassFold";
import { Truck, Package, Clock, ShieldCheck, RefreshCw, AlertCircle, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function ShippingPage() {
  return (
    <SmoothScroll>
      <SEO
        title="Shipping & Delivery Policy | Amzcoz Merchandise"
        description="AMZCOZ Merchandise Shipping and Delivery Policy. Estimated delivery times across India, tracking guidelines, dispatch procedures, and return policies."
        canonical="/shipping"
      />
      <main className="relative min-h-screen bg-background text-foreground overflow-x-clip">
        <Navbar />

        {/* Hero Section */}
        <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 border-b border-white/5 overflow-hidden">
          <HeroGlassFold opacity="opacity-20 sm:opacity-25" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="mx-auto max-w-4xl px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full surface-glass px-4 py-1.5 text-[13px] uppercase tracking-[0.25em] text-primary font-semibold mb-6">
              <Truck className="h-4 w-4" />
              <span>Logistics & Fulfillment</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Shipping & <span className="gradient-text">Delivery Policy</span>
            </h1>

            <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              For AMZCOZ physical merchandise, promotional products, brand gear, and apparel. Reliable doorstep fulfillment across India.
            </p>
          </div>
        </section>

        {/* Highlight Cards */}
        <section className="py-8 relative z-10 border-b border-white/5">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3.5">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">24-48 Hr Dispatch</div>
                    <div className="text-xs text-muted-foreground">Rapid order processing</div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3.5">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">3-7 Days Delivery</div>
                    <div className="text-xs text-muted-foreground">Pan-India coverage</div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3.5">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">7-Day Exchanges</div>
                    <div className="text-xs text-muted-foreground">For apparel & gear</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <div className="surface-glass bg-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-12 space-y-12 backdrop-blur-xl">

              {/* 1. Scope */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <span className="text-primary font-mono text-lg">01.</span> Scope of Policy
                </h2>
                <div className="space-y-3.5 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  <p>
                    In addition to our core marketplace management and growth agency operations, AMZCOZ designs, manufactures, and retails proprietary physical merchandise, official brand apparel, promotional kits, and e-commerce packaging accessories.
                  </p>
                  <p>
                    This policy outlines the fulfillment schedules, courier carriers, shipping fees, tracking procedures, and return guidelines applicable to all physical merchandise orders placed directly through <strong className="text-foreground">amzcoz.com</strong> or authorized corporate purchase orders.
                  </p>
                </div>
              </div>

              {/* 2. Processing & Dispatch */}
              <div className="border-t border-white/10 pt-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <span className="text-primary font-mono text-lg">02.</span> Order Processing & Dispatch
                </h2>
                <div className="space-y-3.5 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  <p>
                    All confirmed in-stock merchandise orders are verified, securely packed, and handed over to our logistics partners within <strong className="text-foreground">24 to 48 business hours</strong> of payment confirmation.
                  </p>
                  <p>
                    Orders placed on Sundays or gazetted public holidays in Maharashtra/India will be processed on the immediately following business day. Custom-embroidered or bespoke bulk corporate merchandise orders may require a production lead time of 5-7 business days prior to dispatch, as agreed during quote approval.
                  </p>
                </div>
              </div>

              {/* 3. Delivery Timelines */}
              <div className="border-t border-white/10 pt-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <span className="text-primary font-mono text-lg">03.</span> Shipping Destinations & Timelines
                </h2>
                <div className="space-y-4 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  <p>We deliver to over 19,000+ postal pin-codes across India. Estimated delivery timeframes from date of dispatch:</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                    <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                      <div className="font-semibold text-foreground text-sm">Metro Cities</div>
                      <div className="text-xs text-primary font-medium mt-1">2 to 4 Business Days</div>
                      <div className="text-xs text-muted-foreground mt-1">Mumbai, Pune, Delhi-NCR, Bengaluru, Hyderabad, Chennai, Kolkata.</div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                      <div className="font-semibold text-foreground text-sm">Tier 2 & Tier 3 Cities</div>
                      <div className="text-xs text-primary font-medium mt-1">4 to 7 Business Days</div>
                      <div className="text-xs text-muted-foreground mt-1">All other state capitals and major district headquarters across India.</div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                      <div className="font-semibold text-foreground text-sm">Remote & North-Eastern Regions</div>
                      <div className="text-xs text-primary font-medium mt-1">7 to 10 Business Days</div>
                      <div className="text-xs text-muted-foreground mt-1">Special delivery zones, hill stations, and island territories.</div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                      <div className="font-semibold text-foreground text-sm">International Shipping</div>
                      <div className="text-xs text-primary font-medium mt-1">Custom Request Only</div>
                      <div className="text-xs text-muted-foreground mt-1">Dispatched via DHL Express or FedEx. Custom import duties payable by recipient.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Courier Partners & Tracking */}
              <div className="border-t border-white/10 pt-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <span className="text-primary font-mono text-lg">04.</span> Logistics Carriers & Real-Time Tracking
                </h2>
                <div className="space-y-3.5 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  <p>
                    We partner exclusively with tier-1 Indian courier networks to guarantee secure transit, including <strong className="text-foreground">Blue Dart, Delhivery, DTDC, Xpressbees, and Shadowfax</strong>.
                  </p>
                  <p>
                    As soon as your consignment is scanned at our fulfillment center, an automated shipping confirmation containing the courier name, airway bill (AWB) number, and live tracking URL is transmitted to your registered email address and WhatsApp number.
                  </p>
                </div>
              </div>

              {/* 5. Shipping Charges */}
              <div className="border-t border-white/10 pt-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <span className="text-primary font-mono text-lg">05.</span> Shipping Rates
                </h2>
                <div className="space-y-3.5 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  <ul className="space-y-2.5 pl-2">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                      <span><strong className="text-foreground">Free Shipping:</strong> On all domestic merchandise orders totaling ₹999 or above.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span><strong className="text-foreground">Standard Delivery:</strong> A flat ₹79 delivery fee applies to domestic orders below ₹999.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span><strong className="text-foreground">Cash on Delivery (COD):</strong> Where applicable, a nominal ₹49 COD verification fee is levied by the logistics partner.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 6. Damaged in Transit */}
              <div className="border-t border-white/10 pt-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <span className="text-primary font-mono text-lg">06.</span> Transit Damage & Tampered Shipments
                </h2>
                <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <div className="flex items-center gap-2 text-foreground font-semibold">
                    <AlertCircle className="h-5 w-5 text-amber-400" />
                    <span>Important: Unboxing Inspection Protocol</span>
                  </div>
                  <p>
                    If the external parcel arrives visibly tampered, crushed, or opened, please <strong className="text-foreground">refuse delivery</strong> from the courier or clearly endorse "Damaged on Arrival" on the delivery sheet.
                  </p>
                  <p>
                    If damage is discovered after unboxing, notify us within <strong className="text-foreground">48 hours</strong> of delivery at <a href="tel:+918007208742" className="text-primary underline font-medium">+91 80072 08742</a> along with photos/video of the outer carton, shipping label, and damaged item. We will arrange an immediate doorstep reverse pickup and dispatch a brand-new replacement at zero additional charge.
                  </p>
                </div>
              </div>

              {/* 7. Returns & Exchanges */}
              <div className="border-t border-white/10 pt-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <span className="text-primary font-mono text-lg">07.</span> 7-Day Exchange & Replacement Window
                </h2>
                <div className="space-y-3.5 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  <p>
                    For apparel and merchandise sizing concerns, we provide a hassle-free <strong className="text-foreground">7-day replacement window</strong> from the date of delivery.
                  </p>
                  <p>
                    Items must be returned unworn, unwashed, with all original tags attached and inside the original branded packaging. Custom-printed or customized corporate bulk orders are non-returnable unless defective in manufacturing.
                  </p>
                </div>
              </div>

              {/* 8. Contact Information */}
              <div className="border-t border-white/10 pt-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <span className="text-primary font-mono text-lg">08.</span> Shipping & Order Support
                </h2>
                <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3 text-sm">
                  <div className="font-semibold text-foreground">AMZCOZ Merchandise & Dispatch Cell</div>
                  <div className="flex items-center gap-2.5 text-muted-foreground">
                    <Phone className="h-4 w-4 text-primary" />
                    <a href="tel:+918007208742" className="hover:text-primary transition font-mono">+91 80072 08742</a>
                  </div>
                  <div className="flex items-center gap-2.5 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Pune Fulfillment Hub, Maharashtra · 411001, India</span>
                  </div>
                </div>
              </div>

            </div>
            </Reveal>

            {/* Quick Navigation Footer */}
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground border-t border-white/10 pt-6">
              <div>Have a question regarding your order? <Link to="/contact" className="text-primary hover:underline">Contact our support</Link></div>
              <div className="flex items-center gap-4">
                <Link to="/privacy" className="hover:text-foreground transition">Privacy Policy</Link>
                <span>•</span>
                <Link to="/terms" className="hover:text-foreground transition">Terms & Conditions</Link>
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
