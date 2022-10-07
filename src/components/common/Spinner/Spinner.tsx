import { FC } from 'react';
import Image from 'next/image';
import spinnerSvg from './images/spinner.svg';

const Spinner: FC<{}> = () => {
  return <Image src={spinnerSvg} alt="spinner" width={100} height={100} />;
};

export default Spinner;
