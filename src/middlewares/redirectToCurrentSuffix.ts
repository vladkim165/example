import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import {
  currentLangSuffix,
  injectSuffix,
  isNeedRedirectToCurrentSuffix,
  splitSuffix,
} from '../utils/locales.utils';
import { defaultLocale, siteLocalesConfig } from '../config/locales.config';
import { baseUrl } from '../config/site.config';

const PUBLIC_FILE = /\.(.*)$/;

export const redirectToCurrentSuffix = (request: NextRequest) => {
  const { href, pathname } = request.nextUrl;
  const [, , , langPart, ...otherPath] = href.split('/');
  const { locale, suffix } = splitSuffix(langPart);

  const pagesWithoutLocale = ['sitemap.xml'];

  const isPageWithLocale = !(
    pagesWithoutLocale.some((page) => page === pathname) ||
    PUBLIC_FILE.test(pathname) ||
    pathname.includes('/api/')
  );

  if (!locale && isPageWithLocale) {
    const userLang = request.headers.get('accept-language')?.slice(0, 2).toLowerCase();
    const hasUserLang = siteLocalesConfig.some((el) => el.code === userLang);
    const [, , , ...otherPathWithoutLocale] = href.split('/');
    const correctLocale = hasUserLang ? userLang : defaultLocale;
    const urlWithLocale = [
      baseUrl,
      `${correctLocale}${currentLangSuffix}`,
      ...otherPathWithoutLocale,
    ].join('/');

    return NextResponse.redirect(
      urlWithLocale.endsWith('/') ? urlWithLocale.slice(0, -1) : urlWithLocale
    );
  }

  if (isPageWithLocale && isNeedRedirectToCurrentSuffix(locale, Number(suffix))) {
    const newLangPart = injectSuffix(locale, currentLangSuffix);
    const newUrl = [baseUrl, newLangPart, ...otherPath].join('/');

    return NextResponse.redirect(newUrl);
  }
};
