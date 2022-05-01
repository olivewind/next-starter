import { withSessionRoute } from '@/lib/with-session';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withSessionRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const user = req.session.user;
    res.status(200).json({
      status: 200,
      data: {
        id: user?.id,
        username: user?.username,
      },
    });
  },
);
