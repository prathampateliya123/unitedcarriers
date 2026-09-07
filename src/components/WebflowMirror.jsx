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
      if (existing.dataset.loaded === "true") resolve();
      else existing.addEventListener("load", () => resolve(), { once: true });
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

export default function WebflowMirror({ page }) {
  const booted = useRef(false);

  useEffect(() => {
    if (!page || booted.current) return;
    booted.current = true;

    let cancelled = false;
    const failSafe = window.setTimeout(() => {
      document
        .querySelectorAll("[data-init-hidden], [data-init-loader]")
        .forEach((el) => {
          el.style.opacity = "1";
          el.style.visibility = "visible";
          el.removeAttribute("data-init-hidden");
          el.removeAttribute("data-init-loader");
        });
      const loader = document.querySelector(".loader");
      if (loader) loader.style.display = "none";
    }, 10000);

    (async () => {
      try {
        // Ensure Webflow "js" class for interactions
        document.documentElement.classList.add("w-mod-js");
        for (const item of SCRIPT_CHAIN) {
          if (cancelled) return;
          await loadScript(item.src, item.type);
        }
      } catch (error) {
        console.error("[uc-animations]", error);
      } finally {
        window.clearTimeout(failSafe);
      }
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(failSafe);
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
