import { gql, useLazyQuery } from '@apollo/client';
import { Button, Form, Input, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { MainLayout } from '~/layouts';
import { userAtom } from '~/recoil/state';
const QUERY_LOGIN = gql`
  query Login($username: String!, $password: String!) {
    user(username: $username, password: $password) {
      fullname
      username
      role
      gender
      phone
      facebook
      role
      address {
        district {
          name
          prefix
        }
        ward {
          name
          prefix
        }
        detail
      }
    }
  }
`;

const Login = () => {
  const [login] = useLazyQuery(QUERY_LOGIN);
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();

  const onFinish = async (values: never) => {
    try {
      const result = await login({ variables: values });
      setUser(result.data.user);
      message.success(`Xin chào ${result.data.user.fullname}`);
      navigate('/', { replace: true });
    } catch (error) {
      message.error('Đăng nhập thất bại!');
    }
  };

  return (
    <MainLayout>
      <div className='flex justify-center '>
        <Form className='p-5 shadow' onFinish={onFinish} autoComplete='off'>
          <h1 className='mb-6 text-2xl font-bold text-center'>Đăng Nhập</h1>
          <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              className='flex mx-auto bg-blue-700'
              type='primary'
              htmlType='submit'
            >
              Đăng Nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </MainLayout>
  );
};

export default Login;
