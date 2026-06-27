import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getBoardPosts } from "@/lib/board";
import { getMessages } from "@/lib/i18n/server";

export const metadata: Metadata = { title: "Events" };
export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const posts = await getBoardPosts("event");
  const m = (await getMessages()).pages;

  return (
    <>
      <PageHero
        kicker="Board · Events"
        index="C"
        title={m.newsEventsTitle}
        description={m.newsEventsDesc}
      />

      <section className="py-16 md:py-20">
        <Container>
          {posts.length === 0 ? (
            <p className="text-muted">{m.newsEventsEmpty}</p>
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
                    <span className="font-display text-sm font-semibold uppercase tracking-wide text-accent">
                      {post.event_date ?? post.created_at.slice(0, 10)}
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
