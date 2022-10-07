import { CONVERT_STATUS } from '../../config/convert.config';

enum EXTRA_STATUS {
  IDLE = 'idle',
}

export type STATUS = EXTRA_STATUS | CONVERT_STATUS;

export const STATUS = {
  ...EXTRA_STATUS,
  ...CONVERT_STATUS,
};

// export interface VideoInfo {
//   duration: number;
//   fileSize: number;
//   storeDiskId: number;
//   storeId: number;
//   storeUrl: string;
//   title: string;
// }

export type Format = { id: number; name: string };

export type BeforeConvertSlice = {
  // videoInfo: VideoInfo;
  format: Format;
  videoUrl: string;
  urlInfo: {
    serviceId: string;
    videoId: string;
  };
};

export type ConvertingSlice = {
  convertKey: string;
};

export type AfterCovertSlice = {
  downloadUrl: string;
  title: string;
};

export type StatusSlice = {
  phase: STATUS;
  progress: number;
  errorMsg: string;
};
export interface ConvertStore {
  beforeConvert: BeforeConvertSlice;
  converting: ConvertingSlice;
  afterCovert: AfterCovertSlice;
  status: StatusSlice;
}
