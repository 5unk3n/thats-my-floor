'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { connectLastFmAction, disconnectLastFmAction } from '@/features/auth/server/actions';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

interface LastFmConnectProps {
  initialUsername?: string | null;
  apiKey: string;
}

export function LastFmConnect({ initialUsername, apiKey }: LastFmConnectProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);
  const [username, setUsername] = useState<string | null | undefined>(initialUsername);

  useEffect(() => {
    const handleConnect = async (token: string) => {
      setIsConnecting(true);
      try {
        await connectLastFmAction(token);
        toast.success('Last.fm 계정이 성공적으로 연결되었습니다.');
        // Remove token from URL
        router.replace('/mypage');
      } catch (error) {
        console.error(error);
        toast.error('계정 연결에 실패했습니다.');
      } finally {
        setIsConnecting(false);
      }
    };

    const token = searchParams.get('token');
    if (token && !username && !isConnecting) {
      handleConnect(token);
    }
  }, [searchParams, username, isConnecting, router]);

  const handleDisconnect = async () => {
    if (!confirm('Last.fm 계정 연결을 해제하시겠습니까?')) return;

    try {
      await disconnectLastFmAction();
      setUsername(null);
      toast.success('연결이 해제되었습니다.');
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('연결 해제 실패');
    }
  };

  const handleLoginClick = () => {
    // Current URL as callback
    const callbackUrl = window.location.origin + '/mypage';
    window.location.href = `http://www.last.fm/api/auth/?api_key=${apiKey}&cb=${callbackUrl}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Last.fm 연동</CardTitle>
        <CardDescription>
          Last.fm 계정을 연결하여 좋아하는 아티스트 정보를 동기화하세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {username ? (
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">연결된 계정</p>
              <p className="text-sm text-muted-foreground">{username}</p>
            </div>
            <Button variant="outline" onClick={handleDisconnect}>
              연결 해제
            </Button>
          </div>
        ) : (
          <Button onClick={handleLoginClick} disabled={isConnecting} className="w-full">
            {isConnecting ? '연결 중...' : 'Last.fm 계정 연결'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
