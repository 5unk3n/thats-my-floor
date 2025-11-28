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
│   │   ├── [feature-name]/     # 예: auth, concerts, artists
│   │   │   ├── components/     # UI Components (Client/Server)
│   │   │   ├── hooks/          # Feature Hooks
│   │   │   ├── server/         # [Isolated] Server Actions & DB Logic
│   │   │   │   ├── actions.ts  # Public Server Actions
│   │   │   │   └── db.ts       # Internal DB Access
│   │   │   └── types.ts
│   ├── shared/                 # [Shared] 재사용 가능한 UI 및 유틸리티
│   │   ├── components/         # UI Library (Button, Modal etc.)
│   │   ├── hooks/              # Utility Hooks
│   │   └── lib/                # Utils (prisma, date-fns)
│   ├── middleware.ts
│   └── env.mjs
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

```typescript
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
```
