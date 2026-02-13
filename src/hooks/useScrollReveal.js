import { useLayoutEffect } from "react";

export default function useScrollReveal() {
  useLayoutEffect(() => {
    const elements = Array.from(document.querySelectorAll("[data-reveal], .section-heading"));
    if (elements.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => {
              entry.target.classList.add("in-view");
            }, 70);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -12% 0px" }
    );

    elements.forEach((el) => {
      const section = el.closest("section");
      const localItems = section
        ? Array.from(section.querySelectorAll("[data-reveal], .section-heading"))
        : elements;
      const localIndex = Math.max(localItems.indexOf(el), 0);
      const isHeading = el.classList.contains("section-heading");
      const delaySeconds = isHeading ? 0 : 0.08 + Math.max(0, localIndex - 1) * 0.05;

      el.classList.add("reveal-item");
      el.style.setProperty("--reveal-delay", `${Math.min(delaySeconds, 0.24)}s`);
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      elements.forEach((el) => {
        el.classList.remove("reveal-item", "in-view");
        el.style.removeProperty("--reveal-delay");
      });
    };
  }, []);
}
