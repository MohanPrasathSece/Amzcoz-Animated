import { useEffect } from "react";

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogType?: "website" | "article" | "profile";
  ogImage?: string;
  noindex?: boolean;
  structuredData?: Record<string, any> | Record<string, any>[];
}

const DEFAULT_IMAGE = "https://amzcoz.com/og-image.jpg";
const SITE_NAME = "AMZCOZ";
const DOMAIN = "https://amzcoz.com";

export function SEO({
  title,
  description,
  canonical,
  keywords,
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  noindex = false,
  structuredData,
}: SEOProps) {
  useEffect(() => {
    // 1. Page Title
    const fullTitle = title.includes("AMZCOZ") ? title : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    // Helper to update or create meta tags
    const setMeta = (nameAttr: "name" | "property", nameValue: string, content: string) => {
      let el = document.querySelector(`meta[${nameAttr}="${nameValue}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(nameAttr, nameValue);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // 2. Standard Meta Tags
    setMeta("name", "description", description);
    if (keywords) {
      setMeta("name", "keywords", keywords);
    }
    setMeta(
      "name",
      "robots",
      noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    // 3. Canonical URL
    const canonicalUrl = canonical ? (canonical.startsWith("http") ? canonical : `${DOMAIN}${canonical}`) : window.location.href.split("?")[0];
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", canonicalUrl);

    // 4. OpenGraph Tags
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:locale", "en_IN");

    // 5. Twitter Card Tags
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:site", "@amzcoz");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // 6. Structured Data (JSON-LD)
    const scriptId = "page-structured-data";
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    if (structuredData) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.text = JSON.stringify(
        Array.isArray(structuredData)
          ? {
              "@context": "https://schema.org",
              "@graph": structuredData,
            }
          : {
              "@context": "https://schema.org",
              ...structuredData,
            }
      );
      document.head.appendChild(script);
    }

    return () => {
      const dynamicScript = document.getElementById(scriptId);
      if (dynamicScript) {
        dynamicScript.remove();
      }
    };
  }, [title, description, canonical, keywords, ogType, ogImage, noindex, structuredData]);

  return null;
}
