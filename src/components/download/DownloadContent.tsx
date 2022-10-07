import { FC } from 'react';
import { useTranslation } from 'next-i18next';

//store:

import styles from './DownloadContent.module.scss';
import { useDownloadUrl, useTitle } from '../../hooks/customHooks/convert/useStoreData';
import { useSetDownloadParams } from '../../hooks/customHooks/download/useSetDownloadParams';
import { useSetDownloadUrl } from '../../hooks/customHooks/download/useSetDownloadUrl';

const DownloadContent: FC = () => {
  const { t } = useTranslation();

  const [title] = useTitle();
  const [downloadUrl] = useDownloadUrl();

  useSetDownloadParams();
  useSetDownloadUrl();

  return (
    <div className={styles.download}>
      <div className="result-title as-h2">{title}</div>
      <a className={`${styles.button} ${styles.downloadLink}`} href={downloadUrl || '/'}>
        {t('download')}
      </a>

      <div>
        <button className={`${styles.button} ${styles.backToConvert}`}>{t('conv_another')}</button>
      </div>
    </div>
  );
};

export default DownloadContent;
