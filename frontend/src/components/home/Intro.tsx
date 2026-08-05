import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { profile } from "@/content/profile";
import { socialLinks } from "@/lib/site";

/** トップの自己紹介。写真、名前、短い紹介文、興味タグ、SNS */
export function Intro() {
  return (
    <section
      aria-labelledby="intro-heading"
      className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start"
    >
      <div className="frame -rotate-1 p-2 md:sticky md:top-6">
        <Image
          src="/images/enje.png"
          alt={`${profile.handle} のアイコン`}
          width={200}
          height={200}
          priority
          className="block size-40 object-cover md:size-48"
        />
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <p className="font-display text-2xl text-ink-soft">Hello, I'm</p>
          <h1 id="intro-heading" className="text-h1">
            {profile.handle}{" "}
            <span className="font-display text-3xl text-ink-soft">
              / {profile.name}
            </span>
          </h1>
          <p className="mt-1 text-xl">{profile.tagline}</p>
        </div>
        <div className="flex flex-col gap-2">
          {profile.intro.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <ul className="flex flex-wrap gap-1.5">
          {profile.interests.map((interest) => (
            <li key={interest}>
              <Tag>{interest}</Tag>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="/about" variant="solid">
            もっと詳しく <Icon name="arrowRight" size={16} />
          </ButtonLink>
          <ul className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="inline-flex size-9 items-center justify-center border-2 border-ink hover:bg-mark hover:text-paper"
                >
                  <Icon name={link.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
