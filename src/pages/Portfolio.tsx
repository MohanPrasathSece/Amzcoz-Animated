import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { HeroAuroraWaves } from "@/components/hero-effects/HeroAuroraWaves";
import dashboardMockup from "@/assets/floating dashboard.png";
import {
  TrendingUp,
  BarChart3,
  Repeat,
  Store,
  Palette,
  Layers,
  Sparkles,
  ArrowRight,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle,
  FileText,
  ShieldCheck,
  ZoomIn,
  X,
  Lock,
  ShoppingBag,
  Coins,
  Laptop,
  Code2,
} from "lucide-react";

// Client Revenue Proof Screenshots (Marketplaces)
import brand1_1 from "@/assets/data_proof_our_work/brand1-1.jpg";
import brand1_2 from "@/assets/data_proof_our_work/brand1_2.jpg";
import brand2_1 from "@/assets/data_proof_our_work/brand2_1.jpg";
import brand2_2 from "@/assets/data_proof_our_work/brand2_2.jpg";
import brand3_1 from "@/assets/data_proof_our_work/brand3_1.jpg";
import brand3_2 from "@/assets/data_proof_our_work/brand3_2.jpg";
import newReport from "@/assets/data_proof_our_work/new report.png";

// Real Production Showcase: D2C Website Architecture (Drip Diaries)
import dripDashboard from "@/assets/showcase_works/drip_dashboard.jpg";
import dripCmsPages from "@/assets/showcase_works/drip_cms_pages.jpg";
import dripPayments from "@/assets/showcase_works/drip_payments.jpg";
import dripAppearance from "@/assets/showcase_works/drip_appearance.jpg";
import dripHomepageBlocks from "@/assets/showcase_works/drip_homepage_blocks.jpg";
import dripReports from "@/assets/showcase_works/drip_reports.jpg";

// Real Production Showcase: Luxury Brand Identity & Packaging (The Shaykha)
import shaykhaShowcase from "@/assets/showcase_works/shaykha_showcase.png";
import shaykha3dLifestyle from "@/assets/showcase_works/shaykha_3d_lifestyle.png";
import shaykhaPalette from "@/assets/showcase_works/shaykha_palette.png";
import shaykhaSoapSleeve from "@/assets/showcase_works/shaykha_soap_sleeve.jpg";
import shaykhaApparel from "@/assets/showcase_works/shaykha_apparel.png";
import shaykhaTagsSuite from "@/assets/showcase_works/shaykha_tags_suite.jpg";
import shaykhaBodyscrubJar from "@/assets/showcase_works/shaykha_bodyscrub_jar.jpg";
import shaykhaSoapLabel from "@/assets/showcase_works/shaykha_soap_label.jpg";
import shaykhaBodywashLabel from "@/assets/showcase_works/shaykha_bodywash_label.jpg";

/* ------------------- SHOWCASE DELIVERABLES (SEPARATE WEB & BRANDING) ------------------- */
export interface ShowcaseItem {
  id: string;
  title: string;
  categoryTag: string;
  badge: string;
  badgeColor: string;
  image: string;
  objectFit?: "cover" | "contain";
  containerBg?: string;
  imageScale?: string;
}

export const WEBSITE_WORKS: ShowcaseItem[] = [
  {
    id: "web-dashboard",
    title: "Full E-Commerce Admin Dashboard",
    categoryTag: "Live Orders & Revenue Hub · Drip Diaries",
    badge: "Developed by AMZCOZ",
    badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/25",
    image: dripDashboard,
  },
  {
    id: "web-cms",
    title: "Editable Content & Core CMS Engine",
    categoryTag: "WYSIWYG Live Page Builder · 6 Core Pages",
    badge: "Custom CMS",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
    image: dripCmsPages,
  },
  {
    id: "web-payments",
    title: "Multi-Gateway Payment Integration",
    categoryTag: "COD · PhonePe · Razorpay · UPI QR Flow",
    badge: "Payment Stack",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/25",
    image: dripPayments,
  },
  {
    id: "web-appearance",
    title: "Storefront Theme & Color Customizer",
    categoryTag: "Granular Styling & Brand Palette Engine",
    badge: "Theme Controls",
    badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/25",
    image: dripAppearance,
  },
  {
    id: "web-homepage",
    title: "Customize Homepage Blocks",
    categoryTag: "Modular Drag-and-Drop Section Architecture",
    badge: "Modular Layout",
    badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",
    image: dripHomepageBlocks,
  },
  {
    id: "web-reports",
    title: "Merchant Business & GSTR Reports",
    categoryTag: "Real-Time Sales & Tax Breakdowns (GSTR-1 & 3B)",
    badge: "Financial Engine",
    badgeColor: "text-rose-400 bg-rose-500/10 border-rose-500/25",
    image: dripReports,
  },
];

