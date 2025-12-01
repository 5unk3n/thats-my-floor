import { Clock, Music } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

import { Setlist } from '../types';

interface SetlistViewerProps {
  setlist: Setlist | null;
}

export function SetlistViewer({ setlist }: SetlistViewerProps) {
  if (!setlist || setlist.tracks.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          <p>등록된 셋리스트가 없습니다.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5" />
          셋리스트
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {setlist.tracks.map((track) => (
            <li
              key={track.id}
              className="flex items-center justify-between rounded-md border p-3 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {track.orderNumber}
                </span>
                <span className="font-medium">{track.title}</span>
              </div>
              {track.duration && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDuration(track.duration)}
                </Badge>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
