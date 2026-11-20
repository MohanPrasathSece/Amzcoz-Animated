import { Link } from "react-router-dom";

export function Footer() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "The Agency", href: "/about" },
    { label: "What We Deliver", href: "/services" },
    { label: "Our Work", href: "/portfolio" },
    { label: "Let's Talk", href: "/contact" },
  ];

  return (
    <footer className="relative z-10 border-t border-white/5 bg-background/80 backdrop-blur-md overflow-hidden">
      {/* Massive Edge-to-Edge Architectural AMZCOZ Typography */}
      <div className="w-full border-b border-white/5 pt-8 sm:pt-12 md:pt-16 pb-4 sm:pb-6 md:pb-8 flex items-center justify-center overflow-hidden select-none pointer-events-none">
        <h2 className="font-display font-black uppercase tracking-tighter text-[18.5vw] leading-[0.8] text-center whitespace-nowrap block w-full text-transparent bg-clip-text bg-gradient-to-b from-white/[0.18] via-white/[0.08] to-white/[0.01]">
          AMZCOZ
        </h2>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/5">
          {/* Brand Info */}
          <div className="max-w-md">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight text-foreground transition hover:opacity-90"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)]" />
              <span>AMZ<span className="text-primary font-extrabold">COZ</span></span>
            </Link>
            <p className="mt-2.5 text-xs md:text-sm text-muted-foreground leading-relaxed">
              Full-stack marketplace management and quick commerce growth agency. Engineering category leaders on Amazon, Blinkit, Zepto, and beyond.
            </p>
          </div>

          {/* Clean Navigation Links */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-xs md:text-sm text-muted-foreground transition hover:text-foreground font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Direct Contact */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 text-xs md:text-sm">
            <a
              href="mailto:adnan@amzcoz.com"
              className="text-foreground/90 hover:text-primary transition font-medium"
            >
              adnan@amzcoz.com
            </a>
            <a
              href="tel:+918007208742"
              className="text-foreground/90 hover:text-primary transition font-mono"
            >
              +91 80072 08742
            </a>
            <span className="text-muted-foreground/80 text-[11px] md:text-xs">
              Pune, Maharashtra · India
            </span>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] md:text-xs text-muted-foreground/75">
          <div>© {new Date().getFullYear()} AMZCOZ. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <Link to="/privacy" className="hover:text-foreground transition">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-foreground transition">Terms & Conditions</Link>
            <span>•</span>
            <Link to="/shipping" className="hover:text-foreground transition">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}