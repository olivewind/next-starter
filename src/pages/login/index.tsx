import { Button, Form, Input, Message } from '@arco-design/web-react';
import type { GetServerSideProps, NextPage } from 'next';
import { withSessionSsr } from '@/lib/with-session';
import { $http } from '@/utils/http';
import { useRouter } from 'next/router';
import { $storage } from '@/utils/storage';
import styles from './index.module.less';

const LoginPage: NextPage = () => {
  const [form] = Form.useForm<ILoginParams>();
  const router = useRouter();

  const onLogin = () => {
    const { username, password } = form.getFieldsValue();
    $http
      .post<{ id: string; token: string; username: string }>('/api/login', {
        username,
        password,
      })
      .then((res) => res.data)
      .then(({ token, username }) => {
        $storage.token = token;
        $storage.username = username;
        router.replace('/dashboard');
      })
      .catch(() => {
        Message.error('Incorrect username or password');
      });
  };

  return (
    <div className={styles['container']}>
      <Form style={{ width: 500 }} onSubmit={onLogin} form={form}>
        <Form.Item label="Username" field="username" help={false} rules={[{ required: true }]}>
          <Input placeholder="whatever you enter" />
        </Form.Item>
        <Form.Item label="Password" field="password" help={false} rules={[{ required: true }]}>
          <Input.Password placeholder="whatever you enter" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 5,
          }}
        >
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withSessionSsr(async ({}) => {
  // const user = !!req.session.user;
  // you can use the backend API to verify it again
  // if already logged in, redirect directly
  // if (!!user) {
  //   return {
  //     redirect: {
  //       destination: '/dashboard',
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: {},
  };
});

export default LoginPage;
