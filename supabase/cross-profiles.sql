-- ============================================================
-- 회원가입 → 프로필 생성 수정 + 크로스 프로필(양쪽 생성)
-- ------------------------------------------------------------
-- 원인: equre 가입 트리거가 라이브 DB에 배포되지 않아, equre 가입 시
--       auth.users 만 생기고 equre_profiles 가 만들어지지 않았음.
--
-- 이 파일을 Supabase SQL Editor 에 1회 실행하면:
--   0) equre_profiles 컬럼 보강 (있으면 skip)
--   1) equre 가입 트리거 배포 (source='equre' → equre_profiles 풀데이터)
--   2) 미러 트리거 추가 (어느 쪽에서 가입해도 양쪽 테이블에 행 보장)
--   3) 기존 사용자 백필
--
-- 기존 GCM 트리거(on_auth_user_created_gcm)는 이름/소스로 공존 — 건드리지 않음.
-- ============================================================

-- 0) equre_profiles 컬럼 보강 (트리거 insert 실패 방지, idempotent)
alter table public.equre_profiles add column if not exists email text;
alter table public.equre_profiles add column if not exists name text;
alter table public.equre_profiles add column if not exists phone text;
alter table public.equre_profiles add column if not exists contact_type text;
alter table public.equre_profiles add column if not exists contact_value text;
alter table public.equre_profiles add column if not exists user_type text;
alter table public.equre_profiles add column if not exists age_group text;
alter table public.equre_profiles add column if not exists gender text;
alter table public.equre_profiles add column if not exists region text;
alter table public.equre_profiles add column if not exists language text;
alter table public.equre_profiles add column if not exists interests jsonb not null default '[]'::jsonb;
alter table public.equre_profiles add column if not exists referral text;
alter table public.equre_profiles add column if not exists marketing_consent boolean not null default false;
alter table public.equre_profiles add column if not exists source text not null default 'equre';

-- 1) equre 가입 트리거 (source='equre' 일 때 풀데이터)
create or replace function public.equre_handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (new.raw_user_meta_data ->> 'source') = 'equre' then
    insert into public.equre_profiles (
      id, email, name, phone, contact_type, contact_value, user_type, age_group, gender,
      region, language, interests, referral, marketing_consent, source
    ) values (
      new.id, new.email,
      coalesce(new.raw_user_meta_data ->> 'name', ''),
      new.raw_user_meta_data ->> 'phone',
      new.raw_user_meta_data ->> 'contact_type',
      new.raw_user_meta_data ->> 'contact_value',
      new.raw_user_meta_data ->> 'user_type',
      new.raw_user_meta_data ->> 'age_group',
      new.raw_user_meta_data ->> 'gender',
      new.raw_user_meta_data ->> 'region',
      new.raw_user_meta_data ->> 'language',
      coalesce(new.raw_user_meta_data -> 'interests', '[]'::jsonb),
      new.raw_user_meta_data ->> 'referral',
      coalesce((new.raw_user_meta_data ->> 'marketing_consent')::boolean, false),
      'equre'
    ) on conflict (id) do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_equre on auth.users;
create trigger on_auth_user_created_equre
  after insert on auth.users
  for each row execute function public.equre_handle_new_user();

-- 2) 미러 트리거 — 어느 쪽 가입이든 반대편 테이블에 최소 행 보장
--    (full 트리거가 먼저 자기 테이블을 채우고, 미러는 빈 쪽만 채움)
--    gcm_profiles.phone 은 UNIQUE 라 미러 insert에서 생략(가입 롤백 방지).
create or replace function public.mirror_profiles_both()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  src text := coalesce(new.raw_user_meta_data ->> 'source', 'gcm');
  nm  text := coalesce(new.raw_user_meta_data ->> 'name', '');
begin
  insert into public.equre_profiles (id, email, name, source)
  values (new.id, new.email, nm, src)
  on conflict (id) do nothing;

  insert into public.gcm_profiles (id, email, name, source)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'email', new.email), nm, src)
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_mirror on auth.users;
create trigger on_auth_user_created_mirror
  after insert on auth.users
  for each row execute function public.mirror_profiles_both();

-- 3) 기존 사용자 백필 (한쪽만 있던 사용자에게 반대편 최소 행 생성)
insert into public.equre_profiles (id, email, name, source)
select u.id, u.email,
       coalesce(u.raw_user_meta_data ->> 'name', ''),
       coalesce(u.raw_user_meta_data ->> 'source', 'gcm')
from auth.users u
on conflict (id) do nothing;

insert into public.gcm_profiles (id, email, name, source)
select u.id,
       coalesce(u.raw_user_meta_data ->> 'email', u.email),
       coalesce(u.raw_user_meta_data ->> 'name', ''),
       coalesce(u.raw_user_meta_data ->> 'source', 'gcm')
from auth.users u
on conflict (id) do nothing;
