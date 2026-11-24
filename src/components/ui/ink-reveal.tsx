"use client";

import { useEffect } from "react";

/**
 * Trace les surlignages et soulignements à leur arrivée à l'écran.
 * Sans JavaScript, ils sont simplement affichés.
 */
export function InkReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          target.classList.toggle("ink-pending", !isIntersecting);
          if (isIntersecting) observer.unobserve(target);
        });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    document.querySelectorAll("mark, u, .line").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
