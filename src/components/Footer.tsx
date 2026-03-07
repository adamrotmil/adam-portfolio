import { CONTACT } from "@/data/about";

export default function Footer() {
  return (
    <footer className="px-[clamp(1.5rem,4vw,4rem)] max-w-[1200px] mx-auto flex justify-between items-center py-6 border-t border-border">
      <span className="font-sans text-xs text-text-muted">
        © 2026 Adam Rotmil
      </span>
      <div className="flex gap-6">
        {CONTACT.social.slice(0, 3).map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener"
            className="font-sans text-xs text-text-muted hover:text-text-primary no-underline transition-colors"
          >
            {link.label}
          </a>
        ))}
        <a
          href={`mailto:${CONTACT.email}`}
          className="font-sans text-xs text-text-muted hover:text-text-primary no-underline transition-colors"
        >
          Email
        </a>
      </div>
    </footer>
  );
}
