import { FC } from 'react';
import Link from 'next/link';

import ColumnList from './ColumnList/ColumnList';
import { siteLanguagesWithLabels } from '../../../../config/locales.config';
import { currentLangSuffix } from '../../../../utils/locales.utils';

import styles from './LangsPanel.module.scss';

interface LangsPanelProps {
  customLocales?: { code: string; iso: string; label: string }[];
}

const LangsPanel: FC<LangsPanelProps> = ({ customLocales = siteLanguagesWithLabels }) => {
  return (
    <div className={styles.langsPanel}>
      <ColumnList>
        {customLocales.map(({ code, label }, index) => (
          <Link href={`/${code}${currentLangSuffix}`} key={index} passHref>
            <a className={styles.langItem}>{label}</a>
          </Link>
        ))}
      </ColumnList>
    </div>
  );
};

export default LangsPanel;
