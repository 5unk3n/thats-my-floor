import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

import { playerControls } from '../lib/spotify-player';
import { usePlayerStore } from '../store/use-player-store';

export function PlayerControls() {
  const { paused, active } = usePlayerStore();

  const handleTogglePlay = () => {
    playerControls.togglePlay();
  };

  const handleNext = () => {
    playerControls.nextTrack();
  };

  const handlePrevious = () => {
    playerControls.previousTrack();
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePrevious}
        disabled={!active}
        className="text-muted-foreground hover:text-foreground"
      >
        <SkipBack className="h-5 w-5" />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        onClick={handleTogglePlay}
        disabled={!active}
        className="h-10 w-10 rounded-full shadow-md"
      >
        {paused ? (
          <Play className="h-5 w-5 fill-current pl-0.5" />
        ) : (
          <Pause className="h-5 w-5 fill-current" />
        )}
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleNext}
        disabled={!active}
        className="text-muted-foreground hover:text-foreground"
      >
        <SkipForward className="h-5 w-5" />
      </Button>
    </div>
  );
}
