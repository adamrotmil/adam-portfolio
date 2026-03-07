import Reveal from "@/components/Reveal";
import { COMPANY_BADGES } from "@/data/about";

export default function Hero() {
  return (
    <section
      id="top"
      className="pt-[clamp(7rem,14vh,10rem)] pb-[clamp(4rem,8vh,6rem)] px-[clamp(1.5rem,4vw,4rem)] max-w-[1200px] mx-auto"
    >
      <Reveal>
        <p className="font-sans text-[0.82rem] text-text-muted tracking-[0.08em] uppercase mb-5">
          Design · AI · Product
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="font-serif text-[clamp(2.8rem,6.5vw,5.2rem)] font-normal leading-[1.08] text-text-primary max-w-[820px] tracking-[-0.03em] mb-7">
          I design products where{" "}
          <em className="italic">intelligence meets craft</em>
        </h1>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="font-sans text-[1.15rem] leading-[1.65] text-text-secondary max-w-[560px] mb-8">
          20 years of design leadership across AI, health tech, and finance.
          Currently building agentic systems at Clarvos and shipping code.
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="flex gap-2 flex-wrap">
          {COMPANY_BADGES.map((name) => (
            <span
              key={name}
              className="font-sans text-xs text-text-muted px-3 py-1.5 border border-border rounded"
            >
              {name}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
