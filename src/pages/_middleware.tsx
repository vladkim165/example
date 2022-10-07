import { NextRequest, NextResponse } from 'next/server';
import { redirectToCurrentSuffix, redirectTrailingSlash } from '../middlewares/redirectToCurrentSuffix';

export function middleware(request: NextRequest) {
  const isRedirectLocale = redirectToCurrentSuffix(request);
  if (isRedirectLocale) return isRedirectLocale;
}