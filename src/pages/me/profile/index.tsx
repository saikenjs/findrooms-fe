import { Button, Descriptions, Form, Input, message, Select } from 'antd';
import { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { api } from '~/configs/axios';
import { useUserInfo } from '~/hooks';
import { MainLayout } from '~/layouts';
import {
  District,
  districtAtom,
  User,
  userAtom,
  Ward,
  wardsAtom,
} from '~/recoil/state';

interface Props {
  ward?: Ward;
  district?: District;
  user: User;
  mode: 'VIEW' | 'EDIT';
  setMode: Dispatch<SetStateAction<'VIEW' | 'EDIT'>>;
}

function ViewProfile({ ward, district, user, setMode }: Props) {
  return (
    <>
      <Descriptions title='Thông tin người dùng' column={2}>
        <Descriptions.Item label='Họ và tên'>{user.fullname}</Descriptions.Item>
        <Descriptions.Item label='Giới tính'>
          {user.gender ? 'Nam' : 'Nữ'}
        </Descriptions.Item>
        <Descriptions.Item label='Số điện thoại: '>
          {user.phone}
        </Descriptions.Item>
        <Descriptions.Item label='Email'>{user.email}</Descriptions.Item>
        <Descriptions.Item label='Address'>
          {user.detail}, {ward?.prefix} {ward?.name}, {district?.prefix}{' '}
          {district?.name}, TP Đà Nẵng
        </Descriptions.Item>
      </Descriptions>
      <Button
        onClick={() => setMode('EDIT')}
        className='bg-blue-500 text-white'
      >
        Edit
      </Button>
    </>
  );
}

function EditProfile({ ward, district, user, setMode }: Props) {
  const districts = useRecoilValue(districtAtom);
  const wards = useRecoilValue(wardsAtom);
  const [updateUser, setUpdateUser] = useState(user);

  const refetchUser = useUserInfo();
  console.log('render');

  return (
    <Form
      layout='vertical'
      onValuesChange={(change, all) => setUpdateUser({ ...all, wardId: null })}
      onFinish={async (values) => {
        await api.patch(`/users/${user.id}`, values);
        message.success('Cập nhật thành công.');
        setMode('VIEW');
        refetchUser();
      }}
    >
      <Form.Item
        name='fullname'
        label='Tên đầy đủ'
        initialValue={user.fullname}
      >
        <Input value={user.fullname} />
      </Form.Item>
      <Form.Item
        name='districtId'
        initialValue={district?.id}
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
      <Form.Item name='wardId' initialValue={ward?.id} label='Xã/phường'>
        <Select>
          {wards
            .filter((e) => e.districtId === updateUser.districtId)
            .map((e) => (
              <Select.Option key={e.id} value={e.id}>
                {e.prefix} {e.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item name='detail' initialValue={user.detail}>
        <Input.TextArea placeholder='Địa chỉ chi tiết' />
      </Form.Item>
      <Form.Item>
        <Button htmlType='submit' className='bg-blue-500 text-white'>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}

function Profile() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'VIEW' | 'EDIT'>('VIEW');
  const user = useRecoilValue(userAtom);
  const districts = useRecoilValue(districtAtom);
  const wards = useRecoilValue(wardsAtom);

  const ward = wards.find((w) => w.id === user?.wardId);
  const district = districts.find((d) => d.id === user?.districtId);

  return (
    <MainLayout>
      {!user ? (
        <Button
          onClick={() => navigate('/login')}
          className='bg-blue-500 mx-auto text-white block'
        >
          Please Login
        </Button>
      ) : mode === 'VIEW' ? (
        <ViewProfile
          setMode={setMode}
          ward={ward}
          district={district}
          user={user}
          mode={mode}
        />
      ) : (
        <EditProfile
          district={district}
          ward={ward}
          setMode={setMode}
          mode={mode}
          user={user}
        />
      )}
    </MainLayout>
  );
}

export default Profile;
