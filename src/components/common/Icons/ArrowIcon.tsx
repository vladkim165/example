import { FC, HTMLAttributes } from 'react';

import styles from './ArrowIcon.module.scss';

interface ArrowIconProps extends HTMLAttributes<SVGElement> {
  direction?: string;
}

const ArrowIcon: FC<ArrowIconProps> = ({ direction = 'down' }) => {
  const getDirectionClass = (direction?: string) => {
    switch (direction) {
      case 'up':
        return styles.up;
      case 'down':
        return '';
      case 'left':
        return styles.left;
      case 'right':
        return styles.right;
      default:
        return '';
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={`${styles.icon} ${getDirectionClass(direction)}`}
    >
      <polygon points="225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093" />
    </svg>
  );
};

export default ArrowIcon;
