import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

// configs & utils:
import { siteLanguages } from '../../config/locales.config';
import { PAGE_REVALIDATE_TIME } from '../../config/site.config';
import { currentLangSuffix } from '../../utils/locales.utils';
import dbConnect from '../../mongoDB/utils/dbConnect';
import { removeSuffix } from '../../utils/locales.utils';

// components:
import LinksList from '../../components/list/LinksList/LinksList';
import Page from '../../mongoDB/models/Page';
import Seo from '../../components/common/Seo/Seo';
import logger from '../../utils/logger';

interface PageParams extends ParsedUrlQuery {
  locale?: string;
}

type Link = {
  name: string;
  title: string;
};

type LinksListType = Array<Link>;

export type ListProps = {
  linksList: LinksListType;
  locale: string;
};

const List: NextPage<ListProps> = ({ linksList, locale }) => {
  return (
    <>
      <Seo />
      <main>
        <LinksList linksList={linksList} locale={locale} />
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  let paths = siteLanguages.map((locale: string) => ({
    params: { locale: `${locale}${currentLangSuffix}` },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { locale = '' } = params as PageParams;
  const pureLocale = removeSuffix(locale);
  const linksList = [] as LinksListType;
  let seoForPage;

  try {
    await dbConnect();
    const pagesList = await Page.find({ lang: pureLocale });

    pagesList.forEach((page) => {
      if (page.name === 'index.php') {
        seoForPage = page.seo;
        return;
      }
      if (page.name === 'list') {
        seoForPage = page.seo;
      }

      const titlePartRegExp = new RegExp(
        `(-${process.env.SITE_NAME}${process.env.SITE_DOMAIN_SUFFIX}$)`
      );
      const title = page.seo.title.replace(titlePartRegExp, '');
      linksList.push({ name: page.name, title });
    });

    seoForPage = JSON.parse(JSON.stringify(seoForPage)); // Крашится без JSON.stringify => JSON.parse, ошибка сериализации
  } catch (e) {
    logger.error('![ERROR]', e);
  }

  return {
    props: {
      linksList,
      seoForPage,
      locale,
    },
    revalidate: PAGE_REVALIDATE_TIME,
  };
};

export default List;