export const BRANDING_WORKS: ShowcaseItem[] = [
  {
    id: "brand-seal",
    title: "The Shaykha · Brand Identity Seal",
    categoryTag: "Luxury Arabic Calligraphy & Heritage Sadu Seal",
    badge: "Crafted by AMZCOZ",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/25",
    image: shaykhaShowcase,
  },
  {
    id: "brand-3d",
    title: "3D Bottle Packshot & Handheld Scale",
    categoryTag: "Photorealistic Glass Modeling & Henna Ritual",
    badge: "3D Packshot",
    badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/25",
    image: shaykha3dLifestyle,
  },
  {
    id: "brand-palette",
    title: "The 6 Sadu Colors System",
    categoryTag: "Heritage Desert & Loom Brand Palette Guidelines",
    badge: "Color Guidelines",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
    image: shaykhaPalette,
  },
  {
    id: "brand-soap-sleeve",
    title: "Luxury Soap Box Sleeve & Belly Band",
    categoryTag: "Embroidered Gold & Sadu Weave Packaging Band",
    badge: "Box Sleeve Packaging",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/25",
    image: shaykhaSoapSleeve,
  },
  {
    id: "brand-apparel",
    title: "Abaya Apparel Branding & Embroidery",
    categoryTag: "Garment Thread Work & Presentation Suite",
    badge: "Garment Branding",
    badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/25",
    image: shaykhaApparel,
  },
  {
    id: "brand-tags-suite",
    title: "Woven Label, Care Tag & Kraft Packaging Suite",
    categoryTag: "Embroidered Woven Patch · Satin Care Label · Kraft Tag",
    badge: "Garment Packaging Suite",
    badgeColor: "text-rose-400 bg-rose-500/10 border-rose-500/25",
    image: shaykhaTagsSuite,
  },
  {
    id: "brand-bodyscrub-jar",
    title: "Body Scrub Luxury Jar & 3D Packshot",
    categoryTag: "Custom Jar Packaging · Embroidered Heritage Label",
    badge: "Cosmetic Packshot",
    badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",
    image: shaykhaBodyscrubJar,
    objectFit: "contain",
    containerBg: "bg-[#cfc8c2]",
    imageScale: "scale-[1.28] group-hover:scale-[1.34]",
  },
  {
    id: "brand-soap-label",
    title: "Oud & Rose Soap Packaging Label",
    categoryTag: "100g Handmade Soap · Textured Kraft & Sadu Weave",
    badge: "Product Label Design",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/25",
    image: shaykhaSoapLabel,
  },
  {
    id: "brand-bodywash-label",
    title: "Arabian Oud Body Wash Label Design",
    categoryTag: "300ml Bottle Decal · Argan & Rose Water Typography",
    badge: "Skincare Packaging",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
    image: shaykhaBodywashLabel,
    objectFit: "contain",
    containerBg: "bg-black",
    imageScale: "scale-[1.18] group-hover:scale-[1.24]",
  },
];

gsap.registerPlugin(ScrollTrigger);

// Dynamically load all brand logo files from src/assets/brands
const BRAND_FILES = import.meta.glob<{ default: string }>(
  "@/assets/brands/*.{png,jpg,jpeg,webp,svg}",
  { eager: true }
);

interface BrandCard {
  name: string;
  category: string;
  src: string;
}

