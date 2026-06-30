import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'uk'],
  defaultLocale: 'uk',
});

export default function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(uk|en)/:path*'],
};
