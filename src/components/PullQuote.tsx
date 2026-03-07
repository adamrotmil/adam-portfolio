import Reveal from "./Reveal";

export default function PullQuote({
  children,
  color = "var(--color-accent)",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <Reveal>
      <blockquote
        className="font-serif text-[clamp(1.4rem,2.8vw,2rem)] font-normal italic leading-[1.38] text-text-primary max-w-[660px] my-12 py-8 border-b border-border"
        style={{ borderTop: `2px solid ${color}` }}
      >
        {children}
      </blockquote>
    </Reveal>
  );
}
