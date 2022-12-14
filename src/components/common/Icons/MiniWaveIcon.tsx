import { FC } from 'react';

import styles from './MiniWaveIcon.module.scss';

interface MiniWaveIconProps extends React.HTMLAttributes<SVGElement> {
  os?: string;
}

const MiniWaveIcon: FC<MiniWaveIconProps> = ({ os = '' }) => {
  const getClassName = () => {
    if (os === 'win') {
      return `${styles.miniWaveWin}`;
    }

    if (os === 'mac') {
      return `${styles.miniWaveMac}`;
    }
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 49" className={getClassName()}>
      <path
        fill="currentColor"
        d="M45.9 24.5c-.5.1-1.2.4-1.7.6-1.2.4-1.9 1.3-2.4 2.5-.1.3-.2.7-.3 1 0 .1-.1.2-.1.3-.2.5-.9.6-1.3.2-.2-.2-.3-.4-.4-.7-.1-.3-.2-.7-.3-1-.1-.2-.1-.4-.3-.6-.2-.4-.7-.5-1-.1-.2.2-.4.5-.5.7-.2.7-.4 1.4-.5 2.1-.3 1.5-.5 3.1-.8 4.6-.1.7-.3 1.3-.6 1.9-.2.4-.5.7-.9.9-.6.2-1.1 0-1.5-.5s-.7-1-.8-1.6c-.2-1-.4-1.9-.7-2.9-.1-.5-.3-.9-.4-1.4 0-.2-.1-.3-.2-.4-.4-.6-1-.7-1.5-.3-.4.3-.6.7-.8 1.1-.3.8-.5 1.7-.6 2.5-.2 1.7-.4 3.4-.6 5.2-.2 1.1-.4 2.3-.9 3.3l-.6.9c-1 1.1-2.4 1-3.3-.1-.5-.7-.8-1.4-1-2.3-.2-1.1-.4-2.1-.6-3.2l-.6-4.8c-.1-.6-.3-1.2-.5-1.8-.1-.3-.3-.5-.5-.7-.5-.5-1.3-.6-1.8.3-.3.6-.5 1.3-.6 1.9-.2 1-.5 2-.7 3.1-.1.5-.4.9-.7 1.2-.4.4-.8.6-1.3.5-.3 0-.5-.2-.7-.4-.3-.4-.5-.8-.7-1.3-.3-.9-.5-1.9-.6-2.9-.2-1.4-.4-2.9-.7-4.3l-.3-.9c-.1-.2-.2-.3-.3-.5-.3-.3-.8-.2-1 .1-.2.3-.3.6-.4.9-.1.4-.3.7-.4 1.1-.2.3-.4.5-.8.5-.3 0-.5-.1-.7-.4l-.3-.9c-.1-.3-.2-.5-.3-.8-.5-1.3-1.6-2-2.9-2.4-.3-.1-.6-.1-1-.2.3-.1.5-.1.8-.2 1.4-.3 2.5-1.1 3.1-2.5.1-.3.2-.6.3-1 .1-.2.1-.4.2-.6.2-.5.9-.6 1.2-.2.2.2.3.5.4.7.2.4.2.7.4 1.1.1.2.1.3.2.5.3.4.7.5 1.1.1.2-.2.4-.5.4-.7.2-.7.4-1.4.5-2.1.3-1.5.5-3.1.8-4.6.1-.5.3-1.1.5-1.6.1-.2.2-.4.3-.5.6-.9 1.5-.8 2.1-.3.4.3.6.7.8 1.2.2.8.5 1.6.7 2.5l.6 2.4c0 .2.2.4.3.5.3.5.8.6 1.3.4.3-.2.6-.4.8-.7.4-.6.5-1.3.6-2 .2-1.2.3-2.3.5-3.5.2-1.6.3-3.2.7-4.7.2-.7.4-1.4.9-2 .2-.2.3-.4.6-.6.9-.7 2-.6 2.8.2.5.5.8 1.2 1.1 1.9.3.9.5 1.9.6 2.9l.6 4.8c.1.9.3 1.8.7 2.6.1.3.3.5.5.8.4.5 1.3.7 1.8-.2.3-.6.4-1.3.6-1.9.2-1 .5-2 .7-3.1.1-.5.4-.9.7-1.3.4-.4.8-.5 1.3-.5.4.1.7.3.9.7.4.6.6 1.2.7 1.8.2 1.2.4 2.3.6 3.5.2 1.1.3 2.2.7 3.2.1.3.2.5.4.8.4.5 1 .5 1.2-.1.2-.3.3-.7.4-1.1.1-.3.2-.6.4-.8.1-.2.3-.4.6-.4.4 0 .7.1.8.5s.3.8.4 1.1c.6 1.7 1.7 2.6 3.4 2.9.3.1.2.1.4.1z"
      />
    </svg>
  );
};

export default MiniWaveIcon;
