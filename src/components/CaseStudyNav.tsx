"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CaseStudyNav({ title }: { title: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className="fixed top-[3px] left-0 right-0 z-[150] transition-all duration-[350ms] px-[clamp(1.5rem,4vw,4rem)]"
      style={{
        background: scrolled ? "rgba(10,10,11,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-[1200px] mx-auto flex justify-between items-center h-[60px]">
        <Link
          href="/#work"
          className="no-underline font-sans text-[0.82rem] text-text-muted hover:text-text-primary transition-colors flex items-center gap-2"
        >
          <span className="text-lg">←</span> All Work
        </Link>
        <span
          className="font-serif text-base text-text-primary transition-opacity duration-300"
          style={{ opacity: scrolled ? 1 : 0 }}
        >
          {title}
        </span>
        <a
          href="#contact"
          className="no-underline font-sans text-[0.82rem] text-text-muted hover:text-text-primary transition-colors"
        >
          Get in Touch
        </a>
      </div>
    </nav>
  );
}
