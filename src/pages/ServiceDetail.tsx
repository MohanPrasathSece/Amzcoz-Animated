import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Layers,
  TrendingUp,
  ShieldCheck,
  ChevronDown,
  Building2,
  Phone,
  Mail,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { HeroGlassFold } from "@/components/HeroGlassFold";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SEO } from "@/components/SEO";
import { ALL_SERVICES, getServiceBySlug } from "@/data/servicesData";

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  // Related services lookup
  const relatedServices = service.relatedServiceSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  // JSON-LD Structured Data: Service + BreadcrumbList + FAQPage
  const structuredData = [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://amzcoz.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://amzcoz.com/services",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": service.shortTitle,
          "item": `https://amzcoz.com/services/${service.slug}`,
        },
      ],
    },
    {
      "@type": "Service",
      "@id": `https://amzcoz.com/services/${service.slug}#service`,
      "name": service.title,
      "serviceType": service.shortTitle,
      "category": service.category,
      "description": service.metaDescription,
      "provider": {
        "@type": ["ProfessionalService", "MarketingAgency"],
        "@id": "https://amzcoz.com/#organization",
        "name": "AMZCOZ",
        "url": "https://amzcoz.com",
        "telephone": "+918007208742",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Pune",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN",
        },
      },
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "United Arab Emirates" },
        { "@type": "Country", "name": "Kuwait" },
        { "@type": "Country", "name": "Saudi Arabia" },
        { "@type": "Country", "name": "United States" },
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `${service.shortTitle} Deliverables`,
        "itemListElement": service.deliverables.map((d, idx) => ({
          "@type": "Offer",
          "position": idx + 1,
          "itemOffered": {
            "@type": "Service",
            "name": d.title,
            "description": d.desc,
          },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `https://amzcoz.com/services/${service.slug}#faq`,
      "mainEntity": service.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    },
  ];

  const allKeywords = [
    ...service.targetKeywords.primary,
    ...service.targetKeywords.secondary,
    ...service.targetKeywords.longTail,
  ].join(", ");

  return (
    <>
      <SEO
        title={`${service.metaTitle}`}
        description={service.metaDescription}
        canonical={`/services/${service.slug}`}
        keywords={allKeywords}
        structuredData={structuredData}
      />

      <SmoothScroll>
        <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
          <Navbar />

          <main className="pt-28 md:pt-36 pb-20">
            {/* 1. Breadcrumbs */}
            <div className="mx-auto max-w-7xl px-6 pb-6">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <Link to="/" className="transition hover:text-foreground">
                  Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                <Link to="/services" className="transition hover:text-foreground">
                  Services
                </Link>
                <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">
                  {service.shortTitle}
                </span>
              </nav>
            </div>

            {/* 2. Hero Section */}
            <section className="relative mx-auto max-w-7xl px-6 pt-4 pb-16 md:pb-24 border-b border-white/5 overflow-hidden">
              {/* Subtle animated glass fold line background */}
              <HeroGlassFold opacity="opacity-20 sm:opacity-25" />
              {/* Subtle background glow */}
              <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -z-10 h-[360px] w-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

              <div className="max-w-4xl">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary mb-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  <span>{service.badge}</span>
                  <span className="text-white/30">|</span>
                  <span className="text-muted-foreground">{service.category}</span>
                </div>

                {/* Primary H1 */}
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-foreground mb-6">
                  {service.primaryH1}
                </h1>

                {/* Direct AEO Executive Summary */}
                <div className="surface-glass rounded-2xl p-6 md:p-8 border border-white/10 mb-8">
                  <p className="text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed font-normal">
                    {service.executiveSummary}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10">
                  {service.heroHighlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {hl}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    to="/contact"
                    className="hero-btn hero-btn-primary text-sm sm:text-base px-6 py-3 font-semibold shadow-lg inline-flex items-center gap-2"
                  >
                    <span>Request Free Category Audit</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="#deliverables"
                    className="hero-btn hero-btn-ghost text-sm sm:text-base px-6 py-3 font-semibold"
                  >
                    View Deliverables
                  </a>
                </div>

                {/* Platforms Supported */}
                <div className="mt-10 pt-6 border-t border-white/5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground mr-1 uppercase tracking-wider text-[11px]">
                    Supported Channels:
                  </span>
                  {service.platformsSupported.map((plat) => (
                    <span
                      key={plat}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-foreground/80 font-medium"
                    >
                      {plat}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* 3. Proven Impact Metrics */}
            <section className="mx-auto max-w-7xl px-6 py-16 md:py-20 border-b border-white/5">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                  Measurable Performance
                </span>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                  Business Impact Engineered for Scale
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.benefits.map((b, idx) => (
                  <div
                    key={idx}
                    className="surface-glass rounded-2xl p-6 sm:p-8 border border-white/5 hover:border-primary/30 transition duration-300 relative group overflow-hidden"
                  >
                    <div className="font-display text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-primary mb-2">
                      {b.metric}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">
                      {b.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Core Deliverables */}
            <section id="deliverables" className="mx-auto max-w-7xl px-6 py-16 md:py-24 border-b border-white/5 scroll-mt-24">
              <div className="max-w-2xl mb-12">
                <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                  What We Deliver
                </span>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                  Complete Scope of Service Execution
                </h2>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground">
                  Every account is assigned dedicated channel specialists, advertising managers, and catalog coordinators focused on compounding your commercial advantages.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.deliverables.map((del, idx) => (
                  <div
                    key={idx}
                    className="surface-glass rounded-2xl p-6 sm:p-7 border border-white/5 hover:border-white/15 transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-bold font-mono mb-4">
                        {(idx + 1).toString().padStart(2, "0")}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-foreground mb-2.5">
                        {del.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {del.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Four-Step Execution Roadmap */}
            <section className="mx-auto max-w-7xl px-6 py-16 md:py-24 border-b border-white/5">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                  Operational Roadmap
                </span>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                  How We Scale Your Channel Operations
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                {service.processSteps.map((step) => (
                  <div
                    key={step.step}
                    className="surface-glass rounded-2xl p-6 border border-white/5 relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-mono font-bold text-primary mb-3 uppercase tracking-wider">
                        Phase 0{step.step}
                      </div>
                      <h3 className="text-base font-bold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. Contextual FAQs (Answer Engine Optimization) */}
            <section className="mx-auto max-w-5xl px-6 py-16 md:py-24 border-b border-white/5">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                  Direct Expert Answers
                </span>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                  Frequently Asked Questions
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                  Factual, transparent information about how we operate, deliver ROI, and protect your brand equity.
                </p>
              </div>

              <div className="space-y-3.5">
                {service.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="surface-glass rounded-xl border border-white/5 overflow-hidden transition"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-5 text-left font-display text-sm sm:text-base font-semibold text-foreground hover:text-primary transition"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-primary" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-5 pb-5 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-white/5 pt-3">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 7. Contextual Internal Linking: Related Services */}
            {relatedServices.length > 0 && (
              <section className="mx-auto max-w-7xl px-6 py-16 md:py-20 border-b border-white/5">
                <div className="max-w-2xl mb-8">
                  <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                    Complementary Solutions
                  </span>
                  <h2 className="mt-2 font-display text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
                    Explore Connected Growth Services
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {relatedServices.map((rel) => (
                    <Link
                      key={rel.slug}
                      to={`/services/${rel.slug}`}
                      className="surface-glass rounded-xl p-5 border border-white/5 hover:border-primary/30 transition group flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-2">
                          {rel.category}
                        </div>
                        <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition">
                          {rel.shortTitle}
                        </h3>
                        <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {rel.executiveSummary}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary">
                        <span>Learn More</span>
                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* 8. Conversion CTA Box */}
            <section className="mx-auto max-w-7xl px-6 pt-16 md:pt-20">
              <div className="relative rounded-3xl surface-glass border border-primary/20 p-8 sm:p-12 md:p-16 overflow-hidden text-center max-w-4xl mx-auto">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 -z-10 h-64 w-64 rounded-full bg-primary/20 blur-[100px] pointer-events-none" />

                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
                  <Sparkles className="h-3.5 w-3.5" />
                  Scale With AMZCOZ
                </span>

                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4">
                  Ready to Accelerate Your Category Leadership?
                </h2>

                <p className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
                  Get a comprehensive channel audit, competitor benchmark, and custom growth blueprint from our senior marketplace architects in Pune.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    to="/contact"
                    className="hero-btn hero-btn-primary text-sm sm:text-base px-8 py-3.5 font-semibold shadow-lg inline-flex items-center gap-2"
                  >
                    <span>Book Strategy Call</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-primary" />
                    <span>Pune, Maharashtra, India</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    <span>+91 80072 08742</span>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <Footer />
          <ScrollToTop />
        </div>
      </SmoothScroll>
    </>
  );
}
