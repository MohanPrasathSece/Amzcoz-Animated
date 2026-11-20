import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { GlobeAnalytics } from "@/components/ui/cobe-globe-analytics";
import { initHeroShader } from "@/lib/heroShader";
import dashboardImg from "@/assets/floating dashboard.png";

// Marketplace logos from src/assets/we_work_on_logos
import ajioLogo from "@/assets/we_work_on_logos/ajio.png";
import amazonLogo from "@/assets/we_work_on_logos/amazon.png";
import blinkitLogo from "@/assets/we_work_on_logos/blinkit.png";
import flipkartLogo from "@/assets/we_work_on_logos/flipkart.png";
import instamartLogo from "@/assets/we_work_on_logos/instamart.png";
import jiomartLogo from "@/assets/we_work_on_logos/jiomart.png";
import meeshoLogo from "@/assets/we_work_on_logos/meesho.png";
import myntraLogo from "@/assets/we_work_on_logos/mytra.png";
import zeptoLogo from "@/assets/we_work_on_logos/zepto.png";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------ INTRO ANIMATION ------------------------------ */
function PageIntro({ onDone }: { onDone: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const panelTopRef = useRef<HTMLDivElement>(null);
  const panelBotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onDone,
        defaults: { ease: "power3.inOut" },
      });

      // Initial state
      gsap.set(logoRef.current, { y: 30, opacity: 0 });
      gsap.set(lineRef.current, { scaleX: 0 });
      gsap.set(tagRef.current, { y: -20, opacity: 0 });

      // Intro sequence
      tl.to(logoRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" })
        .to(lineRef.current, { scaleX: 1, duration: 0.5 }, "-=0.2")
        .to(tagRef.current, { y: 0, opacity: 1, duration: 0.4 }, "-=0.2")
        .to({}, { duration: 0.4 }) // brief pause
        .to([logoRef.current, lineRef.current, tagRef.current], {
          opacity: 0,
          y: (i) => (i === 2 ? 10 : -10),
          duration: 0.3,
          ease: "power2.in",
        })
        .to(panelTopRef.current, { yPercent: -100, duration: 0.8 }, "-=0.1")
        .to(panelBotRef.current, { yPercent: 100, duration: 0.8 }, "<")
        .set(overlayRef.current, { display: "none" });
    }, overlayRef);

    return () => ctx.revert();
  }, [onDone]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] pointer-events-none flex flex-col">
      {/* Top panel */}
      <div ref={panelTopRef} className="absolute inset-x-0 top-0 h-1/2 bg-[oklch(0.08_0.015_270)] flex items-end justify-center pb-8">
        <div className="text-center">
          <div ref={logoRef} className="font-display text-5xl font-bold tracking-tight text-foreground mb-4">
            <span className="inline-block h-3 w-3 rounded-full bg-primary shadow-[0_0_30px_var(--color-primary)] mr-3 align-middle" />
            AMZ<span className="text-primary font-extrabold">COZ</span>
          </div>
          <div ref={lineRef} className="h-px w-48 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent origin-center" />
        </div>
      </div>
      {/* Bottom panel */}
      <div ref={panelBotRef} className="absolute inset-x-0 bottom-0 h-1/2 bg-[oklch(0.08_0.015_270)] flex items-start justify-center pt-8">
        <div ref={tagRef} className="text-sm uppercase tracking-[0.3em] text-primary">Marketplaces & Quick Commerce</div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [introsDone, setIntrosDone] = useState(() => {
    if (typeof window !== "undefined") {
      return !!sessionStorage.getItem("amzcoz_intro_seen");
    }
    return true;
  });

  const handleIntroComplete = () => {
    try {
      sessionStorage.setItem("amzcoz_intro_seen", "true");
    } catch { }
    setIntrosDone(true);
  };

  return (
    <>
      <SEO
        title="AMZCOZ | Marketplaces & Quick Commerce Growth Agency"
        description="AMZCOZ is India's leading marketplace and quick commerce growth agency. We scale consumer brands on Amazon, Blinkit, Zepto, Swiggy Instamart, and Flipkart with performance PPC, dark-store fulfillment, and A+ brand architecture."
        canonical="/"
        keywords="marketplace growth agency, quick commerce agency, amazon agency india, blinkit agency, zepto brand manager, amazon ppc agency, swiggy instamart growth, ecommerce management pune"
        structuredData={[
          {
            "@type": "WebSite",
            "@id": "https://amzcoz.com/#website",
            "url": "https://amzcoz.com/",
            "name": "AMZCOZ",
            "description": "Marketplaces & Quick Commerce Growth Agency",
          },
          {
            "@type": ["ProfessionalService", "MarketingAgency"],
            "@id": "https://amzcoz.com/#organization",
            "name": "AMZCOZ",
            "url": "https://amzcoz.com",
            "logo": "https://amzcoz.com/logo.png",
            "image": "https://amzcoz.com/og-image.jpg",
            "telephone": "+918007208742",
            "email": "adnan@amzcoz.com",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Pune",
              "addressRegion": "Maharashtra",
              "addressCountry": "IN",
            },
            "areaServed": [
              { "@type": "Country", "name": "India" },
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "Country", "name": "Kuwait" },
              { "@type": "Country", "name": "Saudi Arabia" },
              { "@type": "Country", "name": "United States" },
            ],
            "knowsAbout": [
              "Marketplace Account Management",
              "Quick Commerce Growth",
              "Amazon Seller Operations",
              "Blinkit Vendor Management",
              "Zepto Brand Booster Ads",
              "Swiggy Instamart Acceleration",
              "Amazon PPC & Marketplace Advertising",
              "E-Commerce Website Development",
              "Shopify Store Development",
              "D2C Performance Marketing",
              "Influencer Marketing",
            ],
          },
        ]}
      />
      {!introsDone && <PageIntro onDone={handleIntroComplete} />}
      <SmoothScroll>
        <main className="relative bg-background text-foreground overflow-x-clip">
          <Navbar />
          <Hero />
          <GlobeAnalyticsSection />
          <StatsStrip />
          <DashboardShowcase />
          <ServicesSection />
          <MarketplacePlatformsMarquee />
          <StackedCardsProcessSection />
          <Testimonials />
          <HomeFinalCTA />
          <Footer />
          <ScrollToTop />
        </main>
      </SmoothScroll>
    </>
  );
}

