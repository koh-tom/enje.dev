type ArticleBodyProps = { html: string };

/**
 * Rails が返す本文 HTML を描画する。
 * HTML は Rails 側で kramdown → SafeListSanitizer を通しており、ここでは信頼する。
 */
export function ArticleBody({ html }: ArticleBodyProps) {
  return (
    <div
      className="prose-hand"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Rails 側でサニタイズ済み（docs/ARCHITECTURE.md）
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
