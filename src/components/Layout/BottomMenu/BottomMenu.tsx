import { FC } from 'react';
import { useTranslation } from 'next-i18next';

import { getBottomLinks } from './links';

import styles from './BottomMenu.module.scss';

interface BottomMenuProps {
  list?: BottomMenuItem[];
}

interface BottomMenuItem {
  href: string;
  text: string;
  target?: string;
}

const BottomMenu: FC<BottomMenuProps> = ({ list = [] }) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const links = getBottomLinks(language, {}, t);
  const menuLinks = [...links].concat(list);

  return (
    <section className={styles.section}>
      <div className="container text-center">
        {menuLinks.map(({ href, text, target }, index) => (
          <a key={index} href={href} target={target} className={styles.bmLink}>
            {text}
          </a>
        ))}
      </div>
    </section>
  );
};

export default BottomMenu;
