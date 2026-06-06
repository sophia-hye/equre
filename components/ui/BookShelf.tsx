import { CSSProperties } from "react";

export type Book = {
  title: string;
  author?: string;
  year?: string;
  /** spine height in px */
  height: number;
  /** spine thickness in px */
  width: number;
  /** spine background (css) */
  bg: string;
  /** dark spine → light text */
  dark?: boolean;
  /** slight lean in degrees */
  tilt?: number;
};

function Spine({ book }: { book: Book }) {
  const textColor = book.dark ? "text-bg" : "text-ink";
  const subColor = book.dark ? "text-bg/60" : "text-ink/45";

  const style: CSSProperties = {
    height: book.height,
    width: book.width,
    background: book.bg,
    transform: book.tilt ? `rotate(${book.tilt}deg)` : undefined,
    transformOrigin: "bottom center",
  };

  return (
    <div
      style={style}
      className="group relative shrink-0 border border-line-strong transition-transform duration-300 ease-out hover:-translate-y-3"
    >
      {book.author && (
        <span
          className={`absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap text-[0.5rem] font-medium uppercase tracking-[0.12em] ${subColor}`}
        >
          {book.author}
        </span>
      )}

      <span
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap font-display text-base font-bold tracking-tight md:text-lg ${textColor}`}
      >
        {book.title}
      </span>

      {book.year && (
        <span
          className={`absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.5rem] font-medium tracking-wider ${subColor}`}
        >
          {book.year}
        </span>
      )}
    </div>
  );
}

export function BookShelf({ books }: { books: Book[] }) {
  return (
    <div className="-mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0">
      <div className="flex w-max min-w-full items-end gap-[3px] border-b-2 border-line-strong pb-px">
        {books.map((book) => (
          <Spine key={book.title} book={book} />
        ))}
      </div>
    </div>
  );
}
