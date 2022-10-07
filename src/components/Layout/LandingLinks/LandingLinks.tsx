import { FC } from 'react';

import SoftLink from '../../common/SoftLink/SoftLink';
import MiniWaveIcon from '../../common/Icons/MiniWaveIcon';
import { osGroup } from '../../../config/os.conifg';

import styles from './LandingLinks.module.scss';

const LandingLinks: FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* @ts-ignore*/}
        <SoftLink isLandingLink>
          <MiniWaveIcon os="win" />
          <div>YouTube Downloader for Windows</div>
        </SoftLink>

        {/* @ts-ignore*/}
        <SoftLink os={osGroup.mac} isLandingLink>
          <MiniWaveIcon os="mac" />
          <div>YouTube Downloader for Macintosh</div>
        </SoftLink>
      </div>
    </section>
  );
};

export default LandingLinks;
