import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';

// configs & utils:
import nextI18NextConfig from '../../next-i18next.config.js';
import { siteLanguages } from '../../config/locales.config';
import { PAGE_REVALIDATE_TIME } from '../../config/site.config';
import { removeSuffix } from '../../utils/locales.utils';
import { updateContent } from '../../utils/store.server.utils';

//store:
import { wrapper } from '../../store';

// components:
import Seo from '../../components/common/Seo/Seo';
import ConvertForm from '../../components/index/ConvertForm/ConvertForm';
import ConvertBlock from '../../components/common/ConvertBlock/ConvertBlock';
import Tags from '../../components/common/Tags/Tags';
import About from '../../components/common/About/About';
import Spinner from '../../components/common/Spinner/Spinner';

interface PageParams extends ParsedUrlQuery {
  locale?: string;
}

const Index: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation('common'); // example

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
  const paths = siteLanguages.map((locale: string) => ({
    params: { locale },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }) => {
      const { locale = '' } = params as PageParams;
      const pureLocale = removeSuffix(locale);

      await updateContent({ dispatch: store.dispatch, locale: pureLocale, pageName: 'index.php' });

      return {
        props: {
          ...(await serverSideTranslations(pureLocale, ['common'], nextI18NextConfig)),
        },
        revalidate: PAGE_REVALIDATE_TIME,
      };
    }
);

export default Index;
