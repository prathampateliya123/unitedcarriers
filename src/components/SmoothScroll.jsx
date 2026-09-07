"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import "lenis/dist/lenis.css";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getExistingLenis() {
  return window.smoothScroll?.lenis || window.lenis || null;
}

function bindGlobals(instance) {
  window.lenis = instance;
  window.smoothScroll = window.smoothScroll || {};
  window.smoothScroll.lenis = instance;
  document.documentElement.classList.add("uc-smooth-scroll");
}

export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    let lenis = null;
    let rafId = 0;
    let createdByUs = false;
    let cancelled = false;
    let started = false;

    const onAnchorClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      const instance = getExistingLenis();
      if (instance?.scrollTo) {
        instance.scrollTo(target, { offset: -20, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const startOurs = () => {
      if (cancelled || started || getExistingLenis()) {
        const existing = getExistingLenis();
        if (existing) bindGlobals(existing);
        return;
      }
      started = true;

      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.1,
        autoRaf: false,
      });
      createdByUs = true;
      bindGlobals(lenis);

      const raf = (time) => {
        lenis?.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };
      rafId = window.requestAnimationFrame(raf);
    };

    const beginAfterLoader = () => {
      const existing = getExistingLenis();
      if (existing) {
        bindGlobals(existing);
        return;
      }
      // Prefer site runtime Lenis if it appears shortly after loader
      window.setTimeout(() => {
        if (getExistingLenis()) {
          bindGlobals(getExistingLenis());
        } else {
          startOurs();
        }
      }, 300);
    };

    const onLoaderDone = () => beginAfterLoader();

    if (document.documentElement.classList.contains("uc-loader-done")) {
      beginAfterLoader();
    } else {
      window.addEventListener("uc:loader-done", onLoaderDone, { once: true });
      // Safety: if loader event never fires
      window.setTimeout(() => {
        if (!started && !getExistingLenis()) beginAfterLoader();
      }, 22000);
    }

    document.addEventListener("click", onAnchorClick);

    return () => {
      cancelled = true;
      window.removeEventListener("uc:loader-done", onLoaderDone);
      document.removeEventListener("click", onAnchorClick);
      if (rafId) window.cancelAnimationFrame(rafId);
      if (createdByUs && lenis) {
        lenis.destroy();
        if (window.lenis === lenis) delete window.lenis;
        if (window.smoothScroll?.lenis === lenis) {
          delete window.smoothScroll.lenis;
        }
      }
      document.documentElement.classList.remove("uc-smooth-scroll");
    };
  }, []);

  return null;
}
