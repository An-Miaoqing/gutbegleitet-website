import { useLayoutEffect, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    // Ensure the new page is positioned at the top before paint.
    // Temporarily disable any smooth scroll behavior set via CSS.
    try {
      const docEl = document.documentElement;
      const prev = docEl.style.scrollBehavior;
      docEl.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      // Restore previous behavior after a tick
      setTimeout(() => {
        docEl.style.scrollBehavior = prev;
      }, 0);
    } catch (e) {
      // noop in environments without a window/document
    }
  }, [pathname]);

  useEffect(() => {
    // Prevent the browser from restoring scroll on navigation
    try {
      if ("scrollRestoration" in window.history) {
        const prev = window.history.scrollRestoration;
        window.history.scrollRestoration = "manual";
        return () => {
          window.history.scrollRestoration = prev;
        };
      }
    } catch (e) {
      // noop
    }
  }, []);

  return null;
}
