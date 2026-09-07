"use client";

import { useEffect } from "react";

/**
 * Lightweight interactivity after Webflow runtime scripts are stripped.
 * Keeps clone usable for nav/FAQ without reintroducing Barba/GSAP/Three.
 */
export default function CloneEnhancer() {
  useEffect(() => {
    const onClick = (event) => {
      const menuBtn = event.target.closest(
        ".menu-btn, .header-menu-btn, [data-menu-btn], .w-nav-button"
      );
      if (menuBtn) {
        document.documentElement.classList.toggle("menu-open");
        document.body.classList.toggle("menu-open");
        const nav = document.querySelector(
          ".header-menu, .w-nav-menu, .nav-menu, .menu-wrap"
        );
        if (nav) nav.classList.toggle("is-open");
        return;
      }

      const faqBtn = event.target.closest(
        ".home-faq-item, .faq-item, [data-faq-item]"
      );
      if (faqBtn) {
        faqBtn.classList.toggle("is-active");
        faqBtn.classList.toggle("active");
        faqBtn.classList.toggle("open");
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
