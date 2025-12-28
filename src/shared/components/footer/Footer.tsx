'use cache';

import { Github, Mail } from 'lucide-react';
import { cacheLife } from 'next/cache';
import Link from 'next/link';

export async function Footer() {
  cacheLife('max');

  return (
    <footer className="w-full border-t border-border bg-background py-6">
      <div className="container flex flex-col items-center justify-center gap-4 text-center text-sm text-muted-foreground md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <p className="font-semibold">That&apos;s My Floor</p>
            <p className="text-xs">
              © {new Date().getFullYear()} That&apos;s My Floor. All rights reserved.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <Link
              href="https://github.com/5unk3n"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href="mailto:tjsrms1227@outlook.com"
              className="transition-colors hover:text-foreground"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="max-w-md text-xs text-muted-foreground/80">
          <p>
            본 서비스는 (재)예술경영지원센터 공연예술통합전산망(
            <Link
              href="http://www.kopis.or.kr"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-foreground"
            >
              www.kopis.or.kr
            </Link>
            )의 공공데이터를 활용하여 제작되었습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
