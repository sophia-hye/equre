-- equre Board CMS — 게시판(갤러리/뉴스/이벤트)
-- 주의: 기존 통합 인증 트리거/스키마는 건드리지 않는 독립 추가입니다.
-- Supabase SQL Editor에서 1회 실행하세요.

create table if not exists public.equre_board_posts (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('gallery', 'news', 'event')),
  title text not null,
  body text,
  images text[] not null default '{}',   -- 갤러리: 여러 장 / 뉴스·이벤트: 커버(선택)
  event_date date,                        -- 이벤트만
  published boolean not null default true,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id)
);

create index if not exists equre_board_posts_type_idx
  on public.equre_board_posts (type, created_at desc);

alter table public.equre_board_posts enable row level security;

-- 공개: 게시된 글만 읽기
drop policy if exists "board public read" on public.equre_board_posts;
create policy "board public read" on public.equre_board_posts
  for select using (published = true);

-- 관리자: 전체 읽기/쓰기 (equre_profiles.role = 'admin')
drop policy if exists "board admin all" on public.equre_board_posts;
create policy "board admin all" on public.equre_board_posts
  for all
  using (exists (select 1 from public.equre_profiles p
                 where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.equre_profiles p
                      where p.id = auth.uid() and p.role = 'admin'));

-- Storage: 'board' 버킷 (공개 읽기)
insert into storage.buckets (id, name, public)
values ('board', 'board', true)
on conflict (id) do nothing;

-- 관리자만 업로드/수정/삭제 (공개 버킷이라 읽기는 자동)
drop policy if exists "board storage admin insert" on storage.objects;
create policy "board storage admin insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'board' and exists (
    select 1 from public.equre_profiles p where p.id = auth.uid() and p.role = 'admin'));

drop policy if exists "board storage admin update" on storage.objects;
create policy "board storage admin update" on storage.objects
  for update to authenticated
  using (bucket_id = 'board' and exists (
    select 1 from public.equre_profiles p where p.id = auth.uid() and p.role = 'admin'));

drop policy if exists "board storage admin delete" on storage.objects;
create policy "board storage admin delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'board' and exists (
    select 1 from public.equre_profiles p where p.id = auth.uid() and p.role = 'admin'));
