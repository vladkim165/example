import { utmDefault, siteName } from '../../../config/site.config';
import { currentLangSuffix } from '../../../utils/locales.utils';

export const langMenuList: any = {
  tr: [
    {
      href: 'https://youtubemp3donusturucu.net/',
      text: 'Youtube mp3 donusturucu',
      target: '_blank',
      convs: ['flv2all'],
    },
    {
      href: 'https://youtube-mp3-music.com/',
      text: 'Youtube mp3 dönüştürücü',
      target: '_blank',
      convs: ['youtubemp3donusturucu', 'flvconverter'],
    },
  ],
  es: [
    {
      href: 'https://f3mp3.com',
      text: 'Сonvertidor mp3',
      target: '_blank',
      convs: ['flv2all'],
    },
  ],
};

export const getBottomLinks = (locale: string, page: any, func?: Function) => {
  const localeWithSuffix = `${locale}${currentLangSuffix}`;

  const defLinks = [
    {
      href: `/${localeWithSuffix}`,
      text: func ? func('home') : 'home',
    },
    {
      href: `https://mp3.studio/${localeWithSuffix}/youtube-downloader?utm_source=${utmDefault.source}&utm_medium=${utmDefault.medium}&utm_campaign=${utmDefault.campaign}`,
      text: func ? func('studio_footer_link') : 'studio_footer_link',
      target: '_blank',
    },
    {
      href: `/${localeWithSuffix}/list`,
      text: `${siteName} info content`,
    },
    {
      href: `/${localeWithSuffix}/dmca`,
      text: 'DMCA',
    },
  ];

  const storePageLinks = page?.bottomMenu
    ? page.bottomMenu.map((e: any) => ({ ...e, href: `/${locale}${e.href}` }))
    : [];

  const langLinks = langMenuList[locale]
    ? langMenuList[locale].filter((link: any) => link.convs.includes(siteName))
    : [];

  return [...defLinks, ...storePageLinks, ...langLinks];
};
