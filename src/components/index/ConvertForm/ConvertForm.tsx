import { FC, useState, useRef, ChangeEvent, SyntheticEvent } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

// configs & utils:
import { convertValidator, parseUrlForVideoId } from '../../../utils/convert.utils';
import { ALLOWED_FORMATS } from '../../../config/convert.config';

//store:
import { useVideoUrl, useFormat } from '../../../hooks/customHooks/convert/useStoreData';

// components:
import LinkSvgIcon from '../../common/Icons/LinkSvgIcon';
import SoftLink from '../../common/SoftLink/SoftLink';
import Button from '../../common/Button/Button';
import FormatSelect from './FormatSelect/FormatSelect';

import styles from './ConvertForm.module.scss';

const ConvertForm: FC = () => {
  const { t } = useTranslation();
  const [isConvertPressed, setIsConvertPressed] = useState(false);
  const formRef = useRef(null);
  const router = useRouter();

  const [videoUrl, setVideoUrl] = useVideoUrl();
  const [format, setFormat] = useFormat();

  const handleSetUrl = (event: ChangeEvent<HTMLInputElement>): void => {
    setVideoUrl(event.target.value.trim());
  };

  const nativeCheck = () => {
    const { current: form } = formRef;
    // @ts-ignore: Object is possibly 'null'.
    return form?.reportValidity();
  };

  const submitConvert = async (event: SyntheticEvent) => {
    event && event.preventDefault();

    if (isConvertPressed || !nativeCheck()) return;

    const videoInfo = parseUrlForVideoId(videoUrl);

    if (!videoInfo || !format) return;

    setIsConvertPressed(true);

    convertValidator.setStartConvert();
    router.push(`/progress?videoUrl=${videoUrl}&formatName=${format.name}`);
  };

  return (
    <form className={styles.convertForm} onSubmit={submitConvert} ref={formRef}>
      <input
        className={styles.convertUrl}
        type="text"
        autoFocus
        placeholder={t('conv_input_text')}
        required
        name="url"
        value={videoUrl}
        onChange={handleSetUrl}
      />

      <div className={styles.convertInfo}>
        <LinkSvgIcon />
        <span>{t('conv_input_suggest')}</span>
      </div>

      <div className={styles.formFooter}>
        <FormatSelect
          currentFormat={format}
          setCurrentFormat={setFormat}
          formats={ALLOWED_FORMATS}
        />

        <span className={styles.or}>{t('or')}</span>
        <SoftLink>
          <Button color="green" narrow className={styles.btnDownload}>
            {t('download_converter')}
          </Button>
        </SoftLink>
      </div>
    </form>
  );
};

export default ConvertForm;
