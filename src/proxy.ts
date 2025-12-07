import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default function proxy(request: NextRequest) {
  // 1. 보안 헤더 추가 (Security Headers)
  const headers = new Headers(request.headers);
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // 2. 인증 리다이렉트 (Lightweight Auth Check)
  // NextAuth 기본 쿠키 이름 확인 (프로덕션/개발 환경 대응)
  const hasSession = 
    request.cookies.has('next-auth.session-token') || 
    request.cookies.has('__Secure-next-auth.session-token');
    
  // 보호된 경로 정의
  const protectedPaths = ['/mypage', '/api/artists/follow'];
  const isProtected = protectedPaths.some((path) => 
    request.nextUrl.pathname.startsWith(path)
  );

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
