import { useEffect, useRef } from "react";

/**
 * Scroll-triggered staggered reveal using IntersectionObserver.
 * Attach `ref` to a container; children with `data-reveal` get animated in sequence.
 */
export const useReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll("[data-reveal]");
    children.forEach((child) => {
      (child as HTMLElement).style.opacity = "0";
      (child as HTMLElement).style.transform = "translateY(40px)";
      (child as HTMLElement).style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll("[data-reveal]");
            items.forEach((item, i) => {
              setTimeout(() => {
                (item as HTMLElement).style.opacity = "1";
                (item as HTMLElement).style.transform = "translateY(0)";
              }, i * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
};
