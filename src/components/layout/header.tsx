"use client";

import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { navigation } from "@/content/profile";

/** Ligne de l'écran, sous l'en-tête, où l'on regarde quelle section défile. */
const PROBE_Y = 40;

function isOverDarkSection() {
  return Array.from(document.querySelectorAll("[data-theme='dark']")).some((section) => {
    const { top, bottom } = section.getBoundingClientRect();
    return top < PROBE_Y && bottom > PROBE_Y;
  });
}

export function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const update = () => {
      setIsDark(isOverDarkSection());
      setIsScrolled(scrollY > 10);
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);

  const closeMenu = () => menuRef.current?.removeAttribute("open");
  const links = navigation.map(({ href, label }) => (
    <li key={href}>
      <a href={href} onClick={closeMenu}>
        {label}
      </a>
    </li>
  ));

  return (
    <header className={`site-header ${isDark ? "dark" : ""} ${isScrolled ? "scrolled" : ""}`}>
      <div className="wrap">
        <a className="name" href="#contenu">
          Rayan <b>Rimane</b>
        </a>
        <nav className="wide-nav" aria-label="Navigation principale">
          <ul>{links}</ul>
        </nav>
        <div className="flex items-center gap-3">
          <ButtonLink href="#contact" variant="small">
            Me contacter
          </ButtonLink>
          <details className="menu" ref={menuRef}>
            <summary>Menu</summary>
            <nav aria-label="Navigation mobile">
              <ul>
                {links}
                <li>
                  <a href="#contact" onClick={closeMenu}>
                    Me contacter
                  </a>
                </li>
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
