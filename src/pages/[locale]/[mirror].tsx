import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';

// configs & utils:
import nextI18NextConfig from '../../next-i18next.config';
import { siteLanguages } from '../../config/locales.config';
import { PAGE_REVALIDATE_TIME } from '../../config/site.config';
import { removeSuffix } from '../../utils/locales.utils';

//store:
import { wrapper } from '../../store';
import { updateContent } from '../../utils/store.server.utils';

// components:
import Seo from '../../components/common/Seo/Seo';
import ConvertForm from '../../components/index/ConvertForm/ConvertForm';
import ConvertBlock from '../../components/common/ConvertBlock/ConvertBlock';
import Tags from '../../components/common/Tags/Tags';
import About from '../../components/common/About/About';
import Spinner from '../../components/common/Spinner/Spinner';

interface PageParams extends ParsedUrlQuery {
  locale: string;
  mirror: string;
}

const Mirror: NextPage = () => {
  const router = useRouter();

  if (router.isFallback) {
    return <Spinner />;
  }

  return (
    <>
      <Seo />
      <main>
        <ConvertBlock>
          <ConvertForm />
        </ConvertBlock>
        <Tags />
        <About />
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const paths = siteLanguages.map((locale: string) => ({
  //   params: { locale },
  // }));

  // TODO: реализовать метод API.mirror.getStaticPaths(), возвращающий из монги все имена зеркал (Приоритет 4/10)
  // Response example: [..., 'mp-donusturucu.php',...])

  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  // pretter-ignore
  (store) =>
    async ({ params }) => {
      const { mirror, locale } = params as PageParams;
      const pureLocale = removeSuffix(locale);

      await updateContent({ dispatch: store.dispatch, locale: pureLocale, pageName: mirror });

      return {
        props: {
          ...(await serverSideTranslations(pureLocale, ['common'], nextI18NextConfig)),
        },
        // TODO потестить unstable_revalidate для ревалидации только когда контент сменился (Приоритет 6/10)
        // UPDATE вышла стабильная https://nextjs.org/blog/next-12-2#on-demand-incremental-static-regeneration-stable
        revalidate: PAGE_REVALIDATE_TIME, // In seconds
      };
    }
);

export default Mirror;
