# 내 IT 부캐 찾기 (My IT Alter-Ego MBTI)

8개의 질문으로 나의 MBTI 성향을 진단하고, 16가지 IT 직장인 페르소나 중 나와 꼭 맞는 유형을 찾아주는 트렌디한 웹 테스트입니다.

## 스택

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion (애니메이션)
- Supabase (결과 저장 + 실시간 참여자 수 카운팅)

## 시작하기

```bash
npm install
npm run dev
```

`http://localhost:3000` 에서 확인할 수 있습니다.

## Supabase 설정 (필수)

이 프로젝트는 테스트 결과 저장 및 실시간 참여자 수 카운팅을 위해 Supabase 테이블이 필요합니다.

1. [Supabase 대시보드](https://supabase.com/dashboard) → 해당 프로젝트(`ubovcczzbxcxdjjrhbyw`) 접속
2. 좌측 메뉴에서 **SQL Editor** 클릭
3. [`database/schema.sql`](database/schema.sql) 내용을 붙여넣고 실행
   - `mbti_results` 테이블 생성
   - RLS(Row Level Security) + 익명 사용자 insert/select 정책 설정
   - Realtime publication에 테이블 추가 (실시간 카운터 반영용)

테이블 생성 전에는 참여자 수가 `0`으로 표시되고, 결과 저장은 콘솔에 에러 로그만 남기며 조용히 무시됩니다(사용자 경험에는 영향 없음).

Supabase 프로젝트 URL과 Publishable Key는 별도의 `.env` 파일 없이 [`lib/supabaseClient.ts`](lib/supabaseClient.ts) 소스코드 내부에 직접 하드코딩되어 있습니다.

## 프로젝트 구조

```
app/
  page.tsx                 # 홈 (실시간 참여자 카운터 + CTA)
  quiz/page.tsx             # 8문항 퀴즈 (진행바, 페이드 전환, 결과 분석 로딩)
  result/[type]/page.tsx    # 결과 화면 (페르소나, 케미, 공유)
components/
  HomeClient.tsx            # 홈 실시간 카운터 (Supabase Realtime 구독)
  ProgressBar.tsx
  BackgroundDecor.tsx       # 트렌디한 그라디언트 블롭 배경
lib/
  questions.ts              # 8개 질문 + 선택지 데이터
  personas.ts                # 16가지 MBTI × IT 부캐 페르소나 데이터
  mbti.ts                    # 점수 계산 및 동점 처리(I,N,T,P 우선) 로직
  supabaseClient.ts          # Supabase URL/Key 하드코딩 + 클라이언트 초기화
  resultsApi.ts               # 결과 저장(insert) / 참여자 수 조회(count)
database/schema.sql          # DB 스키마 (Supabase SQL Editor에서 실행)
```

## 배포

GitHub 저장소: https://github.com/spartapm/my-mbti-app-2

Supabase 연동 정보가 소스코드에 하드코딩되어 있으므로 별도의 환경 변수 설정 없이 바로 빌드/배포할 수 있습니다.
