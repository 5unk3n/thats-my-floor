'use client';

import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { toggleFollow } from '@/features/artists/server/actions';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

interface FollowButtonProps {
  artistId: string;
  initialIsFollowing: boolean;
  className?: string;
}

export function FollowButton({ artistId, initialIsFollowing, className }: FollowButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const handleToggle = async () => {
    // Optimistic Update
    setIsFollowing((prev) => !prev);

    startTransition(async () => {
      try {
        const result = await toggleFollow(artistId);
        if (result.success && result.data !== undefined) {
          setIsFollowing(result.data);
          router.refresh();
        } else {
          // If logic failed (e.g. auth), revert
          setIsFollowing((prev) => !prev);
          if (result.error?.code === 'AUTH_001') {
            router.push('/login');
          } else {
            console.error('Failed to toggle follow:', result.error);
          }
        }
      } catch (error) {
        // Revert on error
        setIsFollowing((prev) => !prev);
        if (error instanceof Error && error.message === 'Unauthorized') {
          router.push('/login');
        } else {
          console.error('Failed to toggle follow:', error);
        }
      }
    });
  };

  return (
    <Button
      onClick={handleToggle}
      disabled={isPending}
      variant={isFollowing ? 'secondary' : 'default'}
      size="lg"
      className={cn(
        'group flex items-center gap-2 rounded-full transition-all duration-300',
        isFollowing
          ? 'bg-pink-100 hover:bg-pink-200 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400'
          : 'bg-linear-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-md hover:shadow-lg',
        className
      )}
    >
      <Heart
        className={cn(
          'w-5 h-5 transition-all duration-300',
          isFollowing ? 'fill-current scale-110' : 'scale-100 group-hover:scale-110'
        )}
      />
      <span className="font-semibold">{isFollowing ? 'Following' : 'Follow'}</span>
    </Button>
  );
}
