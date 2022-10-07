import { siteLanguages, defaultLocale } from './config/locales.config';
import { baseUrl } from './config/site.config';

export default {
  i18n: {
    baseUrl,
    locales: siteLanguages,
    defaultLocale,
    localeDetection: false,
  },
  serializeConfig: false,
};
