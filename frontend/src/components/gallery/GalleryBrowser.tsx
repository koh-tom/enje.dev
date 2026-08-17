"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { galleryLocations, galleryTags } from "@/content/gallery";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Gallery } from "@/types/gallery";

type GalleryBrowserProps = { galleries: Gallery[] };

type View = "columns" | "grid";

/** 絞り込み、表示切替、<dialog> で開く詳細。すべてクライアント側の状態 */
export function GalleryBrowser({ galleries }: GalleryBrowserProps) {
  const [location, setLocation] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [view, setView] = useState<View>("columns");
  const [selected, setSelected] = useState<Gallery | null>(null);

  const filtered = galleries.filter(
    (g) =>
      (!location || g.location === location) &&
      (tags.length === 0 || tags.some((t) => g.tags.includes(t))),
  );

  const toggleTag = (tag: string) =>
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );

  return (
    <div className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:items-start">
      <aside className="flex flex-col gap-6 lg:sticky lg:top-6">
        <div>
          <p className="mb-2 font-display text-2xl">場所</p>
          <ul className="flex flex-wrap gap-1.5">
            {galleryLocations.map((loc) => (
              <li key={loc}>
                <FilterButton
                  active={location === loc}
                  onClick={() => setLocation(location === loc ? null : loc)}
                >
                  {loc}
                </FilterButton>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 font-display text-2xl">タグ</p>
          <ul className="flex flex-wrap gap-1.5">
            {galleryTags.map((tag) => (
              <li key={tag}>
                <FilterButton
                  active={tags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                >
                  #{tag}
                </FilterButton>
              </li>
            ))}
          </ul>
        </div>
        {(location || tags.length > 0) && (
          <button
            type="button"
            onClick={() => {
              setLocation(null);
              setTags([]);
            }}
            className="self-start text-sm underline hover:underline-wavy"
          >
            絞り込みを解除
          </button>
        )}
        <div>
          <p className="mb-2 font-display text-2xl">表示</p>
          <fieldset className="inline-flex border-2 border-ink">
            <legend className="sr-only">表示切替</legend>
            {(["columns", "grid"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                aria-pressed={view === v}
                className={cn(
                  "px-3 py-1 text-sm",
                  view === v && "bg-mark text-paper",
                )}
              >
                {v === "columns" ? "段組" : "格子"}
              </button>
            ))}
          </fieldset>
        </div>
      </aside>

      <div>
        <p className="mb-4 text-sm text-ink-soft" aria-live="polite">
          {filtered.length} 件
        </p>
        {filtered.length === 0 ? (
          <EmptyState
            title="写真が見つかりませんでした"
            description="絞り込みを変えてみてください。"
          />
        ) : (
          <ul
            className={cn(
              view === "columns"
                ? "columns-1 gap-5 sm:columns-2 xl:columns-3"
                : "grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
            )}
          >
            {filtered.map((gallery) => (
              <li
                key={gallery.slug}
                className={cn(view === "columns" && "mb-5 break-inside-avoid")}
              >
                <button
                  type="button"
                  onClick={() => setSelected(gallery)}
                  className="frame group block w-full p-2 text-left hover:-rotate-[0.4deg]"
                >
                  <Image
                    src={gallery.cover.src}
                    alt={gallery.cover.alt}
                    width={gallery.cover.width}
                    height={gallery.cover.height}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className={cn(
                      "block h-auto w-full grayscale-[20%] group-hover:grayscale-0",
                      view === "grid" && "aspect-[4/3] object-cover",
                    )}
                    unoptimized={gallery.cover.src.endsWith(".svg")}
                  />
                  <div className="px-1 pt-2">
                    <p className="font-bold">{gallery.title}</p>
                    <p className="text-sm text-ink-soft">
                      {gallery.location} ・ {formatDate(gallery.date)} ・{" "}
                      {gallery.images.length} 枚
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <GalleryDialog gallery={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "border border-ink px-2 py-0.5 text-sm hover:bg-mark hover:text-paper",
        active && "bg-mark text-paper",
      )}
    >
      {children}
    </button>
  );
}

function GalleryDialog({
  gallery,
  onClose,
}: {
  gallery: Gallery | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (gallery && !dialog.open) dialog.showModal();
    if (!gallery && dialog.open) dialog.close();
  }, [gallery]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      className="m-auto max-h-[90dvh] w-[min(64rem,calc(100%-2rem))] border-2 border-ink bg-paper p-0 text-ink backdrop:bg-ink/70"
      aria-labelledby="gallery-dialog-title"
    >
      {gallery && (
        <div className="flex max-h-[90dvh] flex-col">
          <div className="flex items-start justify-between gap-4 border-b-2 border-ink p-4">
            <div>
              <h2 id="gallery-dialog-title" className="text-h3">
                {gallery.title}
              </h2>
              <p className="text-sm text-ink-soft">
                {gallery.location} ・ {formatDate(gallery.date)} ・{" "}
                {gallery.images.length} 枚
              </p>
              {gallery.description && (
                <p className="mt-1 text-sm">{gallery.description}</p>
              )}
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {gallery.tags.map((tag) => (
                  <li key={tag}>
                    <Tag>#{tag}</Tag>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="閉じる"
              className="inline-flex size-9 shrink-0 items-center justify-center border-2 border-ink hover:bg-mark hover:text-paper"
            >
              <Icon name="close" />
            </button>
          </div>
          <ul className="grid gap-2 overflow-y-auto p-2 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.images.map((image, index) => (
              <li key={`${image.src}-${image.alt}`}>
                <figure>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 640px) 90vw, 33vw"
                    className="block aspect-square h-auto w-full border border-ink object-cover"
                    unoptimized={image.src.endsWith(".svg")}
                  />
                  <figcaption className="px-1 pt-1 text-xs text-ink-soft">
                    {index + 1}. {image.alt}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      )}
    </dialog>
  );
}
