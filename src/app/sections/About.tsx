import Reveal from "@/components/Reveal";
import { BIO, EXPERIENCE, CREDENTIALS } from "@/data/about";
import { assetPath } from "@/lib/basePath";

export default function About() {
  return (
    <section
      id="about"
      className="py-[clamp(4rem,8vh,7rem)] px-[clamp(1.5rem,4vw,4rem)] max-w-[1200px] mx-auto"
    >
      <Reveal>
        <div className="border-t border-border pt-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Profile photo */}
          <div className="w-full aspect-[4/5] bg-bg-card rounded-[10px] overflow-hidden">
            <img
              src={assetPath("/images/about/adam-rotmil-creative-design-studio-portrait.jpeg")}
              alt="Adam Rotmil"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bio */}
          <div>
            <h2 className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] font-normal text-text-primary mb-6">
              About
            </h2>

            {BIO.map((paragraph, i) => (
              <p
                key={i}
                className="font-sans text-[1.02rem] leading-[1.7] text-text-secondary mb-5"
              >
                {paragraph}
              </p>
            ))}

            {/* Experience timeline */}
            <div className="border-t border-border pt-6 mt-8">
              <p className="font-sans text-xs text-text-muted uppercase tracking-[0.08em] mb-4">
                Experience
              </p>
              {EXPERIENCE.map((exp, i) => (
                <div
                  key={i}
                  className="flex justify-between items-baseline py-2.5"
                  style={{
                    borderBottom:
                      i < EXPERIENCE.length - 1
                        ? "1px solid var(--color-border)"
                        : "none",
                  }}
                >
                  <div>
                    <span className="font-sans text-[0.92rem] text-text-primary">
                      {exp.role}
                    </span>
                    <span className="font-sans text-[0.85rem] text-text-muted ml-2">
                      {exp.company}
                    </span>
                  </div>
                  <span className="font-sans text-[0.78rem] text-text-muted hidden sm:inline">
                    {exp.period}
                  </span>
                </div>
              ))}
            </div>

            {/* Credentials */}
            <div className="mt-6 flex gap-2 flex-wrap">
              {CREDENTIALS.map((c) => (
                <span
                  key={c}
                  className="font-sans text-[0.72rem] text-text-muted px-2.5 py-1 border border-border rounded"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
