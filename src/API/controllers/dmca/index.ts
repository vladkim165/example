import axios from 'axios';
import logger from '../../../utils/logger';
import { Controller } from '../types';

const sharedConvUrl = process.env.SHARED_CONV_URL;
const siteName = process.env.SITE_NAME;

export const sendMail = (async (req, res) => {
  try {
    const { name, email, comment } = req.body;

    if (!name || !email || !comment) res.status(400).end('Invalid send params');

    await axios.request({
      method: 'post',
      url: `${sharedConvUrl}/dmca/submit`,
      data: {
        converter: siteName,
        name,
        email,
        comment,
      },
    });

    res.status(200).end();
  } catch (err: any) {
    logger.error(err);
    res.status(500).end();
  }
}) as Controller;
