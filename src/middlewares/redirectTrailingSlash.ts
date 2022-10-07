import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const redirectTrailingSlash = (request: NextRequest) => {
  const { href, pathname } = request.nextUrl;

  if (pathname !== '/' && pathname.endsWith('/')) {
    const { path, query, hash } = route;
    const nextPath = path.replace(/\/+$/, '') || '/';
    const nextRoute = { path: nextPath, query, hash };

    redirect(nextRoute);
  }
}
