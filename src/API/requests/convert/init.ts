import axios from 'axios';
import logger from '../../../utils/logger';
import { setSecureCookie } from './utils';

const initConvert = async (serviceId: string, videoId: string, formatId: number) => {
  try {
    await setSecureCookie();
    const response = await axios.request({
      method: 'post',
      url: `/api/convert/init`,
      data: {
        serviceId,
        videoId,
        formatId,
      },
    });

    return response;
  } catch (err: any) {
    logger.error(err);

    throw new Error('Failed to initiate convertation');
  }
};

export default initConvert;
