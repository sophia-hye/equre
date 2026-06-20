import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";

type ComingSoonProps = {
  kicker: string;
  title: string;
};

export function ComingSoon({ kicker, title }: ComingSoonProps) {
  return (
    <>
      <PageHero
        kicker={kicker}
        title={title}
        description="해당 페이지는 현재 준비 중입니다. 곧 새로운 콘텐츠로 찾아뵙겠습니다."
      />
      <section className="py-20 md:py-28">
        <Container>
          <div className="border border-line-strong bg-bg-soft p-12 text-center md:p-16">
            <p className="font-display text-2xl font-bold tracking-tight">
              준비 중입니다
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
              페이지를 정성껏 만들고 있어요. 문의가 필요하시면 언제든 상담을
              신청해 주세요.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/contact" withArrow>
                상담 신청
              </Button>
              <Button href="/" variant="secondary">
                홈으로
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
