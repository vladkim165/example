import { FC, useState } from 'react';

import LangsPanel from './LangsPanel/LangsPanel';
import Logo from './Logo/Logo';
import SoftLink from '../../common/SoftLink/SoftLink';
import Button from '../../common/Button/Button';
import LangSwitchButton from './LangSwitchButton/LangSwitchButton';
import { useTranslation } from 'next-i18next';

import styles from './Header.module.scss';

const Header: FC = () => {
  const { t } = useTranslation();
  const [isLangVisible, setIsLangVisible] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`${styles.swchWrapper} ${isLangVisible ? styles.opened : ''}`}>
        <LangsPanel />
      </div>

      <div className={styles.headerTop}>
        <div className={styles.container}>
          <Logo />

          <div className={styles.right}>
            <SoftLink>
              <Button color="green" narrow>
                <b>{t('download')}</b> {`${t('converter')} ${t('for_free')}`}
              </Button>
            </SoftLink>

            <LangSwitchButton isLangVisible={isLangVisible} toggle={setIsLangVisible} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
