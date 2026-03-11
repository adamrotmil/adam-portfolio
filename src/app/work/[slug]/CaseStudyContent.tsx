"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project, ProjectSection } from "@/data/projects";
import { CONTACT } from "@/data/about";
import { assetPath } from "@/lib/basePath";
import ProgressBar from "@/components/ProgressBar";
import CaseStudyNav from "@/components/CaseStudyNav";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import PullQuote from "@/components/PullQuote";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Counter from "@/components/Counter";
import PhoneFrame from "@/components/PhoneFrame";
import BrowserFrame from "@/components/BrowserFrame";

function RenderSection({ section }: { section: ProjectSection }) {
  switch (section.type) {
    case "text":
      return (
        <section className="max-w-[740px] mx-auto px-[clamp(1.5rem,4vw,4rem)] py-[clamp(2rem,4vh,3rem)]">
          {section.sectionNumber && section.sectionLabel && (
            <SectionLabel
              number={section.sectionNumber}
              title={section.sectionLabel}
            />
          )}
          {section.heading && (
            <Reveal>
              <h2 className="font-serif text-[clamp(1.6rem,3vw,2.3rem)] font-normal leading-[1.2] text-text-primary mb-6">
                {section.heading}
              </h2>
            </Reveal>
          )}
          {section.body?.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="font-sans text-[1.02rem] leading-[1.72] text-text-secondary mb-5">
                {p}
              </p>
            </Reveal>
          ))}
        </section>
      );

    case "quote":
      return (
        <div className="max-w-[740px] mx-auto px-[clamp(1.5rem,4vw,4rem)]">
          <PullQuote>{section.quote}</PullQuote>
        </div>
      );

    case "stats":
      return (
        <section className="bg-bg-card py-[clamp(3rem,6vh,5rem)] px-[clamp(1.5rem,4vw,4rem)]">
          <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {section.stats?.map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <p className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] text-text-primary font-normal leading-none mb-2">
                    <Counter value={s.number} suffix={s.suffix} />
                  </p>
                  <p className="font-sans text-[0.8rem] text-text-muted leading-[1.4]">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      );

    case "images":
      if (!section.images) return null;

      // Phone gallery layout: full screens in device frames on dark background
      if (section.layout === "phone-gallery") {
        return (
          <section className="bg-[#1a1a1c] py-[clamp(3rem,8vh,5rem)] px-[clamp(1.5rem,4vw,4rem)]">
            <div className="max-w-[960px] mx-auto flex flex-col items-center gap-[clamp(2rem,4vw,3rem)] sm:flex-row sm:justify-center sm:items-start">
              {section.images.map((img, i) => (
                <Reveal key={i} delay={i * 0.12}>
                  <div className="w-[240px] sm:flex-1 sm:min-w-0 sm:max-w-[280px] sm:w-auto">
                    <PhoneFrame src={img.src!} alt={img.label} />
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        );
      }

      // Desktop showcase layout: full-width app screenshots in browser frames
      if (section.layout === "desktop-showcase") {
        return (
          <section className="bg-[#1a1a1c] py-[clamp(3rem,8vh,5rem)] px-[clamp(1.5rem,4vw,4rem)]">
            <div className="max-w-[1200px] mx-auto flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
              {section.images.length === 1 && (
                <Reveal>
                  <BrowserFrame
                    src={section.images[0].src!}
                    alt={section.images[0].label}
                  />
                </Reveal>
              )}
              {section.images.length === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1.5rem,3vw,2.5rem)]">
                  {section.images.map((img, i) => (
                    <Reveal key={i} delay={i * 0.12}>
                      <BrowserFrame src={img.src!} alt={img.label} />
                    </Reveal>
                  ))}
                </div>
              )}
              {section.images.length >= 3 && (
                <>
                  <Reveal>
                    <BrowserFrame
                      src={section.images[0].src!}
                      alt={section.images[0].label}
                    />
                  </Reveal>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1.5rem,3vw,2.5rem)]">
                    {section.images.slice(1).map((img, i) => (
                      <Reveal key={i} delay={(i + 1) * 0.1}>
                        <BrowserFrame src={img.src!} alt={img.label} />
                      </Reveal>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        );
      }

      // Photo grid layout: rounded-corner images on dark background, no device frames
      if (section.layout === "photo-grid") {
        return (
          <section className="bg-[#1a1a1c] py-[clamp(3rem,8vh,5rem)] px-[clamp(1.5rem,4vw,4rem)]">
            <div className="max-w-[1200px] mx-auto flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
              {section.images.length === 1 && (
                <Reveal>
                  <ImagePlaceholder
                    height={section.images[0].height || 480}
                    label={section.images[0].label}
                    src={section.images[0].src}
                    objectPosition={section.images[0].objectPosition}
                  />
                </Reveal>
              )}
              {section.images.length === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1.5rem,3vw,2.5rem)]">
                  {section.images.map((img, i) => (
                    <Reveal key={i} delay={i * 0.12}>
                      <ImagePlaceholder
                        height={img.height || 360}
                        label={img.label}
                        src={img.src}
                        objectPosition={img.objectPosition}
                      />
                    </Reveal>
                  ))}
                </div>
              )}
              {section.images.length >= 3 && (
                <>
                  <Reveal>
                    <ImagePlaceholder
                      height={section.images[0].height || 480}
                      label={section.images[0].label}
                      src={section.images[0].src}
                      objectPosition={section.images[0].objectPosition}
                    />
                  </Reveal>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1.5rem,3vw,2.5rem)]">
                    {section.images.slice(1).map((img, i) => (
                      <Reveal key={i} delay={(i + 1) * 0.1}>
                        <ImagePlaceholder
                          height={img.height || 360}
                          label={img.label}
                          src={img.src}
                          objectPosition={img.objectPosition}
                        />
                      </Reveal>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        );
      }

      // Default grid layout
      const imgs = section.images;
      return (
        <div className="max-w-[1200px] mx-auto px-[clamp(1.5rem,4vw,4rem)] py-4">
          {imgs.length === 1 && (
            <Reveal>
              <ImagePlaceholder
                height={imgs[0].height || 480}
                label={imgs[0].label}
                dark={imgs[0].dark}
                src={imgs[0].src}
                objectPosition={imgs[0].objectPosition}
              />
            </Reveal>
          )}
          {imgs.length === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {imgs.map((img, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <ImagePlaceholder
                    height={img.height || 360}
                    label={img.label}
                    dark={img.dark}
                    src={img.src}
                    objectPosition={img.objectPosition}
                  />
                </Reveal>
              ))}
            </div>
          )}
          {imgs.length === 3 && (
            <>
              <Reveal>
                <ImagePlaceholder
                  height={imgs[0].height || 520}
                  label={imgs[0].label}
                  dark={imgs[0].dark}
                  src={imgs[0].src}
                  objectPosition={imgs[0].objectPosition}
                />
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {imgs.slice(1).map((img, i) => (
                  <Reveal key={i} delay={(i + 1) * 0.1}>
                    <ImagePlaceholder
                      height={img.height || 360}
                      label={img.label}
                      dark={img.dark}
                      src={img.src}
                      objectPosition={img.objectPosition}
                    />
                  </Reveal>
                ))}
              </div>
            </>
          )}
          {imgs.length === 4 && (
            <>
              <Reveal>
                <ImagePlaceholder
                  height={imgs[0].height || 540}
                  label={imgs[0].label}
                  dark={imgs[0].dark}
                  src={imgs[0].src}
                  objectPosition={imgs[0].objectPosition}
                />
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                {imgs.slice(1).map((img, i) => (
                  <Reveal key={i} delay={(i + 1) * 0.08}>
                    <ImagePlaceholder
                      height={img.height || 280}
                      label={img.label}
                      dark={img.dark}
                      src={img.src}
                      objectPosition={img.objectPosition}
                    />
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      );

    case "image-text":
      return (
        <section className="max-w-[1200px] mx-auto px-[clamp(1.5rem,4vw,4rem)] py-[clamp(2rem,4vh,3rem)]">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(2rem,4vw,4rem)] items-center"
            style={{
              direction: section.imagePosition === "left" ? "ltr" : "rtl",
            }}
          >
            <Reveal>
              <div style={{ direction: "ltr" }}>
                <ImagePlaceholder
                  height={section.images?.[0]?.height || 480}
                  label={section.images?.[0]?.label || "Project Image"}
                  src={section.images?.[0]?.src}
                  objectPosition={section.images?.[0]?.objectPosition}
                />
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div style={{ direction: "ltr" }}>
                {section.sectionNumber && section.sectionLabel && (
                  <SectionLabel
                    number={section.sectionNumber}
                    title={section.sectionLabel}
                  />
                )}
                {section.heading && (
                  <h2 className="font-serif text-[clamp(1.6rem,3vw,2.3rem)] font-normal leading-[1.2] text-text-primary mb-5">
                    {section.heading}
                  </h2>
                )}
                {section.body?.map((p, i) => (
                  <p
                    key={i}
                    className="font-sans text-[1.02rem] leading-[1.72] text-text-secondary mb-5"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      );

    case "video":
      if (section.layout === "phone-gallery") {
        return (
          <section className="bg-[#1a1a1c] py-[clamp(3rem,8vh,5rem)] px-[clamp(1.5rem,4vw,4rem)]">
            <div className="max-w-[1200px] mx-auto flex justify-center">
              <Reveal>
                <video
                  src={assetPath(section.videoSrc || "")}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="h-auto block max-h-[80vh] rounded-[12px]"
                  style={{ minHeight: "200px" }}
                />
              </Reveal>
            </div>
          </section>
        );
      }
      if (section.layout === "desktop-showcase") {
        return (
          <section className="bg-[#1a1a1c] py-[clamp(3rem,8vh,5rem)] px-[clamp(1.5rem,4vw,4rem)]">
            <div className="max-w-[1200px] mx-auto">
              <Reveal>
                <div className="bg-[#2c2c2e] rounded-[12px] shadow-[0_16px_48px_rgba(0,0,0,0.35)] overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-[#363638]">
                    <div className="flex gap-[6px]">
                      <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
                      <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
                      <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="bg-[#2c2c2e] rounded-md px-4 py-1 text-[11px] text-[#8e8e93] font-sans max-w-[260px] truncate text-center">
                        {section.videoLabel || "Video"}
                      </div>
                    </div>
                    <div className="w-[54px]" />
                  </div>
                  <video
                    src={assetPath(section.videoSrc || "")}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-auto block"
                  />
                </div>
              </Reveal>
            </div>
          </section>
        );
      }
      return (
        <section className="bg-[#1a1a1c]">
          <div className="max-w-[1200px] mx-auto" style={{ aspectRatio: "16/9" }}>
            <Reveal>
              <video
                src={assetPath(section.videoSrc || "")}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-auto block"
              />
            </Reveal>
          </div>
        </section>
      );

    default:
      return null;
  }
}

function NextProject({
  next,
}: {
  next: Project["nextProject"];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/work/${next.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block no-underline py-[clamp(4rem,8vh,6rem)] px-[clamp(1.5rem,4vw,4rem)] transition-colors duration-400"
      style={{
        background: hovered ? "var(--color-bg-card)" : "transparent",
      }}
    >
      <div className="max-w-[1200px] mx-auto flex justify-between items-center border-t border-border pt-12">
        <div>
          <p className="font-sans text-[0.72rem] text-text-muted uppercase tracking-[0.1em] mb-2">
            Next Project
          </p>
          <h3
            className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-normal text-text-primary transition-colors duration-300"
            style={hovered ? { color: "var(--color-text-secondary)" } : {}}
          >
            {next.title}
          </h3>
          <p className="font-sans text-[0.95rem] text-text-muted mt-1">
            {next.subtitle}
          </p>
        </div>
        <span
          className="font-serif text-5xl text-text-muted transition-all duration-400"
          style={{
            transform: hovered ? "translateX(8px)" : "translateX(0)",
            color: hovered
              ? "var(--color-text-primary)"
              : "var(--color-text-muted)",
          }}
        >
          →
        </span>
      </div>
    </Link>
  );
}

export default function CaseStudyContent({ project }: { project: Project }) {
  return (
    <div className="min-h-screen">
      <ProgressBar color={project.color} />
      <CaseStudyNav title={project.title} />

      {/* Hero */}
      <section className="pt-[clamp(6rem,12vh,9rem)]">
        <div className="max-w-[1200px] mx-auto px-[clamp(1.5rem,4vw,4rem)]">
          <Reveal>
            <div className="flex gap-3 flex-wrap mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-sans text-[0.72rem] text-text-muted px-3 py-1.5 border border-border rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="font-serif text-[clamp(3rem,7vw,5.5rem)] font-normal leading-[1.02] text-text-primary tracking-[-0.035em] mb-7 max-w-[900px]">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="font-serif italic text-[clamp(1.2rem,2.5vw,1.65rem)] leading-[1.45] text-text-secondary max-w-[680px] mb-12">
              {project.description}
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-border">
              {project.meta.map((item) => (
                <div key={item.label}>
                  <p className="font-sans text-[0.7rem] text-text-muted uppercase tracking-[0.08em] mb-1.5">
                    {item.label}
                  </p>
                  <p className="font-sans text-[0.92rem] text-text-primary">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Hero image */}
        <Reveal delay={0.3}>
          <div className="max-w-[1200px] mx-auto mt-12 px-[clamp(1.5rem,4vw,4rem)]">
            <ImagePlaceholder
              height={560}
              label={`${project.title} — Hero Shot`}
              dark
              src={project.heroImage}
              objectPosition={project.heroObjectPosition}
            />
          </div>
        </Reveal>
      </section>

      {/* Content sections */}
      <div className="py-[clamp(2rem,4vh,4rem)]">
        {project.sections.map((section, i) => (
          <RenderSection key={i} section={section} />
        ))}
      </div>

      {/* Outcome */}
      <section className="bg-bg-card py-[clamp(4rem,10vh,7rem)] px-[clamp(1.5rem,4vw,4rem)]">
        <div className="max-w-[740px] mx-auto">
          <SectionLabel number="✦" title="Outcome" />
          <Reveal>
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-normal leading-[1.2] text-text-primary mb-6">
              {project.outcome.heading}
            </h2>
          </Reveal>
          {project.outcome.body.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="font-sans text-[1.02rem] leading-[1.72] text-text-secondary mb-5">
                {p}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <div className="flex gap-8 flex-wrap pt-6 border-t border-border mt-8">
              {[
                {
                  label: "My Contribution",
                  items: project.outcome.contributions,
                },
                {
                  label: "Collaborators",
                  items: project.outcome.collaborators,
                },
                { label: "Tools", items: project.outcome.tools },
              ].map((col, i) => (
                <div key={i} className="flex-1 min-w-[180px]">
                  <p className="font-sans text-[0.7rem] text-text-muted/50 uppercase tracking-[0.08em] mb-2">
                    {col.label}
                  </p>
                  {col.items.map((item, j) => (
                    <p
                      key={j}
                      className="font-sans text-[0.85rem] text-text-secondary leading-[1.8]"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-16 px-[clamp(1.5rem,4vw,4rem)]">
        <div className="max-w-[740px] mx-auto text-center">
          <Reveal>
            <h2 className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] font-normal text-text-primary mb-4">
              Interested in working together?
            </h2>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href={`mailto:${CONTACT.email}`}
                className="font-sans text-[0.9rem] text-bg-primary bg-text-primary no-underline px-7 py-3 rounded-lg hover:bg-text-secondary transition-colors"
              >
                Email Me
              </a>
              <a
                href={CONTACT.calendly}
                target="_blank"
                rel="noopener"
                className="font-sans text-[0.9rem] text-text-primary no-underline px-7 py-3 rounded-lg border border-border hover:border-text-muted transition-colors"
              >
                Book a Chat
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <NextProject next={project.nextProject} />

      {/* Footer */}
      <footer className="px-[clamp(1.5rem,4vw,4rem)] max-w-[1200px] mx-auto flex justify-between items-center py-6">
        <span className="font-sans text-xs text-text-muted">
          © 2026 Adam Rotmil
        </span>
        <div className="flex gap-6">
          {["LinkedIn", "GitHub", "Email"].map((link) => (
            <a
              key={link}
              href="#"
              className="font-sans text-xs text-text-muted hover:text-text-primary no-underline transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
