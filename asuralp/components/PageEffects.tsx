"use client";

import { useEffect } from "react";

export default function PageEffects() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.reveal-center)"),
    );
    const centerNodes = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal-center"),
    );

    if (nodes.length === 0 && centerNodes.length === 0) {
      return;
    }

    const createRevealObserver = (options: IntersectionObserverInit) =>
      new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("in");
          currentObserver.unobserve(entry.target);
        });
      }, options);

    const observer = createRevealObserver({ threshold: 0.12 });

    nodes.forEach((node) => observer.observe(node));

    let frameId = 0;

    const revealCenteredNodes = () => {
      const viewportCenter = window.innerHeight / 2;
      const triggerBand = Math.max(window.innerHeight * 0.06, 28);

      centerNodes.forEach((node) => {
        if (node.classList.contains("in")) {
          return;
        }

        const rect = node.getBoundingClientRect();
        const nodeCenter = rect.top + rect.height / 2;

        if (Math.abs(nodeCenter - viewportCenter) > triggerBand) {
          return;
        }

        node.classList.add("in");
      });
    };

    const scheduleCenteredReveal = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        revealCenteredNodes();
      });
    };

    revealCenteredNodes();
    window.addEventListener("scroll", scheduleCenteredReveal, { passive: true });
    window.addEventListener("resize", scheduleCenteredReveal);

    return () => {
      observer.disconnect();
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", scheduleCenteredReveal);
      window.removeEventListener("resize", scheduleCenteredReveal);
    };
  }, []);

  return null;
}
