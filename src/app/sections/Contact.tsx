import Reveal from "@/components/Reveal";
import { CONTACT } from "@/data/about";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-[clamp(4rem,8vh,7rem)] px-[clamp(1.5rem,4vw,4rem)] max-w-[1200px] mx-auto"
    >
      <Reveal>
        <div className="border-t border-border pt-10 text-center">
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-normal text-text-primary mb-4">
            Let&#x2019;s build something
          </h2>
          <p className="font-sans text-[1.05rem] text-text-secondary mb-8 leading-[1.6]">
            Available for product design, AI/UX consulting, and design
            engineering roles.
          </p>

          <div className="flex justify-center gap-4 flex-wrap mb-8">
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

          <div className="flex justify-center gap-8">
            {CONTACT.social.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener"
                className="font-sans text-[0.82rem] text-text-muted no-underline hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
