import { useAppSelector, useAppDispatch } from '../../reduxHooks';

import {
  AfterCovertSlice,
  BeforeConvertSlice,
  ConvertingSlice,
  StatusSlice,
} from '../../../store/convertStore/types';

import {
  selectFormat,
  selectVideoUrl,
  selectUrlInfo,
  setFormat as setFormatAction,
  setVideoUrl as setVideoUrlAction,
  setUrlInfo as setUrlInfoAction,
} from '../../../store/convertStore/beforeConvertSlice';

import {
  selectDownloadUrl,
  selectTitle,
  setDownloadUrl as setDownloadUrlAction,
  setTitle as setTitleAction,
} from '../../../store/convertStore/afterConvertSlice';

import {
  selectProgress,
  selectStatus,
  setStatus as setStatusAction,
  setProgress as setProgressAction,
} from '../../../store/convertStore/statusSlice';

import {
  selectConvertKey,
  setConvertKey as setConvertKeyAction,
} from '../../../store/convertStore/convertingSlice';

export type UseVideoUrl = [
  BeforeConvertSlice['videoUrl'],
  (videoUrl: BeforeConvertSlice['videoUrl']) => {
    payload: BeforeConvertSlice['videoUrl'];
    type: string;
  }
];

export const useVideoUrl = (): UseVideoUrl => {
  const videoUrl = useAppSelector(selectVideoUrl);
  const dispatch = useAppDispatch();
  const setVideoUrl = (videoUrl: BeforeConvertSlice['videoUrl']) =>
    dispatch(setVideoUrlAction(videoUrl));

  return [videoUrl, setVideoUrl];
};

export type UseFormat = [
  BeforeConvertSlice['format'],
  (format: BeforeConvertSlice['format']) => { payload: BeforeConvertSlice['format']; type: string }
];

export const useFormat = (): UseFormat => {
  const format = useAppSelector(selectFormat);
  const dispatch = useAppDispatch();
  const setFormat = (format: BeforeConvertSlice['format']) => dispatch(setFormatAction(format));

  return [format, setFormat];
};

export type UseUrlInfo = [
  BeforeConvertSlice['urlInfo'],
  (urlInfo: BeforeConvertSlice['urlInfo']) => {
    payload: BeforeConvertSlice['urlInfo'];
    type: string;
  }
];

export const useUrlInfo = (): UseUrlInfo => {
  const urlInfo = useAppSelector(selectUrlInfo);
  const dispatch = useAppDispatch();
  const setUrlInfo = (urlInfo: BeforeConvertSlice['urlInfo']) =>
    dispatch(setUrlInfoAction(urlInfo));

  return [urlInfo, setUrlInfo];
};

export type UseDownloadUrl = [
  AfterCovertSlice['downloadUrl'],
  (status: AfterCovertSlice['downloadUrl']) => {
    payload: AfterCovertSlice['downloadUrl'];
    type: string;
  }
];

export const useDownloadUrl = (): UseDownloadUrl => {
  const downloadUrl = useAppSelector(selectDownloadUrl);
  const dispatch = useAppDispatch();
  const setDownloadUrl = (downloadUrl: AfterCovertSlice['downloadUrl']) =>
    dispatch(setDownloadUrlAction(downloadUrl));

  return [downloadUrl, setDownloadUrl];
};

export type UseConvertKey = [
  ConvertingSlice['convertKey'],
  (status: ConvertingSlice['convertKey']) => {
    payload: ConvertingSlice['convertKey'];
    type: string;
  }
];

export const useConvertKey = (): UseConvertKey => {
  const convertKey = useAppSelector(selectConvertKey);
  const dispatch = useAppDispatch();
  const setConvertKey = (convertKey: ConvertingSlice['convertKey']) =>
    dispatch(setConvertKeyAction(convertKey));

  return [convertKey, setConvertKey];
};

export type UseProgress = [
  StatusSlice['progress'],
  (status: StatusSlice['progress']) => {
    payload: StatusSlice['progress'];
    type: string;
  }
];

export const useProgress = (): UseProgress => {
  const progress = useAppSelector(selectProgress);
  const dispatch = useAppDispatch();
  const setProgress = (progress: StatusSlice['progress']) => dispatch(setProgressAction(progress));

  return [progress, setProgress];
};

export type UseTitle = [
  AfterCovertSlice['title'],
  (status: AfterCovertSlice['title']) => { payload: AfterCovertSlice['title']; type: string }
];

export const useTitle = (): UseTitle => {
  const title = useAppSelector(selectTitle);
  const dispatch = useAppDispatch();
  const setTitle = (title: AfterCovertSlice['title']) => dispatch(setTitleAction(title));

  return [title, setTitle];
};

export type UseStatus = [
  StatusSlice['phase'],
  (status: StatusSlice['phase']) => { payload: StatusSlice['phase']; type: string }
];

export const useStatus = (): UseStatus => {
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const setStatus = (status: StatusSlice['phase']) => dispatch(setStatusAction(status));

  return [status, setStatus];
};