// Map filenames to clean brand names and categories
function formatBrandName(path: string): { name: string; category: string } {
  const clean = path
    .split("/")
    .pop()!
    .replace(/\.[^/.]+$/, "")
    .replace(/[_-]/g, " ");

  const lower = clean.toLowerCase();
  if (lower.includes("akai")) return { name: "AKAI", category: "Consumer Electronics" };
  if (lower.includes("filgap")) return { name: "Filgap", category: "Industrial & Auto" };
  if (lower.includes("gofresh")) return { name: "GoFresh", category: "Health & Nutrition" };
  if (lower.includes("korleone")) return { name: "Korleone", category: "Apparel & Fashion" };
  if (lower.includes("lal gulab")) return { name: "Lal Gulab", category: "Gourmet & FMCG" };
  if (lower.includes("magic paints")) return { name: "Magic Paints", category: "Home & Decor" };
  if (lower.includes("saukhyam")) return { name: "Saukhyam", category: "Sustainable Wellness" };
  if (lower.includes("wit blox")) return { name: "Wit Blox", category: "EdTech & Robotics" };
  if (lower.includes("tresa")) return { name: "Tresa", category: "EV & Hardware" };
  if (lower.includes("veg")) return { name: "Veg-O-Vegan", category: "Plant-Based FMCG" };
  if (lower.includes("zora")) return { name: "ZORA", category: "Luxury Lifestyle" };
  if (lower.includes("nioax")) return { name: "Nioax Coffee", category: "Artisan Coffee" };
  if (lower.includes("moarmouz")) return { name: "Moarmouz", category: "Smart Accessories" };
  if (lower.includes("brown auric")) return { name: "Brown Auric", category: "Ayurvedic Health" };
  if (lower.includes("angel")) return { name: "Angel's & Co", category: "Personal Care" };
  if (lower.includes("waggy")) return { name: "Waggy Zone", category: "Premium Pet Care" };
  if (lower.includes("woof")) return { name: "Woof Ministry", category: "Pet Food & Wellness" };
  if (lower.includes("down the cove")) return { name: "Down The Cove", category: "Organic Beverages" };
  if (lower.includes("innovative")) return { name: "Innovative Edge", category: "Fitness Gear" };
  if (lower.includes("real nutri")) return { name: "Real Nutri Co", category: "Nutraceuticals" };
  if (lower.includes("drip diaries")) return { name: "Drip Diaries", category: "Streetwear & Apparel" };
  if (lower.includes("fairly fresh")) return { name: "Fairly Fresh", category: "Fresh FMCG & Groceries" };
  if (lower.includes("sweet talks")) return { name: "Sweet Talks", category: "Confectionery & Sweets" };
  if (lower.includes("shaykha")) return { name: "The Shaykha", category: "Modest Fashion & Luxury" };
  if (lower.includes("breathen")) return { name: "Breathen", category: "Wellness & Sleep Tech" };
  if (lower.includes("havmi")) return { name: "Havmi", category: "Superfoods & Millet Nutrition" };
  if (lower.includes("hobbyist")) return { name: "Hobbyist Nirvana", category: "Collectibles & Hobby Gear" };
  if (lower.includes("maw and paw")) return { name: "Maw & Paw", category: "Pet Food & Care" };
  if (lower.includes("omprabhat") || lower.includes("om prabhat")) return { name: "Om Prabhat", category: "Gourmet & Traditional FMCG" };

  return {
    name: clean.charAt(0).toUpperCase() + clean.slice(1),
    category: "Marketplace Partner",
  };
}

// Sort so that transparent .png comes before .jpg/.jpeg when deduping by name
const sortedBrandEntries = Object.entries(BRAND_FILES).sort(([pathA], [pathB]) => {
  const aIsPng = pathA.toLowerCase().endsWith(".png");
  const bIsPng = pathB.toLowerCase().endsWith(".png");
  if (aIsPng && !bIsPng) return -1;
  if (!aIsPng && bIsPng) return 1;
  return 0;
});

const BRANDS_LIST: BrandCard[] = sortedBrandEntries.map(([path, mod]) => {
  const { name, category } = formatBrandName(path);
  return {
    name,
    category,
    src: mod.default,
  };
});

// Remove accidental duplicates if same brand has multiple image extensions
const UNIQUE_BRANDS = Array.from(
  new Map(BRANDS_LIST.map((item) => [item.name.toLowerCase(), item])).values()
);

const halfLogos = Math.ceil(UNIQUE_BRANDS.length / 2);
const ROW1_LOGOS = UNIQUE_BRANDS.slice(0, halfLogos);
const ROW2_LOGOS = UNIQUE_BRANDS.slice(halfLogos);

