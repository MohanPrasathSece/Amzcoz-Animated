import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  ShoppingBag,
  TrendingUp,
  Palette,
  Star,
  Search,
  Share2,
  Code2,
  ShoppingCart,
  Users2,
  PenTool,
  Package,
  Layers,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  X,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  id: number;
  slug: string;
  title: string;
  category: "Marketplaces & Q-Commerce" | "Paid Media" | "Creative & Design" | "Web & Tech" | "Specialized Growth";
  icon: typeof ShoppingBag;
  desc: string;
  whatWeDo: string[];
  highlight: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 1,
    slug: "marketplace-account-management",
    title: "Marketplace Account Management",
    category: "Marketplaces & Q-Commerce",
    icon: ShoppingBag,
    desc: "Complete end-to-end seller operations across Amazon, Flipkart, Myntra, Nykaa, Ajio, JioMart, and Meesho. We protect your account health, resolve brand registry issues, and keep operations running flawlessly.",
    highlight: "End-to-End Account Ownership & Policy Compliance Across All Marketplaces",
    whatWeDo: [
      "Seller account setup, onboarding & brand registry across platforms",
      "Product listing creation, high-ranking SEO copywriting & keyword indexing",
      "Inventory management, FBA/FBF shipment creation & order tracking",
      "24/7 account health monitoring & policy suspension prevention",
      "Catalogue and variation family architecture",
      "Competitor price intelligence and market gap analysis",
      "Weekly performance tracking & margin reports",
    ],
  },
  {
    id: 2,
    slug: "amazon-account-management",
    title: "Amazon Account Management",
    category: "Marketplaces & Q-Commerce",
    icon: ShoppingBag,
    desc: "Specialized Amazon Seller Central and 1P Vendor Central operations. Master Amazon A9/Cosmo search indexing, Buy Box preservation, Brand Registry defense, and multi-region FBA fulfillment.",
    highlight: "Top 1% Category BSR Organic Rank & Unlimited FBA Capacity",
    whatWeDo: [
      "Deep Amazon A9 and Cosmo algorithm keyword indexing",
      "FBA shipment creation, box labels & IPI score management",
      "Buy Box suppression defense and hijacker eviction",
      "Brand Registry, Project Zero & transparency code setup",
      "Seller support case escalation and lost inventory reimbursements",
      "Amazon US, UK, and Middle East (UAE/KSA) global selling launch",
    ],
  },
  {
    id: 3,
    slug: "flipkart-account-management",
    title: "Flipkart Account Management",
    category: "Marketplaces & Q-Commerce",
    icon: ShoppingCart,
    desc: "Scale on India's homegrown e-commerce titan. We secure the Flipkart Assured (f-Assured) badge, prepare mega sales like Big Billion Days, manage FBF fulfillment, and optimize PLA campaigns.",
    highlight: "Flipkart Assured Badge Governance & Big Billion Days War-Room Scale",
    whatWeDo: [
      "Catalog quality score enrichment to 90%+ across all listings",
      "Flipkart Fulfillment (FBF) and Smart warehouse onboarding",
      "Big Billion Days deal application and hourly discount monitoring",
      "Flipkart Product Listing Ads (PLA) bid optimization",
      "Weight discrepancy disputes and courier overcharge recovery",
      "Return to Origin (RTO) reduction through size and specification charts",
    ],
  },
  {
    id: 4,
    slug: "meesho-marketplace-management",
    title: "Meesho Marketplace Management",
    category: "Marketplaces & Q-Commerce",
    icon: Package,
    desc: "Conquer Bharat's largest value-commerce platform with zero commission. We optimize high-volume catalog batches, formulate multi-pack bundles, and rigorously mitigate RTO rates.",
    highlight: "0% Commission Margin Retention & RTO Containment Protocols",
    whatWeDo: [
      "Visual-first listing optimization tailored to mobile Bharat consumers",
      "Automated RTO mitigation and non-delivery order scrubbing",
      "Multi-pack bundle architecture to defend contribution margins",
      "Meesho Ads deployment for low cost-per-acquisition (CPA)",
      "High-SKU batch uploads with precise fabric and size tags",
      "M-Trust score maintenance for priority feed visibility",
    ],
  },
  {
    id: 5,
    slug: "quick-commerce-growth",
    title: "Quick Commerce Growth (Blinkit, Zepto, Instamart)",
    category: "Marketplaces & Q-Commerce",
    icon: Zap,
    desc: "Specialized dark-store catalog placement, inventory replenishment, and in-app advertising across Blinkit, Zepto, and Swiggy Instamart to capture immediate consumer demand in 10 minutes.",
    highlight: "Dark-Store Fill Rates, Rapid City Replenishment & 10-Minute Cart Dominance",
    whatWeDo: [
      "City-wise catalog listing and dark-store availability mapping",
      "Blinkit Brand Booster, Zepto in-app banners & search ad campaigns",
      "Swiggy Instamart brand visibility and category sponsorship",
      "Stock velocity alerts to prevent out-of-stock dark-store delistings",
      "Product pack size and price tier optimization for instant delivery",
      "City-level consumer demand analysis & micro-market targeting",
      "Omnichannel stock synchronization with main warehouse",
    ],
  },
  {
    id: 6,
    slug: "blinkit-growth-services",
    title: "Blinkit Growth & Vendor Operations",
    category: "Marketplaces & Q-Commerce",
    icon: Zap,
    desc: "Accelerate your brand on India's quick commerce leader. Manage Blinkit Vendor Central, regional mother warehouse inwarding, Brand Booster advertising, and 10-minute micro dark-store availability.",
    highlight: "Blinkit Brand Booster Advertising & Regional Mother Hub Replenishment",
    whatWeDo: [
      "Fast-track Blinkit vendor registration and ASN processing",
      "Blinkit Brand Booster search keyword and banner campaign bids",
      "Inventory distribution across Delhi NCR, Mumbai, Bengaluru, and Pune hubs",
      "Catalog 1:1 image card optimization with high-contrast benefit callouts",
      "Impulse buy and cart checkout cross-sell slot negotiation",
      "Payment shortage claims and proof-of-delivery (POD) reconciliations",
    ],
  },
  {
    id: 7,
    slug: "zepto-growth-services",
    title: "Zepto Brand Growth & Seller Services",
    category: "Marketplaces & Q-Commerce",
    icon: Zap,
    desc: "Scale rapidly on Zepto across premium urban households. Master Zepto vendor portal operations, sponsored product search ads, Zepto Pass promotions, and continuous dark-store inventory flow.",
    highlight: "Dayparted Zepto Search Ads & 99%+ Dark-Store Inbound Fulfillment",
    whatWeDo: [
      "Zepto vendor hub administration, SKU uploads, and barcode compliance",
      "High-intent search keyword bidding and category conquesting",
      "Regional hub appointment scheduling and pallet tagging",
      "Promotional planning for Zepto Pass subscribers and weekend sales",
      "Hyper-local pin code share-of-voice and competitor tracking",
      "Trade discount, credit note, and payment settlement auditing",
    ],
  },
  {
    id: 8,
    slug: "swiggy-instamart-growth",
    title: "Swiggy Instamart Growth Services",
    category: "Marketplaces & Q-Commerce",
    icon: Zap,
    desc: "Leverage Swiggy's massive on-demand consumer network across 30+ Indian cities. We manage category onboarding, Swiggy Ads, mother hub logistics, and hyper-local brand activation.",
    highlight: "30+ Metro City Reach & Swiggy One Loyalty Integration",
    whatWeDo: [
      "Partner portal onboarding, documentation, and nutritional compliance",
      "Swiggy Ads search bidding and restaurant category cross-merchandising",
      "Palletized delivery and ASN coordination into Swiggy mother hubs",
      "Swiggy One subscriber promotional feature placements",
      "Micro-dark-store stock level tracking and automated re-ordering",
      "Remittance advice audits and trade term reconciliations",
    ],
  },
  {
    id: 9,
    slug: "marketplace-dsp-advertising",
    title: "Marketplace & DSP Advertising",
    category: "Paid Media",
    icon: TrendingUp,
    desc: "Data-driven advertising campaigns engineered to maximize sales velocity while ruthlessly cutting wasted ad spend. We manage Sponsored Products, Sponsored Brands, Display, and Amazon DSP programmatic media.",
    highlight: "Lower ACoS, Higher Organic Rank Multipliers & Blended ROAS Precision",
    whatWeDo: [
      "Sponsored Products, Sponsored Brands & Sponsored Video campaigns",
      "Amazon DSP programmatic display & video retargeting",
      "Flipkart PLA (Product Listing Ads) & PCA advertising management",
      "High-intent keyword harvesting and negative keyword pruning",
      "Algorithmic daily bid tuning and target placement multipliers",
      "Target ACoS, TACoS and ROAS performance modeling",
      "Granular weekly advertising intelligence reports",
    ],
  },
  {
    id: 10,
    slug: "amazon-ppc-management",
    title: "Amazon PPC Management Agency",
    category: "Paid Media",
    icon: TrendingUp,
    desc: "Dominant Amazon advertising management. We deploy segmented exact match campaigns, search term harvesting, dayparting bids, and Sponsored Brand Video testing to crush ACoS and drive rank.",
    highlight: "Sub-18% Target ACoS & Algorithmic Search Term Harvesting",
    whatWeDo: [
      "Segmented campaign architecture: Exact, Phrase, Broad & Product Targeting",
      "Sponsored Brand Video and Store spotlight ad creation",
      "Sponsored Display product page defense against competitor conquesting",
      "Automated negative keyword sculpting to eliminate ad budget waste",
      "Dayparting schedules bidding higher during peak conversion hours",
      "Weekly ACoS, TACoS, CTR, and organic rank correlation analytics",
    ],
  },
  {
    id: 11,
    slug: "google-ads-shopping",
    title: "Google Ads & Shopping Feeds",
    category: "Paid Media",
    icon: Search,
    desc: "Capture high-intent buyers searching on Google. We build high-yield Google Search, Shopping, Performance Max, and YouTube video funnels that drive sales directly to your marketplaces and DTC website.",
    highlight: "High-Intent Search, Google Merchant Center Feeds & P-Max Precision",
    whatWeDo: [
      "Google Search ads for high-intent category queries",
      "Google Shopping feed optimization & Merchant Center synchronization",
      "Performance Max (P-Max) campaigns driving traffic to store or Amazon",
      "Dynamic remarketing funnels targeting abandoned cart shoppers",
      "Negative keyword curation to eliminate non-buying search terms",
      "Audience segment building and competitor conquesting",
      "Attribution modeling and conversion tracking verification",
    ],
  },
  {
    id: 12,
    slug: "social-media-meta-ads",
    title: "Social Media & Meta Ads (FB & IG)",
    category: "Paid Media",
    icon: Share2,
    desc: "Build community loyalty and acquire new customers profitably. We engineer scroll-stopping creative ad funnels across Instagram and Facebook that convert cold audiences into repeat brand champions.",
    highlight: "Creative-Led Funnels Across Meta with Proven ROAS Multipliers",
    whatWeDo: [
      "Facebook & Instagram conversion and catalog sales campaigns",
      "High-CTR video ad creative development (Reels, UGC, Carousels)",
      "Lookalike & interest audience segmentation for scaling",
      "Collaborative Ads (CPAS) driving traffic directly to Amazon/Flipkart",
      "Retargeting funnels tailored by shopper browse behavior",
      "Server-side Meta Conversions API (CAPI) configuration",
      "Continuous creative testing and weekly ROAS reports",
    ],
  },
  {
    id: 13,
    slug: "aplus-content-brand-store",
    title: "A+ Content & Brand Store Design",
    category: "Creative & Design",
    icon: Palette,
    desc: "Transform ordinary listings into high-converting visual destinations. We craft cinematic Premium A+ Content, informative comparison modules, and multi-page Amazon Brand Stores that elevate your brand prestige.",
    highlight: "Up to +28% Average Conversion Rate Lift via Visual Narrative",
    whatWeDo: [
      "Enhanced A+ Content (EBC) creation and module strategy",
      "Premium product descriptions with benefits-first copywriting",
      "Multi-page Amazon Brand Store architecture & seasonal refreshes",
      "High-converting product infographics and feature callouts",
      "3D lifestyle renders and real-use photography direction",
      "Brand storytelling designed for mobile app shoppers",
      "Continuous A/B experimentation via Manage Your Experiments",
    ],
  },
  {
    id: 14,
    slug: "review-sentiment-defense",
    title: "Review & Sentiment Defense",
    category: "Specialized Growth",
    icon: Star,
    desc: "Protect your Buy Box and marketplace reputation. We track customer sentiment in real time, handle negative review triage, and implement feedback loops to preserve top product rankings.",
    highlight: "Systematic Rating Defense & Positive Customer Sentiment Flywheel",
    whatWeDo: [
      "24/7 customer review and seller feedback monitoring",
      "Automated policy-compliant review request funnel setup",
      "Customer complaint triage and satisfaction workflows",
      "Review sentiment trends and recurring defect root-cause analysis",
      "Direct brand response coordination for public reviews",
      "Listing defense against malicious competitor attacks",
      "Comprehensive monthly customer sentiment reports",
    ],
  },
  {
    id: 15,
    slug: "website-development",
    title: "Modern Website Development",
    category: "Web & Tech",
    icon: Code2,
    desc: "Clean, ultra-fast, responsive web experiences built for enterprise credibility and lead generation. We craft bespoke websites designed to communicate your brand story with speed and style.",
    highlight: "Sub-Second Loading Speeds, Clean Code Architecture & Modern UI/UX",
    whatWeDo: [
      "Corporate brand website design and full-stack development",
      "Custom UI/UX with smooth transitions and interactive micro-animations",
      "Mobile-first responsive architecture tested across all screen sizes",
      "Dedicated high-converting landing pages for paid ad traffic",
      "Core Web Vitals speed optimization for maximum SEO score",
      "Lead capture workflows, forms, and CRM integrations",
      "Ongoing security maintenance, backups, and technical support",
    ],
  },
  {
    id: 16,
    slug: "shopify-woocommerce-development",
    title: "E-commerce Development (Shopify & Woo)",
    category: "Web & Tech",
    icon: ShoppingCart,
    desc: "Custom Direct-to-Consumer (D2C) online stores that convert browsers into buyers. We build scalable Shopify and WooCommerce stores with frictionless checkout, payment gateway sync, and logistics pipelines.",
    highlight: "Conversion-Engineered Shopify & WooCommerce Storefronts",
    whatWeDo: [
      "Custom Shopify & WooCommerce storefront design and build",
      "Product catalog architecture, variant setup, and bundle configurations",
      "Payment gateway integration (Razorpay, Cashfree, Stripe, UPI)",
      "Automated logistics & courier integration (Shiprocket, Delhivery)",
      "Checkout conversion rate optimization & cart abandonment recovery",
      "ERP, inventory, and cross-channel catalog sync",
      "DTC store maintenance, analytics setup, and speed tuning",
    ],
  },
  {
    id: 17,
    slug: "influencer-marketing",
    title: "Influencer Marketing (India & Middle East)",
    category: "Specialized Growth",
    icon: Users2,
    desc: "Connect your brand with trusted creators who drive real purchases. We manage end-to-end influencer campaigns across India, UAE, and Kuwait to ignite social proof and marketplace sales spikes.",
    highlight: "Direct Creator Network with Middle East (UAE & Kuwait) Focus",
    whatWeDo: [
      "Niche-relevant creator identification, vetting, and engagement checks",
      "Campaign strategy, creative briefs, and content storyline development",
      "End-to-end influencer collaboration and contract management",
      "Product gifting, unboxing coordination, and video reviews",
      "Direct promo code and affiliate tracking for ROI measurement",
      "Whitelisting influencer content for high-performing Meta ads",
      "Marketplace search lift and conversion impact analysis",
    ],
  },
  {
    id: 18,
    slug: "graphic-design-merchandising",
    title: "Graphic Design & Creative Merchandising",
    category: "Creative & Design",
    icon: PenTool,
    desc: "Eye-catching visual assets that make your products irresistible. From Amazon secondary gallery images to social banners and brand identity collateral that establishes commanding category presence.",
    highlight: "Pixel-Perfect E-commerce Imagery & High-CTR Ad Banners",
    whatWeDo: [
      "Primary hero listing images formatted to Amazon & Blinkit guidelines",
      "Informative infographics illustrating dimensions, features & comparisons",
      "Brand identity creation, logos, typography, and color systems",
      "Social media post designs, stories, and carousel templates",
      "Digital advertising banners for Google Display & programmatic ad networks",
      "Promotional packaging design, inserts, and unboxing collateral",
      "Marketing pitch decks and visual retail sales collateral",
    ],
  },
  {
    id: 19,
    slug: "fmcg-marketing",
    title: "FMCG Marketing & Rapid Turnaround",
    category: "Specialized Growth",
    icon: Package,
    desc: "Specialized commercial strategy for Fast-Moving Consumer Goods. We optimize pricing architecture, bundle economics, and quick-delivery dark-store indexing to build habitual repeat purchase behavior.",
    highlight: "Repeat Purchase Economics & High-Velocity SKU Distribution",
    whatWeDo: [
      "FMCG brand positioning and value proposition clarity",
      "Multi-pack, bundle, and subscription model configurations",
      "City-level search dominance on Blinkit, Zepto, and Instamart",
      "Targeted digital advertising capturing active grocery & impulse shoppers",
      "Promotional calendar planning for festive and month-end spikes",
      "Listing optimization for high repeat reorder rates",
      "Unit economics and gross-margin protection analysis",
    ],
  },
];

