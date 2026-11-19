import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { SmoothScroll } from "@/components/SmoothScroll";
import { PhoneInput } from "@/components/PhoneInput";
import { COUNTRY_PHONE_PATTERNS } from "@/lib/phoneCountries";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Reveal } from "@/components/Reveal";
import { Globe, GlobeDemo } from "@/components/ui/globe";
import { toast } from "sonner";
import { submitContactForm } from "@/lib/contact";
import { initHeroShader } from "@/lib/heroShader";
import dashboardImg from "@/assets/floating dashboard.png";

gsap.registerPlugin(ScrollTrigger);

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

/* ------------------------------ INTRO ANIMATION ------------------------------ */
function PageIntro({ onDone }: { onDone: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const panelTopRef = useRef<HTMLDivElement>(null);
  const panelBotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete: onDone });

    // Start state
    gsap.set(logoRef.current, { opacity: 0, y: 30 });
    gsap.set(lineRef.current, { scaleX: 0 });
    gsap.set(tagRef.current, { opacity: 0, y: 10 });
    gsap.set([panelTopRef.current, panelBotRef.current], { yPercent: 0 });

    // Logo enters
    tl.to(logoRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" }, 0.3)
      .to(lineRef.current, { scaleX: 1, duration: 0.6, ease: "expo.out" }, 0.7)
      .to(tagRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, 1.0)
      // Hold
      .to({}, { duration: 0.5 })
      // Panels split apart to reveal page
      .to(panelTopRef.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, 1.8)
      .to(panelBotRef.current, { yPercent: 100, duration: 0.9, ease: "expo.inOut" }, 1.8);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[200] pointer-events-none">
      {/* Top panel */}
      <div ref={panelTopRef} className="absolute inset-x-0 top-0 h-1/2 bg-[oklch(0.08_0.015_270)] flex items-end justify-center pb-8">
        <div className="text-center">
          <div ref={logoRef} className="font-display text-5xl font-bold tracking-tight text-foreground mb-4">
            <span className="inline-block h-3 w-3 rounded-full bg-primary shadow-[0_0_30px_var(--color-primary)] mr-3 align-middle" />
            AMZCOZ
          </div>
          <div ref={lineRef} className="h-px w-48 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent origin-center" />
        </div>
      </div>
      {/* Bottom panel */}
      <div ref={panelBotRef} className="absolute inset-x-0 bottom-0 h-1/2 bg-[oklch(0.08_0.015_270)] flex items-start justify-center pt-8">
        <div ref={tagRef} className="text-sm uppercase tracking-[0.3em] text-primary">Amazon Growth Experts</div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [introsDone, setIntrosDone] = useState(false);

  return (
    <>
      {!introsDone && <PageIntro onDone={() => setIntrosDone(true)} />}
      <SmoothScroll>
        <main className="relative bg-background text-foreground overflow-x-clip">
          <Nav />
          <Hero />
          <StatsStrip />
          <DashboardShowcase />
          <ServicesSection />
          <StackedCardsProcessSection />
          <OurClientsSection />
          <BrandsSection />
          <Testimonials />
          <FinalCTA />
          <ContactFormSection />
          <Footer />
          <ScrollToTop />
        </main>
      </SmoothScroll>
    </>
  );
}

