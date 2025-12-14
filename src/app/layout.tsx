import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "That's My Floor",
  description: '좋아하는 아티스트의 공연 정보를 놓치지 마세요',
};

import { FcmTokenManager } from '@/features/notifications/components/FcmTokenManager';
import { SearchInput } from '@/features/search/components/SearchInput';
import { Header } from '@/shared/components/header/Header';
import { Toaster } from '@/shared/components/ui/sonner';
import Providers from '@/shared/providers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Header searchSlot={<SearchInput />} />
          {children}
          <Toaster />
          <FcmTokenManager />
        </Providers>
      </body>
    </html>
  );
}
