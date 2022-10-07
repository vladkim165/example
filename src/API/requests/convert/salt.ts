import axios from 'axios';
import logger from '../../../utils/logger';

const getActualSalt = async () => {
  try {
    const response = await axios.request({
      method: 'get',
      url: `/api/convert/salt`,
    });

    return response;
  } catch (err: any) {
    logger.error(err.message);

    throw new Error('Failed to get Actual Salt');
  }
};

export default getActualSalt;
