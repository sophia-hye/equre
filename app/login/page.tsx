import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LoginForm } from "@/components/auth/LoginForm";
import { getMessages } from "@/lib/i18n/server";

export const metadata: Metadata = { title: "로그인" };
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const t = (await getMessages()).login;
  return (
    <section className="border-b border-line-strong py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-md">
          <p className="font-display text-2xl font-semibold tracking-tight text-accent">
            {t.tag}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            {t.title}
          </h1>
          <p className="mt-3 text-sm text-muted">{t.desc}</p>
          <div className="mt-10 border border-line bg-bg-soft p-6 md:p-8">
            <LoginForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
