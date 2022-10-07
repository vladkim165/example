import { useRouter } from 'next/router';
import { useEffect } from 'react';
import getDownloadUrlRequest from '../../../API/requests/convert/download';
import { useConvertKey, useDownloadUrl } from '../convert/useStoreData';

export const useSetDownloadUrl = () => {
  const router = useRouter();

  const [convertKey] = useConvertKey();
  const [, setDownloadUrl] = useDownloadUrl();

  useEffect(() => {
    (async () => {
      if (!convertKey) return;
      // throw new Error('Invalid query params');
      let downloadUrl = '';
      let attempts = 5;
      while (attempts > 0) {
        try {
          const response = await getDownloadUrlRequest(convertKey);
          if (response.status === 200 && response?.data) {
            downloadUrl = response.data.downloadUrl;
            break;
          }
          throw new Error('Failed to request Download Url');
        } catch (error) {
          attempts--;
        }
      }
      if (!downloadUrl) return;

      setDownloadUrl(downloadUrl);
    })();
  }, [convertKey]);
};
