# 공연 알림 서비스 - API 및 Server Actions 명세서

## 문서 정보

- **문서명**: API 및 Server Actions 명세서
- **프로젝트**: 공연 알림 서비스
- **버전**: v1.1

---

## 개요

본 프로젝트는 **Next.js Server Actions**를 주된 데이터 통신 방식으로 사용합니다.
모든 Server Actions와 DB 접근 로직은 각 기능(Feature) 폴더 내의 `server` 디렉토리 내에 위치합니다.

---

## 1. Server Actions (Internal)

클라이언트 컴포넌트에서 직접 호출하거나, `src/app`의 서버 페이지에서 사용하는 함수들입니다.

## 2. Server Actions를 사용하지 않는 인증/데이터 함수

### 1.1 인증 (Auth) - `features/auth/server/actions.ts`

(참고: 인증은 NextAuth.js의 `signIn`, `signOut`을 Client Component에서 주로 사용하거나, Server Action에서 래핑하여 사용합니다.)

- **`signIn(provider: 'google' | 'kakao')`**
  - 설명: NextAuth.js 소셜 로그인 개시
  - 반환: `Promise<void>` (리다이렉트)

- **`signOut()`**
  - 설명: 로그아웃 처리
  - 반환: `Promise<void>`

### 1.2 공연 (Concerts) - `features/concerts/server/actions.ts`

- **`getConcerts(params: GetConcertsParams)`**
  - 설명: 공연 목록 조회 (필터링, 페이징 포함)
  - 파라미터:
    ```typescript
    type GetConcertsParams = {
      page: number;
      size?: number;
      // region?: string; (Removed)
      type?: 'DOMESTIC' | 'VISIT' | 'FESTIVAL';
      startDate?: string;
      endDate?: string;
      keyword?: string;
    };
    ```
  - 반환: `Promise<Concert[]>`

### 2. Internal Data Access (Server Component Only)

> **Note**: 이 함수들은 Server Action이 아니며, Server Component에서 직접 호출하여 데이터를 조회합니다. (`db.ts`)

- **`getConcertDetail(id: string)`**
  - 설명: 공연 상세 정보 조회
  - 반환: `Promise<ConcertDetail>`

- **`getArtistDetail(id: string)`**
  - 설명: 아티스트 상세 정보 및 예정 공연 조회
  - 반환: `Promise<ArtistDetail>`

### 3. Server Actions (Client Callable)

#### A. Concerts (`features/concerts/server/actions.ts`)

- **`getConcerts(params)`**
  - 설명: 공연 목록 조회 (필터링 포함)
  - 반환: `Promise<Concert[]>`

- **`searchSpotifyArtistsAction(query: string)`**
  - 설명: 스포티파이 아티스트 검색 (Admin/Manual)
  - 반환: `Promise<Candidate[]>`

**Admin Pipeline Actions**

- **`requestAnalysisAction(concertId: string)`**
  - 설명: 공연 분석 요청 (Status: `ANALYZING`)
- **`runPipelineAction()`**
  - 설명: 분석 파이프라인 수동 실행
- **`publishConcertAction(concertId: string, candidates: Candidate[])`**
  - 설명: 공연 게시 및 아티스트 연결 (Status: `PUBLISHED`)
- **`rejectConcertAction(concertId: string)`**
  - 설명: 분석 반려 (Status: `REJECTED`)

#### B. Artists (`features/artists/server/actions.ts`)

- **`toggleFollow(artistId: string)`**
  - 설명: 아티스트 팔로우/언팔로우 토글
  - 인증: 필수
  - 반환: `Promise<boolean>`

- **`getFollowStatus(artistId: string)`**
  - 설명: 팔로우 여부 조회
  - 반환: `Promise<boolean>`

- **`getFollowedArtists()`**
  - 설명: 팔로우한 아티스트 목록 조회
  - 반환: `Promise<UserArtist[]>`

**Spotify Sync Actions**

