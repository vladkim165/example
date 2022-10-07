import { FC, HTMLAttributes } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { baseUrl } from '../../../../config/site.config';

import styles from './Logo.module.scss';

const Logo: FC<HTMLAttributes<HTMLAnchorElement>> = () => {
  const domainNameArr = baseUrl.split('://')?.pop()?.split('.').slice();
  const dotNet = domainNameArr?.pop();
  const domain = domainNameArr?.join('.');
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <Link href={`/${language}`} passHref>
      <a className={styles.logo} title={baseUrl}>
        <b>{domain}</b>.{dotNet}
      </a>
    </Link>
  );
};

export default Logo;
