import Link from "next/link";
import { site, getSocialLinks } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { getMessages } from "@/lib/i18n/server";

export async function Footer() {
  const msgs = await getMessages();
  const m = msgs.footer;

  const columns = [
    {
      title: "Programs",
      links: [
        { label: m.linkAdmissions, href: "/programs" },
        { label: m.linkPeer, href: "/programs" },
      ],
    },
    {
      title: "Space",
      links: [
        { label: "Sober Bar", href: "/space" },
        { label: "Tech Showroom", href: "/space" },
        { label: "SEOULITE HANNAM", href: "/space" },
      ],
    },
    {
      title: m.colCompany,
      links: [
        { label: "About", href: "/about" },
        { label: "Brand Identity", href: "/about" },
      ],
    },
    {
      title: m.colConnect,
      links: [
        { label: msgs.common.consult, href: "/contact" },
        { label: m.b2bInquiry, href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="border-t border-line-strong bg-bg">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <p className="label text-ink">The Next Generation</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {m.tagline}
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="label text-faint">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="link-underline text-sm text-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {col.title === m.colConnect &&
                  getSocialLinks().map((s) => (
                    <li key={s.type}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline text-sm text-muted transition-colors hover:text-ink"
                      >
                        {s.type === "instagram" ? "Instagram" : "KakaoTalk"}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        {/* oversized serif wordmark */}
        <div className="border-t border-line py-10">
          <p className="font-display text-[19vw] font-black lowercase leading-none tracking-tighter text-ink/[0.07] lg:text-[15rem]">
            eq&uuml;re
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-7 text-xs text-faint md:flex-row md:items-center md:justify-between">
          <p>{m.legal}</p>
          <p className="flex items-center gap-3">
            <span>{m.privacy}</span>
            <span className="text-line">·</span>
            <span>{m.terms}</span>
            <span className="text-line">·</span>
            <span>&copy; 2026 {site.name}</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
