import { FC } from 'react';

import styles from './ConvertBlock.module.scss';
import OrangeWave from './OrangeWave/OrangeWave';
import { useTitle } from '../../../hooks/customHooks/content/useStoreData';

interface ConvertProps {
  children: JSX.Element | JSX.Element[];
}

const ConvertBlock: FC<ConvertProps> = ({ children }) => {
  const title = useTitle();
  return (
    <section className={styles.topContent}>
      <div className="container">
        <h1 className={styles.textCenter}>{title}</h1>
      </div>
      <OrangeWave>{children}</OrangeWave>
    </section>
  );
};

export default ConvertBlock;
