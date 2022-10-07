import { FC } from 'react';

import Header from './Header/Header';

import styles from './Layout.module.scss';
import LandingLinks from './LandingLinks/LandingLinks';
import BottomMenu from './BottomMenu/BottomMenu';
import Copyright from './Copyright/Copyright';

interface LayoutProps {
  bottomMenu: LayoutListItem[];
  children: JSX.Element | JSX.Element[];
}

interface LayoutListItem {
  href: string;
  text: string;
}

const Layout: FC<LayoutProps> = ({ bottomMenu, children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
      <LandingLinks />
      <BottomMenu list={bottomMenu} />
      <Copyright />
    </div>
  );
};

export default Layout;
