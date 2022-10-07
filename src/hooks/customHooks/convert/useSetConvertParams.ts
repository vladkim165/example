import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ALLOWED_FORMATS } from '../../../config/convert.config';
import { convertValidator, parseUrlForVideoId } from '../../../utils/convert.utils';
import { useFormat, useUrlInfo, useVideoUrl } from './useStoreData';

interface ParsedVideoUrl {
  videoId: string;
  serviceId: string;
}

export const useSetConvertParams = () => {
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useVideoUrl();
  const [format, setFormat] = useFormat();
  const [urlInfo, setUrlInfo] = useUrlInfo();

  const queryVideoUrl = router.query.videoUrl as string;
  const queryFormatName = router.query.formatName as string;

  useEffect(() => {
    if (!convertValidator.progressIsAvailable()) {
      router.push('/');
      return;
    }

    if (!queryVideoUrl || !queryFormatName) return;
    // throw new Error('Invalid query params');

    const queryFormat = ALLOWED_FORMATS.find(({ name }) => name === queryFormatName);
    const videoInfo = parseUrlForVideoId(queryVideoUrl) as ParsedVideoUrl;

    if (!queryFormat || !videoInfo) return;
    // throw new Error('Invalid query params');

    setVideoUrl(queryVideoUrl);
    setUrlInfo(videoInfo);
    setFormat(queryFormat);
  }, []);
};
