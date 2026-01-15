'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { getFollowStatus, toggleFollow } from '@/features/artists/api/actions';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

interface FollowButtonProps {
  mbid: string;
  initialIsFollowing?: boolean;
  className?: string;
}

export function FollowButton({ mbid, initialIsFollowing = false, className }: FollowButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: isFollowing, isLoading } = useQuery({
    queryKey: ['followStatus', mbid],
    queryFn: async () => {
      const result = await getFollowStatus(mbid);
      if (!result.success) throw new Error(result.error?.message);
      return result.data ?? false;
    },
    initialData: initialIsFollowing,
    enabled: !!mbid,
  });

  const { mutate: toggle, isPending } = useMutation({
    mutationFn: async () => {
      const result = await toggleFollow(mbid);
      if (!result.success) {
        if (result.error?.code === 'AUTH_001') {
          throw new Error('Unauthorized');
        }
        throw new Error(result.error?.message);
      }
      return result.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['followStatus', mbid] });
      const previousStatus = queryClient.getQueryData(['followStatus', mbid]);

      queryClient.setQueryData(['followStatus', mbid], (old: boolean) => !old);

      return { previousStatus };
    },
    onError: (err, _, context) => {
      if (context?.previousStatus !== undefined) {
        queryClient.setQueryData(['followStatus', mbid], context.previousStatus);
      }
      if (err.message === 'Unauthorized') {
        router.push('/login');
      } else {
        console.error('Failed to toggle follow:', err);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['followStatus', mbid] });
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
