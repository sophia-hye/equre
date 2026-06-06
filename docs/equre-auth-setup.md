# equre 인증/관리자 설정 가이드 (Supabase)

로그인 · 회원가입 · 관리자 회원관리는 **Supabase**(PostgreSQL + Auth)로 동작합니다.
아래 4단계를 따라 키를 넣고 SQL을 실행하면 바로 작동합니다.

## 1. Supabase 프로젝트 생성
1. https://supabase.com 가입 → **New project** 생성 (무료 플랜 OK)
2. 비밀번호/리전 설정 후 프로젝트 생성 대기

## 2. 키 3개를 `.env.local` 에 넣기
프로젝트 > **Project Settings > API** 에서 값 복사:

```bash
cp .env.local.example .env.local
```
`.env.local` 에 채우기:
- `NEXT_PUBLIC_SUPABASE_URL` = Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon public key
- `SUPABASE_SERVICE_ROLE_KEY` = service_role key (**서버 전용, 절대 공개 금지**)

> `.env.local` 은 git에 커밋되지 않습니다.

## 3. DB 스키마 실행
Supabase 대시보드 > **SQL Editor** 에서 [`supabase/schema.sql`](../supabase/schema.sql)
전체를 붙여넣고 **Run**.
→ `equre_profiles` 테이블 + 가입 시 자동 프로필 생성 트리거 + RLS 정책이 생성됩니다.
(모든 테이블은 `equre_` 접두어를 사용합니다.)

## 4. 개발 중 이메일 확인 끄기 (선택, 권장)
가입 즉시 로그인되게 하려면:
**Authentication > Sign In / Providers > Email** 에서 **"Confirm email" 끄기**.
(켜두면 가입 후 이메일의 인증 링크를 눌러야 로그인됩니다.)

---

## 실행 & 관리자 지정
```bash
npm run dev   # http://localhost:3000
```
1. `/signup` 에서 본인 계정으로 회원가입
2. Supabase **SQL Editor** 에서 본인 이메일을 관리자로 지정:
   ```sql
   update public.equre_profiles set role = 'admin' where email = '본인이메일';
   ```
3. 다시 로그인하면 헤더에 **Admin** 메뉴가 보이고 `/admin` 에서 회원관리 가능

## 기능 요약
| 경로 | 설명 |
|------|------|
| `/signup` | 회원가입 (이름·이메일·비밀번호 8자+) |
| `/login` | 로그인 |
| `/mypage` | 회원 마이페이지 — 요청된 지원서 작성/제출 |
| `/admin` | 관리자 — 회원 목록 / 권한 변경 / 삭제 / **지원서 요청** |
| `/admin/applications/[id]` | 관리자 — 제출된 지원서 확인 + **이메일 발송** |

## 지원서(Application Form) 워크플로우
1. **관리자**가 `/admin` 회원 목록에서 특정 회원의 **"지원서 요청"** 클릭 → 해당 회원에게 작성 요청 생성
2. **회원**이 로그인 후 **`/mypage`** 에서 PDF 기반 지원서(인적사항·학력·비자 등)를 작성하고 **제출**
3. **관리자**가 회원 목록의 상태 링크(제출됨)를 눌러 `/admin/applications/[id]` 에서 내용 확인
   → **수신 이메일 입력 후 "보내기"** → 작성 내용이 해당 이메일로 발송되고 상태가 "발송 완료"로 변경

### 이메일 발송 (Resend) — 필수
- https://resend.com 가입 → **API Keys** 에서 키 발급 → `.env.local` 의 `RESEND_API_KEY` 에 입력
- `MAIL_FROM` 발신 주소 설정
- ⚠️ 도메인 인증 전에는 `onboarding@resend.dev` 발신 + **본인 가입 이메일로만** 테스트 발송됩니다.
  임의의 수신자에게 보내려면 Resend에서 **도메인 인증**(SPF/DKIM) 후 `MAIL_FROM` 을 해당 도메인 주소로 변경하세요.

## 보안 메모
- 비밀번호는 Supabase Auth가 해시 저장 (직접 저장 안 함)
- 세션은 httpOnly 쿠키(`@supabase/ssr`) + 미들웨어로 갱신
- 관리자 작업은 **서버에서 service_role 키**로만 수행하고, 매 요청마다 호출자의
  `role === 'admin'` 을 검증 (`/api/admin/*`)
- 본인 계정 삭제·본인 관리자 권한 해제는 차단
- `service_role` 키는 서버 전용(`lib/supabase/admin.ts`, `server-only`)이며 클라이언트 번들에 포함되지 않음

## 배포 (Vercel)
- Vercel 프로젝트 **Environment Variables** 에 동일한 키 3개 등록
- Supabase **Authentication > URL Configuration** 의 Site URL/Redirect URL에 배포 도메인 추가