/* ------------------------------ HERO ------------------------------ */
function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      initHeroShader('hero-shader');
    }, 100);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = new SplitType(headlineRef.current!, { types: "chars,words" });
      const subSplit = new SplitType(subRef.current!, { types: "lines,words" });

      gsap.set(split.chars, { yPercent: 120, opacity: 0, rotateX: -50, filter: "blur(12px)" });
      gsap.set(subSplit.words, { yPercent: 100, opacity: 0 });
      gsap.set(eyebrowRef.current, { opacity: 0, y: 15 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8 })
        .to(split.chars, { yPercent: 0, opacity: 1, rotateX: 0, filter: "blur(0px)", duration: 1.2, stagger: { each: 0.02, from: "start" } }, "-=0.5")
        .to(subSplit.words, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.015 }, "-=0.8");

      // Smooth button reveal with clearProps so they are guaranteed visible
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 18,
        duration: 0.9,
        delay: 0.3,
        ease: "power2.out",
        clearProps: "opacity,transform",
      });

      // Subtle scroll fade only when scrolled past 65% of hero
      gsap.to([headlineRef.current, eyebrowRef.current, subRef.current], {
        y: -50,
        opacity: 0,
        scrollTrigger: { trigger: rootRef.current, start: "65% top", end: "95% top", scrub: 1 },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="hero-section relative overflow-hidden">
      {/* Layer 1: WebGL Canvas */}
      <canvas id="hero-shader" className="hero-shader-canvas" />

      {/* Layer 2: Glow Orbs */}
      <div className="hero-glow-orb-left" />
      <div className="hero-glow-orb-right" />
      <div className="hero-glow-orb-bottom" />

      {/* Layer 3: Vignette */}
      <div className="hero-vignette" />

      {/* Layer 4: Content */}
      <div className="relative z-20 mx-auto flex max-w-5xl flex-col items-center justify-center gap-5 md:gap-7 px-6 min-h-[85vh] md:min-h-screen pt-24 pb-14 md:pt-32 md:pb-16">
        <div ref={eyebrowRef} className="inline-flex items-center gap-2 rounded-full surface-glass px-4 py-1.5 text-[13px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Marketplaces & Quick Commerce Growth Agency · Pune, India
        </div>

        <h1 ref={headlineRef} className="font-display text-3xl sm:text-4xl md:text-[3.5rem] lg:text-[4.2rem] xl:text-[4.6rem] font-black tracking-tight text-center max-w-5xl mx-auto leading-[1.12]">
          <span className="block">Accelerate Your Brand Growth</span>
          <span className="block">Across Marketplaces &amp;</span>
          <span className="block gradient-text">Quick Commerce</span>
        </h1>

        <p ref={subRef} className="max-w-2xl text-sm md:text-base leading-relaxed text-muted-foreground text-center">
          AMZCOZ delivers expert account management, performance advertising, and dark-store distribution across Amazon, Blinkit, Zepto, Swiggy Instamart, and Flipkart.
        </p>

        <div ref={ctaRef} className="relative z-30 flex flex-wrap items-center justify-center gap-3.5 md:gap-4 pt-2 md:pt-3">
          <Link to="/contact" className="hero-btn hero-btn-primary text-sm md:text-base px-6 py-3 font-semibold shadow-lg">
            Book Free Strategy Session
          </Link>
          <a href="#services" className="hero-btn hero-btn-ghost text-sm md:text-base px-6 py-3 font-semibold">
            Explore Services
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ 2ND SECTION: 3D GLOBE TELEMETRY ------------------------------ */
function GlobeAnalyticsSection() {
  return (
    <section className="relative z-10 py-16 md:py-24 border-y border-white/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 relative z-10 text-center">
        <Reveal>
          <div className="max-w-3xl mx-auto mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full surface-glass px-3.5 py-1 text-[13px] uppercase tracking-[0.25em] text-primary font-semibold mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Scale Without Boundaries
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Built for Brands <span className="gradient-text">With Global Ambitions</span>
            </h2>
            <p className="mt-3.5 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              From dominating quick-commerce dark stores in Tier-1 Indian metros to scaling your catalog across Amazon US, UK, and Middle East marketplaces, we build multi-channel category leaders.
            </p>
          </div>
        </Reveal>

        {/* Globe in center with real-time 3D projected city pins & flags */}
        <Reveal delay={0.1}>
          <div className="flex items-center justify-center w-full max-w-[440px] sm:max-w-[500px] md:max-w-[560px] mx-auto aspect-square">
            <GlobeAnalytics className="w-full h-full" speed={0.0045} dark={1} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ STATS ------------------------------ */
function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = ref.current!.querySelectorAll<HTMLElement>(".stat-item");

      // Scroll-controlled entry of stat cards (slow scrub)
      gsap.from(items, {
        y: 60,
        opacity: 0,
        scale: 0.94,
        filter: "blur(10px)",
        stagger: 0.12,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 92%",
          end: "top 50%",
          scrub: 1.5,
        },
      });

      // Animated counter increasing from 0 on scroll
      items.forEach((item) => {
        const el = item.querySelector<HTMLElement>(".stat-value")!;
        const raw = el.dataset.value ?? "";
        const num = parseFloat(raw.replace(/[^0-9.]/g, ""));
        const suffix = raw.replace(/[0-9.]/g, "");
        if (!isNaN(num)) {
          el.textContent = "0" + suffix;
          const counter = { val: 0 };
          gsap.to(counter, {
            val: num,
            duration: 2.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 88%",
              toggleActions: "play none none reset",
            },
            onUpdate: () => {
              const formatted = Number.isInteger(num)
                ? Math.round(counter.val)
                : counter.val.toFixed(1);
              el.textContent = formatted + suffix;
            },
          });
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: "15+", label: "Brands Scaled", sublabel: "Amazon, Blinkit, Zepto & Flipkart" },
    { value: "2x", label: "Average ROAS", sublabel: "Consistent month-over-month" },
    { value: "5+", label: "Years Experience", sublabel: "Marketplaces & Q-Commerce" },
    { value: "87%", label: "Repeat Purchase Rate", sublabel: "Across managed catalogs" },
  ];

  return (
    <section ref={ref} className="relative z-10 py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="stat-item group relative">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
              <div className="relative rounded-2xl surface-glass p-4 sm:p-6 md:p-8 border border-blue-500/20 overflow-hidden flex flex-col justify-between h-full">
                <div className="absolute -right-4 -top-4 h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-primary/10 blur-2xl" />
                <div>
                  <div className="mb-2 sm:mb-4">
                    <div className="stat-value text-3xl sm:text-4xl md:text-5xl font-bold gradient-text font-display" data-value={s.value}>{s.value}</div>
                  </div>
                  <h3 className="text-xs sm:text-base md:text-lg font-semibold text-foreground mb-1 sm:mb-2">{s.label}</h3>
                  <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground line-clamp-2">{s.sublabel}</p>
                </div>
                <div className="mt-3 sm:mt-4 h-0.5 w-6 sm:w-8 bg-gradient-to-r from-primary to-accent rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ DASHBOARD SHOWCASE ------------------------------ */
function DashboardShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = ref.current!.querySelector<HTMLHeadingElement>("h2")!;
      const split = new SplitType(heading, { types: "chars,words" });
      const eyebrow = ref.current!.querySelector(".showcase-eyebrow")!;

      // Eyebrow slow scroll-controlled reveal
      gsap.from(eyebrow, {
        y: 20,
        opacity: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: eyebrow,
          start: "top 92%",
          end: "top 60%",
          scrub: 1.5,
        },
      });

      // Heading chars slow scroll-controlled reveal
      gsap.from(split.chars, {
        yPercent: 110,
        opacity: 0,
        rotateX: -40,
        filter: "blur(12px)",
        stagger: 0.02,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 92%",
          end: "top 35%",
          scrub: 1.5,
        },
      });

      // Left-side paragraph, bullet list, and button (staggered slow scrub)
      const leftElements = leftRef.current!.querySelectorAll("p, li, a");
      gsap.from(leftElements, {
        y: 45,
        opacity: 0,
        filter: "blur(6px)",
        stagger: 0.1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top 88%",
          end: "top 35%",
          scrub: 1.5,
        },
      });

      // Right-side dashboard image (slow zoom & unblur scrub)
      gsap.from(rightRef.current, {
        y: 70,
        scale: 0.88,
        opacity: 0,
        filter: "blur(16px)",
        ease: "power1.out",
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 90%",
          end: "top 30%",
          scrub: 1.8,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative z-10 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 items-center">

          {/* Left: content */}
          <div ref={leftRef}>
            <div className="showcase-eyebrow mb-3 text-[13px] uppercase tracking-[0.3em] text-primary font-semibold">◆ Real-Time Insights</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Live Performance Telemetry & <span className="gradient-text">Analytics</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
              Every brand we manage gets a unified live dashboard tracking net revenue, dark-store fulfillment, and ad efficiency across Amazon, Blinkit, Zepto, and Flipkart. No black boxes, just clear numbers.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Live revenue, ROAS, and TACoS tracking",
                "Campaign analytics across Amazon Ads, Blinkit & Zepto",
                "Dark-store stock velocity and listing health alerts",
                "Weekly executive strategy reports delivered",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="hero-btn hero-btn-primary">
              Get Your Free Audit
            </Link>
          </div>

          {/* Right: dashboard image (just the image, no outer container) */}
          <div ref={rightRef} className="flex items-center justify-center">
            <img
              src={dashboardImg}
              alt="AMZCOZ Analytics Dashboard"
              className="w-full h-auto object-contain pointer-events-none select-none"
              draggable={false}
            />
          </div>

        </div>
      </div>
    </section>
  );
}

/* ------------------------------ SERVICES ------------------------------ */
function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = ref.current!.querySelector<HTMLHeadingElement>("h2")!;
      const split = new SplitType(heading, { types: "chars,words" });
      const eyebrow = ref.current!.querySelector(".services-eyebrow")!;
      const sub = ref.current!.querySelector(".services-sub")!;
      const cards = ref.current!.querySelectorAll<HTMLElement>(".service-card");

      // Eyebrow slow scroll-controlled reveal
      gsap.from(eyebrow, {
        y: 20,
        opacity: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: eyebrow,
          start: "top 95%",
          end: "top 60%",
          scrub: 1.5,
        },
      });

      // Heading chars slow scroll-controlled reveal
      gsap.from(split.chars, {
        yPercent: 110,
        opacity: 0,
        rotateX: -40,
        filter: "blur(12px)",
        stagger: 0.02,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 95%",
          end: "top 35%",
          scrub: 1.5,
        },
      });

      // Subtitle slow scrub
      gsap.from(sub, {
        y: 30,
        opacity: 0,
        filter: "blur(6px)",
        ease: "power1.out",
        scrollTrigger: {
          trigger: sub,
          start: "top 92%",
          end: "top 45%",
          scrub: 1.5,
        },
      });

      // Service Cards staggered smooth reveal on scroll
      gsap.from(cards, {
        y: 45,
        opacity: 0,
        scale: 0.96,
        stagger: 0.08,
        duration: 0.85,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current!.querySelector(".services-grid"),
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: "Marketplace Management",
      desc: "Complete end-to-end catalog and operations across Amazon, Flipkart, Myntra, Ajio, JioMart & Meesho.",
      tags: ["Multi-Marketplace", "Listing Optimization", "Inventory Control"],
    },
    {
      title: "Quick Commerce Growth",
      desc: "Dark-store mapping, rapid replenishment, and city-level search rank on Blinkit, Zepto & Swiggy Instamart.",
      tags: ["Blinkit & Zepto", "10-Min Commerce", "Dark Store Inventory"],
    },
    {
      title: "Marketplace & Performance Advertising",
      desc: "High-yield campaigns on Amazon Sponsored Ads, Blinkit Brand Booster, and Meta/Google conversion funnels.",
      tags: ["Amazon PPC", "Blinkit Ads", "ROAS Optimization"],
    },
    {
      title: "A+ Content & Brand Store Design",
      desc: "Premium A+ Content, Brand Store setup, custom infographics, and high-converting visual storytelling.",
      tags: ["A+ Content", "Brand Store", "Conversion Boost"],
    },
    {
      title: "Review & Sentiment Defense",
      desc: "Systematic rating monitoring, sentiment analysis, and rapid feedback resolution to protect Buy Box.",
      tags: ["Review Monitoring", "Reputation Defense", "Sentiment Analysis"],
    },
    {
      title: "D2C & Tech Development",
      desc: "High-conversion DTC storefronts on Shopify and custom web apps with checkout optimization.",
      tags: ["Shopify DTC", "Custom UI/UX", "Conversion Architecture"],
    },
  ];

  return (
    <section id="services" ref={ref} className="relative z-10 pt-20 pb-12 md:pt-24 md:pb-14">
      <div className="mx-auto max-w-7xl px-6 w-full">
        <div className="services-heading mb-14 max-w-3xl">
          <div className="services-eyebrow mb-3 text-[13px] uppercase tracking-[0.3em] text-primary font-semibold">◆ Capabilities & Scope</div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Our Services & <span className="gradient-text">Capabilities</span>
          </h2>
          <p className="services-sub mt-4 text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
            From algorithmic listing rank on Amazon and Flipkart to dark-store inventory velocity on Blinkit and Zepto, we build scalable multi-channel infrastructure for modern brands.
          </p>
        </div>

        <div className="services-grid grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <TiltCard key={s.title} className="service-card flex flex-col justify-between">
              <div>
                <div className="font-display text-xl font-semibold text-foreground">{s.title}</div>
                <p className="mt-2.5 text-sm md:text-[15px] text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-primary/15 border border-primary/20 px-2.5 py-0.5 text-[13px] text-primary font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ MARKETPLACE PLATFORMS MARQUEE ------------------------------ */
const MARKETPLACE_PLATFORMS = [
  { name: "Amazon", logo: amazonLogo },
  { name: "Flipkart", logo: flipkartLogo },
  { name: "Blinkit", logo: blinkitLogo },
  { name: "Zepto", logo: zeptoLogo },
  { name: "Swiggy Instamart", logo: instamartLogo },
  { name: "Myntra", logo: myntraLogo },
  { name: "AJIO", logo: ajioLogo },
  { name: "JioMart", logo: jiomartLogo },
  { name: "Meesho", logo: meeshoLogo },
];

function MarketplacePlatformsMarquee() {
  const marqueeItems = [...MARKETPLACE_PLATFORMS, ...MARKETPLACE_PLATFORMS, ...MARKETPLACE_PLATFORMS];

  return (
    <div className="relative z-10 my-8 sm:my-10 md:my-14 py-3 sm:py-4 md:py-5 overflow-hidden border-y border-white/10 bg-white/[0.02]">
      <div className="relative w-full overflow-hidden">
        {/* Soft edge gradient fade */}
        <div className="absolute left-0 top-0 bottom-0 w-14 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-14 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="animate-gpu-marquee-left animate-gpu-marquee-track flex gap-3 sm:gap-3.5 w-max">
          {marqueeItems.map((p, idx) => (
            <div
              key={idx}
              className="inline-flex shrink-0 items-center justify-center px-3 py-1.5 rounded-xl bg-white shadow-sm hover:shadow-md transition-transform min-w-[95px] sm:min-w-[124px] h-[36px] sm:h-[48px]"
              title={p.name}
            >
              <img
                src={p.logo}
                alt={p.name}
                className="max-h-3 sm:max-h-5 max-w-[65px] sm:max-w-[92px] w-auto h-auto object-contain transition-transform hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ TILT CARD ------------------------------ */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);

  function move(e: React.MouseEvent<HTMLDivElement>) {
    const r = ref.current!.getBoundingClientRect();
    ry.set(-((e.clientX - r.left) / r.width - 0.5) * 8);
    rx.set(((e.clientY - r.top) / r.height - 0.5) * 8);
  }
  function reset() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`group relative rounded-2xl surface-glass p-7 transition-shadow hover:shadow-[0_30px_80px_-20px_oklch(0_0_0/0.6),0_0_60px_-20px_var(--color-primary)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------ PROCESS STACKED CARDS ------------------------------ */
const PROCESS_STEPS = [
  {
    n: "01",
    title: "Deep Channel Audit",
    text: "We audit your entire presence across Amazon, Blinkit, Zepto, and Flipkart: listing health, dark-store stock coverage, ad architecture, margins, and competitor whitespace.",
    tags: ["Marketplace Audit", "Q-Commerce Intel", "PPC Structure", "Margin Analysis"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    statusBadge: "360° Channel Diagnostic",
    caption: "Full Listing & Ad Diagnostic",
    metric: "98.4% Health Score",
  },
  {
    n: "02",
    title: "Channel Architecture",
    text: "No cookie-cutter playbooks. We construct a bespoke multi-channel growth roadmap with aggressive target ACoS, quick-commerce dark-store replenishment models, and category-dominant positioning.",
    tags: ["Growth Roadmap", "Dark Store Mapping", "Budget Allocation", "Keyword Matrix"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    statusBadge: "Dark-Store Sync",
    caption: "140+ Tier-1 Hubs Mapped",
    metric: "< 18 Mins SLA",
  },
  {
    n: "03",
    title: "Campaign Activation",
    text: "We execute precision performance campaigns across Amazon Sponsored Ads, Blinkit Brand Booster, Zepto Ads, and Google/Meta with daily bid optimization.",
    tags: ["Amazon Ads", "Blinkit Brand Booster", "Zepto Ads", "Daily Bid Tuning"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    statusBadge: "Active Bid Engines",
    caption: "Marketplace & Q-Commerce Ads",
    metric: "15.2% Target ACoS",
  },
  {
    n: "04",
    title: "Scale & Expansion",
    text: "We continuously scale winning SKUs, eliminate ad waste, expand catalog distribution across quick commerce and marketplaces, and sync real-time sales telemetry.",
    tags: ["Live Telemetry", "Weekly Reports", "Multi-Marketplace", "Dedicated Lead"],
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop",
    statusBadge: "Enterprise Telemetry",
    caption: "Continuous Revenue Scaling",
    metric: "12.5x Growth Multiplier",
  },
];

function ProcessStackedCard({
  i,
  total,
  item,
}: {
  i: number;
  total: number;
  item: (typeof PROCESS_STEPS)[number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      id={`process-card-${i}`}
      ref={ref}
      style={{
        top: isMobile ? `${72 + i * 12}px` : `${92 + i * 16}px`,
        position: "sticky",
        zIndex: i + 10,
      }}
    >
      <div
        className="relative rounded-[2rem] p-6 md:p-10 border border-blue-500/35 overflow-hidden shadow-[0_30px_70px_-20px_rgba(0,0,0,0.95)] bg-[#0c0f1a]"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/[0.08] blur-[80px] pointer-events-none" />

        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
          {/* Left Details & Controls (6 columns) */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-display text-4xl sm:text-5xl font-light text-primary leading-none">
                  {item.n}
                </span>
                <span className="text-xs font-mono tracking-widest text-primary/70 uppercase">
                  Phase {item.n}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight tracking-tight mt-3 mb-2">
                {item.title}
              </h3>
              <p className="mt-2 text-slate-300 text-sm md:text-[15px] leading-relaxed">
                {item.text}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary/15 border border-primary/25 px-2.5 py-0.5 text-xs text-primary font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom: Arrow button to next card & counter */}
            <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
              {i < total - 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    const nextEl = document.getElementById(`process-card-${i + 1}`);
                    if (nextEl) {
                      nextEl.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                  }}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:text-white bg-primary/10 hover:bg-primary/25 border border-primary/25 px-4 py-2 rounded-xl transition-all duration-200 group/btn cursor-pointer"
                >
                  <span>Next Phase</span>
                  <ArrowDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-y-0.5" />
                </button>
              ) : (
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:text-white bg-primary/10 hover:bg-primary/25 border border-primary/25 px-4 py-2 rounded-xl transition-all duration-200 group/btn"
                >
                  <span>Start Your Audit</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </Link>
              )}

              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground/70">
                0{i + 1} / 0{total}
              </span>
            </div>
          </div>

          {/* Right: Big Image covering half the card (6 columns) */}
          <div className="md:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#07090f] shadow-2xl group/cardimg">
              <div className="aspect-[16/11] w-full overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/cardimg:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f1a] via-transparent to-transparent opacity-80" />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[11px] font-mono text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {item.statusBadge}
                </div>
              </div>
              <div className="p-3.5 bg-[#121624] border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="truncate pr-2">{item.caption}</span>
                <span className="text-primary font-semibold shrink-0">{item.metric}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StackedCardsProcessSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = ref.current!.querySelector<HTMLHeadingElement>("h2")!;
      const split = new SplitType(heading, { types: "chars,words" });
      const eyebrow = ref.current!.querySelector(".process-eyebrow")!;

      // Eyebrow slow scroll-controlled reveal
      gsap.from(eyebrow, {
        y: 20,
        opacity: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: eyebrow,
          start: "top 95%",
          end: "top 60%",
          scrub: 2,
        },
      });

      // Heading chars slow scroll-controlled reveal
      gsap.from(split.chars, {
        yPercent: 110,
        opacity: 0,
        rotateX: -40,
        filter: "blur(12px)",
        stagger: 0.02,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 95%",
          end: "top 35%",
          scrub: 2,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={ref} className="relative z-10 pt-12 pb-10 md:pt-16 md:pb-14 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-16">
          <div className="process-eyebrow mb-3 text-[13px] uppercase tracking-[0.3em] text-primary font-semibold">
            ◆ Proven Execution Framework
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            How We Scale <span className="gradient-text">Your Brand</span>
          </h2>
        </div>
        {/* Balanced spacing between cards so the scroll stacks smoothly without excessive trailing empty space */}
        <div className="space-y-28 md:space-y-36 pb-14 md:pb-20">
          {PROCESS_STEPS.map((s, i) => (
            <ProcessStackedCard key={i} i={i} total={PROCESS_STEPS.length} item={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ TESTIMONIALS (GOOGLE VERIFIED REVIEW MARQUEE) ------------------------------ */
function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = ref.current!.querySelector<HTMLHeadingElement>("h2")!;
      const split = new SplitType(heading, { types: "chars,words" });
      const eyebrow = ref.current!.querySelector(".testimonials-eyebrow")!;

      gsap.from(eyebrow, {
        y: 20,
        opacity: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: eyebrow,
          start: "top 95%",
          end: "top 60%",
          scrub: 2,
        },
      });

      gsap.from(split.chars, {
        yPercent: 110,
        opacity: 0,
        rotateX: -40,
        filter: "blur(12px)",
        stagger: 0.02,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 92%",
          end: "top 35%",
          scrub: 1.5,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const reviews = [
    {
      quote: "AMZCOZ transformed our brand presence across Amazon, Flipkart, and Blinkit. Within 60 days, our organic search volume tripled and dark-store fill rates stabilized.",
      name: "Rajesh Kumar",
      role: "Founder, Electronics Brand",
      platform: "Amazon & Blinkit Partner",
      date: "Reviewed 2 weeks ago",
    },
    {
      quote: "Their performance advertising on Amazon PPC and Zepto Brand Boosters cut our blended ACoS from 34% to 19% while doubling monthly unit volume.",
      name: "Priya Sharma",
      role: "VP Marketing, D2C Personal Care",
      platform: "Multi-Marketplace",
      date: "Reviewed 3 weeks ago",
    },
    {
      quote: "The team is relentless with daily bid adjustments and stock replenishment. They run our entire catalog across Amazon and Swiggy Instamart seamlessly.",
      name: "Anand Verma",
      role: "Co-Founder, Gourmet Food & FMCG",
      platform: "Quick Commerce & Amazon",
      date: "Reviewed 1 month ago",
    },
    {
      quote: "Their A+ Content and Brand Store revamp lifted our listing conversion rate by 31%. Absolute professionals who understand retail algorithms.",
      name: "Karan Singhania",
      role: "Director, Home & Living Brand",
      platform: "Amazon Brand Store",
      date: "Reviewed 1 month ago",
    },
    {
      quote: "Fastest turnaround we've experienced. From listing audit to executing full dark-store inventory pipelines on Zepto, AMZCOZ exceeded all expectations.",
      name: "Tanvi Mehta",
      role: "Growth Head, Healthy Snacking Brand",
      platform: "Blinkit, Zepto & Amazon",
      date: "Reviewed 2 months ago",
    },
  ];

  const marqueeReviews = [...reviews, ...reviews];

  return (
    <section ref={ref} className="relative z-10 py-20 sm:py-28 md:py-36 overflow-hidden border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mb-12 sm:mb-16 text-center">
        <div className="testimonials-eyebrow mb-3 text-[13px] uppercase tracking-[0.3em] text-primary font-semibold">
          ◆ Verified Client Track Record
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight py-2 leading-tight">
          What Founders <span className="gradient-text">Say About Us</span>
        </h2>

        {/* Google Reviews Trust Badge */}
        <div className="mt-4 inline-flex items-center gap-2.5 sm:gap-3 rounded-full surface-glass px-4 sm:px-5 py-2 border border-blue-500/20 shadow-md">
          <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" />
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
          </svg>
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm font-semibold text-foreground">Google</span>
            <span className="text-[11px] sm:text-xs text-muted-foreground">Rating:</span>
            <span className="text-xs sm:text-sm font-bold text-amber-400">4.9/5.0</span>
          </div>
          <span className="h-3.5 w-px bg-white/20" />
          <span className="text-xs sm:text-[13px] text-emerald-400 flex items-center gap-1 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            100% Verified Founders
          </span>
        </div>
      </div>

      {/* Infinite continuous left-scrolling marquee track - Pure GPU CSS */}
      <div className="relative w-full overflow-hidden">
        <div className="animate-gpu-marquee-left animate-gpu-marquee-track flex gap-4 sm:gap-6 w-max">
          {marqueeReviews.map((t, idx) => (
            <div
              key={idx}
              className="w-[275px] sm:w-[340px] md:w-[420px] shrink-0 rounded-2xl sm:rounded-3xl surface-glass border border-white/10 p-4 sm:p-6 md:p-8 flex flex-col justify-between hover:border-primary/40 transition-colors shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-white/5">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" />
                      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                    </svg>
                    <span className="text-[11px] sm:text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Google Verified
                    </span>
                  </div>
                  <div className="flex items-center text-amber-400 text-xs">
                    {"★".repeat(5)}
                  </div>
                </div>

                <p className="text-xs sm:text-sm md:text-base leading-relaxed text-foreground/90 font-normal line-clamp-4 sm:line-clamp-none">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-[11px] sm:text-xs text-muted-foreground">{t.role}</div>
                </div>
                <div className="text-right">
                  <span className="rounded-full bg-white/5 border border-white/10 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[12px] text-primary font-medium">
                    {t.platform}
                  </span>
                  <div className="text-[9px] sm:text-[10px] text-muted-foreground/60 mt-0.5">{t.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ FINAL CTA (CENTERED) ------------------------------ */
function HomeFinalCTA() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-gradient-to-b from-transparent via-primary/5 to-transparent relative z-10 border-t border-white/5 text-center">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <div className="text-[13px] uppercase tracking-[0.3em] text-primary font-semibold mb-3">
            ◆ Next Steps
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Ready to Grow Your <span className="gradient-text">Brand?</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            Speak directly with our senior growth strategists. We will review your catalog, buy-box health, and ad performance within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="hero-btn hero-btn-primary w-full sm:w-auto text-base px-8 py-3.5 font-semibold inline-flex items-center justify-center gap-2"
            >
              Let's Talk
              <ArrowRight className="h-4 w-4" />
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
  );
}
