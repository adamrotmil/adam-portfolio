import Reveal from "./Reveal";

export default function SectionLabel({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <Reveal>
      <div className="flex items-center gap-4 mb-10">
        <span className="font-sans text-[0.7rem] text-text-muted font-medium tracking-[0.05em]">
          {number}
        </span>
        <div className="h-px w-10 bg-border-strong" />
        <span className="font-sans text-[0.72rem] text-text-muted tracking-[0.1em] uppercase">
          {title}
        </span>
      </div>
    </Reveal>
  );
}
