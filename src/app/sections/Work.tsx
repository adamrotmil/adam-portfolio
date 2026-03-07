"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { PROJECTS } from "@/data/projects";
import { assetPath } from "@/lib/basePath";

function CaseStudyCard({
  study,
  index,
}: {
  study: (typeof PROJECTS)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal
      delay={index * 0.08}
      className={study.featured ? "col-span-full" : ""}
    >
      <Link
        href={`/work/${study.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="block no-underline rounded-xl overflow-hidden transition-all duration-400"
        style={{
          background: "#141415",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 12px 40px rgba(0,0,0,0.3)"
            : "0 2px 12px rgba(0,0,0,0.1)",
        }}
      >
        {/* Project thumbnail */}
        <div
          className="w-full flex items-center justify-center relative overflow-hidden"
          style={{
            height: study.featured ? 420 : 300,
            background: `linear-gradient(135deg, ${study.color}15, ${study.color}08)`,
          }}
        >
          {study.thumbnail ? (
            <img
              src={assetPath(study.thumbnail)}
              alt={`${study.title} — ${study.subtitle}`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
              style={{
                transform: hovered ? "scale(1.03)" : "scale(1)",
              }}
            />
          ) : (
            <>
              <div
                className="absolute inset-0 transition-opacity duration-400"
                style={{
                  background: `linear-gradient(135deg, ${study.color}0a, ${study.color}20)`,
                  opacity: hovered ? 1 : 0.5,
                }}
              />
              <span className="font-sans text-[0.8rem] text-text-muted/30 tracking-[0.05em] uppercase z-10">
                Project Image
              </span>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-6 pb-7">
          <div className="flex justify-between items-baseline mb-2">
            <h3 className="font-serif text-2xl font-normal text-text-primary">
              {study.title}
            </h3>
            <span className="font-sans text-[0.78rem] text-text-muted hidden sm:inline">
              {study.subtitle}
            </span>
          </div>
          <p className="font-sans text-[0.92rem] leading-[1.6] text-text-secondary mb-4">
            {study.description}
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="font-sans text-[0.7rem] text-text-muted px-2 py-1 border border-border rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export default function Work() {
  return (
    <section
      id="work"
      className="px-[clamp(1.5rem,4vw,4rem)] pb-[clamp(4rem,8vh,7rem)] max-w-[1200px] mx-auto"
    >
      <Reveal>
        <div className="flex justify-between items-baseline mb-10 border-t border-border pt-8">
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] font-normal text-text-primary">
            Selected Work
          </h2>
          <span className="font-sans text-[0.8rem] text-text-muted">
            {PROJECTS.length} case studies
          </span>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((study, i) => (
          <CaseStudyCard key={study.slug} study={study} index={i} />
        ))}
      </div>
    </section>
  );
}
