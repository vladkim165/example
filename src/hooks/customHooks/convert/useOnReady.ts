import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { STATUS } from '../../../store/convertStore/types';
import { useConvertKey, useStatus, useTitle } from './useStoreData';

export const useOnReady = () => {
  const [status, setStatus] = useStatus();
  const [title, setTitle] = useTitle();
  const [convertKey, setConvertKey] = useConvertKey();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (STATUS.DONE === status && convertKey && title) {
        setStatus(STATUS.IDLE);
        router.push(`/download?convertKey=${convertKey}&title=${title}`);
      }
      if (STATUS.ERROR === status) {
        // TODO реализовать поведение (может модалка или еще что)
        router.push('/');
      }
    })();
  }, [status, title, convertKey]);
};
