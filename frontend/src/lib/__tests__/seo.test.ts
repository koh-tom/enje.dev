import { describe, expect, it } from "vitest";
import { buildMetadata, jsonLd, serializeJsonLd } from "@/lib/seo";

describe("buildMetadata", () => {
  it("タイトルと canonical を組み立てる", () => {
    const meta = buildMetadata({ title: "Blog", path: "/blog" });
    expect(meta.title).toBe("Blog");
    expect(meta.alternates?.canonical).toBe("https://enje.dev/blog");
    expect(meta.openGraph?.title).toBe("Blog | enje.dev");
  });

  it("記事は article 型と日付を持つ", () => {
    const meta = buildMetadata({
      title: "t",
      path: "/blog/x",
      type: "article",
      publishedTime: "2026-01-01",
      image: "/images/x.png",
    });
    expect(meta.openGraph).toMatchObject({
      type: "article",
      publishedTime: "2026-01-01",
    });
    expect(meta.twitter).toMatchObject({ images: ["/images/x.png"] });
  });

  it("noIndex で robots を付ける", () => {
    expect(buildMetadata({ path: "/x", noIndex: true }).robots).toEqual({
      index: false,
      follow: false,
    });
  });
});

describe("serializeJsonLd", () => {
  it("script を閉じられないよう < をエスケープする", () => {
    const out = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("</script>");
    expect(JSON.parse(out).name).toBe("</script><script>alert(1)</script>");
  });
});

describe("jsonLd.breadcrumb", () => {
  it("position を 1 始まりで振る", () => {
    const data = jsonLd.breadcrumb([
      { name: "Home", path: "" },
      { name: "Blog", path: "/blog" },
    ]);
    expect(data.itemListElement[1]).toMatchObject({
      position: 2,
      item: "https://enje.dev/blog",
    });
  });
});
