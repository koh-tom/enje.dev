import { Icon } from "@/components/ui/Icon";
import { owner, socialLinks } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-paper">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm sm:flex-row sm:px-6">
        <p>
          &copy; {new Date().getFullYear()} {owner.name}
        </p>
        <ul className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="inline-flex size-9 items-center justify-center border border-ink hover:bg-mark hover:text-paper"
              >
                <Icon name={link.icon} />
              </a>
            </li>
          ))}
        </ul>
        <p className="font-display text-lg text-ink-soft">
          Next.js + Rails, handwritten.
        </p>
      </div>
    </footer>
  );
}
