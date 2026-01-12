'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Bell, CheckCheck } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';

import { getNotifications, markAllAsRead, markAsRead } from '../api/actions';

export function NotificationList() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await getNotifications(1, 100);
      if (!response.success) throw new Error(response.error?.message);
      return response.data;
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: markAsRead,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
      } else {
        toast.error('읽음 처리에 실패했습니다.');
      }
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: markAllAsRead,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
        toast.success('모든 알림을 읽음 처리했습니다.');
      } else {
        toast.error('전체 읽음 처리에 실패했습니다.');
      }
    },
  });

  const handleNotificationClick = async (id: number, url?: string) => {
    markAsReadMutation.mutate(id);
    if (url) {
      router.push(url);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-4 p-4 border rounded-lg">
            <Skeleton className="w-12 h-12 rounded" />
            <div className="flex-1 space-y-2">
              <Skeleton className="w-3/4 h-4" />
              <Skeleton className="w-1/2 h-4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const notifications = data?.notifications || [];

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <Bell className="w-12 h-12 mb-4 opacity-20" />
        <p>받은 알림이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">알림</h1>
        {data?.unreadCount && data.unreadCount > 0 ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => markAllAsReadMutation.mutate()}
            disabled={markAllAsReadMutation.isPending}
            className="text-gray-500 hover:text-gray-900"
          >
            <CheckCheck className="w-4 h-4 mr-1" />
            모두 읽음
          </Button>
        ) : null}
      </div>

      <div className="space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() =>
              handleNotificationClick(
                notification.id,
                notification.concertId ? `/concerts/${notification.concertId}` : undefined
              )
            }
            className={`
              relative flex gap-4 p-4 rounded-xl cursor-pointer transition-all
              ${
                notification.readAt
                  ? 'bg-white border border-gray-100 hover:border-gray-200'
                  : 'bg-blue-50/50 border border-blue-100 hover:bg-blue-50'
              }
            `}
          >
            {/* Unread Indicator */}
            {!notification.readAt && (
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-500" />
            )}

            {/* Icon / Image */}
            <div className="shrink-0">
              {notification.concert?.posterUrl ? (
                <div className="relative w-12 h-16 bg-gray-100 rounded overflow-hidden">
                  <Image
                    src={notification.concert.posterUrl}
                    alt={notification.concert.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <Bell className="w-5 h-5" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex justify-between items-start">
                <p
                  className={`text-sm font-medium truncate pr-2 ${
                    notification.readAt ? 'text-gray-900' : 'text-blue-900'
                  }`}
                >
                  {notification.title}
                </p>
                <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
                  {formatDistanceToNow(new Date(notification.sentAt), {
                    addSuffix: true,
                    locale: ko,
                  })}
                </span>
              </div>
              <p
                className={`text-sm mt-1 line-clamp-2 ${
                  notification.readAt ? 'text-gray-500' : 'text-blue-700/80'
                }`}
              >
                {notification.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
