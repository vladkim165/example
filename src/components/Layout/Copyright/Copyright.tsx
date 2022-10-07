import { FC } from 'react';

import { baseUrl } from '../../../config/site.config';

import styles from './Copyright.module.scss';

const Copyright: FC = () => {
  const currentYear = new Date().getFullYear();
  const domain = baseUrl.split('://').pop();
  return (
    <footer className={styles.copyright}>
      <div className={styles.container}>
        Copyright © {currentYear}, {domain}. All rights reserved
      </div>
    </footer>
  );
};

export default Copyright;
