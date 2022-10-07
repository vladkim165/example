import { osGroup } from './os.conifg';

export const baseUrl = process.env.DOMAIN || '';

export const siteName = process.env.SITE_NAME || '';

export const PAGE_REVALIDATE_TIME = 600; // In seconds

export const studioUrls = {
  [osGroup.win]: '/youtube-downloader',
  [osGroup.android]: '/youtube-downloader-android',
  [osGroup.mac]: '/youtube-downloader-mac',
};

export const utmDefault = {
  source: 100,
  medium: process.env.UTM_MEDIUM || '',
  campaign: 1,
};

export const isProd = process.env.NODE_ENV === 'production';
