"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 py-16 text-center">
      <p className="font-display text-6xl leading-none">Oops.</p>
      <h1 className="text-h2">表示できませんでした</h1>
      <p className="text-ink-soft">
        一時的な問題かもしれません。少し待ってから再読み込みしてください。
      </p>
      {error.digest && (
        <p className="font-mono text-xs text-ink-soft">ref: {error.digest}</p>
      )}
      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="solid" onClick={() => reset()}>
          再読み込み
        </Button>
        <ButtonLink href="/">トップへ戻る</ButtonLink>
      </div>
    </div>
  );
}
