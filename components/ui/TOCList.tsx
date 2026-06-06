import Link from "next/link";

type TOCItem = {
  label: string;
  href: string;
};

type TOCListProps = {
  items: TOCItem[];
};

/** Numbered table-of-contents list, right-aligned light index numbers. */
export function TOCList({ items }: TOCListProps) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item, i) => (
        <li key={item.label}>
          <Link
            href={item.href}
            className="group flex items-baseline justify-between py-4"
          >
            <span className="font-display text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent md:text-[1.75rem]">
              {item.label}
            </span>
            <span className="index-num text-xl md:text-2xl">
              {String(i + 1).padStart(2, "0")}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
