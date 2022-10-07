import { FC, HTMLAttributes } from 'react';

import styles from './LangSwitchButton.module.scss';

import LangIcon from '../../../common/Icons/LangIcon';
import ArrowIcon from '../../../common/Icons/ArrowIcon';
import Button from '../../../common/Button/Button';

interface LangSwitchButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isLangVisible?: boolean;
  toggle?: Function;
}

const LangSwitchButton: FC<LangSwitchButtonProps> = ({
  isLangVisible = false,
  toggle = () => {},
}) => {
  const onClick = () => {
    toggle(!isLangVisible);
  };

  return (
    <Button className={styles.langSwitch} onClick={onClick}>
      <LangIcon />
      <ArrowIcon direction={isLangVisible ? 'up' : 'down'} />
    </Button>
  );
};

export default LangSwitchButton;
