import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import _default from 'next/dist/shared/lib/runtime-config';
import logger from '../../utils/logger';
import { requestStatus } from './config';
import { Controller } from './types';
import { getErrorMessage } from './utils';

// TODO выработать единую систему обработки ошибок
function onError(err: any, req: NextApiRequest, res: NextApiResponse) {
  const errorText = err.message;
  logger.log(errorText);

  res.status(500).end({
    status: requestStatus.ERROR,
    msg: errorText,
  });
}

// const handler = nc<NextApiRequest, NextApiResponse>({ onError, attachParams: true });
const handler = (contoller: Controller) =>
  ((req, res) => {
    try {
      return contoller(req, res);
    } catch (error) {
      return onError(error, req, res);
    }
  }) as Controller;

// nc<NextApiRequest, NextApiResponse>({ onError, attachParams: true });

export default handler;
