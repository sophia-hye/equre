"use client";

import { useState } from "react";
import { useMessages } from "@/components/i18n/LocaleProvider";

type Location = {
  name: string;
  image: string;
  address: string;
  href: string;
  description: string;
};

function LocationCard({
  loc,
  imgPending,
}: {
  loc: Location;
  imgPending: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-line-strong bg-bg-soft">
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={loc.image}
            alt={loc.name}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
            <span className="font-display text-3xl font-bold tracking-tight text-ink/70">
              {loc.name}
            </span>
            <span className="label text-faint">{imgPending}</span>
          </div>
        )}
      </div>

      <a
        href={loc.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-5 inline-flex items-start gap-1.5 font-display text-lg font-bold tracking-tight text-ink transition-colors hover:text-accent"
      >
        <span aria-hidden className="text-accent">📍</span>
        <span className="link-underline">{loc.address}.</span>
      </a>

      <p className="mt-4 text-sm leading-relaxed text-muted">
        {loc.description}
      </p>
    </div>
  );
}

export function SeouliteLocations() {
  const t = useMessages().seoulite;
  const locations: Location[] = [
    {
      name: "CARROT",
      image: "/space/carrot.png",
      address: "서울 용산구 한남동 이태원로 268-20",
      href: "https://www.carrotglobal.com/",
      description: t.carrotDesc,
    },
    {
      name: "사:유",
      image: "/space/sayu.png",
      address: "서울 용산구 신흥로 11, 해방촌",
      href: "https://centerone.kr/",
      description: t.sayuDesc,
    },
  ];

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-12">
      {locations.map((loc) => (
        <LocationCard key={loc.name} loc={loc} imgPending={t.imgPending} />
      ))}
    </div>
  );
}
