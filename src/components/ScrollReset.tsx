import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollReset() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // If there's a hash, scroll to that element
      setTimeout(() => {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // Otherwise reset to top
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
