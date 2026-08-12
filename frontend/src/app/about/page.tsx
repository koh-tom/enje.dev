import type { Metadata } from "next";
import Image from "next/image";
import { Achievements } from "@/components/about/Achievements";
import { Interests } from "@/components/about/Interests";
import { Toolkit } from "@/components/about/Toolkit";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Tag } from "@/components/ui/Tag";
import { profile } from "@/content/profile";
import { buildMetadata, jsonLd } from "@/lib/seo";
import { socialLinks } from "@/lib/site";

const description =
  "enjeの経歴、専門スキル、これまでの実績、およびものづくりに対する開発哲学について紹介するページです。Webシステム開発からFPGA設計まで幅広く対応しています。";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16">
      <JsonLd data={jsonLd.person()} />

      <header className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="frame rotate-1 p-2">
          <Image
            src="/images/prof.png"
            alt={`${profile.name} の写真`}
            width={160}
            height={160}
            priority
            className="block size-36 object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-h1">
            {profile.handle}{" "}
            <span className="font-display text-3xl text-ink-soft">
              / {profile.name}
            </span>
          </h1>
          <p className="text-lg">{profile.title}</p>
          <p className="inline-flex items-center gap-1 text-sm text-ink-soft">
            <Icon name="mapPin" size={16} /> {profile.location}
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {profile.fields.map((field) => (
              <li key={field}>
                <Tag>{field}</Tag>
              </li>
            ))}
          </ul>
          <p className="font-mono text-sm text-ink-soft">
            {profile.languages.join(" / ")}
          </p>
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
      </header>

      <section aria-labelledby="bio-heading">
        <SectionTitle sub="Bio">
          <span id="bio-heading">自己紹介</span>
        </SectionTitle>
        <div className="flex flex-col gap-2">
          {profile.intro.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </section>

      <section aria-labelledby="achievements-heading">
        <SectionTitle sub="Achievements">
          <span id="achievements-heading">実績</span>
        </SectionTitle>
        <Achievements />
      </section>

      <section aria-labelledby="interests-heading">
        <SectionTitle sub="Interests">
          <span id="interests-heading">趣味・関心</span>
        </SectionTitle>
        <Interests />
      </section>

      <section aria-labelledby="toolkit-heading">
        <SectionTitle sub="Toolkit">
          <span id="toolkit-heading">開発環境</span>
        </SectionTitle>
        <Toolkit />
      </section>
    </div>
  );
}