/* ------------------- CLIENT REVENUE PROOF DATA ------------------- */
const PROOF_CASE_STUDIES = [
  {
    id: "case-3",
    tag: "Client Case 01 · Apparel & Daily Essentials",
    badge: "₹1.94 Crores Generated · 6.55x ROAS",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/25",
    headline: "Scaled to ₹1.94 Crores Revenue at 6.55x Blended ROAS",
    subheadline: "High-volume Amazon Sponsored Ads & PPC, dark-store synchronization, and 100% account health across 34,500+ orders.",
    stats: [
      { label: "Total Documented Revenue", value: "₹1,94,02,529" },
      { label: "Peak Month Run Rate", value: "₹31,63,807/mo" },
      { label: "Blended Ad ROAS", value: "6.55x ROAS" },
      { label: "Total Units Delivered", value: "34,517 Units" },
    ],
    highlights: [
      "Scaled catalog from ₹1.7L/mo to ₹31.63L/mo in under 6 months",
      "Maintained razor-sharp 15.28% ACoS across all campaign types",
      "Zero account policy infractions and 0 A-to-z guarantee claims across 34,000+ orders",
    ],
    proofs: [
      {
        src: brand3_1,
        title: "Amazon Seller Central Business Overview",
        caption: "Documented revenue milestone of ₹1,94,02,529.04 across 34,517 fulfilled orders.",
      },
      {
        src: brand3_2,
        title: "Campaign Manager Ad Performance",
        caption: "6.55x blended ROAS and 15.28% ACoS generating ₹33,82,368 in advertising revenue.",
      },
    ],
  },
  {
    id: "case-1",
    tag: "Client Case 02 · FMCG & Wellness",
    badge: "12.5x Monthly Growth",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
    headline: "Scaled from ₹43K/mo to ₹41.5 Lakhs/mo",
    subheadline: "Complete marketplace rebuild, catalog variation architecture, and high-converting ad funnels.",
    stats: [
      { label: "Total Revenue Generated", value: "₹63.9+ Lakhs" },
      { label: "Peak Monthly Run Rate", value: "₹41,54,790" },
      { label: "Total Page Views", value: "407,591" },
      { label: "Units Ordered", value: "2,270+ Items" },
    ],
    highlights: [
      "Catalog restructured from single SKUs to optimized variation families",
      "Organic search placement ranked in top 3 positions for primary keywords",
      "Ad efficiency scaled while maintaining low double-digit ACoS",
    ],
    proofs: [
      {
        src: brand1_1,
        title: "Amazon Business Report · Growth Phase 1",
        caption: "Revenue scaled from ₹43,197/mo to ₹5,39,631/mo (12.5x growth in 10 months).",
      },
      {
        src: brand1_2,
        title: "Amazon Business Report · Growth Phase 2",
        caption: "Peak scaling phase reaching ₹41,54,790.00/month with 407,591 page views.",
      },
    ],
  },
  {
    id: "case-2",
    tag: "Client Case 03 · Consumer Electronics & Accessories",
    badge: "98.6% Buy Box Win Rate",
    badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/25",
    headline: "4.3x Conversion Lift & ₹10.5 Lakhs Scale",
    subheadline: "Automated price surveillance, competitor conquesting, and conversion rate optimization.",
    stats: [
      { label: "Total Revenue Managed", value: "₹10,50,663" },
      { label: "Conversion Rate (Sessions)", value: "1.86% ➔ 8.12%" },
      { label: "Buy Box Retention", value: "98.6% Average" },
      { label: "Ad Sales Generated", value: "₹5,48,929" },
    ],
    highlights: [
      "Unit Session Percentage surged from 1.86% to 8.12% via A+ visual storytelling",
      "Maintained 98.6% to 99% Buy Box share against 10+ third-party reseller listings",
      "Cost-per-click kept at an ultra-efficient ₹12.74 with 786 direct ad orders",
    ],
    proofs: [
      {
        src: brand2_1,
        title: "Seller Central Annual Business Report",
        caption: "Steady revenue growth reaching ₹10,50,663.73 with 98.6% Buy Box win rate.",
      },
      {
        src: brand2_2,
        title: "Amazon Advertising Console Report",
        caption: "₹5,48,929.91 generated from targeted ad spend with ₹12.74 controlled CPC.",
      },
    ],
  },
  {
    id: "case-4",
    tag: "Client Case 04 · FMCG Multi-Channel Expansion",
    badge: "118,000+ Shopper Sessions",
    badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/25",
    headline: "3,668 Units Dispatched with High Basket Value",
    subheadline: "Fast-moving consumable catalog scaling with multi-pack basket building and rapid fulfillment.",
    stats: [
      { label: "6-Month Growth Phase", value: "₹4,04,386" },
      { label: "Units Fulfilled", value: "3,668 Units" },
      { label: "Total Shopper Sessions", value: "118,000+" },
      { label: "Average Item Price", value: "₹108.42" },
    ],
    highlights: [
      "Basket building strategy increased units per transaction",
      "Consistent double-digit month-over-month growth across SKU lines",
    ],
    proofs: [
      {
        src: newReport,
        title: "Recent SKU Growth & Session Audit",
        caption: "Consistent sales velocity across 3,668 orders and 118,000+ prospective buyer sessions.",
      },
    ],
  },
];

/* ------------------- STACKED PROOF CARD COMPONENT ------------------- */
interface StackedProofCardProps {
  cs: (typeof PROOF_CASE_STUDIES)[number];
  index: number;
  total: number;
  onOpenLightbox: (proof: (typeof PROOF_CASE_STUDIES)[number]["proofs"][number]) => void;
  onNextCard?: () => void;
}

