# 공연 알림 서비스 - Next.js 프로젝트 구조

## 문서 정보

- **문서명**: Next.js App Router 프로젝트 구조
- **프로젝트**: 공연 알림 서비스
- **Framework**: Next.js 16 (App Router)
- **Architecture**: Feature-Sliced Design (Strict Vertical Slices)

---

## 디렉토리 구조 (요약)

```
concert-notification-service/
├── src/
│   ├── app/                    # [Composition Root] 페이지 조합 및 라우팅
│   │   ├── (auth)/             # 인증 관련 라우트 그룹
│   │   ├── (main)/             # 메인 앱 라우트 그룹
│   │   └── api/                # External Webhooks (NextAuth, Spotify)
│   ├── features/               # [Domain Logic] 기능별 격리된 모듈
│   │   ├── [feature-name]/     # 예: auth, concerts, artists, notifications, setlists
│   │   │   ├── components/     # UI Components (Client/Server)
│   │   │   ├── hooks/          # Feature Hooks
│   │   │   ├── server/         # [Isolated] Server Actions & DB Logic
│   │   │   │   ├── services/   # Business Logic Services (*.service.ts, Functional Style)
│   │   │   │   ├── actions.ts  # Public Server Actions
│   │   │   │   └── db.ts       # Internal DB Access
│   │   │   └── types.ts
│   ├── shared/                 # [Shared] 재사용 가능한 UI 및 유틸리티
│   │   ├── components/         # UI Library (Button, Modal etc.)
│   │   ├── hooks/              # Utility Hooks
│   │   ├── lib/                # Utils (prisma, date-fns, lru-cache)
│   │   └── providers/          # Global Providers (QueryClient, Session)
│   ├── types/                  # Global Types (declarations)
│   └── proxy.ts                # [Interceptor] Lightweight Request Proxy
├── prisma/
├── public/
└── ...config files
```

---

## 주요 파일 설명

### 1. `src/app/layout.tsx` (루트 레이아웃)

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/shared/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '공연 알림 서비스',
  description: '좋아하는 아티스트의 공연 정보를 놓치지 마세요',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### 2. `src/shared/providers/index.tsx` (클라이언트 Providers)

```typescript
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
```

### 3. `src/app/(main)/page.tsx` (홈 - Composition Example)

페이지 파일은 직접적인 로직을 수행하지 않고, Features의 컴포넌트와 Server Action을 **조합(Composition)**하는 역할만 수행합니다.

```typescript
import { getConcerts } from '@/features/concerts/server/actions'; // Server Action 호출
import ConcertList from '@/features/concerts/components/ConcertList';
import SearchBar from '@/shared/components/forms/SearchBar';

export default async function HomePage({
  searchParams,
}: {
  searchParams: { page?: string; status?: string; region?: string };
}) {
  // Feature의 Server Action 호출
  const concerts = await getConcerts({
    page: Number(searchParams.page) || 1,
    status: searchParams.status,
    region: searchParams.region,
  });

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>공연 목록</h1>
      {/* Shared Component */}
      <SearchBar />
      {/* Feature Component */}
      <ConcertList concerts={concerts} />
    </main>
  );
}
```

### 4. `src/proxy.ts` (요청 인터셉터)

Next.js 16의 새로운 Interceptor 파일로, 기존 Middleware를 대체합니다.
페이지가 렌더링되기 전에 요청을 가로채어 리다이렉트나 헤더 수정을 수행합니다.

**주요 역할**:

- **인증 리다이렉트**: 보호된 경로(`/mypage` 등) 접근 시 쿠키 확인 후 `/login`으로 이동
- **보안 헤더**: 응답에 `X-Frame-Options`, `X-Content-Type-Options` 등 보안 헤더 추가

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  // 1. 보안 헤더 추가
  const headers = new Headers(request.headers);
  headers.set('X-Content-Type-Options', 'nosniff');

  // 2. 인증 리다이렉트 (Lightweight)
  const isAuthenticated = request.cookies.has('auth-token');
  const isProtected = request.nextUrl.pathname.startsWith('/mypage');

  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next({
    request: {
      headers,
    },
  });
}
```

### 5. `src/features/concerts/server/actions.ts` (Server Actions)

DB 로직과 Server Action이 분리된 구조입니다.

```typescript
'use server';

import { getConcertsFromDB } from './db'; // Internal DB Logic

