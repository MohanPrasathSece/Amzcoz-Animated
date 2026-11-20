import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "The Agency", href: "/about" },
    { label: "What We Deliver", href: "/services" },
    { label: "Our Work", href: "/portfolio" },
    { label: "Let's Talk", href: "/contact" },
  ];

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function handleContactClick(e: React.MouseEvent) {
    e.preventDefault();
    setMobileOpen(false);
    navigate("/contact");
  }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto mt-3 max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between rounded-full surface-glass px-5 py-2.5 shadow-lg backdrop-blur-xl">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => {
              if (location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-foreground transition hover:opacity-90"
          >
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_16px_var(--color-primary)] animate-pulse" />
            <span>AMZ<span className="text-primary font-extrabold">COZ</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`relative text-[15px] font-medium transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-primary"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleContactClick}
              className="hero-btn hero-btn-primary text-sm px-4.5 py-2 font-medium hidden md:inline-flex"
            >
              Free Audit
              <ArrowRight className="h-3.5 w-3.5 ml-0.5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="p-1.5 text-muted-foreground hover:text-foreground md:hidden transition active:scale-95"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Full-Page Opening Menu - Hardware Accelerated */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            className="fixed inset-0 z-[100] bg-[oklch(0.09_0.012_270)] flex flex-col justify-between p-6 sm:p-10 md:hidden overflow-y-auto"
          >
            {/* Top Bar inside Fullscreen Menu: Logo + Close Button */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-foreground"
              >
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_16px_var(--color-primary)] animate-pulse" />
                <span>
                  AMZ<span className="text-primary font-extrabold">COZ</span>
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-foreground transition active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Links - Large Fullscreen Menu */}
            <nav className="flex flex-col justify-center gap-3 py-6 my-auto">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.href);

                return (
                  <div key={item.label}>
                    <Link
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between py-3 border-b border-white/5 text-2xl sm:text-3xl font-display font-bold transition-colors ${
                        isActive
                          ? "text-primary pl-2 border-primary/40"
                          : "text-foreground/85 hover:text-foreground hover:pl-2"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight className={`h-5 w-5 ${isActive ? "text-primary" : "opacity-40"}`} />
                    </Link>
                  </div>
                );
              })}
            </nav>

            {/* Bottom Footer Details */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <button
                onClick={handleContactClick}
                className="hero-btn hero-btn-primary w-full py-3.5 text-base font-semibold flex items-center justify-center gap-2 shadow-xl"
              >
                <span>Book Free Strategy Session</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground pt-2">
                <a href="tel:+918007208742" className="hover:text-primary transition font-medium">
                  +91 80072 08742
                </a>
                <a href="mailto:adnan@amzcoz.com" className="hover:text-primary transition font-medium">
                  adnan@amzcoz.com
                </a>
                <span>Pune, India</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
