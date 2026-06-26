-- ============================================================
-- 크로스 프로필: GCM/equre 어느 쪽에서 가입해도 양쪽 테이블에 행 생성
-- ============================================================
-- 기존 트리거(on_auth_user_created_equre / on_auth_user_created_gcm)는
-- 그대로 두고, "미러" 트리거만 추가한다. 각 가입의 본래 트리거가 자기
-- 테이블에 풀데이터를 넣고, 이 트리거가 반대편 테이블에 최소 행을 보장한다.
-- 모두 on conflict(id) do nothing → 중복/덮어쓰기 없음.
--
-- 안전장치:
--  - gcm_profiles.phone 에 UNIQUE 인덱스가 있어, 미러 insert에는 phone 을
--    넣지 않는다(충돌로 인한 가입 롤백 방지). phone 은 추후 채울 수 있음.
--  - 모든 NOT NULL 컬럼은 기본값이 있어 최소 insert가 실패하지 않는다.
--
-- Supabase 대시보드 > SQL Editor 에 붙여넣고 1회 실행.
-- ============================================================

create or replace function public.mirror_profiles_both()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  src text := coalesce(new.raw_user_meta_data ->> 'source', 'gcm');
  nm  text := coalesce(new.raw_user_meta_data ->> 'name', '');
begin
  -- equre_profiles 최소 행 (없을 때만)
  insert into public.equre_profiles (id, email, name, source)
  values (new.id, new.email, nm, src)
  on conflict (id) do nothing;

  -- gcm_profiles 최소 행 (없을 때만) — phone 은 unique 제약 회피 위해 생략
  insert into public.gcm_profiles (id, email, name, source)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'email', new.email),
    nm,
    src
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_mirror on auth.users;
create trigger on_auth_user_created_mirror
  after insert on auth.users
  for each row execute function public.mirror_profiles_both();

-- ============================================================
-- (선택) 기존 사용자 일괄 백필 — 이미 가입했지만 한쪽 행만 있는 사용자에게
--        반대편 최소 행을 만들어 준다. 한 번 실행하면 됨.
-- ============================================================
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
