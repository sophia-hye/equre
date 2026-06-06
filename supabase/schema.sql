-- ============================================================
-- equre — Supabase schema
-- Supabase 대시보드 > SQL Editor 에 붙여넣고 실행하세요.
-- (모든 테이블은 equre_ 접두어 사용)
-- ============================================================

-- 1) 프로필 테이블 (auth.users 1:1, 역할/이름 보관)
create table if not exists public.equre_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.equre_profiles enable row level security;

-- 본인 프로필만 조회/수정 가능 (관리자 작업은 서버의 service role 키로 처리)
drop policy if exists "read own profile" on public.equre_profiles;
create policy "read own profile"
  on public.equre_profiles for select
  using (auth.uid() = id);

drop policy if exists "update own profile" on public.equre_profiles;
create policy "update own profile"
  on public.equre_profiles for update
  using (auth.uid() = id);

-- 2) 회원가입 시 프로필 자동 생성 트리거
create or replace function public.equre_handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.equre_profiles (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'name', '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.equre_handle_new_user();

-- 3) 신청서(Application Form) 테이블
--    admin이 요청(requested) → 회원이 작성/제출(submitted) → admin이 발송(sent)
create table if not exists public.equre_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  status text not null default 'requested'
    check (status in ('requested', 'submitted', 'sent')),
  data jsonb not null default '{}'::jsonb,
  requested_at timestamptz not null default now(),
  submitted_at timestamptz,
  sent_to text,
  sent_at timestamptz
);

create index if not exists equre_applications_user_idx
  on public.equre_applications (user_id);

alter table public.equre_applications enable row level security;

-- 회원은 본인 신청서만 조회 (관리자 작업은 서버 service role로 처리)
drop policy if exists "read own application" on public.equre_applications;
create policy "read own application"
  on public.equre_applications for select
  using (auth.uid() = user_id);

-- 회원은 발송 전(requested/submitted)인 본인 신청서만 수정 가능
drop policy if exists "update own application" on public.equre_applications;
create policy "update own application"
  on public.equre_applications for update
  using (auth.uid() = user_id and status <> 'sent');

-- ============================================================
-- 4) 관리자 지정 (회원가입 후 1회 실행)
--    아래 이메일을 본인 관리자 계정으로 바꾼 뒤 실행하세요.
-- ============================================================
-- update public.equre_profiles set role = 'admin' where email = 'admin@equre.com';
