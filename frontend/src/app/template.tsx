import { PageTransition } from "@/components/layout/PageTransition";

// ページ遷移ごとのトランジションを管理するテンプレート
// layout.tsxとは異なり、ページ遷移のたびに再マウントされるためアニメーションに適しています
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
