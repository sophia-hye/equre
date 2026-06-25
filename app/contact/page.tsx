import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { site, getSocialLinks } from "@/lib/site";
import { IconInstagram, IconKakao } from "@/components/ui/icons";
import { getMessages } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Contact",
  description: "eqüre 무료 상담 및 B2B 제휴 문의. Are you ready to CURE & GROW?",
};

export default async function ContactPage() {
  const m = (await getMessages()).contactPage;
  return (
    <>
      <PageHero
        kicker="Contact"
        index="D"
        title={m.heroTitle}
        description={m.heroDesc}
      />

      <section className="py-20 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            {/* Contact info */}
            <div>
              <p className="label text-muted">{m.guide}</p>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                {m.guideDesc}
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

              {/* 메신저 바로 문의 */}
              <p className="label mt-10 text-faint">{m.directTitle}</p>
              <div className="mt-4 flex flex-col gap-3">
                {getSocialLinks().map((s) => (
                  <a
                    key={s.type}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 border border-line-strong px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-bg"
                  >
                    {s.type === "instagram" ? (
                      <IconInstagram width={18} height={18} />
                    ) : (
                      <IconKakao width={18} height={18} />
                    )}
                    {s.type === "instagram" ? m.igBtn : m.kakaoBtn}
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
