import axios from 'axios';
import logger from '../../../utils/logger';
import { setSecureCookie } from './utils';

const statusConvert = async (convertKey: string) => {
  try {
    await setSecureCookie();
    const response = await axios.request({
      method: 'get',
      url: `/api/convert/status`,
      params: {
        convertKey,
      },
    });

    return response;
  } catch (err: any) {
    logger.error(err.message);

    throw new Error('Failed to check status convertation');
  }
};

export default statusConvert;
