import { logger } from '@/lib/logger';
import { withSessionRoute } from '@/lib/with-session';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withSessionRoute(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    logger.info('logout: %s', req.session.user);
    req.session.destroy();
    await req.session.save();
    res.status(200).json({
      code: 200,
      message: 'ok',
    });
    return;
  }
});
