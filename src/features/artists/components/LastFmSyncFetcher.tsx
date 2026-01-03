'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import LastFmSyncList from '@/features/artists/components/LastFmSyncList';
import { fetchMyLastFmArtistsAction } from '@/features/artists/server/actions';
import { LastFmSyncArtist } from '@/features/artists/server/services/lastfm-sync.service';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';

export function LastFmSyncFetcher() {
  const [artists, setArtists] = useState<LastFmSyncArtist[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasAccount, setHasAccount] = useState(true);

  useEffect(() => {
    const loadArtists = async () => {
      try {
        const response = await fetchMyLastFmArtistsAction();
        if (response.success && response.data) {
          setArtists(response.data.artists);
          setHasAccount(true);
        } else {
          const err = response.error;
          const errorMessage = typeof err === 'string' ? err : err?.message;

          if (errorMessage && errorMessage.includes('연동된 Last.fm 계정이 없습니다')) {
            setHasAccount(false);
          } else {
            toast.error(errorMessage || 'Failed to fetch');
          }
        }
      } catch (error) {
        console.error(error);
        toast.error('오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadArtists();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!hasAccount) {
    return (
      <Card className="w-full max-w-md mx-auto my-8">
        <CardHeader>
          <CardTitle>Last.fm 연동 필요</CardTitle>
          <CardDescription>
            내 Top Artists를 가져오기 위해서는 Last.fm 계정 연동이 필요합니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button asChild className="bg-[#B90000] hover:bg-[#D51007] text-white">
            <Link href="/mypage?scrollTo=lastfm">마이페이지에서 연동하기</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">내 Top Artists</h2>
      </div>
      <LastFmSyncList initialArtists={artists} />
    </div>
  );
}
