'use client';

import { useState } from 'react';
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
import { Input } from '@/shared/components/ui/input';

export function LastFmSyncFetcher() {
  const [username, setUsername] = useState('');
  const [artists, setArtists] = useState<LastFmSyncArtist[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleFetch = async () => {
    if (!username.trim()) return;
    setLoading(true);
    try {
      const response = await fetchMyLastFmArtistsAction(username);
      if (response.success && response.data) {
        setArtists(response.data.artists);
        setSearched(true);
      } else {
        const err = (response as any).error;
        const errorMsg =
          typeof err === 'string'
            ? err
            : (err as { message: string })?.message || 'Failed to fetch';
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error(error);
      toast.error('오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!searched) {
    return (
      <Card className="w-full max-w-md mx-auto my-8">
        <CardHeader>
          <CardTitle>Last.fm 연동</CardTitle>
          <CardDescription>
            Last.fm 사용자 이름을 입력하여 탑 아티스트를 동기화하세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Last.fm Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
            />
            <Button onClick={handleFetch} disabled={loading}>
              {loading ? '불러오는 중...' : '조회'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">&apos;{username}&apos;의 Top Artists</h2>
        <Button variant="outline" onClick={() => setSearched(false)}>
          다른 계정 검색
        </Button>
      </div>
      <LastFmSyncList initialArtists={artists} />
    </div>
  );
}
