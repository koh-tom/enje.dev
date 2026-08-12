import { toolkit } from "@/content/profile";

export function Toolkit() {
  return (
    <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {toolkit.map((tool) => (
        <div key={tool.title} className="frame p-4">
          <dt className="mb-1 font-display text-2xl">{tool.title}</dt>
          <dd>
            <ul className="flex flex-col gap-0.5 text-sm">
              {tool.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}
