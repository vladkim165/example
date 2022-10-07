import { FC, useState } from 'react';
import { useTranslation } from 'next-i18next';

import styles from './FormatSelect.module.scss';

import Button from '../../../common/Button/Button';
import { Format } from '../../../../store/convertStore/types';

interface FormatSelectProps {
  currentFormat: Format;
  setCurrentFormat: (format: Format) => void;
  formats: Format[];
}

const FormatSelect: FC<FormatSelectProps> = ({ currentFormat, setCurrentFormat, formats = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const handleIsActive = () => {
    setIsOpen(!isOpen);
  };

  const handleSetCurrentFormat = (format: Format) => {
    setCurrentFormat(format);
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.formatSelect}>
      <input type="hidden" name="format" value={currentFormat.id} />
      <Button type="submit" className={`${styles.submit} ${styles.formatControl}`}>
        {t('convert_to')}
      </Button>

      <div className={`${styles.dropDown} ${isOpen ? styles.active : ''}`}>
        <div className={`${styles.formatControl} ${styles.currentFormat}`} onClick={handleIsActive}>
          <div className={styles.currentFormatValue}>{currentFormat.name}</div>
          <span className={`${styles.icon} ${styles.arrow}`} />
        </div>

        <ul id="formats" className={styles.formatList}>
          {formats.map((format) => (
            <li
              key={format.id}
              className={`${styles.format} ${styles.item} ${styles.formatControl}`}
              data-format={format.name}
              onClick={() => {
                handleSetCurrentFormat(format);
              }}
            >
              <span className={styles.name}>{format.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FormatSelect;
