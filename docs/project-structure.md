# 공연 알림 서비스 - Next.js 프로젝트 구조

## 문서 정보

- **문서명**: Next.js App Router 프로젝트 구조
- **프로젝트**: 공연 알림 서비스
- **Framework**: Next.js 16 (App Router)

---

## 디렉토리 구조

```
concert-notification-service/
├── .next/
├── public/
├── src/
│   ├── app/                    # Next.js App Router (Routing only)
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (main)/
│   │   │   ├── page.tsx
│   │   │   ├── concerts/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── artists/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── mypage/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── api/                # External Webhooks only (e.g. Payment, Auth callbacks)
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   └── webhooks/
│   │   │       └── spotify/
│   │   │           └── route.ts
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── providers.tsx
│   ├── features/               # 기능 단위 모듈 (Domain Logic)
│   │   ├── auth/
│   │   │   ├── components/     # Auth 전용 컴포넌트 (LoginForm)
│   │   │   ├── actions.ts      # Auth Server Actions (login, logout)
│   │   │   └── hooks/
│   │   ├── concerts/
│   │   │   ├── components/     # Concert 전용 컴포넌트 (ConcertCard)
│   │   │   ├── actions.ts      # Concert Server Actions (getConcerts)
│   │   │   ├── service.ts      # DB 로직 (Prisma)
│   │   │   └── types.ts
│   │   ├── artists/
│   │   │   ├── components/
│   │   │   ├── actions.ts
│   │   │   └── service.ts
│   │   └── notifications/
│   │       ├── components/
│   │       └── actions.ts
│   ├── shared/                 # 여러 기능에서 공통으로 쓰이는 모듈
│   │   ├── components/         # 재사용 가능한 UI (Button, Modal)
│   │   │   ├── ui/             # Shadcn UI 등
│   │   │   └── layout/         # Header, Footer, Sidebar
│   │   ├── hooks/              # 공통 훅 (useDebounce)
│   │   ├── lib/                # 공통 유틸 (date-fns, prisma client)
│   │   └── types/              # 공통 타입 (API Response)
│   ├── middleware.ts
│   └── env.mjs
├── prisma/
│   └── schema.prisma
├── tailwind.config.ts
├── package.json
└── README.md
```

---

## 주요 파일 설명

### 1. `src/app/layout.tsx` (루트 레이아웃)

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';

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

### 2. `src/app/providers.tsx` (클라이언트 Providers)

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

### 3. `src/app/(main)/page.tsx` (홈 - Server Component)

```typescript
import { getConcerts } from '@/features/concerts/actions'; // Server Action 직접 호출
import ConcertList from '@/features/concerts/components/ConcertList';
import SearchBar from '@/shared/components/forms/SearchBar';

export default async function HomePage({
  searchParams,
}: {
  searchParams: { page?: string; status?: string; region?: string };
}) {
  // API 호출 대신 Server Action을 함수처럼 직접 호출
  const concerts = await getConcerts({
    page: Number(searchParams.page) || 1,
    status: searchParams.status,
    region: searchParams.region,
  });

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>공연 목록</h1>
      <SearchBar />
      <ConcertList concerts={concerts} />
    </main>
  );
}
```