function StackedProofCard({
  cs,
  index,
  total,
  onOpenLightbox,
  onNextCard,
}: StackedProofCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const scale = useTransform(scrollYProgress, [0, 1], [isMobile ? 1 : 0.95, 1]);
  const rot = useTransform(scrollYProgress, [0, 1], [isMobile ? 0 : -1, 0]);

  // Proof carousel state: allows flipping between images when case study has > 1 proof
  const [activeProofIdx, setActiveProofIdx] = useState(0);
  const currentProof = cs.proofs[activeProofIdx] || cs.proofs[0];
  const hasMultiple = cs.proofs.length > 1;

  const nextProof = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveProofIdx((prev) => (prev + 1) % cs.proofs.length);
  };

  const prevProof = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveProofIdx((prev) => (prev - 1 + cs.proofs.length) % cs.proofs.length);
  };

  return (
    <div
      id={`proof-case-${index}`}
      ref={cardRef}
      className="relative mb-10 sm:mb-14 lg:mb-0 lg:sticky pb-6 md:pb-12"
      style={{
        zIndex: index + 10,
        // On desktop (lg+), apply sticky offset; on mobile/tablet, it's relative flow so cards never collapse
        ...(typeof window !== "undefined" && window.innerWidth >= 1024
          ? { top: `${92 + index * 24}px`, position: "sticky" as const }
          : { position: "relative" as const }),
      }}
    >
      <div
        className="rounded-3xl border border-white/20 p-5 sm:p-7 md:p-10 shadow-[0_20px_70px_-15px_rgba(0,0,0,0.95)] bg-[#0d101b] overflow-hidden relative group"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/[0.08] blur-[80px] pointer-events-none" />

        {/* Top Header Bar: Tag & Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 sm:pb-5 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-primary shrink-0" />
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              {cs.tag}
            </span>
            <span className="text-white/20 text-xs hidden sm:inline">•</span>
            <span className="font-mono text-[11px] text-primary/80 hidden sm:inline">
              Case 0{index + 1} of 0{total}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs sm:text-[13px] font-semibold border ${cs.badgeColor}`}>
              {cs.badge}
            </span>
          </div>
        </div>

        {/* Main Grid: On Mobile, image sits naturally below stats so full proof is clearly visible */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 pt-5 sm:pt-6 items-stretch relative z-10">
          {/* Left Details (6 cols on lg) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
            <div>
              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                {cs.headline}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {cs.subheadline}
              </p>

              {/* 4 Stat Tiles */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-3 sm:pt-4">
                {cs.stats.map((st) => (
                  <div key={st.label} className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                    <div className="text-[10px] sm:text-[11px] font-mono text-muted-foreground uppercase tracking-wide">
                      {st.label}
                    </div>
                    <div className="font-display text-sm sm:text-base md:text-lg font-bold text-white mt-1">
                      {st.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Optimizations */}
              <div className="space-y-2 pt-4">
                <div className="text-xs uppercase tracking-wider text-primary font-semibold">
                  Key Optimizations Executed
                </div>
                <ul className="space-y-1.5">
                  {cs.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-300">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Page Breakdown & Custom Store Architecture (when available) */}
              {"pageBreakdown" in cs && Array.isArray((cs as any).pageBreakdown) && (
                <div className="pt-3.5 space-y-2 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Custom Built Pages & Admin Modules</span>
                    </span>
                    <span className="text-[11px] text-cyan-300/80 font-mono">
                      {(cs as any).pageBreakdown.length} Core Modules
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
                    {(cs as any).pageBreakdown.map((item: any, pIdx: number) => (
                      <div
                        key={pIdx}
                        className="rounded-xl p-2.5 bg-white/[0.04] border border-white/10 hover:border-cyan-500/40 transition-colors text-left"
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-xs font-bold text-white leading-tight">
                            {item.page}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shrink-0">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Action: Arrow to go to next card */}
            <div className="pt-4 border-t border-white/10 flex items-center">
              {index < total - 1 ? (
                <button
                  type="button"
                  onClick={onNextCard}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:text-white bg-primary/10 hover:bg-primary/25 border border-primary/25 px-5 py-2.5 rounded-xl transition-all duration-200 group/btn cursor-pointer"
                >
                  <span>Next Case Study</span>
                  <ArrowDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-y-0.5" />
                </button>
              ) : (
                <a
                  href="#brands-section"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:text-white bg-primary/10 hover:bg-primary/25 border border-primary/25 px-5 py-2.5 rounded-xl transition-all duration-200"
                >
                  <span>View All Marketplace Brands</span>
                  <ArrowDown className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Clean Proof Image with Arrows Only */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="space-y-2">
              {/* Big Image Container with Carousel Controls */}
              <div
                onClick={() => onOpenLightbox(currentProof)}
                className="group/img relative rounded-2xl overflow-hidden border border-white/20 bg-white/95 cursor-pointer hover:border-primary transition-all duration-200 shadow-xl"
              >
                {/* Big Image with crisp white framing */}
                <div className="aspect-[16/11] sm:aspect-[16/10] max-h-[290px] sm:max-h-[380px] lg:max-h-none w-full overflow-hidden flex items-center justify-center p-3 sm:p-5">
                  <img
                    src={currentProof.src}
                    alt={currentProof.title}
                    className="w-full h-full object-contain rounded filter-none transition-transform duration-200 group-hover/img:scale-[1.01]"
                    loading="eager"
                  />
                </div>

                {/* Next/Prev Carousel Arrows (if multiple proofs) */}
                {hasMultiple && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous proof"
                      onClick={prevProof}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/75 hover:bg-primary text-white border border-white/20 flex items-center justify-center transition-all duration-200 z-20 shadow-lg cursor-pointer"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next proof"
                      onClick={nextProof}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/75 hover:bg-primary text-white border border-white/20 flex items-center justify-center transition-all duration-200 z-20 shadow-lg cursor-pointer"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Dots indicator below image if multiple */}
              {hasMultiple && (
                <div className="flex items-center justify-center gap-2 pt-1">
                  {cs.proofs.map((p, pI) => (
                    <button
                      key={pI}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveProofIdx(pI);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${pI === activeProofIdx ? "w-6 bg-primary" : "w-1.5 bg-white/20 hover:bg-white/40"
                        }`}
                      title={p.title}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All Creative Work");
  const [lightbox, setLightbox] = useState<{ src: string; title: string; caption: string } | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

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
    }, [heroRef]);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <SEO
        title="Client Results & Revenue Proof | ₹2.68 Cr+ Generated | Amzcoz"
        description="Explore documented client sales results: ₹1.94 Cr generated, 6.55x ROAS, 12.5x monthly scale, and 98.6% Buy Box retention across Amazon and Quick Commerce channels."
        canonical="/portfolio"
        keywords="amazon case studies, ecommerce case study india, amazon revenue results, quick commerce brand scaling results, blinkit sales growth case study"
        structuredData={{
          "@type": "CollectionPage",
          "@id": "https://amzcoz.com/portfolio#webpage",
          "url": "https://amzcoz.com/portfolio",
          "name": "AMZCOZ Client Revenue & Growth Proof",
          "description": "Verified client growth metrics and Amazon Seller Central dashboard proofs managed by AMZCOZ.",
          "isPartOf": {
            "@id": "https://amzcoz.com/#website",
          },
        }}
      />
      <main className="relative min-h-screen bg-background text-foreground overflow-x-clip">
        <Navbar />

        {/* ------------------- HERO ------------------- */}
        <section
          ref={heroRef}
          className="relative pt-36 pb-16 md:pt-44 md:pb-24 border-b border-white/5 overflow-hidden"
        >
          {/* Animated WebGL Aurora Waves Effect (Unique to Portfolio) */}
          <HeroAuroraWaves />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="mx-auto max-w-7xl px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full surface-glass px-3 py-1 sm:px-4 sm:py-1.5 text-[10.5px] sm:text-xs md:text-[13px] uppercase tracking-[0.12em] sm:tracking-[0.25em] text-primary font-semibold mb-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Our Work
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
              Featured Work & <span className="gradient-text">Proven Results</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Real verified sales figures, revenue scaling, and advertising performance dashboards from our client portfolio across Amazon and Quick Commerce.
            </motion.p>
          </div>
        </section>

        {/* ------------------- TOP SUMMARY METRICS STRIP ------------------- */}
        <section className="py-10 border-b border-white/5 bg-white/[0.015] relative z-10">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                    ₹2.68 Cr+
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-primary font-medium">Verified Revenue Managed</div>
                </div>
                <div>
                  <div className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                    6.55x
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-primary font-medium">Peak Ad ROAS (15.2% ACoS)</div>
                </div>
                <div>
                  <div className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                    12.5x
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-primary font-medium">Average Monthly Growth</div>
                </div>
                <div>
                  <div className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                    98.6%
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-primary font-medium">Buy-Box Retention Rate</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------- PRIORITIZED CLIENT REVENUE PROOF ------------------- */}
        <section className="py-20 md:py-28 relative z-10 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-6">
            {/* Header */}
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-[13px] uppercase tracking-[0.25em] text-primary font-semibold mb-3">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Verified Client Case Studies</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                  Documented Growth & <span className="gradient-text">Revenue Proof</span>
                </h2>
                <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                  Direct exports from Amazon Seller Central and Advertising Console. Client brand names remain confidential under mutual NDA, but all performance data and revenue figures are 100% authentic.
                </p>
              </div>
            </Reveal>

            {/* Case Studies Cards Stack */}
            <div className="relative pt-6">
              {PROOF_CASE_STUDIES.map((cs, i) => (
                <StackedProofCard
                  key={cs.id}
                  cs={cs}
                  index={i}
                  total={PROOF_CASE_STUDIES.length}
                  onOpenLightbox={setLightbox}
                  onNextCard={() => {
                    const nextEl = document.getElementById(`proof-case-${i + 1}`);
                    if (nextEl) {
                      nextEl.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ------------------- BRANDS WE WORK WITH (SCROLLING MARQUEE) ------------------- */}
        <section id="brands-section" ref={marqueeRef} className="relative z-10 overflow-hidden py-20 md:py-28 border-y border-white/5 bg-white/[0.01]">
          <div className="mx-auto max-w-7xl px-6 text-center mb-12">
            <Reveal>
              <div className="mb-2 text-[13px] uppercase tracking-[0.3em] text-primary font-semibold">
                ◆ Verified Brand Partners
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Brands We <span className="gradient-text">Work With</span>
              </h2>
              <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
                Trusted by 25+ consumer, FMCG, electronics, and lifestyle brands across Amazon and Quick Commerce.
              </p>
            </Reveal>
          </div>

          {/* Two independent continuous marquee rows with brand logos */}
          <div className="flex flex-col gap-3.5 sm:gap-5 overflow-hidden py-2">
            {[ROW1_LOGOS, ROW2_LOGOS].map((rowLogos, rowIndex) => (
              <div
                key={rowIndex}
                className={`${rowIndex === 0 ? "animate-gpu-marquee-left" : "animate-gpu-marquee-right"
                  } animate-gpu-marquee-track flex gap-3.5 sm:gap-5 whitespace-nowrap`}
              >
                {[...rowLogos, ...rowLogos, ...rowLogos, ...rowLogos].map((brand, i) => (
                  <div
                    key={`${rowIndex}-${i}`}
                    title={`${brand.name} • ${brand.category}`}
                    className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-white px-4 py-2 sm:px-6 sm:py-3 border border-white/20 shadow-md hover:shadow-xl hover:border-primary/50 transition-all duration-300 w-40 sm:w-56 h-20 sm:h-26 overflow-hidden group"
                  >
                    <img
                      src={brand.src}
                      alt={brand.name}
                      className="w-full h-full object-contain max-h-[84%] transition-all duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ------------------- SECTION 1: WEBSITE DEVELOPMENT WORK ------------------- */}
        <section id="website-work-section" className="py-20 md:py-28 relative z-10 border-b border-white/5 bg-[#090b14]/70">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-14">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/25 px-3.5 py-1 text-[13px] uppercase tracking-[0.25em] text-blue-400 font-semibold mb-3">
                  <Code2 className="h-4 w-4" />
                  <span>D2C Web & Tech</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                  Website Development <span className="gradient-text">Work</span>
                </h2>
                <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  Custom e-commerce platforms, CMS architectures, and payment integrations built by AMZCOZ.
                </p>
              </div>
            </Reveal>

            {/* Grid of Minimalist Website Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {WEBSITE_WORKS.map((item, idx) => (
                <Reveal key={item.id} delay={(idx % 3) * 0.1}>
                  <div
                    onClick={() =>
                      setLightbox({
                        src: item.image,
                        title: item.title,
                        caption: item.categoryTag,
                      })
                    }
                    className="group rounded-2xl surface-glass border border-white/10 overflow-hidden cursor-pointer hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 flex flex-col"
                  >
                    <div className={`relative aspect-[16/10] overflow-hidden ${item.containerBg || "bg-black/60"}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className={`w-full h-full transition-transform duration-500 ${item.imageScale
                          ? item.imageScale
                          : "group-hover:scale-105"
                          } ${item.objectFit === "contain" ? "object-contain" : "object-cover"
                          }`}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="rounded-full surface-glass border border-white/30 px-3.5 py-1.5 text-xs text-white font-medium flex items-center gap-1.5 shadow-lg">
                          <ZoomIn className="h-3.5 w-3.5 text-primary" />
                          <span>View Image</span>
                        </div>
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className={`rounded-full px-2.5 py-1 text-[10.5px] font-semibold border backdrop-blur-md ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.categoryTag}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------- SECTION 2: BRANDING & PACKAGING WORK ------------------- */}
        <section id="branding-work-section" className="py-20 md:py-28 relative z-10 border-b border-white/5 bg-white/[0.01]">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-14">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/25 px-3.5 py-1 text-[13px] uppercase tracking-[0.25em] text-amber-400 font-semibold mb-3">
                  <Palette className="h-4 w-4" />
                  <span>Identity &amp; Packaging</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                  Branding &amp; Packaging <span className="gradient-text">Work</span>
                </h2>
                <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  Luxury brand identity systems, 3D product visualizations, and tactile packaging crafted by AMZCOZ.
                </p>
              </div>
            </Reveal>

            {/* Grid of Minimalist Branding Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {BRANDING_WORKS.map((item, idx) => (
                <Reveal key={item.id} delay={(idx % 3) * 0.1}>
                  <div
                    onClick={() =>
                      setLightbox({
                        src: item.image,
                        title: item.title,
                        caption: item.categoryTag,
                      })
                    }
                    className="group rounded-2xl surface-glass border border-white/10 overflow-hidden cursor-pointer hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col"
                  >
                    <div className={`relative aspect-[16/10] overflow-hidden ${item.containerBg || "bg-black/60"}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className={`w-full h-full transition-transform duration-500 ${item.imageScale
                          ? item.imageScale
                          : "group-hover:scale-105"
                          } ${item.objectFit === "contain" ? "object-contain" : "object-cover"
                          }`}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="rounded-full surface-glass border border-white/30 px-3.5 py-1.5 text-xs text-white font-medium flex items-center gap-1.5 shadow-lg">
                          <ZoomIn className="h-3.5 w-3.5 text-amber-400" />
                          <span>View Image</span>
                        </div>
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className={`rounded-full px-2.5 py-1 text-[10.5px] font-semibold border backdrop-blur-md ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-display text-lg font-bold text-foreground group-hover:text-amber-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.categoryTag}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------- OUR CREATIVE WORK (4 PILLARS) ------------------- */}
        <section className="py-24 md:py-32 bg-white/[0.015] border-y border-white/5 relative z-10">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="text-[13px] uppercase tracking-[0.3em] text-primary font-semibold mb-3">
                  ◆ Execution Capabilities
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                  Our Creative <span className="gradient-text">Work</span>
                </h2>
                <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  High-converting visual assets and data architecture that transform product listings into irresistible shopping destinations.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pillar 1: Product Infographics & A+ Content */}
                <div className="rounded-3xl surface-glass border border-white/10 p-8 md:p-10 hover:border-primary/40 transition-colors">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary mb-6">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    Product Infographics & A+ Content
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-6">
                    Visual storytelling designed to showcase products and communicate their value. We break down complex specifications into instantly digestible iconography, comparison tables, and benefit-driven lifestyle scenes.
                  </p>
                  <div className="space-y-2.5 pt-4 border-t border-white/5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Conversion-optimized feature callouts & trust badges</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Mobile-first layout formatting for Amazon app shoppers</span>
                    </div>
                  </div>
                </div>

                {/* Pillar 2: Brand Store Design */}
                <div className="rounded-3xl surface-glass border border-white/10 p-8 md:p-10 hover:border-accent/40 transition-colors">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent mb-6">
                    <Store className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    Brand Store Design
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-6">
                    Distinctive storefront experiences built around brand identity. We craft immersive multi-page Amazon Brand Stores with category navigation, video banners, curated sub-collections, and cross-sell modules.
                  </p>
                  <div className="space-y-2.5 pt-4 border-t border-white/5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>Higher Units Per Order (UPO) & cross-category discovery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>Dedicated landing destination for Sponsored Brands campaigns</span>
                    </div>
                  </div>
                </div>

                {/* Pillar 3: Advertising Creatives */}
                <div className="rounded-3xl surface-glass border border-white/10 p-8 md:p-10 hover:border-primary/40 transition-colors">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary mb-6">
                    <Layers className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    Advertising Creatives
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-6">
                    Campaign visuals designed to capture attention and drive engagement. From high-CTR Sponsored Brand video clips to Meta Reels and Google Display retargeting banners that stop scrolling thumbs.
                  </p>
                  <div className="space-y-2.5 pt-4 border-t border-white/5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Sponsored Display & category responsive banner variations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>High-velocity A/B testing on headlines and primary image badges</span>
                    </div>
                  </div>
                </div>

                {/* Pillar 4: Performance Reports */}
                <div className="rounded-3xl surface-glass border border-white/10 p-8 md:p-10 hover:border-accent/40 transition-colors">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent mb-6">
                    <FileText className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    Performance Reports
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-6">
                    Marketplace dashboards showcasing sales, traffic and advertising insights. Clear live metrics so founders and marketing heads see exactly where every rupee of advertising spend went and what net profit it returned.
                  </p>
                  <div className="space-y-2.5 pt-4 border-t border-white/5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>Weekly ROAS, TACoS and blended contribution margin tracking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>Transparent keyword harvesting logs and negative search term audits</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------- BOTTOM CTA ------------------- */}
        <section className="py-24 md:py-32 bg-gradient-to-b from-transparent via-primary/5 to-transparent relative z-10 border-t border-white/5 text-center">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <div className="text-[13px] uppercase tracking-[0.3em] text-primary font-semibold mb-3">
                ◆ Start Your Growth Phase
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Ready to Achieve <span className="gradient-text">Similar Results?</span>
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
                Book a 15-minute diagnostic audit. We will review your product catalog, search ranking, and ad efficiency across Amazon, Blinkit, and Flipkart at zero cost.
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

        {/* ------------------- LIGHTBOX MODAL FOR VERIFIED PROOF IMAGES ------------------- */}
        <AnimatePresence>
          {lightbox && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
              data-lenis-prevent="true"
              onClick={() => setLightbox(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl w-full rounded-3xl bg-[oklch(0.12_0.014_270)] border border-white/20 p-4 sm:p-6 shadow-2xl overflow-hidden"
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div>
                    <h4 className="font-display font-bold text-foreground text-sm sm:text-base">
                      {lightbox.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {lightbox.caption}
                    </p>
                  </div>
                  <button
                    onClick={() => setLightbox(null)}
                    className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-foreground transition-colors shrink-0"
                    aria-label="Close Preview"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="max-h-[80vh] overflow-auto rounded-xl bg-white/95 p-3 sm:p-6 flex items-center justify-center">
                  <img
                    src={lightbox.src}
                    alt={lightbox.title}
                    className="max-h-[75vh] w-auto h-auto object-contain rounded filter-none"
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <Footer />
        <ScrollToTop />
      </main>
    </SmoothScroll>
  );
}
