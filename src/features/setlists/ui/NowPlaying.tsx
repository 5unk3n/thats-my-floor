import Image from 'next/image';

import { usePlayerStore } from '../store/use-player-store';

export function NowPlaying() {
  const { currentTrack } = usePlayerStore();

  if (!currentTrack) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 bg-muted rounded-md animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
          <div className="h-3 w-16 bg-muted rounded animate-pulse" />
        </div>
      </div>
    );
  }

  const albumImage = currentTrack.album.images[0]?.url;

  return (
    <div className="flex items-center gap-3 min-w-0">
      {albumImage ? (
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md shadow-sm">
          <Image src={albumImage} alt={currentTrack.album.name} fill className="object-cover" />
        </div>
      ) : (
        <div className="h-14 w-14 bg-muted rounded-md flex items-center justify-center">
          <span className="text-xs text-muted-foreground">No Art</span>
        </div>
      )}
      <div className="flex flex-col min-w-0 overflow-hidden">
        <span className="text-sm font-medium truncate text-foreground">{currentTrack.name}</span>
        <span className="text-xs text-muted-foreground truncate">
          {currentTrack.artists.map((a) => a.name).join(', ')}
        </span>
      </div>
    </div>
  );
}
