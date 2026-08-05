/**
 * プロフィールの中身。オーナーが手で編集するファイル。
 * ここに書いた内容がトップページと About ページに出る。
 */

export const profile = {
  name: "Koh TOMITA",
  handle: "enje",
  title: "Software Engineer / Researcher",
  tagline: "Web開発 ⇔ FPGA研究",
  location: "Tsukuba, Japan",
  intro: [
    "Webアプリケーション開発からFPGAまで幅広い技術領域を学ぶ、ソフトウェアエンジニア志望の大学生です。",
    "低レイヤーからWebフロントエンドまで、幅広い技術領域に興味を持ち、特にコンピュータパフォーマンスやアルゴリズムの研究に取り組んでいます。",
  ],
  fields: ["FPGA", "Computer Performance", "Algorithm"],
  languages: ["C/C++", "Assembly", "Verilog", "React", "Rust", "Ruby", "Julia"],
  interests: [
    "Student",
    "Researcher",
    "FPGA",
    "Computer Performance",
    "Algorithm",
    "Tottenham Hotspur",
    "Azzurri",
    "Hokkaido Nippon-Ham Fighters",
    "Shogi (Yagura)",
    "Theater",
    "Movies",
    "Reading",
  ],
} as const;

export type TimelineEvent = {
  year: string;
  title: string;
  description: string;
};

export const timeline: TimelineEvent[] = [
  {
    year: "2022 -",
    title: "大学入学",
    description: "工学部にて情報工学について勉強中。",
  },
  {
    year: "2023",
    title: "ベンチャー企業にてアルバイト",
    description: "ベンチャー企業にてシミュレーション構築のアルバイト。",
  },
  {
    year: "2024 -",
    title: "エンジニアバイト",
    description: "Web開発のエンジニアバイト。",
  },
  {
    year: "Now",
    title: "新しい技術の探求",
    description: "常に新しい技術を学び、挑戦中。",
  },
];

/** proficiency は 1〜5 */
export type Skill = {
  name: string;
  proficiency: 1 | 2 | 3 | 4 | 5;
  group: "言語" | "Web" | "環境";
};

export const skills: Skill[] = [
  { name: "C++", proficiency: 5, group: "言語" },
  { name: "Zig", proficiency: 5, group: "言語" },
  { name: "Rust", proficiency: 4, group: "言語" },
  { name: "TypeScript", proficiency: 4, group: "言語" },
  { name: "Ruby", proficiency: 4, group: "言語" },
  { name: "Python", proficiency: 4, group: "言語" },
  { name: "C#", proficiency: 3, group: "言語" },
  { name: "React", proficiency: 4, group: "Web" },
  { name: "Next.js", proficiency: 4, group: "Web" },
  { name: "Vite", proficiency: 4, group: "Web" },
  { name: "PostgreSQL", proficiency: 3, group: "Web" },
  { name: "Ubuntu", proficiency: 5, group: "環境" },
  { name: "Linux", proficiency: 4, group: "環境" },
  { name: "Docker", proficiency: 3, group: "環境" },
];

export type AchievementCategory =
  | "award"
  | "certification"
  | "talk"
  | "publication"
  | "competition"
  | "staff"
  | "other";

export const achievementLabels: Record<AchievementCategory, string> = {
  award: "受賞",
  certification: "資格",
  talk: "登壇",
  publication: "執筆",
  competition: "競技",
  staff: "スタッフ",
  other: "その他",
};

export type Achievement = {
  date: string;
  title: string;
  category: AchievementCategory;
  description?: string;
};

/** date は "YYYY.MM"。表示時に古い順へ並べ替える */
export const achievements: Achievement[] = [
  {
    date: "2026.06",
    title: "HEART 2026 WIP採択・ドイツ国際会議発表",
    category: "talk",
    description: "WIP論文が採択、ドイツにて国際会議発表",
  },
  {
    date: "2026.05",
    title: "2026 SECHACK 世界観駆動",
    category: "other",
    description: "世界観駆動プロジェクトに参加",
  },
  {
    date: "2026.04",
    title: "セキュリティ・キャンプコネクト2026 OSクラス参加",
    category: "other",
    description: "OSクラスに参加",
  },
  {
    date: "2025.12",
    title: "Qiita アドベントカレンダー 2025 1人完走",
    category: "publication",
    description: "25日間のアドベントカレンダーを1人で完走",
  },
  {
    date: "2025.11",
    title: "CODE BLUE 2025 学生スタッフ参加",
    category: "staff",
    description: "学生スタッフとして参加",
  },
  {
    date: "2025.10",
    title: "IEEE The 22nd EPCR英語プレゼン大会2025 Excellent Award",
    category: "award",
    description:
      "An emulator of path planning algorithms to evaluate pipelined FPGA accelerator architectures",
  },
  { date: "2022.08", title: "TOEIC 930点", category: "certification" },
];

export type Tool = { title: string; items: string[] };

export const toolkit: Tool[] = [
  {
    title: "ラップトップ",
    items: [
      "ThinkPad X1 Carbon 6th Gen 16GB 2TB(換装)",
      "ThinkPad P1 4th Gen 16GB 512GB SSD",
    ],
  },
  { title: "デスクトップ", items: ["i7-14700KF RTX4080 64GB 2TB・1TB"] },
  { title: "OS", items: ["Ubuntu 24.04 LTS", "Windows 11 Pro", "Omarchy"] },
  {
    title: "キーボード",
    items: ["HHKB Studio 雪 日本語配列", "ThinkPad Keyboard"],
  },
  { title: "エディタ", items: ["VSCode", "Neovim"] },
  { title: "ターミナル", items: ["Ghostty"] },
];

export type InterestGroup = {
  title: string;
  items: { label: string; detail: string }[];
};

export const interestGroups: InterestGroup[] = [
  {
    title: "Sports",
    items: [
      { label: "Spurs", detail: "Tottenham Hotspur - COYS!" },
      { label: "Azzurri", detail: "Italian National Team" },
      { label: "Fighters", detail: "北海道日本ハムファイターズ" },
    ],
  },
  {
    title: "Hobbies",
    items: [
      { label: "Theater", detail: "観劇・舞台鑑賞" },
      { label: "Movies", detail: "映画鑑賞" },
      { label: "Shogi", detail: "居飛車党 (矢倉)" },
    ],
  },
];
