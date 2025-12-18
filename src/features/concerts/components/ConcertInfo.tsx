import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ConcertDetail } from '@/features/concerts/server/db';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';

interface ConcertInfoProps {
  concert: ConcertDetail;
}

export function ConcertInfo({ concert }: ConcertInfoProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster Section */}
          <div className="w-full md:w-[300px] shrink-0">
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-lg shadow-md border">
              {concert.posterUrl ? (
                <Image
                  src={concert.posterUrl}
                  alt={concert.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1 space-y-6">
            {/* Title & Badge */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <h2 className="text-2xl font-bold break-keep">{concert.title}</h2>
              <div className="flex gap-2 shrink-0">
                <Badge variant={concert.status === '공연중' ? 'default' : 'secondary'}>
                  {concert.status}
                </Badge>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 gap-y-4 text-sm">
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <span className="font-medium text-muted-foreground">공연 기간</span>
                <span className="font-medium">
                  {concert.startDate === concert.endDate
                    ? concert.startDate
                    : `${concert.startDate} ~ ${concert.endDate}`}
                </span>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <span className="font-medium text-muted-foreground">공연 장소</span>
                <span className="font-medium">{concert.place}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <span className="font-medium text-muted-foreground">티켓 가격</span>
                <span className="font-medium">{concert.price}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <span className="font-medium text-muted-foreground">런타임</span>
                <span className="font-medium">{concert.runtime}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <span className="font-medium text-muted-foreground">출연진</span>
                <div className="flex flex-wrap gap-2 text-base font-medium">
                  {concert.artists && concert.artists.length > 0 ? (
                    concert.artists.map((artist, index) => (
                      <span key={artist.id}>
                        <Link
                          href={`/artists/${artist.id}`}
                          className="text-primary hover:underline hover:text-primary/80 transition-colors"
                        >
                          {artist.name}
                        </Link>
                        {index < concert.artists.length - 1 && (
                          <span className="text-muted-foreground ml-2">,</span>
                        )}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </div>
              </div>
            </div>

            {/* Links */}
            {concert.relates && concert.relates.length > 0 && (
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">예매처</h4>
                <div className="flex flex-wrap gap-2">
                  {concert.relates.map((link, index) => (
                    <Button key={index} variant="outline" size="sm" asChild>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.name}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
