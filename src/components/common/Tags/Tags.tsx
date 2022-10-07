import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { useTags } from '../../../hooks/customHooks/content/useStoreData';

import styles from './Tags.module.scss';
import { currentLangSuffix } from '../../../utils/locales.utils';

const Tags: FC<{}> = () => {
  const { title = '', list = [] } = useTags();

  const {
    i18n: { language },
  } = useTranslation();

  return (
    <section className={styles.tags}>
      <div className="container">
        <div className={styles.title}>{title}</div>
        <div>
          {list.map(({ href, text }, i) => (
            <Link href={`/${language}${currentLangSuffix}${href}`} key={i} passHref>
              <a className={styles.tagLink}>{text}</a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tags;
