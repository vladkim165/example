import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { baseUrl } from '../../../config/site.config';
import { siteLocalesConfig } from '../../../config/locales.config';
import { currentLangSuffix } from '../../../utils/locales.utils';
import { useSeo } from '../../../hooks/customHooks/content/useStoreData';

const getPathWithoutLocale = (path: string) => {
  const isStartWithSlash = path.startsWith('/');
  const currentPathArr = path.split('/');

  const localeIndex = isStartWithSlash ? 1 : 0;
  const firstWordInUrl = currentPathArr[localeIndex];

  const isLocale = siteLocalesConfig.some(
    ({ code }) => code === firstWordInUrl.replace(/[0-9]/gi, '')
  );

  isLocale && currentPathArr.splice(localeIndex, 1);

  return currentPathArr.join('/');
};

const Seo: FC<{}> = () => {
  const {
    i18n: { language },
  } = useTranslation();

  const { asPath } = useRouter();

  const { title = baseUrl, description, keywords, og = {}, path, noIndex } = useSeo();

  const currentPathWithoutLocale = getPathWithoutLocale(asPath.split('?')[0]); // and cut query params
  const canonicalHref = `${baseUrl}/${language}${currentLangSuffix}${currentPathWithoutLocale}`;

  return (
    <Head>
      <title>{title}</title>

      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}

      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />

      {og?.url && <meta property="og:url" content={`${baseUrl}${currentPathWithoutLocale}`} />}
      {og?.title && <meta property="og:title" content={og.title} />}
      {og?.description && <meta property="og:description" content={og.description} />}
      {og?.image && <meta property="og:image" content={og.image} />}

      <link rel="canonical" href={canonicalHref} />

      {siteLocalesConfig
        .filter(({ code }) => language !== code)
        .map(({ code, iso }, index) => (
          <link
            key={index}
            rel="alternative"
            href={`${baseUrl}/${code}${currentLangSuffix}${currentPathWithoutLocale}`}
            hrefLang={iso}
          />
        ))}
    </Head>
  );
};

export default Seo;
