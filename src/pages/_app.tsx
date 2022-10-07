import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config';

import Layout from '../components/Layout/Layout';
import { wrapper } from '../store';

import '../styles/normalize.css';
import '../styles/globals.scss';
import '../styles/media.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const bottomMenu = pageProps.bottomMenu;
  return (
    <Layout bottomMenu={bottomMenu}>
      {/* @ts-ignore */}
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(appWithTranslation(MyApp, nextI18NextConfig));
