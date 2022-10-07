import { NextApiRequest, NextApiResponse } from 'next';
import logger from '../../../utils/logger';
import { Controller } from '../types';
import { isAllowedToAccess } from '../utils';

export const withAllowedToAccess = (controller: Controller) =>
  (async (req, res) => {
    if (!(await isAllowedToAccess(req))) {
      const msg = `Access denied. Secure cookie is not correct. Route: ${req.url}`;
      logger.error(msg);
      return res.status(403).end(msg);
    }

    return controller(req, res);
  }) as Controller;
