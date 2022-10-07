import { FC } from 'react';

// configs & utils:
import {
  useDownloadUrl,
  useFormat,
  useProgress,
  useStatus,
  useTitle,
  useUrlInfo,
  useVideoUrl,
} from '../../../hooks/customHooks/convert/useStoreData';

// components:
import Spinner from '../../common/Spinner/Spinner';

import styles from './TopContent.module.scss';
import { useSetConvertParams } from '../../../hooks/customHooks/convert/useSetConvertParams';
import { useConvertStart } from '../../../hooks/customHooks/convert/useConvertStart';
import { useOnReady } from '../../../hooks/customHooks/convert/useOnReady';

const TopContent: FC = () => {
  const [progress] = useProgress();

  useSetConvertParams();
  useConvertStart();
  useOnReady();

  return (
    <div className={styles.progressSpinnerContainer}>
      <Spinner />
      <div className={styles.progressProgressBar}>{progress}%</div>
    </div>
  );
};

export default TopContent;
