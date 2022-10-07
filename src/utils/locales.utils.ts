import { langIncrementSuffix, siteLanguages } from '../config/locales.config';

export const calcCurrentSuffix = (suffixes: number[]): number | '' => {
  return (
    suffixes
      .slice()
      .sort((a, b) => a - b)
      .pop() || ''
  );
};

export const injectSuffix = (locale: string, suffix: number | '') => `${locale}${suffix}`;

export const removeSuffix = (localeWithSuffix: string) => localeWithSuffix.replace(/[0-9]/g, '');

export const currentLangSuffix = calcCurrentSuffix(langIncrementSuffix);

const langPartRegexp = new RegExp(`^(${siteLanguages.join('|')})(\\w+)?$`, 'i');

export const splitSuffix = (url: string): { locale: string; suffix: string } => {
  const [, locale, suffix] = url.match(langPartRegexp) || [];

  return {
    locale,
    suffix,
  };
};

/**
 * Проверяем, является ли это суффикс одним из предыдущих (заход по старой ссылке)
 * @param suffix
 * @returns {boolean}
 */
const isPastSuffix = (suffix: number): Boolean => {
  // если инкремента нет, то суффикс === undefined
  return langIncrementSuffix.length
    ? !langIncrementSuffix.includes(suffix)
    : !(suffix === undefined);
};

export const isNeedRedirectToCurrentSuffix = (locale: string, suffix: number): Boolean => {
  if (!locale) {
    return false;
  }

  return isPastSuffix(suffix);
};

export const prepareLocales = (): string[] =>
  siteLanguages
    .map((lang) => {
      return langIncrementSuffix.map((suffix) => injectSuffix(lang, suffix));
    })
    .flat();
