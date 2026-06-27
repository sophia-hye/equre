import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getBoardPosts } from "@/lib/board";
import { getMessages } from "@/lib/i18n/server";

export const metadata: Metadata = { title: "News" };
export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const posts = await getBoardPosts("news");
  const m = (await getMessages()).pages;

  return (
    <>
      <PageHero
        kicker="Board · News"
        index="C"
        title={m.newsPressTitle}
        description={m.newsPressDesc}
      />

      <section className="py-16 md:py-20">
        <Container>
          {posts.length === 0 ? (
            <p className="text-muted">{m.newsPressEmpty}</p>
          ) : (
            <div className="border-t border-line-strong">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="grid gap-5 border-b border-line py-8 md:grid-cols-[200px_1fr] md:gap-10"
                >
                  {post.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.images[0]}
                      alt={post.title}
                      className="aspect-video w-full border border-line object-cover md:aspect-square"
                    />
                  ) : (
                    <span className="hidden md:block" />
                  )}
                  <div>
                    <span className="text-xs text-faint">
                      {post.created_at.slice(0, 10)}
                    </span>
                    <h2 className="mt-2 font-display text-xl font-bold tracking-tight">
                      {post.title}
                    </h2>
                    {post.body && (
                      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted">
                        {post.body}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
