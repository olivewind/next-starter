import type { GetServerSideProps, NextPage } from 'next';
import { privatePage } from '@/lib/with-session';
import { DefaultLayout } from '@/layouts/default';

const DashboardPage: NextPage<{
  username: string;
}> = ({ username }) => {
  return (
    <DefaultLayout>
      <h3 style={{ textAlign: 'center' }}>Hello {username} 🎉, Start your Next.js journey now</h3>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = privatePage(async ({ req }) => {
  return {
    props: {
      username: req.session.user?.username || '',
    },
  };
});

export default DashboardPage;
