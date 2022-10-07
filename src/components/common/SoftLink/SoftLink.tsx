import { FC } from 'react';
import { useTranslation } from 'next-i18next';

import { studioUrls, utmDefault } from '../../../config/site.config';
import { osGroup } from '../../../config/os.conifg';

import styles from './SoftLink.module.scss';

interface UtmOptions {
  source?: number;
  medium?: string;
  campaign?: number;
}

interface SoftLinkProps {
  os?: string;
  utm?: UtmOptions;
  isLandingLink?: boolean;
  children: JSX.Element | JSX.Element[];
}

const SoftLink: FC<SoftLinkProps> = ({
  children,
  os = osGroup.win,
  utm,
  isLandingLink = false,
}) => {
  const utmQuery = Object.entries({ ...utmDefault, ...utm })
    .map(([key, val]) => `utm_${key}=${val}`)
    .join('&');
  const {
    i18n: { language },
  } = useTranslation();
  const link = `https://mp3.studio/${language}${studioUrls[os]}?${utmQuery}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className={isLandingLink ? styles.landingLink : ''}
    >
      {children}
    </a>
  );
};

export default SoftLink;
