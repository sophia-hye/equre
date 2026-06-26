import Link from "next/link";
import type { NavItem, DivisionKey } from "@/lib/site";
import { DivisionSwitcher } from "./DivisionSwitcher";

/** 사업부 페이지 전용 보조 네비게이션. 메인 헤더(h-16) 바로 아래에 sticky.
 *  좌측 셀렉트박스로 사업부 페이지를 전환하고, children 항목은 hover/focus 드롭다운으로 노출. */
export function SubNav({
  current,
  items,
}: {
  current: DivisionKey;
  items: NavItem[];
}) {
  return (
    <div className="sticky top-16 z-40 border-b border-line-strong bg-bg/95 backdrop-blur-md">
      <div className="no-scrollbar mx-auto flex h-12 w-full max-w-[1400px] items-center gap-5 overflow-x-auto overflow-y-hidden px-4 sm:gap-8 sm:px-6 lg:px-8 md:overflow-visible">
        <DivisionSwitcher current={current} />
        <span className="h-4 w-px shrink-0 bg-line-strong" aria-hidden />
        <nav className="flex items-center gap-5">
          {items.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative shrink-0">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 whitespace-nowrap text-xs font-medium uppercase tracking-wide text-ink transition-colors hover:text-accent sm:text-[0.8rem]"
                  >
                    {item.label}
                    <span className="text-[0.55rem]">▾</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="flex items-center gap-1 whitespace-nowrap text-xs font-medium uppercase tracking-wide text-ink transition-colors hover:text-accent sm:text-[0.8rem]"
                  >
                    {item.label}
                    <span className="text-[0.55rem]">▾</span>
                  </button>
                )}
                <div className="invisible absolute left-0 top-full z-50 min-w-[150px] border border-line-strong bg-bg opacity-0 shadow-sm transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block whitespace-nowrap px-4 py-2.5 text-xs text-muted transition-colors hover:bg-bg-soft hover:text-ink"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className="shrink-0 whitespace-nowrap text-xs font-medium uppercase tracking-wide text-ink transition-colors hover:text-accent sm:text-[0.8rem]"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </div>
  );
}