const CATEGORIES = [
  "All Capabilities",
  "Marketplaces & Q-Commerce",
  "Paid Media",
  "Creative & Design",
  "Web & Tech",
  "Specialized Growth",
] as const;

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<string>("All Capabilities");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close modal on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSelectedService(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedService]);

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

  const filteredServices =
    activeTab === "All Capabilities"
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === activeTab);

  function handleTalkAction() {
    setSelectedService(null);
    navigate("/contact");
  }

  return (
    <SmoothScroll>
      <SEO
        title="Marketplace & Quick Commerce Services | AMZCOZ Agency"
        description="Explore AMZCOZ capabilities: Amazon & Flipkart account management, Quick Commerce acceleration on Blinkit, Zepto & Instamart, Sponsored Ads PPC, A+ Brand Stores, and review defense."
        canonical="/services"
        keywords="amazon seller services, quick commerce agency, blinkit store optimization, zepto brand onboarding, amazon ppc services, flipkart ads management, a+ content design"
        structuredData={[
          {
            "@type": "Service",
            "@id": "https://amzcoz.com/services#service",
            "name": "Marketplaces & Quick Commerce Management",
            "provider": {
              "@id": "https://amzcoz.com/#organization",
            },
            "serviceType": "E-Commerce Growth & Management",
            "areaServed": "India",
            "description": "Full-stack account management, PPC media buying, and dark-store replenishment for ambitious consumer brands.",
          },
          {
            "@type": "ItemList",
            "name": "AMZCOZ Core Capabilities",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Amazon Account Management & Growth",
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Quick Commerce Acceleration (Blinkit, Zepto, Instamart)",
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Amazon Sponsored Ads & DSP Media",
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "A+ Content & Brand Store Design",
              },
            ],
          },
        ]}
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
          <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-accent/8 blur-[100px] rounded-full pointer-events-none" />

          <div className="mx-auto max-w-7xl px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full surface-glass px-4 py-1.5 text-[13px] uppercase tracking-[0.25em] text-primary font-semibold mb-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              What We Deliver
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
              Complete E-Commerce & <span className="gradient-text">Growth Solutions</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-sm md:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              From Amazon seller operations and Blinkit/Zepto dark-store velocity to programmatic media and conversion-engineered storefronts. Click any capability to view full deliverables.
            </motion.p>

            {/* Category Filter Pills */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = activeTab === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`rounded-full px-4.5 py-2 text-[13px] font-semibold transition-all ${isActive
                      ? "bg-primary text-white shadow-[0_0_20px_var(--color-primary)] scale-105"
                      : "surface-glass text-muted-foreground hover:text-foreground hover:bg-white/10"
                      }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ------------------- CLEAN ATTRACTIVE SERVICES GRID ------------------- */}
        <section className="py-20 md:py-28 relative z-10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.3 }}
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className="group cursor-pointer rounded-3xl surface-glass border border-white/10 p-7 md:p-8 flex flex-col justify-between hover:border-primary/50 hover:bg-white/[0.04] transition-all duration-300 shadow-lg hover:-translate-y-1"
                    >
                      <div>
                        {/* Top Metadata */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                          <span className="font-mono text-sm md:text-base font-semibold text-primary/70">
                            0{service.id}
                          </span>
                          <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-0.5 text-[13px] text-primary font-medium">
                            {service.category}
                          </span>
                        </div>

                        {/* Icon & Title */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="h-12 w-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0 group-hover:scale-105 group-hover:bg-primary/25 transition-all">
                            <Icon className="h-6 w-6" />
                          </div>
                          <h3 className="font-display text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                            {service.title}
                          </h3>
                        </div>

                        {/* Short Preview Description */}
                        <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                          {service.desc}
                        </p>
                      </div>

                      {/* Card Action Trigger */}
                      <div className="pt-5 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground/80 font-medium">
                          {service.whatWeDo.length} Deliverables
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedService(service);
                            }}
                            className="text-xs text-muted-foreground hover:text-foreground font-medium underline underline-offset-4"
                          >
                            Quick Scope
                          </button>
                          <Link
                            to={`/services/${service.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs md:text-sm font-semibold text-primary inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                          >
                            Deep Dive <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ------------------- INTERACTIVE DETAIL MODAL ------------------- */}
        <AnimatePresence>
          {selectedService && (
            <div
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto"
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
              />

              {/* Modal Window */}
              <motion.div
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="modal-scroll relative z-10 w-full max-w-2xl max-h-[85vh] sm:max-h-[88vh] overflow-y-auto overscroll-contain rounded-3xl surface-glass border border-white/20 p-6 sm:p-8 md:p-10 shadow-2xl bg-[oklch(0.12_0.015_270)] text-left"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedService(null)}
                  aria-label="Close modal"
                  className="absolute top-6 right-6 h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Top Badge & Number */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-sm uppercase tracking-wider text-primary font-bold">
                    Capability // 0{selectedService.id}
                  </span>
                  <span className="rounded-full bg-primary/15 border border-primary/30 px-3 py-0.5 text-[13px] text-primary font-semibold">
                    {selectedService.category}
                  </span>
                </div>

                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="h-14 w-14 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
                    {(() => {
                      const Icon = selectedService.icon;
                      return <Icon className="h-7 w-7" />;
                    })()}
                  </div>
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-snug">
                      {selectedService.title}
                    </h2>
                  </div>
                </div>

                {/* Full Description */}
                <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-normal mb-6">
                  {selectedService.desc}
                </p>

                {/* Highlight Callout */}
                <div className="mb-8 rounded-2xl bg-primary/15 border border-primary/30 p-4 text-sm md:text-base font-semibold text-primary flex items-start gap-3 shadow-inner">
                  <Sparkles className="h-5 w-5 shrink-0 mt-0.5 text-primary" />
                  <span className="leading-snug">{selectedService.highlight}</span>
                </div>

                {/* What We Deliver Detailed Checklist */}
                <div className="space-y-3.5 pt-6 border-t border-white/10">
                  <div className="text-xs md:text-sm uppercase tracking-[0.2em] text-primary font-bold mb-4 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    Complete Scope & Deliverables:
                  </div>
                  {selectedService.whatWeDo.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 text-sm md:text-base text-foreground/85 font-medium leading-relaxed"
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Modal Footer */}
                <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Link
                    to={`/services/${selectedService.slug}`}
                    className="text-xs sm:text-sm font-semibold text-primary hover:underline underline-offset-4 inline-flex items-center gap-1.5"
                  >
                    View Dedicated Landing Page &amp; FAQs &rarr;
                  </Link>
                  <button
                    onClick={handleTalkAction}
                    className="hero-btn hero-btn-primary w-full sm:w-auto text-sm px-6 py-2.5 font-semibold inline-flex items-center justify-center gap-2"
                  >
                    Let's Talk About This Scope
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ------------------- CLEAN BOTTOM CTA (NO FORMS) ------------------- */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-transparent via-primary/5 to-transparent relative z-10 border-t border-white/5 text-center">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <div className="text-[13px] uppercase tracking-[0.3em] text-primary font-semibold mb-3">
                ◆ Custom Scope Available
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-tight">
                Let's Build Your <span className="gradient-text">Growth Strategy</span>
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
                We engineer custom channel combinations tailored to your product category, margins, and target growth velocity.
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
                  to="/portfolio"
                  className="hero-btn hero-btn-ghost w-full sm:w-auto text-base px-8 py-3.5 font-semibold"
                >
                  View Our Work
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
