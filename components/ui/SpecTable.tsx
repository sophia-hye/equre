type SpecRow = {
  label: string;
  value: string;
};

type SpecTableProps = {
  rows: SpecRow[];
};

/** Editorial spec table: LABEL | value, hairline dividers (ref: THE PRODUCT / MY ROLE). */
export function SpecTable({ rows }: SpecTableProps) {
  return (
    <dl className="border-t border-line-strong">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-1 gap-2 border-b border-line py-6 md:grid-cols-[200px_1fr] md:gap-10"
        >
          <dt className="label text-ink">{row.label}</dt>
          <dd className="max-w-xl text-sm leading-relaxed text-muted md:text-base">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
