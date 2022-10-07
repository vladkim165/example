import type { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ParsedUrlQuery } from 'querystring';

// configs & utils:
import nextI18NextConfig from '../../next-i18next.config';
import { siteLanguages } from '../../config/locales.config';
import { removeSuffix } from '../../utils/locales.utils';

//store:
import { wrapper } from '../../store';
import { updateContent } from '../../utils/store.server.utils';

// components:
import DownloadContent from '../../components/download/DownloadContent';
import ConvertBlock from '../../components/common/ConvertBlock/ConvertBlock';
import Tags from '../../components/common/Tags/Tags';
import About from '../../components/common/About/About';

interface PageParams extends ParsedUrlQuery {
  locale?: string;
}

const Download: NextPage<void> = () => {
  return (
    <>
      <main>
        <ConvertBlock>
          <DownloadContent />
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
  // pretter-ignore
  (store) =>
    async ({ params }) => {
      const { locale = '' } = params as PageParams;
      const pureLocale = removeSuffix(locale);

      const prevPageName = 'index.php'; // TODO когда появятся зеркала, реализовать механизм откуда сюда попал юзер (есть на conweb) (Приоритет 6/10)
      await updateContent({ dispatch: store.dispatch, locale: pureLocale, pageName: prevPageName });

      return {
        props: {
          ...(await serverSideTranslations(pureLocale, ['common'], nextI18NextConfig)),
        },
      };
    }
);

export default Download;