- **`fetchMySpotifyArtistsAction(after?: string)`**
  - 설명: 내 스포티파이 계정의 팔로우 아티스트 가져오기
- **`syncSpotifyArtistsAction(artists: SpotifyArtist[])`**
  - 설명: 선택한 스포티파이 아티스트를 DB에 동기화 및 팔로우 처리

#### C. Users (`features/users/server/actions.ts`)

### 1.4 사용자 (Users) - `features/users/server/actions.ts`

- **`updateProfile(data: UpdateProfileData)`**
  - 설명: 사용자 프로필(이름, 이미지) 수정
  - 반환: `Promise<User>`

### 1.5 알림 (Notifications) - `features/notifications/server/actions.ts`

- **`getNotifications(page: number, limit: number)`**
  - 설명: 사용자 알림 목록 조회 (페이징)
  - 반환: `Promise<{ notifications: Notification[], total: number, ... }>`

- **`markAsRead(notificationId: number)`**
  - 설명: 개별 알림 읽음 처리
  - 반환: `Promise<void>`

- **`markAllAsRead()`**
  - 설명: 전체 알림 읽음 처리
  - 반환: `Promise<void>`

- **`getNotificationSettingsAction()`**
  - 설명: 알림 설정 조회
  - 반환: `Promise<NotificationSettings>`

- **`updateNotificationSettingsAction(settings: Partial<NotificationSettings>)`**
  - 설명: 알림 설정 업데이트
  - 반환: `Promise<void>`

### 1.6 FCM 토큰 등록 - `app/api/notifications/register/route.ts`

- **`POST /api/notifications/register`**
  - 설명: FCM 디바이스 토큰 등록
  - Body: `{ token: string, platform: 'web' | 'android' | 'ios' }`
  - 반환: `200 OK`

---

## 2. External API Routes (Webhooks & Callbacks)

외부 서비스(OAuth, 결제 등)와의 통신을 위한 라우트 핸들러입니다.

### 2.1 NextAuth 핸들러

- **`GET/POST /api/auth/[...nextauth]`**
  - 설명: NextAuth.js 인증 처리 (로그인, 콜백, 로그아웃)
  - 제공자: Google, Kakao, Spotify

### 2.2 Spotify Webhook (Optional)

- **`GET /api/webhooks/spotify`**
  - 설명: Spotify 데이터 동기화 트리거 (필요 시)

### 2.3 Cron Jobs (Scheduled Tasks)

- **`GET /api/cron/collect-concerts`**
  - 설명: 신규 공연 수집 및 알림 발송
  - 주기: 매일 오전 2시 (기본)
  - 인증: `CRON_SECRET` Bearer 토큰

- **`GET /api/cron/sync-concert-status`**
  - 설명: 기존 공연의 상태(status) 최신화 동기화
  - 대상: `endDate`가 현재 이후인 `PUBLISHED` 공연
  - 주기: 매일 오전 4시 (기본)
  - 인증: `CRON_SECRET` Bearer 토큰

---

## 3. 에러 처리 (Server Actions)

Server Actions는 `try-catch` 블록 내에서 실행되며, 에러 발생 시 표준화된 `ActionResponse` 객체를 반환합니다.

```typescript
// src/shared/types/action-response.ts

type ActionError = {
  code: string; // e.g., 'AUTH_001', 'SYS_500'
  message?: string;
};

type ActionResponse<T = void> =
  | { success: true; data: T; error?: never }
  | { success: false; data?: never; error: ActionError };
```

### 주요 에러 코드 (ERROR_CODES)

- `AUTH_001` (UNAUTHORIZED): 인증 필요
- `AUTH_003` (FORBIDDEN): 접근 권한 없음
- `DATA_001` (NOT_FOUND): 데이터 없음
- `VAL_001` (VALIDATION_ERROR): 유효성 검사 실패
- `SYS_500` (INTERNAL_SERVER_ERROR): 서버 내부 오류
