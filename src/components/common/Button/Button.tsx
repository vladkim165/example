import { FC, HTMLAttributes, Children, cloneElement } from 'react';

import styles from './Button.module.scss';

const BUTTON_COLOR = {
  RED: 'red',
  GREEN: 'green',
  ORANGE: 'orange',
};

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  color?: string;
  narrow?: boolean;
}

const Button: FC<ButtonProps> = ({
  // pretter-ignore
  children,
  color = '',
  narrow = false,
  onClick = () => {},
  className = '',
}) => {
  const getClassName = () => {
    let classList = `${styles.button}`;

    if (narrow) {
      classList += ` ${styles.narrow}`;
    }

    if (className) {
      classList += ` ${className}`;
    }

    if (Object.values(BUTTON_COLOR).includes(color)) {
      classList += ` ${styles[color]}`;
    }

    return classList;
  };

  return (
    <button className={getClassName()} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