export async function getConcerts(params: {
  page: number;
  limit?: number;
  status?: string;
  region?: string;
  genre?: string;
}) {
  // Controller Logic: Validation, Auth Check etc.
  return await getConcertsFromDB(params);
}
```

---

## 라우트 그룹 설명

### `(auth)` - 인증 관련 라우트

- 인증 페이지에만 적용되는 레이아웃 (중앙 정렬, 배경 등)
- 경로: `/login`

### `(main)` - 메인 앱 라우트

- 헤더, 네비게이션이 포함된 레이아웃
- 경로: `/`, `/concerts`, `/artists`, `/mypage`, `/calendar`

---

## Server Components vs Client Components

### Server Components (기본)

- 데이터 페칭이 필요한 페이지
- SEO가 중요한 페이지 (공연 상세, 아티스트 상세)
- 예: `app/(main)/concerts/[id]/page.tsx`

### Client Components (`'use client'`)

- 사용자 상호작용이 필요한 컴포넌트
- 상태 관리, 이벤트 핸들러 사용
- 예: `SearchBar`, `FollowButton`, `Modal`

## 개발 가이드라인 및 아키텍처 규칙

### 1. Server Isolation (서버 로직 격리)

- **규칙**: 모든 DB 접근(Prisma)과 Server Actions는 반드시 `features/[feature]/server/` 디렉토리 안에 위치해야 합니다.
- **목적**: 클라이언트 번들에 서버 코드가 포함되는 것을 방지하고, 코드의 실행 위치를 명확히 합니다.

### 2. ESLint Boundaries (엄격한 의존성 관리)

`.eslintrc.json`을 통해 다음 규칙을 강제합니다.

- **Shared**: `features`를 참조할 수 없음. 오직 다른 `shared` 모듈만 참조 가능.
- **Features**: 다른 `feature`를 직접 import 할 수 없음. (예: `concerts`에서 `artists` import 금지).
- **App**: `features`와 `shared`를 모두 import 하여 조합(Composition) 가능.

### 3. Feature Composition (기능 조합)

기능 간의 의존성이 필요한 경우(예: 공연 상세에 아티스트 카드 표시), 직접 import 대신 **Page 레벨 조합**을 사용합니다.

````typescript
// src/app/(main)/concerts/[id]/page.tsx
// Page 파일이 '접착제' 역할을 하여 두 기능을 조합
import { ConcertDetail } from '@/features/concerts/components';
import { ArtistCard } from '@/features/artists/components';

export default function Page() {
  return (
    <ConcertDetail>
      <ArtistCard />
    </ConcertDetail>
  );
}

### 4. Server Layer Roles & Guidelines (서버 계층 역할 및 규칙)

Vertical Slice 아키텍처 내에서 서버 모듈들의 역할과 책임을 명확히 합니다.

#### A. Data Access Layer (`features/*/server/db.ts`)
- **역할**: 순수 데이터베이스 접근 (Repository Pattern).
- **규칙**:
  - **Functional Style**: `export const findUser = ...` 형태로 개별 함수 내보내기 (Class/Object 지양).
  - **No Business Logic**: 복잡한 로직이나 데이터 가공 금지. ORM이 반환하는 Raw Data 반환.
  - **No Caching**: `use cache` 사용 금지. (Service 계층이 캐싱 정책을 결정해야 함).
  - **Function Naming**:
    - 조회: `find...`, `count...`, `exists...` (예: `findUserById`, `countAllConcerts`) - `get` 대신 `find` 사용 권장 (DB 검색 의미).
    - 변경: `create...`, `update...`, `delete...` (CRUD 명확화).

#### B. Service Layer (`features/*/server/services/*.service.ts`)
- **역할**: 비즈니스 로직, **캐싱(`use cache`)**, 오케스트레이션.
- **명명 규칙**:
  - 핵심 도메인 로직: `[feature].service.ts` (예: `concert.service.ts`, `user.service.ts`)
  - 보조 역할 로직: `[role].service.ts` (예: `collector.service.ts`, `sync.service.ts`)
- **규칙**:
  - **Caching**: 조회(Read) 로직에 `'use cache'` 및 `cacheTag` 적용 권장.
  - **Orchestration**: 여러 DB 함수를 조합하거나 트랜잭션 단위 관리.
  - **Logic**: 데이터 가공, 기본값 설정, 외부 API 통신 등 수행.
  - **Function Naming**:
    - 조회 (캐싱/로직 포함): `get...` (예: `getConcertDetail`) - DB의 `find`와 구분.
    - 외부 API: `fetch...` (예: `fetchSpotifyArtists`).
    - 복합 로직: `sync...`, `process...`, `send...` (동사+목적어).

#### C. Server Actions (`features/*/server/actions.ts`)
- **역할**: 클라이언트 진입점 (Controller 역할), **캐시 무효화**.
- **규칙**:
  - **Entry Point**: `'use server'` 지시어 사용.
  - **Validation**: 사용자 입력값 검증 및 권한 체크.
  - **Delegation**: 비즈니스 로직은 직접 구현하지 않고 **Service Layer에 위임**.
  - **Revalidation**: 데이터 변경(Write) 완료 후 `revalidateTag` 호출로 캐시 갱신.
  - **Function Naming**:
    - 기본: `Verb` + `Noun` (예: `login`, `submitReview`).
    - 이름 충돌 방지: Service/DB 함수와 이름이 겹칠 경우 `...Action` 접미사 사용 권장 (예: `getConcertsAction`).
    - **Client에서만 호출됨을 명시**하기 위해 `Action` 접미사를 붙이는 패턴도 유효합니다.

#### D. Caching Strategy Q&A
- **Q. 단순한 DB 조회도 Service를 만들어야 하나요?**
  - **A.** 캐싱이 필요 없다면 Component나 Action에서 `db.ts`를 직접 호출해도 됩니다 (Short-circuiting 허용).
  - **A.** 단, **캐싱이 필요하다면 반드시 Service 함수로 감싸서(Wrapping)** `'use cache'`를 적용해야 합니다. `db.ts`에 직접 캐싱을 적용하지 마세요.

```

```
````
