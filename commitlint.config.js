/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // 日本語の 1 行メッセージ。製品名の大文字で誤検知するため無効化
    "subject-case": [0],
    "header-max-length": [2, "always", 72],
    "body-max-line-length": [0],
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "refactor", "docs", "chore", "test", "ci", "style", "perf"],
    ],
  },
};
