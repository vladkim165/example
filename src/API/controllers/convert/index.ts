import logger from '../../../utils/logger';
import type { InitParams } from './utils';
import { requestInit, requestStatus, getSalt } from './utils';
import { CONVERT_STATUS } from '../../../config/convert.config';
import { Controller } from '../types';

export const init = (async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { serviceId, videoId, formatId, isRealtime, price } = req.body as InitParams;
      const response = await requestInit({ serviceId, videoId, formatId, isRealtime, price });

      return res.send(response);
    }
  } catch (err: any) {
    logger.error(err);
    res.status(500).end();
  }
}) as Controller;

export const status = (async (req, res) => {
  try {
    if (req.method === 'GET') {
      const { convertKey } = req.query as { convertKey: string };
      const response = await requestStatus(convertKey);

      return res.send(response);
    }
  } catch (err: any) {
    logger.error(err);
    return res.status(500).end();
  }
}) as Controller;

export const download = (async (req, res) => {
  try {
    if (req.method === 'GET') {
      const { convertKey } = req.query as { convertKey: string };
      const responseStatus = await requestStatus(convertKey);

      // if (responseStatus.status !== CONVERT_STATUS.DONE) {
      //   return res.status(204).end('Video not converted');
      // }

      return res.send({ downloadUrl: 'FAKE_url' });
    }
  } catch (err: any) {
    logger.error(err);
    return res.status(500).end();
  }
}) as Controller;

export const salt = (async (req, res) => {
  try {
    if (req.method === 'GET') {
      const userAgent = req.headers['user-agent'] as string;
      const referrer = (req.headers.referrer as string) || '';

      return res.send(await getSalt({ userAgent, referrer }));
    }
  } catch (err: any) {
    logger.error(err);
    return res.status(500).end();
  }
}) as Controller;
