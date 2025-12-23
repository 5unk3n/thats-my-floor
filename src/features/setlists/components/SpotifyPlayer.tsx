'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { cn } from '@/shared/lib/utils';

import { initializeSpotifyPlayer } from '../lib/spotify-player';
import { usePlayerStore } from '../store/use-player-store';
import { NowPlaying } from './NowPlaying';
import { PlayerControls } from './PlayerControls';
import { VolumeControl } from './VolumeControl';

export function SpotifyPlayer() {
  const { data: session } = useSession();
  const { active, isReady, error } = usePlayerStore();

  useEffect(() => {
    if (session?.user?.accessToken) {
      initializeSpotifyPlayer(session.user.accessToken).catch((err) => {
        console.error('Failed to initialize Spotify Player', err);
      });
    }
  }, [session?.user?.accessToken]);

  if (error) {
    // Optionally render an error toast or message
    console.error('Spotify Player Error:', error);
  }

  if (!active || !isReady) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 h-20 bg-background border-t px-4 flex items-center justify-between z-50 transition-transform duration-300',
        active ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="flex-1 min-w-0">
        <NowPlaying />
      </div>

      <div className="flex-1 flex justify-center">
        <PlayerControls />
      </div>

      <div className="flex-1 flex justify-end">
        <VolumeControl />
      </div>
    </div>
  );
}
