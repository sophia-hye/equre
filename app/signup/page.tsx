import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = { title: "회원가입" };
export const dynamic = "force-dynamic";

export default function SignupPage() {
  return (
    <section className="border-b border-line-strong py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="font-display text-2xl font-semibold tracking-tight text-accent">
            ( eq&uuml;re )
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            회원가입
          </h1>
          <p className="mt-3 text-sm text-muted">
            플랜 B의 첫 걸음을 함께 시작해요.
          </p>
          <div className="mt-10 border border-line bg-bg-soft p-6 md:p-10">
            <SignupForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
