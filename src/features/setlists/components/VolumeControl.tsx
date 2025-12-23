import { Volume2, VolumeX } from 'lucide-react';
import { useEffect,useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { Slider } from '@/shared/components/ui/slider';

import { playerControls } from '../lib/spotify-player';
import { usePlayerStore } from '../store/use-player-store';

export function VolumeControl() {
  const { volume: initialVolume } = usePlayerStore();
  const [localVolume, setLocalVolume] = useState(initialVolume);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(initialVolume);

  useEffect(() => {
    setLocalVolume(initialVolume);
  }, [initialVolume]);

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setLocalVolume(newVolume);
    playerControls.setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      playerControls.setVolume(previousVolume);
      setLocalVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(localVolume);
      playerControls.setVolume(0);
      setLocalVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <div className="flex items-center gap-2 w-full max-w-[120px]">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-foreground"
        onClick={toggleMute}
      >
        {isMuted || localVolume === 0 ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>
      <Slider
        defaultValue={[0.5]}
        value={[localVolume]}
        max={1}
        step={0.01}
        onValueChange={handleVolumeChange}
        className="w-20 cursor-pointer"
      />
    </div>
  );
}
