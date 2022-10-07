import { FC, ReactNode } from 'react';

import styles from './OrangeWave.module.scss';
import LeftWaveIcon from '../../Icons/LeftWaveIcon';
import RightWaveIcon from '../../Icons/RightWaveIcon';

interface ConvertBlockProps {
  children?: ReactNode;
}

const ConvertBlock: FC<ConvertBlockProps> = ({ children }) => {
  return (
    <section className={styles.orangeWaveBack}>
      <LeftWaveIcon />
      <div className={styles.orangeWave}>
        <div className={styles.waveInner}>{children}</div>
      </div>
      <RightWaveIcon />
    </section>
  );
};

export default ConvertBlock;
