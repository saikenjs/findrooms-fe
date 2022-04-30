import { Button, Form, Input, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { api } from '~/configs/axios';
import { MainLayout } from '~/layouts';
import { userAtom } from '~/recoil/state';
const Login = () => {
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();

  const onFinish = async (values: never) => {
    try {
      const { data } = await api.post('/users/login', values);
      setUser(data);
      message.success(`Xin chào ${data.fullname}`);
      navigate('/', { replace: true });
    } catch (error) {
      message.error('Đăng nhập thất bại!');
    }
  };

  return (
    <MainLayout>
      <div className='flex justify-center '>
        <Form
          className='p-5 shadow'
          onFinish={onFinish}
          autoComplete='off'
          layout='vertical'
        >
          <h1 className='mb-6 text-2xl font-bold text-center'>Đăng Nhập</h1>
          <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input className='w-80' />
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
