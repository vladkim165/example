import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

// configs & utils:

//store:
import { updateContent } from '../../utils/store.server.utils';

// components:
import TopContent from '../../components/progress/TopContent/TopContent';
import ConvertBlock from '../../components/common/ConvertBlock/ConvertBlock';
import Tags from '../../components/common/Tags/Tags';
import About from '../../components/common/About/About';
import { wrapper } from '../../store';
import { removeSuffix } from '../../utils/locales.utils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';
import { siteLanguages } from '../../config/locales.config';

type PageParams = {
  locale: string;
};

const Progress: NextPage<void> = () => {
  return (
    <>
      <main>
        <ConvertBlock>
          <TopContent />
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

export default Progress;
