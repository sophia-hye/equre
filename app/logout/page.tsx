"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { createClient } from "@/lib/supabase/client";
import { supabaseConfigured } from "@/lib/supabase/env";
import { useMessages } from "@/components/i18n/LocaleProvider";

export default function LogoutPage() {
  const router = useRouter();
  const t = useMessages().logout;
  const cm = useMessages().common;
  const [done, setDone] = useState(false);

  useEffect(() => {
    (async () => {
      if (supabaseConfigured) {
        await createClient().auth.signOut();
      }
      setDone(true);
      router.refresh();
    })();
  }, [router]);

  return (
    <section className="border-b border-line-strong py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-md border border-line bg-bg-soft p-10 text-center">
          {!done ? (
            <p className="text-sm text-muted">{t.loading}</p>
          ) : (
            <>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-2xl text-accent">
                ✓
              </div>
              <p className="mt-5 label text-accent">{t.tag}</p>
              <h1 className="mt-2 font-display text-2xl font-bold tracking-tight">
                {t.title}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t.body}</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="bg-accent px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dim"
                >
                  {cm.home}
                </Link>
                <Link
                  href="/login"
                  className="border border-line-strong px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-bg"
                >
                  {t.again}
                </Link>
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
