'use client';

import { Heart } from 'lucide-react';
import { useState, useTransition } from 'react';

import { toggleFollow } from '@/features/artists/server/actions';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

interface FollowButtonProps {
  artistId: string;
  initialIsFollowing: boolean;
  className?: string;
}

export default function FollowButton({
  artistId,
  initialIsFollowing,
  className,
}: FollowButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const handleToggle = () => {
    // Optimistic update
    setIsFollowing((prev) => !prev);

    startTransition(async () => {
      try {
        const result = await toggleFollow(artistId);
        // Sync with server result just in case
        setIsFollowing(result);
      } catch (error) {
        // Revert on error
        setIsFollowing((prev) => !prev);
        console.error('Failed to toggle follow:', error);
      }
    });
  };

  return (
    <Button
      variant={isFollowing ? 'secondary' : 'default'}
      size="sm"
      onClick={handleToggle}
      disabled={isPending}
      className={cn('gap-2 transition-all', className)}
    >
      <Heart className={cn('h-4 w-4', isFollowing && 'fill-current text-red-500')} />
      {isFollowing ? '팔로잉' : '팔로우'}
    </Button>
  );
}
