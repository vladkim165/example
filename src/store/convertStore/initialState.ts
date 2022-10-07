import { ALLOWED_FORMATS } from '../../config/convert.config';
import { ConvertStore, STATUS } from './types';

const initialState: ConvertStore = {
  beforeConvert: {
    // videoInfo: {} as VideoInfo,
    format: ALLOWED_FORMATS[0],
    videoUrl: '',
    urlInfo: {
      serviceId: '',
      videoId: '',
    },
  },
  converting: {
    convertKey: '',
  },
  afterCovert: {
    downloadUrl: '',
    title: '',
  },
  status: {
    phase: STATUS.IDLE,
    progress: 0,
    errorMsg: '',
  },
};

export default initialState;