### 4. `src/middleware.ts` (인증 미들웨어)

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  // 보호된 경로 체크
  const protectedPaths = ['/mypage', '/api/artists/*/follow'];
  const isProtected = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token) {
    try {
      await verifyJWT(token);
    } catch (error) {
      // 토큰 만료 또는 유효하지 않음
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/mypage/:path*', '/api/:path*'],
};
```

### 5. `src/features/concerts/actions.ts` (Server Actions)

```typescript
'use server'; // Server Action 선언

import prisma from '@/shared/lib/prisma';
import { kopisClient } from '@/external/kopis';

export async function getConcerts(params: {
  page: number;
  limit?: number;
  status?: string;
  region?: string;
  genre?: string;
}) {
  const { page = 1, limit = 20, status, region, genre } = params;

  const where = {
    ...(status && { ticketStatus: status }),
    ...(region && { region }),
    ...(genre && { genre }),
  };

  const [concerts, total] = await Promise.all([
    prisma.concert.findMany({
      where,
      include: {
        artist: true,
      },
      orderBy: { date: 'asc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.concert.count({ where }),
  ]);

  // Server Action은 직렬화 가능한 데이터만 반환해야 함
  return {
    data: concerts,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    },
  };
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

---

## 환경변수 (.env.local)

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/concert_notification"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
KAKAO_CLIENT_ID="your-kakao-client-id"
KAKAO_CLIENT_SECRET="your-kakao-client-secret"

# Spotify API
SPOTIFY_CLIENT_ID="your-spotify-client-id"
SPOTIFY_CLIENT_SECRET="your-spotify-client-secret"
SPOTIFY_REDIRECT_URI="http://localhost:3000/api/spotify/callback"

# kOPIS API
KOPIS_API_KEY="your-kopis-api-key"

# Firebase Cloud Messaging
FCM_SERVER_KEY="your-fcm-server-key"

# Vercel (Production)
NEXT_PUBLIC_BASE_URL="https://your-domain.com"
```

---

## 개발 가이드라인

### 1. Server Component 우선

- 가능한 한 Server Component 사용
- 클라이언트 상호작용이 필요한 부분만 Client Component로 분리

### 2. 데이터 페칭

- Server Component: **Server Actions** 직접 호출 (`await getConcerts(...)`)
- Client Component: `useQuery`와 **Server Actions** 조합
  ```typescript
  // 예시
  useQuery({
    queryKey: ['concerts'],
    queryFn: () => getConcertsAction({ page: 1 }),
  });
  ```

### 3. 타입 안전성

- 모든 함수, 컴포넌트에 TypeScript 타입 명시
- Prisma 스키마에서 타입 자동 생성

### 4. 코드 스타일

- ESLint + Prettier 사용
- Commit 전 `npm run lint` 실행

---

## 모듈 의존성 및 배치 가이드라인 (Strict Vertical Slices)

### 1. 엄격한 기능 간 경계 (Strict Boundaries)

이 프로젝트는 **기능(Feature) 간의 직접 참조를 금지**합니다.

- **규칙**: `features/A`는 `features/B`를 import 할 수 없습니다.
- **이유**: 기능 간 결합도를 낮추고, 각 기능을 독립적으로 유지보수하기 위함입니다.
- **해결 방법**:
  1.  **Shared로 이동**: 두 기능이 공유해야 하는 로직(UI, 유틸)은 `src/shared`로 이동합니다.
  2.  **상위 레벨 조합**: 두 기능의 조합이 필요한 경우, `src/app` (페이지) 또는 `src/hooks` (전역 훅)에서 조합합니다.

### 2. Import 규칙 (단방향 의존성)

의존성은 항상 **아래 방향**으로만 흘러야 합니다.

- `src/app` -> `src/features` (O)
- `src/features` -> `src/shared` (O)
- `src/app` -> `src/shared` (O)
- `src/features/A` -> `src/features/B` (**X 금지**)
- `src/shared` -> `src/features` (**X 금지**)

### 3. ESLint 설정 (`eslint-plugin-boundaries`)

이 규칙을 강제하기 위해 `eslint-plugin-boundaries`를 도입합니다.

```json
// .eslintrc.json 예시
{
  "plugins": ["boundaries"],
  "settings": {
    "boundaries/elements": [
      { "type": "app", "pattern": "src/app/*" },
      { "type": "feature", "pattern": "src/features/*" },
      { "type": "shared", "pattern": "src/shared/*" }
    ]
  },
  "rules": {
    "boundaries/element-types": [
      {
        "from": "feature",
        "disallow": ["feature"], // 다른 feature import 금지
        "message": "Feature 간의 직접 참조는 금지됩니다. Shared로 옮기거나 상위 레벨에서 조합하세요."
      }
    ]
  }
}
```
