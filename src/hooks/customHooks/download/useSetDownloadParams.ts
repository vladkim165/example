import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useConvertKey, useTitle } from '../convert/useStoreData';

export const useSetDownloadParams = () => {
  const router = useRouter();

  const queryTitle = router.query.title as string;
  const queryConvertKey = router.query.convertKey as string;

  const [, setTitle] = useTitle();
  const [, setConvertKey] = useConvertKey();

  useEffect(() => {
    if (!queryTitle || !queryConvertKey) return;
    // throw new Error('Invalid query params');

    setTitle(queryTitle);
    setConvertKey(queryConvertKey);
  }, []);
};
