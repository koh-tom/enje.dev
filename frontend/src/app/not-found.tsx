import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 py-16 text-center">
      <p className="font-display text-8xl leading-none">404</p>
      <h1 className="text-h2">ページが見つかりません</h1>
      <p className="text-ink-soft">
        URL が変わったか、削除されたか、最初から無かったかのどれかです。
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" variant="solid">
          トップへ戻る
        </ButtonLink>
        <ButtonLink href="/blog">記事一覧を見る</ButtonLink>
      </div>
    </div>
  );
}
