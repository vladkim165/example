import { NextApiRequest, NextApiResponse } from 'next';

export type Controller = (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => Promise<void | NextApiResponse<any>>;
