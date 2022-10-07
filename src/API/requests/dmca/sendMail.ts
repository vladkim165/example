import axios from 'axios';
import logger from '../../../utils/logger';
import { setSecureCookie } from '../convert/utils';

const sendMail = async (name: string, email: string, comment: string) => {
  try {
    await setSecureCookie();

    const data = await axios.request({
      method: 'post',
      url: `/api/dmca/sendMail`,
      data: {
        name,
        email,
        comment,
      },
    });

    return data;
  } catch (err: any) {
    logger.error(err);
    throw new Error('Failed to send mail');
  }
};

export default sendMail;
