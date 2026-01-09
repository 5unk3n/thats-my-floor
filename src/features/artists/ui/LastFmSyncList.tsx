'use client';

import { Check, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Checkbox } from '@/shared/ui/checkbox';

import { syncLastFmArtistsAction } from '../api/actions';
import { LastFmSyncArtist } from '../model/services/lastfm-sync.service';

interface SyncArtistListProps {
  initialArtists: LastFmSyncArtist[];
}

export default function LastFmSyncList({ initialArtists }: SyncArtistListProps) {
  const router = useRouter();
  const [artists] = useState<LastFmSyncArtist[]>(initialArtists);

  // Filter new artists (not already following)
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Allow selecting 'exists' (but not follow relation) and 'new'
  const availableArtists = artists.filter((a) => a.status !== 'following');

  // Multi-select handlers
  const handleToggle = (id: string) => {
    // Only map mbid or url as id?
    // In service we used mbid || url as ID.
    // Wait, LastFmSyncArtist extends LastFmTopArtist which has mbid and url.
    // But `artist.id` isn't standard in LastFmTopArtist.
    // The service mapped it?
    // Check service: `const result: LastFmSyncArtist[] = ...`
    // LastFmSyncArtist extends LastFmTopArtist.
    // LastFmTopArtist has name, mbid, url...
    // LastFmTopArtist has name, mbid, url...
    // I need to use `artist.mbid || artist.url` as the unique key.

    const targetId = id;
    setSelectedIds((prev) =>
      prev.includes(targetId) ? prev.filter((i) => i !== targetId) : [...prev, targetId]
    );
  };

  const getArtistId = (artist: LastFmSyncArtist) => artist.mbid || artist.url;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(availableArtists.map(getArtistId));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSync = async () => {
    if (selectedIds.length === 0) return;

    try {
      setIsSyncing(true);
      const targets = availableArtists.filter((a) => selectedIds.includes(getArtistId(a)));

      const result = await syncLastFmArtistsAction(targets);

      if (result.success && result.data) {
        toast.success(`${result.data.count}명의 아티스트를 팔로우했습니다.`);
        router.refresh();
        router.push('/mypage/artists'); // Go to followed artists page
      } else {
        toast.error('동기화에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      toast.error('오류가 발생했습니다.');
    } finally {
      setIsSyncing(false);
    }
  };

  if (artists.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">동기화할 아티스트가 없습니다.</div>
    );
  }

  const sortedArtists = [...artists].sort((a, b) => {
    const score = (status: string) => {
      if (status === 'new') return 1;
      if (status === 'exists') return 2;
      return 3;
    };
    return score(a.status) - score(b.status);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-card p-4 rounded-lg border sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            checked={selectedIds.length === availableArtists.length && availableArtists.length > 0}
            onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
            disabled={availableArtists.length === 0}
          />
          <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
            전체 선택 ({selectedIds.length} / {availableArtists.length})
          </label>
        </div>
        <Button onClick={handleSync} disabled={selectedIds.length === 0 || isSyncing}>
          {isSyncing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              동기화 중...
            </>
          ) : (
            `선택한 아티스트 팔로우 (${selectedIds.length})`
          )}
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedArtists.map((artist) => {
          const isFollowing = artist.status === 'following';
          const artId = getArtistId(artist);
          const isSelected = selectedIds.includes(artId);

          return (
            <Card
              key={artId}
              className={`relative overflow-hidden transition-all ${
                isSelected ? 'ring-2 ring-primary' : ''
              } ${isFollowing ? 'opacity-60 bg-muted' : 'cursor-pointer hover:shadow-md'}`}
              onClick={() => !isFollowing && handleToggle(artId)}
            >
              <CardContent className="p-4 flex flex-col items-center text-center space-y-3">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted">
                  {artist.imageUrl ? (
                    <Image src={artist.imageUrl} alt={artist.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                      No Image
                    </div>
                  )}
                  {/* Status Badges */}
                  {isFollowing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="secondary" className="gap-1">
                        <Check className="h-3 w-3" /> 팔로우 중
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="space-y-1 w-full">
                  <h3 className="font-semibold truncate w-full" title={artist.name}>
                    {artist.name}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-1">
                    {/* Last.fm doesn't give genres easily in top artists list without extra calls, 
                          unless we extend the type. For now, skip genres or use empty if not available 
                       */}
                    {artist.status === 'exists' && !isFollowing && (
                      <Badge
                        variant="outline"
                        className="text-[10px] h-5 px-1 border-primary text-primary"
                      >
                        공연 예정
                      </Badge>
                    )}
                  </div>
                </div>

                {!isFollowing && (
                  <div className="absolute top-3 right-3">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => handleToggle(artId)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
