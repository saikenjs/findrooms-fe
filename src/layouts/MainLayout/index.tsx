import { Layout } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userAtom } from '~/recoil/state';

const { Header, Content, Footer } = Layout;

export const MainLayout: FC = ({ children }) => {
  const user = useRecoilValue(userAtom);

  return (
    <Layout className='min-h-screen'>
      <Header className='flex items-center justify-between bg-white border-b border-[#f0f0f0]'>
        <div className='text-2xl font-bold text-gray-300'>LOGO</div>
        <div>
          {user ? (
            <div className='flex gap-6'>
              <span className='font-bold'>Hi, {user.fullname}</span>
              <div>
                <Link
                  className='p-3 text-white bg-blue-700 rounded'
                  to='/profile'
                >
                  Quản lý tài khoản
                </Link>
              </div>
              <div>
                <Link
                  className='p-3 text-white bg-red-400 rounded'
                  to='/create-room'
                >
                  Đăng tin mới
                </Link>
              </div>
            </div>
          ) : (
            <div className='flex gap-6'>
              <div>
                <Link
                  className='p-3 text-white bg-red-400 rounded'
                  to='/register'
                >
                  Đăng ký
                </Link>
              </div>
              <div>
                <Link
                  className='p-3 text-white bg-blue-700 rounded'
                  to='/login'
                >
                  Đăng nhập
                </Link>
              </div>
            </div>
          )}
        </div>
      </Header>
      <Content className='p-5 bg-white'>{children}</Content>
      <Footer style={{ textAlign: 'center' }}>
        TimNguoiOGhep ©2022 Created by QTDA 45K14_01
      </Footer>
    </Layout>
  );
};
