import { withSessionRoute } from '@/lib/with-session';
import type { NextApiRequest, NextApiResponse } from 'next';
import { uniqueId } from 'lodash-es';

export default withSessionRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
      // you should call backend api to login, then set session
      const user = {
        id: uniqueId(),
        username: req.body.username,
        // use JWT token from backend api
        token: `generate_token_${req.body.username}`,
      };
      req.session.user = user;
      await req.session.save();
      res.status(200).json(user);
      return;
    }
  },
);
