# equre 디자인 토큰

> 기반: [equre-website-plan.md](equre-website-plan.md) · [equre-wireframe.md](equre-wireframe.md)
> 구현 위치: `app/globals.css` (Tailwind v4 `@theme`)
> 버전: v4.0 / 2026-06-06 — 디자인 방향: **웜 크림 / 테라코타 여정 인포그래픽**
> (Polina / Naber Studios / Project Steps 레퍼런스 기반)

따뜻한 크림 페이퍼 + 테라코타 단색 + 깔끔한 산세리프. 번호가 매겨진 스텝을
잇는 흐르는 곡선(여정/타임라인)과 손글씨 주석으로 미니멀하면서 친근하고
신뢰감 있는 인상을 만든다. (이전 v3의 세리프 "출판사" 톤을 폐기.)

## 1. 컬러 (웜 크림, 단색 테라코타)

| 토큰 | 값 | Tailwind | 용도 |
|------|-----|----------|------|
| `--color-bg` | `#EAE5D8` | `bg-bg` | 웜 크림 페이퍼 배경 |
| `--color-bg-soft` | `#E3DDCD` | `bg-bg-soft` | 대체 섹션 |
| `--color-surface` | `#F1ECE0` | `bg-surface` | 입력/카드 |
| `--color-line` | `#CCC3AF` | `border-line` | 일반 하이라인 |
| `--color-line-strong` | `#29251F` | `border-line-strong` | 강조 잉크 라인 |
| `--color-ink` | `#272219` | `text-ink` | 웜 다크 본문 |
| `--color-muted` | `#6E675A` | `text-muted` | 보조 텍스트 |
| `--color-faint` | `#A79D88` | `text-faint` | 캡션/라벨 |
| `--color-accent` | `#C2492B` | `text/bg-accent` | 유일한 강조색 (테라코타) |
| `--color-accent-dim` | `#9C3A20` | `bg-accent-dim` | 호버 |

원칙: 테라코타 **1색만**. 듀오톤 이미지는 크림→테라코타 그라디언트.

## 2. 타이포그래피 (산세리프)

| 토큰 | 스택 | 용도 |
|------|------|------|
| `--font-display` | Archivo, Pretendard, sans-serif | 헤드라인/번호 (깔끔한 그로테스크) |
| `--font-sans` | Inter, Pretendard, system-ui | 본문/라벨 |
| `--font-hand` | Caveat, Pretendard, cursive | 손글씨 주석(`.hand`, 테라코타) |

- 헤드라인: 대문자 산세리프, `tracking-tight`, 핵심어만 테라코타
- `( eqüre )` 괄호 태그 = 브랜드 시그니처 (Naber 레퍼런스의 `( NABER STUDIOS )`)
- `.hand`: Caveat 손글씨 주석을 살짝 기울여 배치 (여정 스텝 옆)
- `.label`: 대문자 + tracking 메타/kicker

## 3. 시그니처 — 흐르는 여정 (JourneyPath)

`components/ui/JourneyPath.tsx` — 레퍼런스의 핵심 모티프.

- 좌측 레일을 따라 **손그림 느낌의 테라코타 곡선**이 흐르고, 그 위에 노드(점)와
  큰 번호(01~04)가 놓임. 우측에 제목·본문·손글씨 주석.
- 곡선은 스크롤 진입 시 `stroke-dashoffset` 애니메이션으로 **그려지듯 등장**
  (`.path-draw`, `prefers-reduced-motion` 존중).
- 홈 `ProcessSection`(01)에서 "실패를 회복으로 바꾸는 네 단계" 표현.
- `ProcessSteps`는 점-선 수평 노드 타임라인으로 리스타일(레퍼런스 img4).

## 4. 텍스처 / 형태

- 페이퍼 그레인: `body::before` SVG noise, opacity 0.06, `mix-blend: multiply`
- 히어로 우상단 장식용 흐르는 곡선 + 노드
- radius 2px (거의 샤프), 하이라인/노드 기반 레이아웃
- 듀오톤(Space, 책장)·`BookShelf`는 크림→테라코타 팔레트로 통일

## 5. 모션

- Reveal: opacity/translateY(18px), 700ms `cubic-bezier(.22,1,.36,1)`
- JourneyPath 라인 draw-in 2.4s
- 호버: 언더라인 grow, 화살표 translate-x, 책 들림

## 6. 컴포넌트

`JourneyPath`(여정 곡선) · `UntanglePath`(엉킴→풀림 곡선) · `ProcessSteps`(노드 타임라인) ·
`StatStrip` · `FeatureCard`(하이라인) · `Button` · `SectionTitle`.
(`BookShelf`/`LibrarySection`은 `UntangleSection`으로 교체되어 미사용 보관.
 v3의 `MetaBar`/`TOCList`/`SpecTable`/`ContentsSection`도 미사용 보관.)

### 6.1 UntanglePath — 엉킨 길이 풀리는 곡선 (레퍼런스 핵심)

`components/ui/UntanglePath.tsx` — 한 가닥의 테라코타 선이 **왼쪽의 빽빽한 매듭
(엉킴·번아웃)** 에서 시작해 느슨한 물결을 거쳐 **오른쪽의 또렷한 직선 + 화살표
(회복·자립)** 로 풀려나간다. 스크롤 진입 시 `path-draw-long`(stroke-dashoffset,
3.2s)으로 엉킨 쪽→깔끔한 쪽으로 **그려지듯 풀림**. 홈 `UntangleSection`(07).
양 끝에 손글씨/라벨(`막막함·번아웃` / `회복·자립 →`).

## 7. 브레이크포인트 (Tailwind 기본)

| 이름 | 폭 |
|------|-----|
| sm | 640 / md 768 / lg 1024 / xl 1280 |
