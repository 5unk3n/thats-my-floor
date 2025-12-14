'use client';

import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

interface SpotifyConnectProps {
  isConnected: boolean;
}

export default function SpotifyConnect({ isConnected }: SpotifyConnectProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>스포티파이 연동</span>
          {isConnected && (
            <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
              <Check className="w-3 h-3 mr-1" /> 연동됨
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isConnected ? (
          <>
            <p className="text-sm text-muted-foreground">
              스포티파이 계정과 연동되었습니다. 팔로우한 아티스트를 동기화하여 알림을 받아보세요.
            </p>
            <Button asChild className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-white">
              <Link href="/mypage/spotify-sync">
                아티스트 가져오기 <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              스포티파이 계정을 연동하면 내가 팔로우한 아티스트 정보를 쉽게 가져올 수 있습니다.
            </p>
            <Button
              onClick={() => signIn('spotify', { callbackUrl: '/mypage/spotify-sync' })}
              className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-white"
            >
              스포티파이 연동하기
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
