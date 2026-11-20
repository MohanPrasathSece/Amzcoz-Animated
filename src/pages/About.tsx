import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import {
  Zap,
  TrendingUp,
  Store,
  Check,
  X,
  ArrowRight,
  ShieldCheck,
  Clock,
  Coins,
  MessageSquare,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero headline animation
      const heading = heroRef.current?.querySelector("h1");
      if (heading) {
        const split = new SplitType(heading, { types: "chars,words" });
        gsap.from(split.chars, {
          yPercent: 100,
          opacity: 0,
          rotateX: -40,
          filter: "blur(10px)",
          stagger: 0.02,
          duration: 1.2,
          ease: "power3.out",
        });
      }
    }, [heroRef]);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <SEO
        title="About AMZCOZ | The Marketplace & Quick Commerce Growth Agency"
        description="Learn how AMZCOZ helps ambitious brands dominate Amazon, Blinkit, Zepto, Swiggy Instamart, and Flipkart through algorithm optimization, aggressive PPC management, and dark-store replenishment."
        canonical="/about"
        keywords="about amzcoz, ecommerce growth team, marketplace consultants india, blinkit agency partner, zepto growth consultants pune"
        structuredData={{
          "@type": "AboutPage",
          "@id": "https://amzcoz.com/about#webpage",
          "url": "https://amzcoz.com/about",
          "name": "About AMZCOZ - Marketplace Growth Agency",
          "description": "AMZCOZ is a performance-driven marketplace management and quick commerce acceleration agency based in Pune, India.",
          "isPartOf": {
            "@id": "https://amzcoz.com/#website",
          },
        }}
      />
      <main className="relative min-h-screen bg-background text-foreground overflow-x-clip">
        <Navbar />

        {/* ------------------- HERO SECTION ------------------- */}
        <section
          ref={heroRef}
          className="relative pt-36 pb-20 md:pt-44 md:pb-28 border-b border-white/5 overflow-hidden"
        >
          {/* Ambient Lighting */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="mx-auto max-w-7xl px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full surface-glass px-4 py-1.5 text-[13px] uppercase tracking-[0.25em] text-primary font-semibold mb-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              The Agency
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
              Your Hands-On Partner for <span className="gradient-text">E-Commerce Growth</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-sm md:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              We are an e-commerce growth team based in Pune. We help consumer brands launch, run, and scale their sales across Amazon, Flipkart, Blinkit, and Zepto. We take care of the everyday catalog work, ad management, and inventory planning so you can focus on making great products.
            </motion.p>
          </div>
        </section>

        {/* ------------------- WHAT EVERY BRAND NEEDS TODAY ------------------- */}
        <section className="py-20 md:py-28 relative z-10">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-14">
                <div className="text-[13px] uppercase tracking-[0.3em] text-primary font-semibold mb-3">
                  ◆ How We Help You Win
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                  Three Things Every Brand <span className="gradient-text">Needs Today</span>
                </h2>
                <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                  Selling online has changed. Here is how we make sure your products get discovered, trusted, and bought.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {[
                  {
                    icon: Zap,
                    num: "01",
                    title: "10-Minute Quick Commerce",
                    body: "Shoppers today want their items delivered in 10 minutes. We get your brand listed, approved, and stocked in Blinkit, Zepto, and Swiggy Instamart dark stores so local buyers can order right away.",
                    tag: "Blinkit & Zepto",
                  },
                  {
                    icon: TrendingUp,
                    num: "02",
                    title: "Ads That Turn a Real Profit",
                    body: "We do not burn your money on broad, non-converting keywords. We tune bids daily, remove wasted clicks, and focus strictly on your real sales revenue and return on ad spend (ROAS).",
                    tag: "Targeted PPC",
                  },
                  {
                    icon: Store,
                    num: "03",
                    title: "Daily Store Management",
                    body: "From product listing optimization and high-converting A+ content to inventory tracking, Buy Box protection, and customer reviews, our team handles the day-to-day work for you.",
                    tag: "Full Account Ownership",
                  },
                ].map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={idx}
                      className="relative rounded-3xl surface-glass border border-white/10 p-8 md:p-9 flex flex-col justify-between hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div className="h-13 w-13 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                            <Icon className="h-6 w-6" />
                          </div>
                          <span className="font-display text-4xl font-light text-primary/40">
                            {card.num}
                          </span>
                        </div>
                        <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                          {card.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {card.body}
                        </p>
                      </div>

                      <div className="mt-8 pt-5 border-t border-white/5">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-[13px] text-primary font-medium">
                          {card.tag}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------- TRADITIONAL AGENCIES VS AMZCOZ ------------------- */}
        <section className="py-20 md:py-28 bg-white/[0.015] border-y border-white/5 relative z-10">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-14">
                <div className="text-[13px] uppercase tracking-[0.3em] text-primary font-semibold mb-3">
                  ◆ Honest Difference
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                  Traditional Agencies vs <span className="gradient-text">AMZCOZ</span>
                </h2>
                <p className="mt-3 text-sm md:text-base text-muted-foreground">
                  Why brand founders prefer working with our dedicated team over typical marketing agencies.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Traditional Agencies */}
                <div className="rounded-3xl surface-glass border border-white/10 p-8 md:p-10 bg-white/[0.01]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-destructive/15 border border-destructive/30 flex items-center justify-center text-destructive">
                      <X className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">Typical Agencies</h3>
                      <div className="text-xs text-muted-foreground">Common frustrations brands experience</div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/5">
                    {[
                      "Hand your account over to junior interns right after you sign the contract",
                      "Run broad automated ad campaigns that waste money on non-buying clicks",
                      "Send confusing monthly PDF reports full of vanity numbers that hide real costs",
                      "Ignore Quick Commerce (Blinkit, Zepto), leaving easy local sales on the table",
                      "Take days to respond when your product listings get flagged or suppressed",
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                        <X className="h-4 w-4 text-destructive/80 shrink-0 mt-0.5" />
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* The AMZCOZ Model */}
                <div className="rounded-3xl surface-glass border border-primary/40 p-8 md:p-10 shadow-[0_0_50px_-15px_var(--color-primary)] bg-gradient-to-br from-primary/[0.06] via-transparent to-transparent">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">The AMZCOZ Team</h3>
                      <div className="text-xs text-primary font-medium">Clear communication & real execution</div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/10">
                    {[
                      "Direct access to experienced account managers on WhatsApp and phone calls",
                      "Daily bid adjustments to cut wasteful keywords and protect your product margins",
                      "Simple weekly reports showing exact sales, net profits, and what we improved",
                      "Full onboarding and dark-store replenishment for Blinkit, Zepto, and Instamart",
                      "Same-day action on Buy Box competition, listing errors, and buyer questions",
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm md:text-base text-foreground font-medium leading-relaxed">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------- OUR 4 SIMPLE PROMISES ------------------- */}
        <section className="py-20 md:py-28 relative z-10">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-14">
                <div className="text-[13px] uppercase tracking-[0.3em] text-primary font-semibold mb-3">
                  ◆ How We Operate
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                  Our 4 Simple <span className="gradient-text">Promises</span>
                </h2>
                <p className="mt-3 text-sm md:text-base text-muted-foreground">
                  No corporate buzzwords. Just practical, reliable work that helps your brand grow.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                {[
                  {
                    icon: Clock,
                    code: "01",
                    title: "Keep Products in Stock",
                    desc: "Running out of stock hurts your search rank and stops sales immediately. We monitor stock levels closely and remind you well before items run low.",
                  },
                  {
                    icon: Coins,
                    code: "02",
                    title: "Focus on Real Profit",
                    desc: "High revenue means nothing if ad costs and marketplace fees eat away all your earnings. We treat your ad budget like our own and protect your margins.",
                  },
                  {
                    icon: ShieldCheck,
                    code: "03",
                    title: "Fast Problem Solving",
                    desc: "If a competitor hijacks your Buy Box or a listing gets paused by marketplace policies, we jump on it the very same day to get you back up and running.",
                  },
                  {
                    icon: MessageSquare,
                    code: "04",
                    title: "Honest & Direct Teamwork",
                    desc: "We speak plainly and answer your questions directly. No technical smoke and mirrors—just transparent teamwork focused on getting you more orders.",
                  },
                ].map((p, idx) => {
                  const Icon = p.icon;
                  return (
                    <div
                      key={idx}
                      className="rounded-3xl surface-glass border border-white/10 p-8 md:p-9 hover:border-primary/40 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
                          Promise {p.code}
                        </span>
                      </div>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
                        {p.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------- CLEAN BOTTOM CTA (NO FORMS) ------------------- */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-transparent via-primary/5 to-transparent relative z-10 border-t border-white/5">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <Reveal>
              <div className="text-[13px] uppercase tracking-[0.3em] text-primary font-semibold mb-3">
                ◆ Ready to Scale?
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-tight">
                Ready to Grow Your <span className="gradient-text">Online Sales?</span>
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
                Speak directly with our team. We will review your current product listings, ad efficiency, and quick commerce opportunities at zero cost.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="hero-btn hero-btn-primary w-full sm:w-auto text-base px-8 py-3.5 font-semibold"
                >
                  Let's Talk
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
                <Link
                  to="/services"
                  className="hero-btn hero-btn-ghost w-full sm:w-auto text-base px-8 py-3.5 font-semibold"
                >
                  What We Deliver
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <Footer />
        <ScrollToTop />
      </main>
    </SmoothScroll>
  );
}