/* ------------------------------ NAV ------------------------------ */
function Nav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto mt-3 flex max-w-7xl items-center justify-between rounded-full surface-glass px-5 py-2">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-primary shadow-[0_0_16px_var(--color-primary)]" />
          AMZCOZ
        </a>
        <nav className="hidden gap-8 md:flex">
          {[
            ["Home", "#"],
            ["Services", "#services"],
            ["Process", "#process"],
            ["Clients", "#clients"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a key={label} href={href} className="text-sm text-muted-foreground transition hover:text-foreground">{label}</a>
          ))}
        </nav>
        <button onClick={scrollToContact} className="hero-btn hero-btn-primary text-xs px-4 py-1.5">
          Free Audit
        </button>
      </div>
    </motion.header>
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

      gsap.set(split.chars, { yPercent: 130, opacity: 0, rotateX: -60, filter: "blur(14px)" });
      gsap.set(subSplit.words, { yPercent: 100, opacity: 0 });
      gsap.set(eyebrowRef.current, { opacity: 0, y: 20 });
      gsap.set(ctaRef.current, { opacity: 0, y: 30 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.9 })
        .to(split.chars, { yPercent: 0, opacity: 1, rotateX: 0, filter: "blur(0px)", duration: 1.4, stagger: { each: 0.025, from: "start" } }, "-=0.5")
        .to(subSplit.words, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.02 }, "-=0.9")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.7");

      gsap.to([headlineRef.current, eyebrowRef.current, subRef.current, ctaRef.current], {
        y: -100, opacity: 0,
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "60% top", scrub: 1 },
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
      <div className="relative z-20 mx-auto flex max-w-5xl flex-col items-center justify-center gap-12 px-6 min-h-screen">
        <div ref={eyebrowRef} className="inline-flex items-center gap-2 rounded-full surface-glass px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Amazon Growth Experts · Pune, India
        </div>

        <h1 ref={headlineRef} className="font-display text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[1.15] tracking-tight text-center max-w-4xl">
          Scale Your Brand on<br />
          <span className="gradient-text">Amazon & Beyond</span>
        </h1>

        <p ref={subRef} className="max-w-2xl text-lg leading-relaxed text-muted-foreground text-center">
          AMZCOZ delivers expert account management, data-driven advertising, and full-stack e-commerce growth across Amazon, Flipkart, Myntra, and more.
        </p>

        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 pt-8">
          <button onClick={scrollToContact} className="hero-btn hero-btn-primary">
            Book Free Strategy Session
          </button>
          <a href="#services" className="hero-btn hero-btn-ghost">
            Explore Services
          </a>
        </div>
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
    { value: "15+", label: "Brands Managed", sublabel: "Growing across all categories" },
    { value: "2x", label: "Average ROAS", sublabel: "Consistent month-over-month" },
    { value: "5+", label: "Years Experience", sublabel: "Deep expertise in e-commerce" },
    { value: "87%", label: "Client Satisfaction", sublabel: "Retention rate across portfolio" },
  ];

  return (
    <section ref={ref} className="relative z-10 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="stat-item group relative">
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
              <div className="relative rounded-2xl surface-glass p-8 border border-blue-500/20 overflow-hidden">
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-primary/10 blur-2xl" />
                <div className="mb-4">
                  <div className="stat-value text-5xl font-bold gradient-text font-display" data-value={s.value}>{s.value}</div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{s.label}</h3>
                <p className="text-sm text-muted-foreground">{s.sublabel}</p>
                <div className="mt-4 h-0.5 w-8 bg-gradient-to-r from-primary to-accent rounded-full" />
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
      const leftElements = leftRef.current!.querySelectorAll("p, li, button");
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
            <div className="showcase-eyebrow mb-3 text-sm uppercase tracking-[0.3em] text-primary font-semibold">◆ Real-Time Insights</div>
            <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-bold leading-[1.15] tracking-tight text-balance mb-6">
              Data that drives<br /><span className="gradient-text">real decisions.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Every brand we manage gets a live dashboard with full visibility into revenue, ad spend, ROAS, and conversion trends. No black boxes, just clear numbers.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Live revenue and ROAS tracking",
                "Campaign performance breakdowns",
                "Inventory and listing health alerts",
                "Weekly PDF reports delivered",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <button onClick={scrollToContact} className="hero-btn hero-btn-primary">
              Get Your Free Audit
            </button>
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

      // Eyebrow & sub slow scroll-controlled reveal
      gsap.from([eyebrow, sub], {
        y: 25,
        opacity: 0,
        stagger: 0.1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: eyebrow,
          start: "top 92%",
          end: "top 55%",
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

      // Service cards slow scroll-controlled entrance
      const cards = ref.current!.querySelectorAll<HTMLElement>(".service-card");
      gsap.from(cards, {
        y: 90,
        opacity: 0,
        scale: 0.92,
        filter: "blur(12px)",
        stagger: 0.12,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ref.current!.querySelector(".services-grid"),
          start: "top 90%",
          end: "top 25%",
          scrub: 1.8,
        },
      });

      // Divider line scaleX scroll-controlled
      const divider = ref.current!.querySelector(".services-divider")!;
      gsap.from(divider, {
        scaleX: 0,
        opacity: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: divider,
          start: "top 95%",
          end: "top 70%",
          scrub: 1.5,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: "E-commerce Account Management",
      desc: "Complete end-to-end management across Amazon, Flipkart, Myntra, Ajio, Jio Mart & Meesho.",
      tags: ["Multi-Platform", "Listing Optimization", "Inventory Control"],
    },
    {
      title: "E-commerce Advertising",
      desc: "Expert advertising and DSP campaign management with high-yield budget and ROAS optimization.",
      tags: ["Multi-Platform Ads", "Budget Optimization", "ROAS Improvement"],
    },
    {
      title: "Brand Enhancement",
      desc: "Premium A+ Content, Brand Store setup, custom infographics, and high-converting visual storytelling.",
      tags: ["A+ Content", "Brand Store", "Premium Templates"],
    },
    {
      title: "Website Development",
      desc: "Corporate and marketing websites crafted for brand storytelling, speed, and lead generation.",
      tags: ["Corporate Sites", "Custom UI/UX", "CMS Integrations"],
    },
    {
      title: "E-commerce Website",
      desc: "High-conversion DTC storefronts on Shopify and WooCommerce with secure checkout architectures.",
      tags: ["Shopify/WooCommerce", "Catalog Setup", "Conversion Optimization"],
    },
    {
      title: "Social Media Marketing",
      desc: "Paid Meta & Google campaigns, influencer collabs, and community building to drive targeted brand awareness.",
      tags: ["Content Strategy", "Meta Ads", "Community"],
    },
  ];

  return (
    <section id="services" ref={ref} className="relative z-10 pt-24 pb-32 md:pb-44">
      <div className="mx-auto max-w-7xl px-6">
        <div className="services-heading mb-14 max-w-3xl">
          <div className="services-eyebrow mb-3 text-sm uppercase tracking-[0.3em] text-primary font-semibold">◆ Our Services</div>
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-bold leading-[1.15] tracking-tight text-balance">
            Comprehensive Amazon solutions<br />to <span className="gradient-text">accelerate your growth.</span>
          </h2>
          <p className="services-sub mt-4 text-base md:text-lg text-muted-foreground max-w-2xl">
            From algorithmic listing rank and ad spend efficiency to multi-marketplace expansion, we build scalable infrastructure for modern brands.
          </p>
        </div>

        <div className="services-grid grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <TiltCard key={s.title} className="service-card flex flex-col justify-between">
              <div>
                <div className="font-display text-xl font-semibold text-foreground">{s.title}</div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-primary/15 border border-primary/20 px-2.5 py-0.5 text-xs text-primary font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Generous gap divider before the next section */}
        <div className="mt-28 md:mt-40 flex items-center justify-center">
          <div className="services-divider h-px w-full max-w-xl bg-gradient-to-r from-transparent via-primary/30 to-transparent origin-center" />
        </div>
      </div>
    </section>
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
    title: "Deep Audit",
    text: "We audit your entire Amazon presence: listing health, advertising architecture, margins, pricing, review velocity, and competitor whitespace to identify untapped revenue channels.",
    tags: ["Listing Health", "Competitor Intel", "PPC Structure", "Margin Analysis"],
  },
  {
    n: "02",
    title: "Custom Strategy",
    text: "No cookie-cutter playbooks. We construct a bespoke multi-channel growth roadmap with aggressive target ACoS, granular keyword matrices, and category-dominant positioning.",
    tags: ["Growth Roadmap", "Category Targeting", "Budget Allocation", "Keyword Matrix"],
  },
  {
    n: "03",
    title: "Campaign Activation",
    text: "We execute precision performance campaigns across Sponsored Products, Sponsored Brands, and Amazon DSP with algorithmic bid adjustments and negative keyword pruning.",
    tags: ["Sponsored Products", "Amazon DSP", "Daily Bid Tuning", "Negative Keywords"],
  },
  {
    n: "04",
    title: "Scale & Report",
    text: "We continuously scale high-performing campaigns, eliminate wasteful spend, and sync real-time sales telemetry directly to your live dashboard with full weekly transparency.",
    tags: ["Live Dashboard", "Weekly PDF Reports", "ROAS Scaling", "Dedicated Lead"],
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const scale = useTransform(scrollYProgress, [0, 1], [isMobile ? 1 : 0.94, 1]);
  const rot = useTransform(scrollYProgress, [0, 1], [isMobile ? 0 : -2, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.45, 0.85, 1]);
  const innerY = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <div
      ref={ref}
      style={{
        top: isMobile ? `${80 + i * 18}px` : `${105 + i * 26}px`,
        position: "sticky",
      }}
    >
      <motion.div
        style={{ scale, rotate: rot, willChange: "transform" }}
        className="relative rounded-[2rem] p-6 md:p-14 border border-blue-500/25 surface-glass overflow-hidden shadow-[0_30px_70px_-20px_oklch(0_0_0/0.8),0_0_40px_-20px_oklch(0.65_0.25_258/0.3)] bg-gradient-to-br from-[oklch(0.15_0.016_270)] via-[oklch(0.13_0.014_270)] to-[oklch(0.11_0.012_270)]"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/[0.08] blur-[80px] pointer-events-none will-change-[filter]" />

        <motion.div
          style={{ opacity, y: innerY }}
          className="relative grid md:grid-cols-12 gap-6 md:gap-10 items-center"
        >
          <div className="md:col-span-3">
            <div className="font-display text-5xl md:text-8xl lg:text-9xl text-primary leading-[1.0] font-light tracking-tight">
              {item.n}
            </div>
            <div className="mt-2 text-xs font-mono tracking-widest text-primary/70 uppercase">
              Phase {item.n}
            </div>
          </div>
          <div className="md:col-span-9">
            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-tight tracking-tight mb-2">
              {item.title}
            </h3>
            <p className="mt-2 md:mt-4 text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
              {item.text}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/15 border border-primary/25 px-3 py-1 text-xs text-primary font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-6 right-8 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground/70">
          0{i + 1} / 0{total}
        </div>
      </motion.div>
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
    <section id="process" ref={ref} className="relative z-10 pt-16 pb-44 md:py-28 md:pb-60 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 md:mb-20">
          <div className="process-eyebrow mb-3 text-sm uppercase tracking-[0.3em] text-primary font-semibold">
            ◆ The Process
          </div>
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-bold leading-[1.15] tracking-tight text-balance">
            Four steps to a <br />
            <span className="gradient-text">predictable growth engine.</span>
          </h2>
        </div>
        {/* Generous space between cards so the scroll lock stacks slowly and deliberately */}
        <div className="space-y-48 md:space-y-64 pb-36">
          {PROCESS_STEPS.map((s, i) => (
            <ProcessStackedCard key={i} i={i} total={PROCESS_STEPS.length} item={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ OUR CLIENTS (GLOBAL 3D GLOBE) ------------------------------ */
function OurClientsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = ref.current!.querySelector<HTMLHeadingElement>("h2")!;
      const split = new SplitType(heading, { types: "chars,words" });
      const eyebrow = ref.current!.querySelector(".clients-eyebrow")!;
      const sub = ref.current!.querySelector(".clients-sub")!;

      // Eyebrow & sub slow scroll-controlled reveal
      gsap.from([eyebrow, sub], {
        y: 25,
        opacity: 0,
        stagger: 0.1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: eyebrow,
          start: "top 92%",
          end: "top 55%",
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

      // Left stats cards (staggered slow scrub)
      const stats = ref.current!.querySelectorAll(".client-stat");
      gsap.from(stats, {
        y: 60,
        opacity: 0,
        scale: 0.92,
        filter: "blur(8px)",
        stagger: 0.1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ref.current!.querySelector(".clients-content"),
          start: "top 90%",
          end: "top 35%",
          scrub: 1.5,
        },
      });

      // Ecosystem pills card (slow scrub)
      const pillsCard = ref.current!.querySelector(".client-pills")!;
      gsap.from(pillsCard, {
        y: 50,
        opacity: 0,
        scale: 0.95,
        filter: "blur(8px)",
        ease: "power1.out",
        scrollTrigger: {
          trigger: pillsCard,
          start: "top 90%",
          end: "top 40%",
          scrub: 1.5,
        },
      });

      // CTA row
      const ctaRow = ref.current!.querySelector(".client-cta-row")!;
      gsap.from(ctaRow, {
        y: 30,
        opacity: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ctaRow,
          start: "top 92%",
          end: "top 60%",
          scrub: 1.5,
        },
      });

      // 3D Rotating Globe Wrapper (slow zoom & unblur scrub)
      const globeWrapper = ref.current!.querySelector(".globe-wrapper")!;
      gsap.from(globeWrapper, {
        y: 80,
        scale: 0.85,
        opacity: 0,
        filter: "blur(16px)",
        ease: "power1.out",
        scrollTrigger: {
          trigger: globeWrapper,
          start: "top 90%",
          end: "top 30%",
          scrub: 1.8,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="clients" ref={ref} className="relative z-10 py-24 md:py-32 overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="clients-heading mb-16 text-center max-w-3xl mx-auto">
          <div className="clients-eyebrow mb-3 text-sm uppercase tracking-[0.3em] text-primary font-semibold">
            ◆ Global Clients & Marketplaces
          </div>
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-bold leading-[1.15] tracking-tight text-balance">
            Scaling brands across <br />
            <span className="gradient-text">every major global market.</span>
          </h2>
          <p className="clients-sub mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            From North America and Europe to India and the Middle East, our ad operations and catalog managers optimize live storefronts around the clock.
          </p>
        </div>

        {/* 2-Column Content + 3D Continuous Rotating Orb */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Metrics & Marketplaces */}
          <div className="lg:col-span-6 space-y-8 clients-content">
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "15+", label: "Active Brands", sub: "Worldwide portfolio" },
                { value: "2.4x", label: "Average ROAS", sub: "Ad spend multiplier" },
                { value: "8+", label: "Global Regions", sub: "US, UK, IN, UAE, DE, JP" },
                { value: "99.8%", label: "Health Score", sub: "Account compliance" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="client-stat rounded-2xl surface-glass border border-blue-500/20 p-5 hover:border-blue-500/40 transition-colors"
                >
                  <div className="font-display text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm font-semibold text-foreground mt-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stat.sub}</div>
                </div>
              ))}
            </div>

            <div className="client-pills rounded-2xl surface-glass border border-blue-500/20 p-6 space-y-4">
              <div className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                Supported Marketplace Ecosystems
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Amazon US",
                  "Amazon UK",
                  "Amazon India",
                  "Amazon UAE",
                  "Amazon Japan",
                  "Amazon Germany",
                  "Flipkart",
                  "Walmart",
                  "Myntra",
                  "Nykaa",
                  "Noon",
                  "Shopify DTC",
                ].map((mkt) => (
                  <span
                    key={mkt}
                    className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-foreground/80 font-medium"
                  >
                    {mkt}
                  </span>
                ))}
              </div>
            </div>

            <div className="client-cta-row flex flex-col sm:flex-row items-center gap-4">
              <button onClick={scrollToContact} className="hero-btn hero-btn-primary w-full sm:w-auto">
                Scale Your Brand Globally
              </button>
              <span className="text-xs text-muted-foreground text-center sm:text-left">
                Free marketplace audit & forecast report included.
              </span>
            </div>
          </div>

          {/* Right Column: Magic UI 3D Interactive Rotating Globe */}
          <div className="lg:col-span-6 flex justify-center globe-wrapper">
            <GlobeDemo className="w-full max-w-[500px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ BRANDS ------------------------------ */
const BRAND_LOGOS = Object.values(
  import.meta.glob<{ default: string }>("@/assets/brands/*.{png,jpg,jpeg,webp,svg}", {
    eager: true,
  })
).map((module) => module.default);

const halfLogos = Math.ceil(BRAND_LOGOS.length / 2);
const ROW1_LOGOS = BRAND_LOGOS.slice(0, halfLogos);
const ROW2_LOGOS = BRAND_LOGOS.slice(halfLogos);

function BrandsSection() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = ref.current!.querySelector<HTMLHeadingElement>("h2")!;
      const split = new SplitType(heading, { types: "chars,words" });
      const eyebrow = ref.current!.querySelector(".brands-eyebrow")!;

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

      // Marquee continuous animation
      const rows = ref.current!.querySelectorAll<HTMLElement>(".marquee-row");
      rows.forEach((row, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        gsap.to(row, { x: `${dir * 45}%`, duration: 40 + i * 8, ease: "none", repeat: -1 });
      });

      // Marquee rows scroll-controlled entrance (slow scrub)
      gsap.from(rows, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        filter: "blur(10px)",
        stagger: 0.15,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          end: "top 40%",
          scrub: 2,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="brands" ref={ref} className="relative z-10 overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-6 text-center mb-14 brands-heading">
        <div className="brands-eyebrow mb-3 text-sm uppercase tracking-[0.3em] text-primary font-semibold">◆ Brands We Work With</div>
        <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-bold leading-[1.15] tracking-tight text-balance py-3">
          Trusted by <span className="gradient-text">growing brands.</span>
        </h2>
      </div>
      {/* Two independent continuous marquee rows with brand logos */}
      <div className="flex flex-col gap-6 overflow-hidden">
        {[ROW1_LOGOS, ROW2_LOGOS].map((rowLogos, rowIndex) => (
          <div key={rowIndex} className="marquee-row flex gap-6 whitespace-nowrap">
            {[...rowLogos, ...rowLogos, ...rowLogos, ...rowLogos].map((logo, i) => (
              <div
                key={`${rowIndex}-${i}`}
                className="inline-flex shrink-0 items-center justify-center rounded-2xl surface-glass px-6 py-4 border border-blue-500/15 hover:border-blue-500/40 transition-all duration-300 w-44 h-24 bg-surface/30 backdrop-blur-md"
              >
                <img
                  src={logo}
                  alt="Client Brand Partner"
                  className="max-h-14 max-w-[130px] w-auto h-auto object-contain filter grayscale hover:grayscale-0 brightness-95 hover:brightness-100 transition-all duration-300 rounded"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ TESTIMONIALS ------------------------------ */
function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = ref.current!.querySelector<HTMLHeadingElement>("h2")!;
      const split = new SplitType(heading, { types: "chars,words" });
      const eyebrow = ref.current!.querySelector(".testimonials-eyebrow")!;

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

      // Testimonial cards (staggered slow scrub)
      const cards = ref.current!.querySelectorAll(".testimonial-card");
      gsap.from(cards, {
        y: 80,
        opacity: 0,
        scale: 0.92,
        filter: "blur(10px)",
        stagger: 0.15,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ref.current!.querySelector(".testimonials-grid"),
          start: "top 90%",
          end: "top 30%",
          scrub: 1.8,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const testimonials = [
    { quote: "AMZCOZ transformed our e-commerce presence across Amazon and Flipkart. Within 60 days, 3x growth in organic sales.", name: "Rajesh Kumar", role: "Electronics Brand" },
    { quote: "Their expertise in e-commerce advertising is unmatched. Our campaigns are profitable and brand visibility skyrocketed.", name: "Priya Sharma", role: "Fashion & Apparel" },
    { quote: "Professional and transparent. AMZCOZ handles everything from listings to ads, allowing us to focus on product development.", name: "Michael Chen", role: "Home & Kitchen" },
  ];

  return (
    <section ref={ref} className="relative z-10 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="testimonials-heading mb-16 text-center">
          <div className="testimonials-eyebrow mb-3 text-sm uppercase tracking-[0.3em] text-primary font-semibold">◆ What Our Clients Say</div>
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-bold leading-[1.15] tracking-tight text-balance py-3">
            Real results from <span className="gradient-text">real businesses.</span>
          </h2>
        </div>
        <div className="testimonials-grid grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              whileHover={{ y: -6 }}
              className="testimonial-card rounded-3xl surface-glass p-8 border border-blue-500/20"
            >
              <p className="text-base leading-relaxed text-muted-foreground">"{t.quote}"</p>
              <div className="mt-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-lg font-bold">M</div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ FINAL CTA ------------------------------ */
function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const headline = ref.current!.querySelector<HTMLHeadingElement>("h2")!;
      const split = new SplitType(headline, { types: "chars,words" });
      const glow = ref.current!.querySelector(".cta-glow")!;
      const eyebrow = ref.current!.querySelector(".cta-eyebrow")!;

      // Radial glow unblur & scale
      gsap.from(glow, {
        scale: 0.5,
        opacity: 0.1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          end: "top 30%",
          scrub: 2,
        },
      });

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
        filter: "blur(14px)",
        stagger: 0.02,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headline,
          start: "top 92%",
          end: "top 35%",
          scrub: 1.5,
        },
      });

      // Subtitle, bullet items, and CTA button
      const ctaItems = ref.current!.querySelectorAll(".cta-item");
      gsap.from(ctaItems, {
        y: 40,
        opacity: 0,
        filter: "blur(6px)",
        stagger: 0.1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          end: "top 35%",
          scrub: 1.5,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative z-10 overflow-hidden py-40">
      <div className="cta-glow pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[160px]" style={{ background: "var(--gradient-primary)" }} />
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <div className="cta-eyebrow cta-item mb-3 text-sm uppercase tracking-[0.3em] text-primary font-semibold">◆ Free Strategy Session</div>
        <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-bold leading-[1.15] tracking-tight text-balance py-4">
          Ready to accelerate<br />
          <span className="gradient-text">your Amazon growth?</span>
        </h2>
        <p className="cta-item mx-auto mt-6 max-w-xl text-lg text-white/80">
          Book a free strategy session and discover how we can help you achieve your goals.
        </p>
        <ul className="cta-item mt-8 flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2"><span className="text-primary font-bold">✓</span> 15-minute audit</li>
          <li className="flex items-center gap-2"><span className="text-primary font-bold">✓</span> Channel-wise growth plan</li>
          <li className="flex items-center gap-2"><span className="text-primary font-bold">✓</span> Actionable next steps</li>
        </ul>
        <div className="cta-item mt-12">
          <button onClick={scrollToContact} className="hero-btn hero-btn-primary">
            Book Strategy Session
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ CONTACT FORM ------------------------------ */
function ContactFormSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("IN");
  const [phoneError, setPhoneError] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = ref.current!.querySelector<HTMLHeadingElement>("h2")!;
      const split = new SplitType(heading, { types: "chars,words" });
      const eyebrow = ref.current!.querySelector(".contact-eyebrow")!;

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

      // Contact Form Card (slow scrub)
      const card = ref.current!.querySelector(".contact-card")!;
      gsap.from(card, {
        y: 70,
        opacity: 0,
        scale: 0.94,
        filter: "blur(12px)",
        ease: "power1.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          end: "top 35%",
          scrub: 1.8,
        },
      });

      // Form inputs & button (staggered slow scrub)
      const formFields = card.querySelectorAll("label, button");
      gsap.from(formFields, {
        y: 25,
        opacity: 0,
        stagger: 0.08,
        ease: "power1.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 40%",
          scrub: 1.5,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setPhoneError("");
    try {
      const cleanNum = phone.replace(/\s+/g, "");
      const country = COUNTRY_PHONE_PATTERNS[countryCode];
      if (!cleanNum) { setPhoneError("Please enter a phone number"); setSending(false); return; }
      if (country && !country.pattern.test(cleanNum)) { setPhoneError(`Invalid format`); setSending(false); return; }
      const res = await submitContactForm({ name, email, phone, countryCode, message, sourceId: "amzcoz_contact" });
      if (res.success) {
        toast.success("Thanks for reaching out!");
        setName(""); setEmail(""); setPhone(""); setMessage("");
      } else {
        toast.error(res.error || "Failed to send message.");
      }
    } catch (err: any) {
      toast.error("An error occurred.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" ref={ref} className="relative z-10 py-32 border-t border-white/5">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-16">
          <div className="contact-eyebrow mb-3 text-sm uppercase tracking-[0.3em] text-primary font-semibold">◆ Contact Us</div>
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-bold leading-[1.15] tracking-tight text-balance py-3">
            Let's grow your brand on <span className="gradient-text">Amazon.</span>
          </h2>
        </div>

        <div className="contact-card surface-glass bg-white/[0.05] rounded-3xl p-8 md:p-10 shadow-[0_0_40px_rgba(255,255,255,0.05)] border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted-foreground">Name</span>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-3 text-base text-foreground outline-none transition focus:border-primary/60 focus:bg-white/[0.12]" />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted-foreground">Email</span>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-3 text-base text-foreground outline-none transition focus:border-primary/60 focus:bg-white/[0.12]" />
              </label>
            </div>

            <PhoneInput phone={phone} countryCode={countryCode} onPhoneChange={(v) => { setPhone(v); setPhoneError(""); }} onCountryChange={setCountryCode} required error={phoneError} />

            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted-foreground">Message (Optional)</span>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your brand..." rows={4} className="w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-3 text-base text-foreground outline-none transition focus:border-primary/60 focus:bg-white/[0.12] resize-none" />
            </label>

            <div className="flex justify-end pt-4">
              <button type="submit" disabled={sending} className="hero-btn hero-btn-primary">
                {sending ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ FOOTER ------------------------------ */
function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1.4fr]">
          <div>
            <div className="flex items-center gap-2 font-display text-xl font-bold">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_20px_var(--color-primary)]" />
              AMZCOZ
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Expert Amazon account management, advertising, and e-commerce growth services.
            </p>
          </div>
          <div>
            <div className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Quick Links</div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {["Home", "Services", "About Us", "Contact"].map((l) => (
                <li key={l}><a href="#" className="transition hover:text-foreground">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Services</div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {["Amazon Management", "Amazon Advertising", "Brand Store", "Review Management", "Website Development", "Social Media"].map((s) => (
                <li key={s}><a href="#services" className="transition hover:text-foreground">{s}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="tel:+918007208742" className="transition hover:text-foreground">+91 80072 08742</a></li>
              <li><a href="mailto:adnan@amzcoz.com" className="transition hover:text-foreground">adnan@amzcoz.com</a></li>
              <li>Pune, Maharashtra</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-muted-foreground md:flex-row">
          <div>© 2026 AMZCOZ. All rights reserved.</div>
          <div className="flex flex-wrap gap-4">
            {["Privacy Policy", "Terms & Conditions", "Shipping"].map((l, i) => (
              <span key={l} className="flex items-center gap-4">
                <a href="#" className="transition hover:text-foreground">{l}</a>
                {i < 2 && <span className="text-white/20">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}


