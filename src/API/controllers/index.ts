import { NextApiRequest, NextApiResponse } from 'next';

import {
  salt as saltController,
  status as statusController,
  init as initController,
  download as downloadController,
} from './convert';

import { sendMail as sendMailController } from './dmca';
import handler from './handler';

import { withAllowedToAccess } from './HOC/withAllowedToAccess';

export enum CONVERT {
  INIT = 'convert/init',
  STATUS = 'convert/status',
  SALT = 'convert/salt',
  DOWNLOAD = 'convert/download',
}

export enum DMCA {
  SEND_MAIL = 'dmca/sendMail',
}

export const GET_PARAMS = 'get-params';

export interface Routes {
  [routePath: string]: (
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) => Promise<void | NextApiResponse<any>>;
}

export const routesWithControllers: Routes = {
  [CONVERT.INIT]: handler(withAllowedToAccess(initController)),
  [CONVERT.STATUS]: handler(withAllowedToAccess(statusController)) /*см. коммент внизу*/,
  [CONVERT.SALT]: handler(saltController),
  [CONVERT.DOWNLOAD]: handler(withAllowedToAccess(downloadController)),
  [DMCA.SEND_MAIL]: handler(withAllowedToAccess(sendMailController)),
};

// withAllowedToAccess(initController)
// TODO после нескольких запросов /api/status начинает приходить битый хэш и следовательно 403 Access Denied (приоритет 7/10)
// UPD: проблема глобальней - при последовательном запросе сначала /api/salt в  setSecureCookie(), запрос /api/status начинает с какого-то отдавать данные формата { salt: '------'}, словно стучась в /api/salt, а не в /api/status
// возможно какая-то кривая оптимизация запросов у оболочки 'next-connect'
// UPD2: сейчас убрал обертку 'next-connect', надо тестить поведение
