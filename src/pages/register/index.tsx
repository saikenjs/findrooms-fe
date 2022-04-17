import { Button, Form, Input } from 'antd';
import { useState } from 'react';

import { useDocumentTitle } from '~/hooks';
import { MainLayout } from '~/layouts';

const Register = () => {
  useDocumentTitle('Đăng ký');
  const [isMatchPassword, setIsMatchPassword] = useState(false);

  const onFinish = (values: never) => {
    console.log(values);
  };

  const onValuesChange = (valuesChange: any, allValues: any) => {
    console.log(valuesChange, allValues);
    setIsMatchPassword(allValues.password !== allValues.confirmPassword);
  };

  return (
    <MainLayout>
      <div className='flex justify-center '>
        <Form
          className='p-5 shadow'
          onFinish={onFinish}
          autoComplete='off'
          onValuesChange={onValuesChange}
        >
          <h1 className='mb-6 text-2xl font-bold text-center'>Đăng Ký</h1>
          <Form.Item
            label='Tên đăng nhập'
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Mật khẩu'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label='Nhập lại mật khẩu'
            name='confirmPassword'
            rules={[
              { required: true, message: 'Please confirm your password!' },
            ]}
            status={isMatchPassword ? 'success' : 'error'}
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

export default Register;
