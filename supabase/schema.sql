-- eqüre — Supabase schema (equre_ 테이블만, GCM과 같은 DB 공유)
create table if not exists public.equre_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text, name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  phone text, contact_type text, contact_value text, user_type text,
  age_group text, gender text, region text, language text,
  interests jsonb not null default '[]'::jsonb,
  referral text, marketing_consent boolean not null default false,
  source text not null default 'equre',
  created_at timestamptz not null default now()
);
alter table public.equre_profiles add column if not exists source text not null default 'equre';
alter table public.equre_profiles enable row level security;
drop policy if exists "equre read own profile" on public.equre_profiles;
create policy "equre read own profile" on public.equre_profiles for select using (auth.uid() = id);
drop policy if exists "equre update own profile" on public.equre_profiles;
create policy "equre update own profile" on public.equre_profiles for update using (auth.uid() = id);

create table if not exists public.equre_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  status text not null default 'requested' check (status in ('requested','submitted','sent')),
  data jsonb not null default '{}'::jsonb,
  requested_at timestamptz not null default now(),
  submitted_at timestamptz, sent_to text, sent_at timestamptz
);
create index if not exists equre_applications_user_idx on public.equre_applications (user_id);
alter table public.equre_applications enable row level security;
drop policy if exists "equre read own application" on public.equre_applications;
create policy "equre read own application" on public.equre_applications for select using (auth.uid() = user_id);
drop policy if exists "equre update own application" on public.equre_applications;
create policy "equre update own application" on public.equre_applications for update
  using (auth.uid() = user_id and status <> 'sent');

-- 가입 트리거 — source='equre' 일 때만 (이름 분리로 GCM 트리거와 공존)
create or replace function public.equre_handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (new.raw_user_meta_data ->> 'source') = 'equre' then
    insert into public.equre_profiles (
      id, email, name, phone, contact_type, contact_value, user_type, age_group, gender,
      region, language, interests, referral, marketing_consent, source
    ) values (
      new.id, new.email,
      coalesce(new.raw_user_meta_data ->> 'name',''),
      new.raw_user_meta_data ->> 'phone',
      new.raw_user_meta_data ->> 'contact_type',
      new.raw_user_meta_data ->> 'contact_value',
      new.raw_user_meta_data ->> 'user_type',
      new.raw_user_meta_data ->> 'age_group',
      new.raw_user_meta_data ->> 'gender',
      new.raw_user_meta_data ->> 'region',
      new.raw_user_meta_data ->> 'language',
      coalesce(new.raw_user_meta_data -> 'interests','[]'::jsonb),
      new.raw_user_meta_data ->> 'referral',
      coalesce((new.raw_user_meta_data ->> 'marketing_consent')::boolean, false),
      'equre'
    ) on conflict (id) do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;        -- 구 공용 트리거 제거
drop trigger if exists on_auth_user_created_equre on auth.users;
create trigger on_auth_user_created_equre
  after insert on auth.users
  for each row execute function public.equre_handle_new_user();