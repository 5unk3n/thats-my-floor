'use client';

import { Check, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';

import { syncLastFmArtistsAction } from '../api/actions';
import { LastFmSyncArtist } from '../model/services/lastfm-sync.service';

interface SyncArtistListProps {
  initialArtists: LastFmSyncArtist[];
}

export default function LastFmSyncList({ initialArtists }: SyncArtistListProps) {
  const router = useRouter();
  // Filter out any artists that somehow made it here without MBID, preserving strict typing
  const [artists] = useState<LastFmSyncArtist[]>(initialArtists.filter((a) => !!a.mbid));

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Allow selecting 'exists' (but not follow relation) and 'new'
  const availableArtists = artists.filter((a) => !a.isFollowing);

  const getArtistId = (artist: LastFmSyncArtist) => artist.mbid!;

  const handleToggle = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

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
        router.push('/mypage/artists');
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

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex items-center justify-between bg-muted/40 p-4 rounded-lg border sticky top-0 z-10 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            checked={selectedIds.length === availableArtists.length && availableArtists.length > 0}
            onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
            disabled={availableArtists.length === 0}
          />
          <label htmlFor="select-all" className="text-sm font-medium cursor-pointer select-none">
            전체 선택 ({selectedIds.length} / {availableArtists.length})
          </label>
        </div>
        <Button onClick={handleSync} disabled={selectedIds.length === 0 || isSyncing} size="sm">
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

      {/* Artist List */}
      <div className="border rounded-lg divide-y bg-card">
        {artists.map((artist) => {
          const isFollowing = artist.isFollowing;
          const artId = getArtistId(artist);
          const isSelected = selectedIds.includes(artId);

          return (
            <div
              key={artId}
              className={`flex items-center p-3 transition-colors ${
                isFollowing ? 'bg-muted/50 opacity-70' : 'hover:bg-muted/30 cursor-pointer'
              } ${isSelected ? 'bg-primary/5' : ''}`}
              onClick={() => !isFollowing && handleToggle(artId)}
            >
              <div className="flex items-center h-5 w-5 mr-4 justify-center">
                {isFollowing ? (
                  <Check className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => handleToggle(artId)}
                    className="data-[state=checked]:bg-primary"
                  />
                )}
              </div>

              <div className="flex-1 flex items-center justify-between overflow-hidden">
                <div className="font-medium truncate mr-2" title={artist.name}>
                  {artist.name}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isFollowing && (
                    <Badge variant="secondary" className="text-xs">
                      팔로우 중
                    </Badge>
                  )}
                  {artist.hasUpcomingConcert && !isFollowing && (
                    <Badge variant="outline" className="text-xs border-primary text-primary">
                      공연 예정
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
