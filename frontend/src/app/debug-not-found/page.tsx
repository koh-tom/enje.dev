import NotFound from "../not-found";

/*
 * not-found.tsx のデザインを確認するためのデバッグページ。
 * devで/debug-not-foundにアクセスして確認。
 */
export default function DebugNotFoundPage() {
  return (
    <div className="py-10">
      <div className="bg-blue-500/10 border border-blue-500/20 p-4 mb-10 rounded-lg text-blue-500 text-sm text-center">
        これは <strong>not-found.tsx</strong>{" "}
        のプレビュー画面です。表示確認用です。
      </div>

      <NotFound />
    </div>
  );
}
