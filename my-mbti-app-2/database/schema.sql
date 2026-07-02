-- IT 부캐 찾기 MBTI 테스트 - Supabase 스키마
-- Supabase 대시보드 > SQL Editor 에서 아래 스크립트를 실행하세요.
-- (프로젝트: docs/supabase-info.md 참고 - ubovcczzbxcxdjjrhbyw)

create table if not exists public.mbti_results (
  id uuid primary key default gen_random_uuid(),
  mbti_type text not null,
  answers jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.mbti_results enable row level security;

-- 누구나(익명 포함) 결과를 저장할 수 있도록 허용
create policy "Allow public insert" on public.mbti_results
  for insert
  to anon
  with check (true);

-- 실시간 참여자 수 카운팅을 위해 누구나 읽을 수 있도록 허용
create policy "Allow public read" on public.mbti_results
  for select
  to anon
  using (true);

-- 실시간 카운터 갱신(postgres_changes)을 사용하려면 realtime publication에 테이블 추가
alter publication supabase_realtime add table public.mbti_results;
