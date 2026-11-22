import { Link } from "react-router-dom";

export function Footer() {
  const marketplaceLinks = [
    { label: "Marketplace Management", href: "/services/marketplace-account-management" },
    { label: "Amazon Account Management", href: "/services/amazon-account-management" },
    { label: "Quick Commerce Growth", href: "/services/quick-commerce-growth" },
    { label: "Blinkit Growth Services", href: "/services/blinkit-growth-services" },
    { label: "Zepto Growth Services", href: "/services/zepto-growth-services" },
    { label: "Flipkart Account Management", href: "/services/flipkart-account-management" },
    { label: "Meesho Management", href: "/services/meesho-marketplace-management" },
    { label: "Swiggy Instamart Growth", href: "/services/swiggy-instamart-growth" },
  ];

  const advertisingLinks = [
    { label: "Amazon PPC Management", href: "/services/amazon-ppc-management" },
    { label: "Marketplace Advertising", href: "/services/marketplace-advertising" },
    { label: "TikTok Ads & TikTok Shop", href: "/services/tiktok-ads-marketing" },
    { label: "Snapchat Ads Agency", href: "/services/snapchat-ads-marketing" },
    { label: "Google Ads & Shopping", href: "/services/google-ads-shopping" },
    { label: "Meta & Social Ads", href: "/services/social-media-meta-ads" },
    { label: "Review & Sentiment Defense", href: "/services/review-sentiment-defense" },
    { label: "FMCG Growth Marketing", href: "/services/fmcg-marketing" },
  ];

  const designTechLinks = [
    { label: "A+ Content & Brand Store", href: "/services/aplus-content-brand-store" },
    { label: "Graphic Design & Merchandising", href: "/services/graphic-design-merchandising" },
    { label: "Custom Website Development", href: "/services/website-development" },
    { label: "Shopify & WooCommerce", href: "/services/shopify-woocommerce-development" },
    { label: "Influencer Marketing", href: "/services/influencer-marketing" },
    { label: "All Agency Capabilities", href: "/services" },
  ];

  const agencyLinks = [
    { label: "Home", href: "/" },
    { label: "The Agency", href: "/about" },
    { label: "Our Work & Case Studies", href: "/portfolio" },
    { label: "Let's Talk", href: "/contact" },
  ];

  return (
    <footer className="relative z-10 border-t border-white/5 bg-background/80 backdrop-blur-md overflow-hidden">
      {/* Architectural AMZCOZ Typography */}
      <div className="w-full border-b border-white/5 pt-8 sm:pt-12 md:pt-16 pb-4 sm:pb-6 md:pb-8 flex items-center justify-center overflow-hidden select-none pointer-events-none">
        <h2 className="font-display font-black uppercase tracking-tighter text-[18.5vw] leading-[0.8] text-center whitespace-nowrap block w-full text-transparent bg-clip-text bg-gradient-to-b from-white/[0.18] via-white/[0.08] to-white/[0.01]">
          AMZCOZ
        </h2>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {/* Brand Summary Row */}
        <div className="pb-10 border-b border-white/5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight text-foreground transition hover:opacity-90"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)]" />
              <span>AMZ<span className="text-primary font-extrabold">COZ</span></span>
            </Link>
            <p className="mt-2.5 text-xs md:text-sm text-muted-foreground leading-relaxed">
              Full-service marketplace management, quick commerce growth, and multi-channel e-commerce agency. Headquartered in Pune, Maharashtra, driving market leadership across India, UAE, and Kuwait.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs md:text-sm">
            <div className="flex flex-col">
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Headquarters</span>
              <span className="text-foreground font-medium">Pune, Maharashtra · India</span>
            </div>
            <div className="hidden sm:block h-8 w-px bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Direct Line</span>
              <a href="tel:+918007208742" className="text-foreground hover:text-primary transition font-mono">
                +91 80072 08742
              </a>
            </div>
          </div>
        </div>

        {/* Crawlable Multi-Column Sitemap */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-b border-white/5 text-xs md:text-sm">
          {/* Column 1 */}
          <div>
            <h3 className="font-semibold text-foreground uppercase tracking-wider text-[11px] mb-3.5 text-primary">
              Marketplaces & Q-Commerce
            </h3>
            <ul className="space-y-2">
              {marketplaceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition leading-relaxed block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold text-foreground uppercase tracking-wider text-[11px] mb-3.5 text-primary">
              Advertising & Performance
            </h3>
            <ul className="space-y-2">
              {advertisingLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition leading-relaxed block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold text-foreground uppercase tracking-wider text-[11px] mb-3.5 text-primary">
              Creative & D2C Tech
            </h3>
            <ul className="space-y-2">
              {designTechLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition leading-relaxed block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-semibold text-foreground uppercase tracking-wider text-[11px] mb-3.5 text-primary">
              The Agency & Regions
            </h3>
            <ul className="space-y-2 mb-6">
              {agencyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition leading-relaxed block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-white/5 text-[11px] text-muted-foreground/80 leading-relaxed">
              <span className="font-semibold text-foreground/90 block mb-1">Key Service Geographies:</span>
              Pune, Mumbai, Bengaluru, Delhi NCR, Hyderabad, Chennai, UAE (Dubai), Kuwait, and international marketplaces.
            </div>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] md:text-xs text-muted-foreground/75">
          <div>© {new Date().getFullYear()} AMZCOZ. All rights reserved. Full-Service E-Commerce &amp; Quick Commerce Agency.</div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <Link to="/privacy" className="hover:text-foreground transition">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-foreground transition">Terms &amp; Conditions</Link>
            <span>•</span>
            <Link to="/shipping" className="hover:text-foreground transition">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
