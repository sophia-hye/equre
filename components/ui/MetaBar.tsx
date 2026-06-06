import { Container } from "./Container";

type MetaBarProps = {
  left: string;
  center?: string;
  right: string;
  className?: string;
};

/** Editorial top meta row: left | center | right, hairline below. */
export function MetaBar({ left, center, right, className = "" }: MetaBarProps) {
  return (
    <div className={`border-b border-line-strong ${className}`}>
      <Container className="flex items-center justify-between py-3">
        <span className="label text-ink">{left}</span>
        {center && (
          <span className="label hidden text-muted sm:inline">{center}</span>
        )}
        <span className="label text-ink">{right}</span>
      </Container>
    </div>
  );
}
