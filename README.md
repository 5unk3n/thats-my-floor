# That's My Floor

<!-- TODO: 아키텍처 이미지 추가하기~ -->

## 핵심 기능

### 1. 공연 정보 제공

- **공연 목록 조회**: 국내/내한/페스티벌 분류별 필터링
- **공연 검색**: MusicBrainz 기반 퍼지 검색 (`pg_trgm`)
- **공연 상세 정보**: 포스터, 공연명, 날짜, 장소, 아티스트, 예매처 링크
- **공연 캘린더**: 월별 공연 일정 시각화

### 2. 알림 서비스

- **공연 등록 알림**: 팔로우한 아티스트의 신규 공연 등록 시 알림
- **알림 설정**: 사용자별 알림 on/off 커스터마이징

### 3. 아티스트 팔로우

- 관심 아티스트 팔로우/언팔로우
- 팔로우한 아티스트 목록 관리

### 4. Last.fm 연동

- OAuth 2.0 인증
- 사용자 청취 기록 기반 아티스트 자동 추천
- 선택한 아티스트 일괄 팔로우

### 5. 관리자

- **공연 데이터 정제**: AI 기반 아티스트 자동 분석 및 매칭 파이프라인
- **데이터 관리 대시보드**: 공연 상태 관리 (Draft -> Analyzing -> Reviewing -> Published)

## 기술 스택

### Frontend

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand, React Query
- **PWA**: @serwist/next

### Backend

- **API Routes**: Next.js API Routes
- **Authentication**: NextAuth.js
- **External APIs**: KOPIS, Last.fm, Spotify, Perplexity

### Database & Storage

- **Database**: PostgreSQL
- **ORM**: Prisma
- **Object Storage**: Cloudflare R2

### Infrastructure

- **Hosting**: Azure (VM + Docker)
- **CI/CD**: GitHub Actions
- **Testing**: Vitest
- **Notifications**: Firebase Cloud Messaging

## 문서

더 자세한 내용은 아래 문서들을 참고해주세요.

- [프로젝트 구조](docs/project-structure.md)
- [인프라 구조](docs/infrastructure.md)
- [데이터베이스 구조](docs/database-architecture.md)
- [배포 전략](docs/deployment-strategy.md)
