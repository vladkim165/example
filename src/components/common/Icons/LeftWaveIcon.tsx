import { FC, HTMLAttributes } from 'react';

import styles from './LeftWaveIcon.module.scss';

const LeftWaveIcon: FC<HTMLAttributes<SVGElement>> = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168.3 85.2" className={styles.leftWave}>
      <path fill="#303030" d="M0 85.2c109.7-.1 110.1-.1 111-.1 6.5-.4 7.9-9.1 8.8-16.4H0v16.5z" />
      <path
        fill="#c10c1b"
        d="M168.3 42.6h-.2c-1.1-.1-6.7-.5-9.5-3.9-3.1-3.8-2.1-6.9-5-6.8-3.7.1-2.6 6.9-5.7 6.9-6.3.1-3.9-24.8-11.7-24.6-8.3.2-4.9 17.8-10.9 17.8-10 .1-3.3-31.8-16.7-32C108.2 0 0 .3 0 .3v67.9l119.7.1c1-7.4 1.9-12.8 6.1-13 6-.2 3.5 17.4 11.8 17.2 7.9-.2 4.3-25 10.6-25.2 3.1-.1 2.3 6.7 6 6.6 2.9-.1 1.7-3.1 4.6-7.1 2.8-3.7 8.5-4.1 9.3-4.2h.2z"
      />
      <path fill="#69696b" d="M0 68.7h119.8c.2-1.8.4-3.7.5-4.6H0v4.6z" />
      <path fill="#a34653" d="M0 68.7h47.9c.1-1.8.1-3.7.2-4.6H0v4.6z" />
      <path fill="#fff" id="left-wave-play" d="M74.7 30.7l-24 12.7V18.5l24 12.2z" />
      <circle fill="#fff" cx="48.1" cy="65.9" r="3.7" />
    </svg>
  );
};

export default LeftWaveIcon;
