import { FC, HTMLAttributes, Children, cloneElement } from 'react';

import styles from './ColumnList.module.scss';

const ColumnList: FC<HTMLAttributes<HTMLUListElement>> = ({ children }) => {
  return (
    <ul className={`container ${styles.columnList}`}>
      {Children.map(children, (child) => (
        <li className={styles.item}>{child}</li>
      ))}
    </ul>
  );
};

export default ColumnList;
