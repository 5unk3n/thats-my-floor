# 공연 알림 서비스 - 프로젝트 개요

## 프로젝트 정보

- **프로젝트명**: 공연 알림 서비스 (Concert Notification Service)
- **기술 스택**: Next.js (App Router)
- **핵심 가치**: Next.js 서버 컴포넌트/SSR/SEO 이해 + AI 활용 서비스

---

## 프로젝트 배경 및 목적

### 배경

- 좋아하는 아티스트의 공연 정보를 일일이 확인해야 하는 불편함
- 티켓 오픈 일정을 놓쳐서 예매에 실패하는 경험
- 여러 예매 사이트를 돌아다니며 정보를 찾아야 하는 번거로움

### 목적

1. **사용자 가치**: 팔로우한 아티스트의 공연 정보와 티켓팅 일정을 자동으로 알림
2. **기술 학습**: Next.js의 서버 컴포넌트, 서버 액션, SSR, SEO 최적화 경험
3. **AI 활용**: Spotify 연동을 통한 개인화된 아티스트 추천 및 셋리스트 자동 생성

---

## 핵심 기능

### 1. 공연 정보 제공

- **공연 목록 조회**
  - 오픈예정/예매중 필터링
  - 지역별 (서울, 부산, 대구 등)
  - 장르별 (록, 재즈, 힙합, 클래식 등)
- **공연 검색**
  - 공연명 및 아티스트명 통합 검색
  - 실시간 자동완성
- **공연 상세 정보**
  - 포스터, 공연명, 날짜, 장소, 아티스트
  - 티켓팅 일정
  - 예매처 링크 (인터파크, 멜론티켓, 예스24 등)
  - 추천 셋리스트

### 2. 알림 서비스

- **티켓팅 시작 알림**: 팔로우한 아티스트의 티켓 오픈 시 푸시 알림
- **공연 등록 알림**: 팔로우한 아티스트의 신규 공연 등록 시 알림
- **알림 설정**: 사용자별 알림 on/off 커스터마이징

### 3. 아티스트 팔로우

- 관심 아티스트 팔로우/언팔로우
- 팔로우한 아티스트 목록 관리
- 팔로우 기반 맞춤형 공연 캘린더

### 4. Spotify 연동

- OAuth 2.0 인증
- 사용자 플레이리스트 기반 아티스트 자동 추천
- 셋리스트 트랙 Spotify 재생 기능

### 5. 공연 캘린더

- 월별 공연 일정 시각화
- 전체 공연 / 팔로우한 아티스트 공연 필터링

---

## 기술 스택

### Frontend

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (UI 상태), React Query (서버 데이터 캐싱)
- **UI Components**: Shadcn/ui

### Backend

- **API Routes**: Next.js API Routes
- **Authentication**: NextAuth.js (Google, Kakao OAuth, Spotify Refresh Token)
- **External APIs**:
  - kOPIS API (공연 정보)
  - Spotify Web API (음악 재생, 플레이리스트)

### Database & Storage

- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma

### Infrastructure

- **Hosting**: Azure (VM + Docker)
- **CI/CD**: GitHub Actions
- **Notifications**: Firebase Cloud Messaging (FCM)
- **Monitoring**: AWS CloudWatch / Sentry

---

## 시스템 아키텍처

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       ↓
┌─────────────────────────────────────┐
│   Frontend (Next.js App Router)     │
│   - Server Components (SSR)         │
│   - Client Components (Interactivity)│
│   - Server Actions (Form Handling)  │
└──────────────┬──────────────────────┘
               │
               ↓
┌──────────────────────────────────────┐
│   Backend (Next.js API Routes)       │
│   - Authentication (NextAuth)        │
│   - Business Logic                   │
│   - External API Integration         │
└──────┬───────────────────────┬───────┘
       │                       │
       ↓                       ↓
