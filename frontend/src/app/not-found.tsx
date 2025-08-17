import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-6xl font-black mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        404
      </h2>
      <h3 className="text-2xl font-bold mb-6">ページが見つかりません</h3>
      <p className="text-muted-foreground max-w-md mb-8">
        お探しのページは削除されたか、URLが変更された可能性があります。
      </p>
      <Button asChild size="lg" className="rounded-full">
        <Link href="/">トップページに戻る</Link>
      </Button>
    </div>
  );
}
