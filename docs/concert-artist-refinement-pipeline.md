# Concert-Artist Refinement Pipeline (Architecture)

## 1. Overview

KOPIS 데이터의 한계(출연진 정보 부족/불명확)를 극복하기 위해 **AI 기반 자동 분석과 관리자 수동 검수(Human-in-the-Loop)**가 결합된 데이터 파이프라인을 구축합니다.

### Core Principles

1. **Lazy Creation**: 아티스트 데이터는 미리 구축하지 않고, 공연 분석 시점에 존재하지 않으면 생성합니다 (**MusicBrainz ID** 기준).
2. **Cost Efficiency**: 모든 공연을 분석하지 않고, 관리자가 **선별(Selection)**한 공연만 AI 파이프라인을 태워 API 비용을 절감합니다.
3. **Human-in-the-Loop**: AI는 후보군(Candidates)만 제안하며, 최종 매칭 및 발행 승인은 반드시 관리자가 수행합니다.
4. **Local First**: **내부 구축된 MusicBrainz DB**를 1차 정보원(Source of Truth)으로 사용합니다.

## 2. Workflow Levels

파이프라인은 크게 3단계의 Status Flow를 따릅니다.

```mermaid
graph TD
    A[Concert Collected (DRAFT)] -->|Admin Selection| B[ANALYZING]
    B -->|AI & Spotify API| C[REVIEWING]
    C -->|Admin Approval| D[PUBLISHED]
    C -->|Admin Reject| E[REJECTED]
```

### Phase 1: Selection (선별)

- **Input**: `Concert(status: DRAFT)`
- **Action**: 관리자가 수집된 공연 목록(`DRAFT`)을 검토합니다.
  - 유명 가수의 내한공연, 대형 페스티벌 등 "분석 가치가 있는" 공연을 선택합니다.
  - "분석 요청" 버튼을 클릭합니다.
- **Output**: `status` -> `ANALYZING` (Async Fire-and-Forget)

### Phase 2: Analysis (AI Pipeline)

- **Trigger**: `AnalysisService.runAnalysisPipeline` (Async call).
- **Step 1: AI Search (Perplexity/Sonar)**
  - Query: `"{공연명}" 출연진 및 아티스트 라인업 알려줘`
  - Result: 아티스트 이름 배열 (예: `['아이유', 'NewJeans']`)
- **Step 2: Verification (MusicBrainz Local Search)**
  - AI가 찾은 각 이름으로 **로컬 MusicBrainz DB 퍼지 검색 (`findArtistCandidates`)** 실행.
  - Top 5 후보군 추출 (유사도 및 인기도 기반 랭킹).
  - 유효성 검증(MBID 존재 여부, 메타데이터 확보).
- **Output**:
  - `analysisResult` JSON 필드에 후보군(MBID 포함) 저장.
  - `status` -> `REVIEWING`

### Phase 3: Review & Publish (검수 및 발행)

- **UI**: Admin Dashboard > Review Page
- **Action**:
  - Original Info(KOPIS)와 AI Candidates(Spotify)를 비교.
  - 정확한 아티스트를 선택(Check)하거나, AI가 틀렸다면 수동 검색(Manual Search)으로 아티스트 지정.
  - [승인 및 발행] 버튼 클릭.
- **System Logic**:
  1.  선택된 아티스트가 DB에 없으면 `Artist` 레코드 생성 (Lazy Creation).
  2.  `ConcertArtist` (N:M) 관계 연결.
  3.  `status` -> `PUBLISHED` 업데이트.
  4.  관심 유저(Followers)에게 알림 발송.

## 3. Data Schema

### Concert Model Update

```prisma
enum PublishStatus {
  DRAFT             // 1. 수집됨, 선별 전
  ANALYZING         // 2. 관리자가 분석 요청 & AI 분석 중
  REVIEWING         // 3. 분석 완료, 검수 대기
  PUBLISHED         // 4. 검수 완료 & 알림 발송됨
  REJECTED          // 5. 분석 반려 또는 보관
}

model Concert {
  // ... existing fields
  publishStatus PublishStatus @default(DRAFT)

  // AI 분석 결과 (Top N Candidates)
  // Schema: { candidates: [{ mbid: string, name: string, matchedName: string, imageUrl: string, ... }] }
  analysisResult Json?
}
```

## 4. Admin UI Strategy

- **Tabs**: 상태별로 탭을 나누어 관리.
  - `수집 대기(Draft)`: 선별 작업용.
  - `검수 대기(Reviewing)`: 매칭 작업용.
  - `발행 완료(Published)`: 이력 관리용.
- **Manual Fallback**:
  - AI 분석 실패 시, 관리자가 직접 검색창에 타이핑하여 **로컬 MusicBrainz DB**를 실시간 조회 및 선택할 수 있어야 함.
