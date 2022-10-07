import Link from 'next/link';
import { FC } from 'react';
import { ListProps } from '../../../pages/[locale]/list';
import styles from './LinksList.module.scss';

type LinksListProps = Omit<ListProps, 'seoForPage'>;

type LinkItemProps = {
  name: string;
  title: string;
  locale: string;
};

const LinkItem: FC<LinkItemProps> = ({ name, title, locale }) => (
  <li>
    <Link
      href={{
        pathname: `/${locale}/${name}`,
      }}
    >
      <a className={styles.link}>{`${title}`}</a>
    </Link>
  </li>
);

const LinksList: FC<LinksListProps> = ({ linksList, locale }) => {
  return (
    <section className={`${styles.section} container`}>
      <ul className="content">
        {linksList.map((page) => (
          <LinkItem key={page.name} name={page.name} title={page.title} locale={locale} />
        ))}
      </ul>
    </section>
  );
};

export default LinksList;
