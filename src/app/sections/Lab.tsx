"use client";

import Reveal from "@/components/Reveal";
import { LAB_ITEMS } from "@/data/about";

export default function Lab() {
  return (
    <section
      id="lab"
      className="py-[clamp(4rem,8vh,7rem)] px-[clamp(1.5rem,4vw,4rem)] max-w-[1200px] mx-auto"
    >
      <Reveal>
        <div className="flex justify-between items-baseline mb-8 border-t border-border pt-8">
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] font-normal text-text-primary">
            Lab
          </h2>
          <a
            href="https://github.com/adamrotmil"
            target="_blank"
            rel="noopener"
            className="font-sans text-[0.8rem] text-text-muted no-underline hover:text-text-primary transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </Reveal>

      <Reveal>
        <p className="font-sans text-base text-text-secondary leading-[1.6] max-w-[520px] mb-8">
          Experiments in code, design, and AI. Small interactive pieces that
          explore ideas I&#x2019;m curious about — built with Claude, shipped to
          GitHub.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {LAB_ITEMS.map((item, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div
              className="p-6 rounded-[10px] min-h-[180px] flex flex-col justify-between transition-transform duration-300 cursor-default"
              style={{
                background: item.url ? "#f5f5f5" : "#141415",
                cursor: item.url ? "pointer" : "default",
              }}
              onMouseEnter={(e) => {
                if (item.url)
                  e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
              onClick={() => {
                if (item.url) window.open(item.url, "_blank");
              }}
            >
              <div>
                <h4
                  className="font-serif text-[1.2rem] font-normal mb-1.5"
                  style={{
                    color: item.url ? "#1a1a1a" : "var(--color-text-muted)",
                  }}
                >
                  {item.title}
                </h4>
                <p
                  className="font-sans text-[0.85rem] leading-[1.5]"
                  style={{
                    color: item.url
                      ? "rgba(0,0,0,0.55)"
                      : "var(--color-text-muted)",
                  }}
                >
                  {item.description}
                </p>
              </div>
              <p
                className="font-sans text-[0.72rem] mt-4"
                style={{
                  color: item.url
                    ? "rgba(0,0,0,0.35)"
                    : "var(--color-text-muted)",
                }}
              >
                {item.tech}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
