import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Layout, Menu } from 'antd';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { userAtom } from '~/recoil/state';

const { Header, Content, Footer } = Layout;

export const MainLayout: FC = ({ children }) => {
  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();

  const menu = (
    <Menu>
      <Menu.Item key={0}>
        <Link to='/me/profile'>Quản lý tài khoản</Link>
      </Menu.Item>
      <Menu.Item key={1}>
        <Link to='/me/rooms'>Quản lý tin rao</Link>
      </Menu.Item>
      <Menu.Item key={2}>
        <button
          onClick={() => {
            setUser(null);
            navigate('/');
          }}
          className='text-red-600'
        >
          Đăng xuất
        </button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className='min-h-screen'>
      <Header className='flex items-center justify-between bg-white border-b border-[#f0f0f0]'>
        <div className='text-2xl font-bold text-gray-300'>
          <Link to='/'>
            <img className='w-16 h-16' src='https://i.imgur.com/lIAm6Ys.png' />
          </Link>
        </div>
        <div>
          {user ? (
            <Dropdown overlay={menu} className='cursor-pointer'>
              <div className='flex items-center gap-2'>
                <span>Hi, {user?.fullname}</span>
                <DownOutlined />
              </div>
            </Dropdown>
          ) : (
            <div className='flex gap-4'>
              <Link to='/login'>Đăng nhập</Link>
              <Link to='/register'>Đăng ký</Link>
            </div>
          )}
        </div>
      </Header>
      <Content className='p-5 bg-white'>{children}</Content>
      <Footer style={{ textAlign: 'center' }}>
        TimNguoiOGhep ©2022 QTDA 45K14_01
      </Footer>
    </Layout>
  );
};
