import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent, CardHeader } from '@/shared/ui/card';

import { Artist } from '../model/types';

interface ArtistCardProps {
  artist: Artist;
  actionSlot?: React.ReactNode;
}

export function ArtistCard({ artist, actionSlot }: ArtistCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square relative bg-muted">
        {artist.imageUrl || artist.image ? (
          <Image
            src={artist.imageUrl || artist.image || ''}
            alt={artist.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-muted-foreground">
            No Image
          </div>
        )}
      </div>
      <CardHeader className="p-4 pb-2">
        <Link href={`/artists/${artist.id}`} className="hover:underline">
          <h3 className="font-bold text-lg truncate">{artist.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground truncate">{artist.genre}</p>
      </CardHeader>
      <CardContent className="p-4 pt-2">{actionSlot}</CardContent>
    </Card>
  );
}
