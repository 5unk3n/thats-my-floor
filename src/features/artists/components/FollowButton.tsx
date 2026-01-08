'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { getFollowStatus, toggleFollow } from '@/features/artists/server/actions';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

interface FollowButtonProps {
  artistId: string | number;
  initialIsFollowing?: boolean;
  className?: string;
}

export function FollowButton({
  artistId,
  initialIsFollowing = false,
  className,
}: FollowButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const idStr = String(artistId);

  const { data: isFollowing, isLoading } = useQuery({
    queryKey: ['followStatus', idStr],
    queryFn: async () => {
      const result = await getFollowStatus(idStr);
      if (!result.success) throw new Error(result.error?.message);
      return result.data ?? false;
    },
    initialData: initialIsFollowing,
    enabled: !!artistId,
  });

  const { mutate: toggle, isPending } = useMutation({
    mutationFn: async () => {
      const result = await toggleFollow(idStr);
      if (!result.success) {
        if (result.error?.code === 'AUTH_001') {
          throw new Error('Unauthorized');
        }
        throw new Error(result.error?.message);
      }
      return result.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['followStatus', idStr] });
      const previousStatus = queryClient.getQueryData(['followStatus', idStr]);

      queryClient.setQueryData(['followStatus', idStr], (old: boolean) => !old);

      return { previousStatus };
    },
    onError: (err, _, context) => {
      if (context?.previousStatus !== undefined) {
        queryClient.setQueryData(['followStatus', idStr], context.previousStatus);
      }
      if (err.message === 'Unauthorized') {
        router.push('/login');
      } else {
        console.error('Failed to toggle follow:', err);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['followStatus', idStr] });
      router.refresh();
    },
  });

  return (
    <Button
      onClick={() => toggle()}
      disabled={isLoading || isPending}
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
      <span className="font-semibold">
        {isLoading ? 'Loading...' : isFollowing ? 'Following' : 'Follow'}
      </span>
    </Button>
  );
}
