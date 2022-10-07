import axios from 'axios';
import logger from '../../../utils/logger';
import { setSecureCookie } from './utils';

const getDownloadUrl = async (convertKey: string) => {
  try {
    await setSecureCookie();

    const responseDownload = await axios.request({
      method: 'get',
      url: `/api/convert/download`,
      params: {
        convertKey,
      },
    });

    return responseDownload;
  } catch (err: any) {
    logger.error(err.message);

    throw new Error('Failed to get video download url');
  }
};

export default getDownloadUrl;
