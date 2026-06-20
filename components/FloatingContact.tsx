import { getSocialLinks } from "@/lib/site";
import { IconInstagram, IconKakao } from "@/components/ui/icons";

const styleByType: Record<string, { bg: string; color: string }> = {
  instagram: {
    bg: "linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf)",
    color: "#ffffff",
  },
  kakao: { bg: "#FEE500", color: "#3C1E1E" },
};

export function FloatingContact() {
  const links = getSocialLinks();
  if (links.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      {links.map((l) => {
        const s = styleByType[l.type];
        return (
          <a
            key={l.type}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.label}
            className="group relative flex h-12 w-12 items-center justify-center rounded-full shadow-[0_6px_18px_-4px_rgba(0,0,0,0.3)] transition-transform duration-200 hover:-translate-y-0.5"
            style={{ background: s.bg, color: s.color }}
          >
            {l.type === "instagram" ? (
              <IconInstagram width={22} height={22} />
            ) : (
              <IconKakao width={22} height={22} />
            )}
            <span className="pointer-events-none absolute right-14 whitespace-nowrap rounded bg-ink px-2.5 py-1 text-xs font-medium text-bg opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {l.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
