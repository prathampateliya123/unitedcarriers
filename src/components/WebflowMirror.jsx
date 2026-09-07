"use client";

import { useEffect, useRef } from "react";

const SCRIPT_CHAIN = [
  { src: "/js/jquery-3.5.1.min.dc5e7f18c8.js" },
  { src: "/js/webflow.schunk.7a143ecb35f54dba.js" },
  { src: "/js/webflow.schunk.ebd01c7a24c3f681.js" },
  { src: "/js/webflow.9d979e0d.ce21502f658531f1.js" },
  { src: "/js/main.js", type: "module" },
];

function loadScript(src, type) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-uc-src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(src)), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.dataset.ucSrc = src;
    if (type) script.type = type;
    script.async = false;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

function revealContentFallback() {
  document
    .querySelectorAll("[data-init-hidden], [data-init-loader]")
    .forEach((el) => {
      el.style.opacity = "1";
      el.style.visibility = "visible";
      el.removeAttribute("data-init-hidden");
      el.removeAttribute("data-init-loader");
    });
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
    loader.style.visibility = "hidden";
  }
  document.documentElement.classList.add("uc-loader-done");
  window.dispatchEvent(new CustomEvent("uc:loader-done"));
}

function watchLoaderDone() {
  const loader = document.querySelector(".loader");
  if (!loader) {
    document.documentElement.classList.add("uc-loader-done");
    window.dispatchEvent(new CustomEvent("uc:loader-done"));
    return () => {};
  }

  const check = () => {
    const style = window.getComputedStyle(loader);
    const opacity = Number.parseFloat(style.opacity || "1");
    const hidden =
      style.display === "none" ||
      style.visibility === "hidden" ||
      opacity < 0.05 ||
      loader.style.pointerEvents === "none";

    if (hidden || sessionStorage.getItem("isLoaded") === "true") {
      // Give exit animation a moment, then unlock scroll helpers
      window.setTimeout(() => {
        document.documentElement.classList.add("uc-loader-done");
        window.dispatchEvent(new CustomEvent("uc:loader-done"));
      }, 200);
      return true;
    }
    return false;
  };

  if (check()) return () => {};

  const timer = window.setInterval(() => {
    if (check()) window.clearInterval(timer);
  }, 200);

  const hardStop = window.setTimeout(() => {
    window.clearInterval(timer);
    if (!document.documentElement.classList.contains("uc-loader-done")) {
      revealContentFallback();
    }
  }, 20000);

  return () => {
    window.clearInterval(timer);
    window.clearTimeout(hardStop);
  };
}

export default function WebflowMirror({ page }) {
  const booted = useRef(false);

  useEffect(() => {
    if (!page || booted.current) return;
    booted.current = true;

    let cancelled = false;
    let stopWatch = () => {};

    // Force the FULL first-visit home loader (countries/services/progress)
    try {
      sessionStorage.removeItem("isLoaded");
    } catch {
      // ignore
    }

    document.documentElement.classList.add("uc-booting");
    document.documentElement.classList.remove("uc-loader-done");

    // Keep Webflow/Barba animation boot reliable: use full page loads
    const onClick = (event) => {
      const anchor = event.target.closest("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }
      if (
        anchor.target === "_blank" ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey
      ) {
        return;
      }
      try {
        const url = new URL(href, window.location.origin);
        if (url.origin === window.location.origin) {
          event.preventDefault();
          window.location.assign(url.href);
        }
      } catch {
        // ignore invalid urls
      }
    };
    document.addEventListener("click", onClick);

    (async () => {
      try {
        document.documentElement.classList.add("w-mod-js", "w-mod-ix");
        for (const item of SCRIPT_CHAIN) {
          if (cancelled) return;
          await loadScript(item.src, item.type);
        }
        if (!cancelled) stopWatch = watchLoaderDone();
      } catch (error) {
        console.error("[uc-animations]", error);
        revealContentFallback();
      } finally {
        document.documentElement.classList.remove("uc-booting");
      }
    })();

    return () => {
      cancelled = true;
      stopWatch();
      document.removeEventListener("click", onClick);
    };
  }, [page]);

  if (!page) {
    return (
      <div style={{ padding: 40, fontFamily: "sans-serif" }}>
        Page content not found.
      </div>
    );
  }

  return (
    <>
      {page.styles?.map((css, index) => (
        <style
          key={`${page.key}-style-${index}`}
          dangerouslySetInnerHTML={{ __html: css }}
        />
      ))}
      <div
        className="uc-webflow-mirror"
        dangerouslySetInnerHTML={{ __html: page.body }}
      />
    </>
  );
}
