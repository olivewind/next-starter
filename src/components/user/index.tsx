import { $http } from '@/utils/http';
import { $storage } from '@/utils/storage';
import { Avatar, Dropdown, Menu } from '@arco-design/web-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const User = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');

  const onLogout = async () => {
    $storage.clear();
    await $http.delete('api/logout');
    router.replace('/login');
  };

  useEffect(() => {
    $http
      .get<{ data: { id: string; username: string } }>('api/info')
      .then((res) => res.data.data)
      .then((data) => {
        setUsername(data.username);
      });
  }, []);

  const dropList = (
    <Menu>
      <Menu.Item key="1" onClick={onLogout} style={{ width: 100 }}>
        Sign Out
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown droplist={dropList} position="bottom">
      <Avatar size={32} style={{ cursor: 'pointer' }}>
        {username.slice(0, 1).toUpperCase()}
      </Avatar>
    </Dropdown>
  );
};
