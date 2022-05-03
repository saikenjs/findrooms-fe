import { Button, Form, Input, Radio, Select } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { api } from '~/configs/axios';
import { useDocumentTitle } from '~/hooks';
import { MainLayout } from '~/layouts';
import { districtAtom, User, wardsAtom } from '~/recoil/state';

const Register = () => {
  useDocumentTitle('Đăng ký');

  const [form] = Form.useForm();

  const [user, setUser] = useState<Partial<User>>({});
  const navigate = useNavigate();

  const districts = useRecoilValue(districtAtom);
  const wards = useRecoilValue(wardsAtom);

  const onFinish = async (values: User) => {
    await api.post('/users', values);
    navigate('/login');
  };

  return (
    <MainLayout>
      <div className='flex justify-center '>
        <Form
          form={form}
          layout='vertical'
          className='p-5 shadow'
          onFinish={onFinish}
          autoComplete='off'
          onValuesChange={(value, all) => {
            setUser(all);
            if (value.districtId) form.setFieldsValue({ ...all, wardId: 0 });
          }}
        >
          <h1 className='mb-6 text-2xl font-bold text-center'>Đăng Ký</h1>
          <Form.Item
            label='Họ và tên'
            name='fullname'
            rules={[{ required: true, message: 'Không được để trống!' }]}
          >
            <Input className='w-96' />
          </Form.Item>

          <Form.Item name='gender' label='Gender'>
            <Radio.Group>
              <Radio value={true}>Nam</Radio>
              <Radio value={false}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label='Tên đăng nhập'
            name='username'
            rules={[{ required: true, message: 'Không được để trống!' }]}
          >
            <Input className='w-96' />
          </Form.Item>

          <Form.Item
            label='Mật khẩu'
            name='password'
            rules={[{ required: true, message: 'Không được để trống!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label='Nhập lại mật khẩu'
            name='confirmPassword'
            rules={[
              { required: true, message: 'Không được để trống!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Nhập lại mật khẩu không khớp!')
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label='Số điện thoại'
            name='phone'
            rules={[{ required: true, message: 'Không được để trống!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label='Email' name='email'>
            <Input />
          </Form.Item>

          <Form.Item
            rules={[{ required: true }]}
            name='districtId'
            initialValue='Chọn quận/huyện'
            label='Quận/huyện'
          >
            <Select>
              {districts.map((e) => (
                <Select.Option key={e.id} value={e.id}>
                  {e.prefix} {e.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            rules={[{ required: true }]}
            name='wardId'
            initialValue='Chọn xã/phường'
            label='Xã/phường'
          >
            <Select value={user.wardId || 0}>
              <Select.Option value={0}>Chọn xã/phường</Select.Option>
              {wards
                .filter((e) => e.districtId === user.districtId)
                .map((e) => (
                  <Select.Option key={e.id} value={e.id}>
                    {e.prefix} {e.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item name='detail'>
            <Input.TextArea placeholder='Địa chỉ chi tiết' />
          </Form.Item>

          <Form.Item>
            <Button
              className='flex mx-auto bg-blue-700'
              type='primary'
              htmlType='submit'
            >
              Đăng Ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </MainLayout>
  );
};

export default Register;