┌─────────────┐         ┌─────────────┐
│  Database   │         │ External    │
│ (Supabase)  │         │ APIs        │
│             │         │ - kOPIS     │
│ - Users     │         │ - Spotify   │
│ - Concerts  │         │ - FCM       │
│ - Artists   │         └─────────────┘
│ - Follows   │
└─────────────┘
```

---

## 데이터 소스

### 1. kOPIS API (공연예술통합전산망)

- **제공 정보**: 공연 목록, 상세 정보, 시설 정보
- **활용**: 공연 데이터 수집 및 동기화
- **API 문서**: http://www.kopis.or.kr/por/cs/openapi/openApiList.do

### 2. Spotify Web API

- **제공 정보**: 아티스트 정보, 트랙 정보, 플레이리스트
- **활용**: 사용자 플레이리스트 분석, 셋리스트 재생
- **API 문서**: https://developer.spotify.com/documentation/web-api

---

## 주요 사용자 시나리오

### 시나리오 1: 신규 사용자 온보딩

1. 사용자가 구글/카카오 소셜 로그인
2. Spotify 연동 권장 (선택 사항)
3. Spotify 플레이리스트 기반 아티스트 자동 추천
4. 관심 아티스트 팔로우
5. 알림 설정 (티켓팅, 공연 등록)

### 시나리오 2: 공연 탐색 및 예매

1. 홈 화면에서 공연 목록 조회 (지역별/장르별 필터)
2. 검색창에서 아티스트명 입력 (자동완성)
3. 공연 상세 페이지 확인 (포스터, 일정, 장소)
4. 예매처 링크 클릭하여 외부 사이트로 이동
5. 티켓 구매

### 시나리오 3: 알림 수신 및 대응

1. 백그라운드 스케줄러가 kOPIS API에서 신규 공연 감지
2. 팔로우한 아티스트의 공연 등록 확인
3. 알림 설정한 사용자에게 푸시 알림 전송
4. 사용자가 알림 클릭 → 공연 상세 페이지 이동
5. 예매 진행

### 시나리오 4: 셋리스트 재생

1. 공연 상세 페이지에서 "셋리스트" 탭 클릭
2. 과거 공연 기록 기반 추천 셋리스트 표시
3. "전체 재생" 버튼 클릭
4. Spotify Web Player에서 플레이리스트 재생
5. 곡별 개별 재생 가능

---

## 개발 우선순위

### Phase 1: MVP (4주)

- [ ] 프로젝트 초기 설정 (Next.js, TypeScript, Tailwind)
- [ ] 소셜 로그인 (Google, Kakao)
- [ ] kOPIS API 연동 및 공연 목록 표시
- [ ] 공연 상세 페이지
- [ ] 아티스트 팔로우 기능
- [ ] 기본 UI/UX (홈, 검색, 상세)

### Phase 2: 알림 시스템 (2주)

- [ ] Firebase Cloud Messaging 설정
- [ ] 백그라운드 스케줄러 (Vercel Cron Jobs)
- [ ] 티켓팅 알림 기능
- [ ] 공연 등록 알림 기능
- [ ] 마이페이지 알림 설정

### Phase 3: Spotify 연동 (2주)

- [ ] Spotify OAuth 인증
- [ ] 플레이리스트 분석 및 아티스트 추천
- [ ] 셋리스트 데이터 모델링
- [ ] Spotify Web Playback SDK 통합
- [ ] 셋리스트 재생 기능

### Phase 4: 고도화 (2주)

- [ ] 공연 캘린더 뷰
- [ ] 검색 자동완성 최적화
- [ ] SEO 최적화 (메타태그, OG 이미지)
- [ ] 성능 최적화 (이미지 최적화, 코드 스플리팅)
- [ ] 에러 처리 및 로깅

---

## 성공 지표

### 기술적 목표

- Lighthouse 성능 점수 90+ (Performance, SEO)
- 첫 화면 로딩 시간 1초 이내 (FCP)
- 서버 컴포넌트 활용률 70% 이상
- TypeScript 타입 커버리지 90% 이상

### 기능적 목표

- 알림 전송 성공률 95% 이상
- 공연 정보 동기화 주기 1시간 이내

---

## 참고 자료

### 공식 문서

- Next.js: https://nextjs.org/docs
- kOPIS API: http://www.kopis.or.kr/por/cs/openapi/openApiList.do
- Spotify Web API: https://developer.spotify.com/documentation/web-api
- Firebase FCM: https://firebase.google.com/docs/cloud-messaging

### 관련 프로젝트

- Setlist.fm (셋리스트 데이터베이스 참고)
- Bandsintown (공연 알림 서비스 벤치마킹)

---

## 라이선스 및 고지사항

- 이 프로젝트는 포트폴리오 목적의 비상업적 프로젝트입니다
- kOPIS API 이용 시 공연예술통합전산망 이용약관 준수
- Spotify API 이용 시 Spotify Developer Terms of Service 준수
- 공연 포스터 및 이미지 저작권은 각 공연 주최측에 있음
