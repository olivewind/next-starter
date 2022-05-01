import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';
import { withSessionRoute } from '../../lib/with-session';
import { get, toString } from 'lodash-es';

export default withSessionRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const headerToken = toString(req.headers['Authorization']);
    const sessionToken = get(req.session.user, 'token', '');
    const token = headerToken || sessionToken;

    return httpProxyMiddleware(req, res, {
      target: process.env.BACKEND_API_URL || 'http://localhost:3001',
      pathRewrite: [],
      headers: {
        Authorization: token,
      },
    }).catch(async (error) => {
      res.status(500).json({
        status: 500,
        code: 500,
        message: `Proxy Error: ${toString(error)}`,
      });
    });
  },
);

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
