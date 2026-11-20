import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { ScrollReset } from "./components/ScrollReset";
import LandingPage from "./pages/Home";
import AboutPage from "./pages/About";
import ServicesPage from "./pages/Services";
import PortfolioPage from "./pages/Portfolio";
import ContactPage from "./pages/Contact";
import PrivacyPage from "./pages/Privacy";
import TermsPage from "./pages/Terms";
import ShippingPage from "./pages/Shipping";
import NotFoundPage from "./pages/NotFound";

export default function App() {
  return (
    <>
      <ScrollReset />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "oklch(0.14 0.014 270)",
            color: "oklch(0.98 0.005 100)",
            border: "1px solid oklch(1 0 0 / 8%)",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
