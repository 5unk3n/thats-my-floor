import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function proxy(request: NextRequest) {
  // 1. 보안 헤더 추가 (Security Headers)
  const headers = new Headers(request.headers);
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // 2. 인증 리다이렉트 (Lightweight Auth Check)
  // getToken을 사용하여 토큰의 유효성 검증
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const hasSession = !!token;

  const isLoginPage = request.nextUrl.pathname === '/login';

  // 인증된 사용자가 로그인 페이지 접근 시 홈으로 리다이렉트
  if (isLoginPage && hasSession) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 보호된 경로 정의
  const protectedPaths = ['/mypage', '/api/artists/follow'];
  const isProtected = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  if (isProtected && !hasSession) {
    const loginUrl = new URL('/login', request.url);
    // 원래 가려던 페이지 정보를 쿼리 파라미터로 전달 (선택 사항)
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next({
    request: {
      headers,
    },
  });
}
