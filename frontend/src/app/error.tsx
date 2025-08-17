"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
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
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-4xl font-bold mb-4 text-red-500">
        Something went wrong!
      </h2>
      <p className="text-muted-foreground max-w-md mb-8">
        予期せぬエラーが発生しました。時間を置いて再度お試しください。
      </p>
      <div className="flex gap-4">
        <Button
          onClick={() => reset()}
          variant="outline"
          className="rounded-full"
        >
          再読み込み
        </Button>
        <Button asChild className="rounded-full">
          <a href="/">トップページに戻る</a>
        </Button>
      </div>
    </div>
  );
}
