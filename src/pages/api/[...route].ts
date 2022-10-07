import { routesWithControllers } from '../../API/controllers';
import { NextApiRequest, NextApiResponse } from 'next';

type Req = NextApiRequest & {
  query: { route: string[] };
};

function controller(req: Req, res: NextApiResponse) {
  const {
    query: { route },
  } = req;

  const controller = routesWithControllers[route.join('/')];

  if (!controller) {
    return res.status(404).json({ error: 'Route not found' });
  }

  return controller(req, res);
}

export default controller;
