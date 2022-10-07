import axios, { AxiosResponse } from 'axios';
import { CONVERT_STATUS, REMOTE_CONVERTER } from '../../../config/convert.config';
import { isProd } from '../../../config/site.config';
import { isEmpty } from '../../../utils/common.utils';
import { getConvertApiAuth } from '../../requests/convert/utils';
import { badHashSalt, secureHashSalt } from '../config';
import { getErrorMessage } from '../utils';

class FakeConvert {
  #status = CONVERT_STATUS.INITIALIZED;

  get status() {
    if (this.#status === CONVERT_STATUS.INITIALIZED) {
      this.#status = CONVERT_STATUS.PROGRESS;
      return CONVERT_STATUS.INITIALIZED;
    }

    if (this.#status === CONVERT_STATUS.DONE) {
      this.#status = CONVERT_STATUS.INITIALIZED;
      return CONVERT_STATUS.DONE;
    }

    if (this.#progress >= 100) {
      this.#status = CONVERT_STATUS.DONE;
    }

    return this.#status;
  }

  #progress = 0;

  get progress() {
    if (this.#progress < 100) {
      this.#progress += Math.ceil(Math.random() * 35);
    } else {
      this.#progress = 0;
    }

    return Math.max(0, Math.min(this.#progress, 100));
  }

  code = 500;
  convertKey = 'FAKE_convertKey';
  title = 'FAKE_title';
}

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
  formatId: string;
  fileSize: number;
  storeDisk: StoreDisk;
  contentInfo: ContentInfo;
};

type Record = {
  mediaFile?: ConvertedVideo;
  convertKey: string;
  status: CONVERT_STATUS;
  progress: number;
};

const fakeConvert = new FakeConvert(); // просто заглушка

export type ConverterResponse = {
  status: 'success' | 'error';
  data: {
    status: CONVERT_STATUS;
    convertKey: string;
    progress: number;
    title: string;
    code: number | undefined;
  };
};

const exportConvertSession = (converterResponse: AxiosResponse<ConverterResponse>) => {
  const { data, status } = converterResponse;

  if (status !== 200 || isEmpty(data?.data)) {
    return {
      status: CONVERT_STATUS.ERROR,
      msg: 'Invalid api response',
    };
  }

  const {
    data: { convertKey, status: convertStatus, progress, title, code },
  } = data;

  let variativeInfo = {};
  switch (convertStatus) {
    case CONVERT_STATUS.PROGRESS:
      variativeInfo = { progress };
      break;

    case CONVERT_STATUS.DONE:
      variativeInfo = { title };
      break;
    case CONVERT_STATUS.ERROR:
      variativeInfo = { msg: getErrorMessage(code ?? null) };
      break;
    default:
      variativeInfo = { msg: 'Invalid convert status' };
  }

  const dataOnClient = {
    status: convertStatus,
    convertKey,
    ...variativeInfo,
  };

  return dataOnClient;
};

export const requestStatus = async (convertKey: string) => {
  // const response = await axios.request<ConverterResponse>({
  //   method: 'get',
  //   url: `${REMOTE_CONVERTER.REMOTE_BASE_URL}/status`,
  //   params: {
  //     convertKey,
  //     // siteHost: REMOTE_CONVERTER.SITEHOST_KEY, // TODO это из старых шаредов, проверить почему сразу не перенесли и нужно ли (Приоритет 2/10)
  //   },
  //   timeout: 3000,
  //   ...getConvertApiAuth(),
  // });

  // __________FAKE_CONVERT______________________________
  const status = fakeConvert.status;
  const progress = fakeConvert.progress;
  const { code, title } = fakeConvert;

  // TODO проверить на реальном ответе что конкретно и в каком случае возвращает данный роут (приоритет: 10/10)
  const response = {
    status: 200,
    data: {
      status: 'success' as 'success' | 'error',
      data: {
        status,
        convertKey: convertKey as string,
        progress,
        title,
        code,
      },
    },
  } as AxiosResponse<ConverterResponse>;
  // ____________________________________________________

  return exportConvertSession(response);
};

export type InitParams = {
  serviceId: string;
  videoId: string;
  formatId: number;
  isRealtime: Boolean;
  price: number;
  countryCode?: string;
  allowDirectDownload?: Boolean;
};

export const requestInit = async ({
  serviceId,
  videoId,
  formatId,
  isRealtime,
  price,
}: InitParams) => {
  // const response = await axios.request<ConverterResponse>({
  //   method: 'post',
  //   url: `${REMOTE_CONVERTER.REMOTE_BASE_URL}/init`,
  //   data: {
  //     serviceId,
  //     videoId,
  //     formatId,
  //     price: price ?? 1,
  //     isRealtime: isRealtime ?? false,
  //     siteHost: REMOTE_CONVERTER.SITEHOST_KEY,
  //     // countryCode,
  //     // allowDirectDownload,
  //   },
  //   timeout: 3000,
  //   ...getConvertApiAuth(),
  // });

  // __________FAKE_CONVERT______________________________
  const response = {
    status: 200,
    data: {
      data: {
        status: CONVERT_STATUS.INITIALIZED,
        convertKey: 'FAKE_convertKey',
        code: 500,
        progress: 0,
        title: 'FAKE_title',
      },
    },
  } as AxiosResponse<ConverterResponse>;
  // ____________________________________________________

  return exportConvertSession(response);
};

type GetSaltProps = { userAgent: string; referrer: string };

export const getSalt = ({ userAgent, referrer }: GetSaltProps) => {
  if (!(userAgent || !referrer) && isProd) {
    return { salt: badHashSalt };
  }

  const botUA = 'Mozilla/5.0 ( compatible )';
  const isBot = userAgent === botUA || referrer.startsWith('https%3A%2F%2F');

  //Bot request referrer and UA example:
  //referrer: "https%3A%2F%2F2conv.com%2Fconv%2Fdownload%2Fd2YiDG8sfVPX03K9" "Mozilla/5.0 ( compatible )"
  //badHashSalt looks just the same but has Russian o and Greek question mark

  return { salt: isBot ? badHashSalt : secureHashSalt };
};
