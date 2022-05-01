import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from 'next';

const sessionOptions = {
  password:
    process.env.SESSION_PASSWORD ||
    'password-must-be-at-least-32-characters-long',
  cookieName: process.env.COOKIE_NAME || 'NEXT_STARTER',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    // secure: process.env.NODE_ENV === `production`,
  },
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
>(
  handler: (
    context: GetServerSidePropsContext,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
  return withIronSessionSsr(handler, sessionOptions);
}

export function privatePage<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
>(
  handler: (
    context: GetServerSidePropsContext,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
  return withIronSessionSsr(async (context) => {
    if (!context.req.session.user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    return await handler(context);
  }, sessionOptions);
}

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: string;
      username: string;
      token: string;
    };
  }
}
