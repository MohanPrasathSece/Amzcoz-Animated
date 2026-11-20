import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import SplitType from "split-type";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { ContactSection } from "@/components/ContactSection";

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <SEO
        title="Contact AMZCOZ | Free Marketplace & Quick Commerce Audit"
        description="Book your free marketplace channel audit with AMZCOZ. Get listing diagnostic, PPC structure evaluation, and quick-commerce dark-store expansion roadmap within 24 hours."
        canonical="/contact"
        keywords="contact amzcoz, hire amazon agency, quick commerce agency consultation, ecommerce audit india, amazon consultant pune"
        structuredData={{
          "@type": "ContactPage",
          "@id": "https://amzcoz.com/contact#webpage",
          "url": "https://amzcoz.com/contact",
          "name": "Contact AMZCOZ Growth Strategists",
          "description": "Direct inquiry and consultation form for AMZCOZ marketplace growth services.",
          "mainEntity": {
            "@type": "ContactPoint",
            "telephone": "+918007208742",
            "email": "adnan@amzcoz.com",
            "contactType": "customer service",
            "areaServed": ["IN", "US", "AE"],
            "availableLanguage": ["English", "Hindi"],
          },
        }}
      />
      <main className="relative min-h-screen bg-background text-foreground overflow-x-clip">
        <Navbar />

        {/* ------------------- HERO ------------------- */}
        <section
          ref={heroRef}
          className="relative pt-36 pb-12 md:pt-44 md:pb-16 overflow-hidden border-b border-white/5"
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
              Let's Talk
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
              Let's Start a <span className="gradient-text">Project Together</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Have a catalog to scale on Amazon, Blinkit, Zepto, or Flipkart? Connect directly with our lead growth strategists.
            </motion.p>
          </div>
        </section>

        {/* Dedicated Side-by-Side Contact Section with Form */}
        <Reveal>
          <ContactSection
            eyebrow="◆ Dedicated Inquiry"
            title="Direct Consultation & Free Channel Audit"
            subtitle="Tell us about your brand. We will review your listings, dark-store positioning, and PPC structure within 24 hours."
            sourceId="amzcoz_contact_page"
          />
        </Reveal>

        <Footer />
        <ScrollToTop />
      </main>
    </SmoothScroll>
  );
}
