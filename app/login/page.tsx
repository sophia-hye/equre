import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "로그인" };
export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <section className="border-b border-line-strong py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-md">
          <p className="font-display text-2xl font-semibold tracking-tight text-accent">
            ( eq&uuml;re )
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            로그인
          </h1>
          <p className="mt-3 text-sm text-muted">
            다시 오신 것을 환영합니다.
          </p>
          <div className="mt-10 border border-line bg-bg-soft p-6 md:p-8">
            <LoginForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
