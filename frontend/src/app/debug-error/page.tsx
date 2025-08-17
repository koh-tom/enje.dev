"use client";

import ErrorComponent from "../error";

/*
 * error.tsx のデザインを確認するためのデバッグページ。
 * devで/debug-errorにアクセスして確認。
 */
export default function DebugErrorPage() {
  const dummyError = new Error(
    "これはデバッグ用のテストエラーメッセージです。",
  );

  return (
    <div className="py-10">
      <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 mb-10 rounded-lg text-yellow-500 text-sm text-center">
        これは <strong>error.tsx</strong>{" "}
        のプレビュー画面です。実際の挙動ではなく、表示確認用です。
      </div>

      <ErrorComponent
        error={dummyError}
        reset={() => alert("Reset button clicked!")}
      />
    </div>
  );
}
