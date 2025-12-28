'use client';

import { Check, Link as LinkIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

interface LinkedAccountsProps {
  linkedProviders: string[]; // Passed from parent (Server Component or Parent Client Component)
}

const PROVIDERS = [
  // { id: 'google', name: 'Google' },
  { id: 'spotify', name: 'Spotify' },
  // { id: 'kakao', name: 'Kakao' },
];

export default function LinkedAccounts({ linkedProviders }: LinkedAccountsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>계정 연동</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {PROVIDERS.map((provider) => {
          const isLinked = linkedProviders.includes(provider.id);

          return (
            <div
              key={provider.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <span className="font-medium">{provider.name}</span>
              </div>

              {isLinked ? (
                <div className="flex items-center text-green-600">
                  <Check className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">연동됨</span>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => signIn(provider.id, { callbackUrl: '/mypage' })}
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  연동하기
                </Button>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
