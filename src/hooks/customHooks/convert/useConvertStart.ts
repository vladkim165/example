import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initConvertAsync } from '../../../store/convertStore/convertingSlice';
import { STATUS } from '../../../store/convertStore/types';
import { useFormat, useStatus, useUrlInfo, useVideoUrl } from './useStoreData';

export const useConvertStart = () => {
  const [videoUrl, setVideoUrl] = useVideoUrl();
  const [format, setFormat] = useFormat();
  const [status, setStatus] = useStatus();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (videoUrl && format.id && STATUS.IDLE === status) {
        // @ts-ignore
        await new Promise(async (resolve) => dispatch(initConvertAsync({ resolve })));
      }
    })();
  }, [videoUrl, format.id, status]);
};
