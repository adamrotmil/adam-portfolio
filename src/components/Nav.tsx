"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Work", href: "#work" },
    { label: "Lab", href: "#lab" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-[clamp(1.5rem,4vw,4rem)]"
      style={{
        background: scrolled ? "rgba(10,10,11,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-[1200px] mx-auto flex justify-between items-center h-16">
        <Link
          href="/"
          className="no-underline flex items-baseline gap-1.5"
        >
          <span className="font-serif text-[1.3rem] text-text-primary font-normal">
            Adam Rotmil
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="no-underline font-sans text-[0.85rem] text-text-muted hover:text-text-primary transition-colors tracking-[0.01em]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.linkedin.com/in/adam-rotmil/"
            target="_blank"
            rel="noopener"
            className="no-underline font-sans text-[0.8rem] text-bg-primary bg-text-primary px-4 py-2 rounded-md hover:bg-text-secondary transition-colors"
          >
            LinkedIn ↗
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-px bg-text-primary transition-transform"
            style={{
              transform: menuOpen
                ? "rotate(45deg) translateY(4px)"
                : "none",
            }}
          />
          <span
            className="block w-5 h-px bg-text-primary transition-opacity"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-px bg-text-primary transition-transform"
            style={{
              transform: menuOpen
                ? "rotate(-45deg) translateY(-4px)"
                : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden pb-6 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="no-underline font-sans text-base text-text-secondary hover:text-text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
