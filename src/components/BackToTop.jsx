"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getScrollY = () => {
      const lenis = window.smoothScroll?.lenis || window.lenis;
      if (lenis && typeof lenis.scroll === "number") return lenis.scroll;
      return window.scrollY || document.documentElement.scrollTop || 0;
    };

    const onScroll = () => setVisible(getScrollY() > 480);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const lenis = window.smoothScroll?.lenis || window.lenis;
    if (lenis?.on) lenis.on("scroll", onScroll);

    const timer = window.setInterval(() => {
      const latest = window.smoothScroll?.lenis || window.lenis;
      if (latest?.on) {
        latest.on("scroll", onScroll);
        window.clearInterval(timer);
      }
    }, 500);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearInterval(timer);
      const current = window.smoothScroll?.lenis || window.lenis;
      if (current?.off) current.off("scroll", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    const lenis = window.smoothScroll?.lenis || window.lenis;
    if (lenis?.scrollTo) {
      lenis.scrollTo(0, { duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 3) });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      className={`uc-back-to-top${visible ? " is-visible" : ""}`}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M9 14.5V3.5M9 3.5L4 8.5M9 3.5L14 8.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="square"
        />
      </svg>
    </button>
  );
}
