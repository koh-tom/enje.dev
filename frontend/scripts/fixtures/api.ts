/** Rails API の契約に沿ったモックデータ。CI のビルドと E2E で使う */

const now = "2026-09-01T12:00:00+09:00";

export const tags = [
  { slug: "fpga", name: "FPGA", posts_count: 2 },
  { slug: "ruby", name: "Ruby", posts_count: 1 },
];

export const posts = [
  {
    slug: "hello-fpga",
    title: "FPGA で L チカするまで",
    excerpt: "開発環境の準備から最初の合成まで。",
    reading_time: 4,
    cover_image: null,
    status: "published",
    published_at: "2026-08-20T00:00:00+09:00",
    updated_at: now,
    tags: [tags[0]],
    body_html:
      '<h2 id="はじめに">はじめに</h2><p>本文です。</p><div class="language-verilog highlighter-rouge"><pre class="highlight"><code><span class="k">module</span> blink;</code></pre></div><h2 id="まとめ">まとめ</h2><p>おわり。</p>',
    toc: [
      { id: "はじめに", level: 2, text: "はじめに" },
      { id: "まとめ", level: 2, text: "まとめ" },
    ],
    previous_post: { slug: "rails-api", title: "Rails を API モードで使う" },
    next_post: null,
  },
  {
    slug: "rails-api",
    title: "Rails を API モードで使う",
    excerpt: "ビューを持たない Rails の組み立て方。",
    reading_time: 6,
    cover_image: null,
    status: "published",
    published_at: "2026-08-01T00:00:00+09:00",
    updated_at: now,
    tags: [tags[1], tags[0]],
    body_html: '<h2 id="概要">概要</h2><p>本文。</p>',
    toc: [{ id: "概要", level: 2, text: "概要" }],
    previous_post: null,
    next_post: { slug: "hello-fpga", title: "FPGA で L チカするまで" },
  },
];

export const projects = [
  {
    slug: "enje-dev",
    name: "enje.dev",
    summary:
      "このサイト。Next.js と Rails API で作ったポートフォリオ兼ブログ。",
    period: "2025.08 -",
    tech_stack: ["Next.js", "TypeScript", "Ruby on Rails", "PostgreSQL"],
    links: {
      github: "https://github.com/koh-tom/enje.dev",
      demo: "https://enje.dev",
    },
    cover_image: null,
    position: 1,
    status: "published",
    updated_at: now,
    body_html: '<h2 id="概要">概要</h2><p>本文。</p>',
  },
];
