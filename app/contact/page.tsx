import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "equre 무료 상담 및 B2B 제휴 문의. Are you ready to CURE & GROW?",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        index="D"
        title="Are you ready to CURE & GROW?"
        description="학부모·학생 상담부터 B2B 제휴까지, equre가 가장 완벽한 파트너십을 함께 만들어가겠습니다."
      />

      <section className="py-20 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            {/* Contact info */}
            <div>
              <p className="label text-muted">문의 안내</p>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                아래 양식을 작성해 주시면 담당자가 빠르게 연락드립니다. 급하신
                경우 이메일로도 문의하실 수 있습니다.
              </p>
              <dl className="mt-10 border-t border-line-strong">
                {[
                  { k: "Email", v: site.email },
                  { k: "Location", v: site.location },
                  { k: "Company", v: site.legalName },
                ].map((row) => (
                  <div key={row.k} className="border-b border-line py-5">
                    <dt className="label text-faint">{row.k}</dt>
                    <dd className="mt-2 text-sm text-ink">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Form */}
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
