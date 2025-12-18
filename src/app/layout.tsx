import type { Metadata, Viewport } from 'next';
import { Noto_Sans_KR } from 'next/font/google';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--font-noto-sans-kr',
  weight: ['400', '500', '700'],
});

const APP_NAME = "That's My Floor";
const APP_DEFAULT_TITLE = "That's My Floor";
const APP_TITLE_TEMPLATE = "%s - That's My Floor";
const APP_DESCRIPTION = '좋아하는 아티스트의 공연 정보를 놓치지 마세요';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
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
      <body className={`${notoSansKr.variable} antialiased`}>
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
