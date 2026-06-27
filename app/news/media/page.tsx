import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getBoardPosts } from "@/lib/board";
import { getMessages } from "@/lib/i18n/server";

export const metadata: Metadata = { title: "Gallery" };
export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const posts = await getBoardPosts("gallery");
  const m = (await getMessages()).pages;

  return (
    <>
      <PageHero
        kicker="Board · Gallery"
        index="C"
        title={m.newsGalleryTitle}
        description={m.newsGalleryDesc}
      />

      <section className="py-16 md:py-20">
        <Container>
          {posts.length === 0 ? (
            <p className="text-muted">{m.newsGalleryEmpty}</p>
          ) : (
            <div className="space-y-16">
              {posts.map((post) => (
                <div key={post.id}>
                  <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-line pb-3">
                    <h2 className="font-display text-xl font-bold tracking-tight">
                      {post.title}
                    </h2>
                    <span className="text-xs text-faint">
                      {post.created_at.slice(0, 10)}
                    </span>
                  </div>
                  {post.body && (
                    <p className="mb-5 max-w-2xl text-sm leading-relaxed text-muted">
                      {post.body}
                    </p>
                  )}
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {post.images.map((src, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={src + i}
                        src={src}
                        alt={`${post.title} ${i + 1}`}
                        className="aspect-square w-full border border-line object-cover"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
