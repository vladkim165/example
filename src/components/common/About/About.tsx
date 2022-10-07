import { FC } from 'react';
import { useTeasers } from '../../../hooks/customHooks/content/useStoreData';

import styles from './About.module.scss';

const About: FC<{}> = () => {
  const { list, colored } = useTeasers();
  return (
    <section className={`${styles.about} ${colored ? styles.colored : ''}`}>
      {list?.map(({ title, text }, i) => {
        return (
          <div key={i} className={styles.aboutRow}>
            <div className="container">
              <h3 className="as-h3">{title}</h3>
              {text}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default About;
