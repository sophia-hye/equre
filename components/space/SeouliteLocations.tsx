"use client";

import { useState } from "react";

type Location = {
  name: string;
  image: string;
  address: string;
  href: string;
  description: string;
};

const locations: Location[] = [
  {
    name: "CARROT",
    image: "/space/carrot.png",
    address: "서울 용산구 한남동 이태원로 268-20",
    href: "https://www.carrotglobal.com/",
    description:
      "글로벌 교육·기업 HRD 전문기업으로, 한남캠퍼스 내 포럼·컨퍼런스형 교육공간을 보유하고 있다. 웰니스 한남에서는 글로벌 커뮤니티, 기업교육, 컨퍼런스 운영을 연결하는 교육·네트워킹 거점으로 기능한다.",
  },
  {
    name: "사:유",
    image: "/space/sayu.png",
    address: "서울 용산구 신흥로 11, 해방촌",
    href: "https://centerone.kr/",
    description:
      "B1 갤러리 / 1~2F 웰니스 카페 사:유 / 3~4F 명상원, 루프탑을 갖춘 복합 웰니스 공간이다. 웰니스 한남에서는 전시, 카페, 명상, 루프탑 프로그램까지 한 공간에서 연결되는 핵심 행사 거점으로 기능한다.",
  },
];

function LocationCard({ loc }: { loc: Location }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-line-strong bg-bg-soft">
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={loc.image}
            alt={`${loc.name} 건물 일러스트`}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
            <span className="font-display text-3xl font-bold tracking-tight text-ink/70">
              {loc.name}
            </span>
            <span className="label text-faint">이미지 준비 중</span>
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
  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-12">
      {locations.map((loc) => (
        <LocationCard key={loc.name} loc={loc} />
      ))}
    </div>
  );
}
