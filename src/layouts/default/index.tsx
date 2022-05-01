import { User } from '@/components/user';
import { Layout, Grid, Space } from '@arco-design/web-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import styles from './index.module.less';

const { Row, Col } = Grid;

interface IProps {
  extra?: React.ReactNode;
}

export const DefaultLayout = (props: PropsWithChildren<IProps>) => {
  const { extra, children } = props;
  const router = useRouter();
  return (
    <Layout className={styles['layout']}>
      <Layout.Header className={styles['header']}>
        <div className={styles['header-inner']}>
          <Row>
            <Col span={12}>
              <Space>
                <div className={styles['logo']}>
                  <Image
                    onClick={() => router.push('/dashboard')}
                    src="/vercel.svg"
                    alt="logo"
                    height={32}
                    width={120}
                  />
                </div>
                <div className={styles['extra']}>{extra}</div>
              </Space>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <User />
            </Col>
          </Row>
        </div>
      </Layout.Header>
      <Layout.Content className={styles['content']}>
        <div className={styles['content-inner']}>{children}</div>
      </Layout.Content>
    </Layout>
  );
};
