import { Dropdown, Layout, Menu } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userAtom } from '~/recoil/state';

const { Header, Content, Footer } = Layout;

const menu = (
  <Menu>
    <Menu.Item>
      <Link to='/profile'>Profile</Link>
    </Menu.Item>
  </Menu>
);

export const MainLayout: FC = ({ children }) => {
  const user = useRecoilValue(userAtom);
  console.log(user);

  return (
    <Layout className='min-h-screen'>
      <Header className='flex items-center justify-between bg-white border-b border-[#f0f0f0]'>
        <div className='text-2xl font-bold text-gray-300'>LOGO</div>
        <Menu
          className='flex justify-center grow'
          theme='light'
          mode='horizontal'
          defaultSelectedKeys={['2']}
        >
          {new Array(5).fill(null).map((_, index) => {
            const key = index + 1;
            return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
          })}
        </Menu>
        <Dropdown overlay={user ? menu : <></>}>
          <div className='cursor-pointer'>
            {user ? (
              <span>Hi, {user.fullname}</span>
            ) : (
              <Link className='text-blue-600' to='/login'>
                Đăng Nhập
              </Link>
            )}
          </div>
        </Dropdown>
      </Header>
      <Content className='p-5 bg-white'>{children}</Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};
