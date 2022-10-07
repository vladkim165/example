import { CONVERT_STATUS } from '../../../config/convert.config';

type StoreDisk = {
  id: string;
  storeServerId: string;
  baseUrl: string;
};

const storeDisk = {
  id: '3',
  storeServerId: '4',
  baseUrl: 'FAKE_storeUrl',
} as StoreDisk;

type ContentInfo = {
  title: string;
  seconds: number;
};

const contentInfo = {
  title: 'FAKE_title',
  seconds: 314,
};

type ConvertedVideo = {
  videoId: string;
  serviceId: string;
  formatId: number;
  fileSize: number;
  storeDisk: StoreDisk;
  contentInfo: ContentInfo;
};

type Record = {
  convertKey: {};
  mediaFile?: ConvertedVideo;
  status: CONVERT_STATUS;
  progress: number;
};

type videoParams = { videoId: string; serviceId: string; formatId: number };

class Converter {
  converted_videos = {} as Record[];

  exportConvertRecordData = (record: Record) => {
    const AxiosResponseFake = (response: any) => ({
      status: 200,
      data: {
        status: 'success', //...doing...
        data: response,
      },
    });

    if (!record) return { status: CONVERT_STATUS.ERROR };

    const { mediaFile, convertKey, status, progress } = record;

    if (mediaFile) {
      return {
        status,
        convertKey,
        data: {
          storeId: mediaFile.storeDisk.storeServerId,
          storeDiskId: mediaFile.storeDisk.id,
          storeUrl: mediaFile.storeDisk.baseUrl,
          title: mediaFile.contentInfo.title,
          duration: mediaFile.contentInfo.seconds,
          fileSize: mediaFile.fileSize,
        },
      };
    }

    return {
      status,
      convertKey,
      data: {
        ...(status === CONVERT_STATUS.PROGRESS ? { progress } : {}),
      },
    };
  };

  init = (serviceId: string, videoId: string, formatId: number) => {
    const isFindRecord = (record: Record) => {
      const { mediaFile } = record;
      if (!mediaFile) return false;

      return (
        mediaFile.videoId === videoId &&
        mediaFile.formatId === formatId &&
        mediaFile.serviceId === serviceId
      );
    };

    const convertRecord = this.converted_videos.find(isFindRecord) as Record;
    if (convertRecord) return this.exportConvertRecordData(convertRecord);

    let convertKey = '';
    while (1) {
      convertKey = `FAKE_convertKey${Math.random() * 10000}`;
      if (!this.converted_videos.find((record) => record.convertKey === convertKey)) break;
    }

    const newRecord = {
      convertKey,
      status: CONVERT_STATUS.INITIALIZED,
      progress: 0,
    };

    this.converted_videos.push(newRecord);

    this.doProgress(convertKey, { videoId, serviceId, formatId });

    return this.exportConvertRecordData(newRecord);
  };

  doProgress = (convertKey: string, { videoId, serviceId, formatId }: videoParams) => {
    const convertRecord = this.converted_videos.find(
      (record) => record.convertKey === convertKey
    ) as Record;

    const intervalId = setInterval(() => {
      const { progress } = convertRecord;
      const progressDelta = Math.random() * 20;
      const newProgress = Math.ceil(Math.max(0, Math.min(progress + progressDelta, 100)));
      convertRecord.progress = newProgress;
      if (newProgress >= 100) {
        clearInterval(intervalId);
        convertRecord.status = CONVERT_STATUS.DONE;
        convertRecord.mediaFile = {
          videoId,
          serviceId,
          formatId,
          fileSize: Math.max(314, Math.random() * 10000),
          storeDisk,
          contentInfo,
        };
      }
    }, 1500);
  };

  status = (convertKey: string) => {
    const convertRecord = this.converted_videos.find(
      (record) => record.convertKey === convertKey
    ) as Record;

    return this.exportConvertRecordData(convertRecord);
  };
}

export default new Converter();
