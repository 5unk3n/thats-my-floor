# 공연 알림 서비스 - API 및 Server Actions 명세서

## 문서 정보

- **문서명**: API 및 Server Actions 명세서
- **프로젝트**: 공연 알림 서비스
- **버전**: v1

---

## 개요

본 프로젝트는 **Next.js Server Actions**를 주된 데이터 통신 방식으로 사용합니다.
따라서 전통적인 REST API 엔드포인트 대신, **Server Actions 함수 시그니처**와 **External Webhooks**를 정의합니다.

---

## 1. Server Actions (Internal)

클라이언트 컴포넌트에서 직접 호출하거나, 서버 컴포넌트에서 사용하는 함수들입니다.

### 1.1 인증 (Auth) - `features/auth/actions.ts`

- **`signIn(provider: 'google' | 'kakao')`**

  - 설명: NextAuth.js 소셜 로그인 개시
  - 반환: `Promise<void>` (리다이렉트)

- **`signOut()`**
  - 설명: 로그아웃 처리
  - 반환: `Promise<void>`

### 1.2 공연 (Concerts) - `features/concerts/actions.ts`

- **`getConcerts(params: GetConcertsParams)`**

  - 설명: 공연 목록 조회 (필터링, 페이징 포함)
  - 파라미터:
    ```typescript
    type GetConcertsParams = {
      page?: number;
      limit?: number;
      status?: 'open' | 'booking' | 'closed';
      region?: string;
      genre?: string;
    };
    ```
  - 반환: `Promise<{ data: Concert[], pagination: Pagination }>`

- **`getConcertDetail(id: string)`**
  - 설명: 공연 상세 정보 조회
  - 반환: `Promise<ConcertDetail>`

### 1.3 아티스트 (Artists) - `features/artists/actions.ts`

- **`toggleFollowArtist(artistId: string)`**

  - 설명: 아티스트 팔로우/언팔로우 토글
  - 인증: 필수
  - 반환: `Promise<{ isFollowing: boolean }>`

- **`getArtistDetail(id: string)`**
  - 설명: 아티스트 상세 정보 및 예정 공연 조회
  - 반환: `Promise<ArtistDetail>`

### 1.4 사용자 (Users) - `features/users/actions.ts`

- **`updateProfile(data: UpdateProfileData)`**

  - 설명: 사용자 프로필(이름, 이미지) 수정
  - 반환: `Promise<User>`

- **`updateNotificationSettings(settings: NotificationSettings)`**

  - 설명: 알림 설정 업데이트
  - 반환: `Promise<NotificationSettings>`

- **`registerFCMToken(token: string, platform: 'web' | 'android' | 'ios')`**
  - 설명: FCM 디바이스 토큰 등록
  - 반환: `Promise<void>`

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

---

## 3. 에러 처리 (Server Actions)

Server Actions는 `try-catch` 블록 내에서 실행되며, 에러 발생 시 표준화된 에러 객체를 반환하거나 `throw` 합니다.

```typescript
type ActionResponse<T> = {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
};
```
