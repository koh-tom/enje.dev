/**
 * Rails API のモック。`bun scripts/mock-api.ts` で http://localhost:3000 に立つ。
 * CI のビルドと Playwright で使う。契約は docs/ARCHITECTURE.md。
 */
import { posts, projects, tags } from "./fixtures/api";

const PORT = Number(process.env.MOCK_API_PORT ?? 3000);

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

const notFound = () =>
  json({ error: { code: "not_found", message: "見つかりませんでした" } }, 404);

const summary = ({
  body_html,
  toc,
  previous_post,
  next_post,
  ...rest
}: (typeof posts)[number]) => rest;

Bun.serve({
  port: PORT,
  fetch(request: Request) {
    const { pathname, searchParams } = new URL(request.url);
    const path = pathname.replace(/^\/api\/v1/, "");

    if (request.method === "GET") {
      if (path === "/posts") {
        const tag = searchParams.get("tag");
        const per = Number(searchParams.get("per") ?? 20);
        const page = Number(searchParams.get("page") ?? 1);
        const filtered = tag
          ? posts.filter((p) => p.tags.some((t) => t.slug === tag))
          : posts;
        const data = filtered.slice((page - 1) * per, page * per).map(summary);
        return json({
          data,
          meta: {
            page,
            per,
            total: filtered.length,
            total_pages: Math.ceil(filtered.length / per),
          },
        });
      }
      const post = path.match(/^\/posts\/([^/]+)$/);
      if (post) {
        const found = posts.find((p) => p.slug === decodeURIComponent(post[1]));
        return found ? json({ data: found }) : notFound();
      }
      if (path === "/projects") {
        return json({ data: projects.map(({ body_html, ...rest }) => rest) });
      }
      const project = path.match(/^\/projects\/([^/]+)$/);
      if (project) {
        const found = projects.find(
          (p) => p.slug === decodeURIComponent(project[1]),
        );
        return found ? json({ data: found }) : notFound();
      }
      if (path === "/tags") return json({ data: tags });
      if (pathname === "/up") return new Response("ok");
    }

    if (request.method === "POST" && path === "/contacts") {
      return new Response(null, { status: 202 });
    }

    return notFound();
  },
});

console.log(`mock api: http://localhost:${PORT}/api/v1`);
