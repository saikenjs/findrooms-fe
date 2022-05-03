import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Select, Typography, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { api } from '~/configs/axios';
import { env } from '~/configs/env';
import { useRoomInfo } from '~/hooks';
import { MainLayout } from '~/layouts';
import { districtAtom, Room, userAtom, wardsAtom } from '~/recoil/state';

const EditRoom = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const user = useRecoilValue(userAtom);

  const { fetchRoom } = useRoomInfo();

  const districts = useRecoilValue(districtAtom);
  const wards = useRecoilValue(wardsAtom);

  const [room, setRoom] = useState<Partial<Room>>({});
  console.log(room);

  useEffect(() => {
    (async () => {
      const data = await fetchRoom();
      form.setFieldsValue(data.find((e: any) => e.id === Number(id)));
      setRoom(data || {});
    })();
  }, []);

  const navigate = useNavigate();

  if (!user) {
    return (
      <Button
        onClick={() => navigate('/login')}
        className='bg-blue-500 mx-auto text-white block'
      >
        Hãy đăng nhập !
      </Button>
    );
  }

  return (
    <MainLayout>
      <Form
        initialValues={room}
        form={form}
        className='container mx-auto'
        labelCol={{ span: 6 }}
        labelAlign='left'
        onValuesChange={(change, all) => {
          if (change.districtId) {
            setRoom({ ...all, wardId: 0 });
            form.setFieldsValue({ ...all, wardId: 0 });
          } else {
            setRoom(all);
          }
        }}
      >
        <Typography.Title level={4} type='danger'>
          Cập nhật tin đăng
        </Typography.Title>

        <Form.Item label='Tiêu đề tin rao' name='title' required>
          <Input placeholder='Tiêu đề' />
        </Form.Item>

        <Form.Item label='Mô tả' name='description' required>
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          rules={[{ required: true }]}
          name='districtId'
          label='Quận/huyện'
          initialValue='Chọn quận/huyện'
        >
          <Select>
            {districts.map((e) => (
              <Select.Option key={e.id} value={e.id}>
                {e.prefix} {e.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item rules={[{ required: true }]} name='wardId' label='Xã/phường'>
          <Select>
            <Select.Option value={0}>Chọn xã/phường</Select.Option>
            {wards
              .filter((e) => e.districtId === room.districtId)
              .map((e) => (
                <Select.Option key={e.id} value={e.id}>
                  {e.prefix} {e.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item label='Địa chỉ chi tiết' name='detail' required>
          <Input.TextArea />
        </Form.Item>

        <Form.Item label='Diện tích' name='area' required>
          <Input type='number' suffix='m2' />
        </Form.Item>

        <Form.Item label='Giá' name='price' required>
          <Input type='number' suffix='VND' />
        </Form.Item>

        <Form.Item name='images' label='Hình ảnh' required>
          <Upload action={`${env.SERVER_URL}/rooms/upload`} listType='picture'>
            <div className='flex flex-col justify-center items-center border-dashed p-3 border-2'>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
      <Button
        onClick={async () => {
          try {
            await api.patch(`/rooms/${id}`, {
              ...room,
              images: room.images?.fileList
                .map((e: any) => e.response?.path)
                .join('|'),
            });
            message.success('Cập nhật thành công!');
            navigate('/me/rooms');
          } catch (error) {
            message.error('Cập nhật thất bại!');
          }
        }}
        className='bg-red-500 text-white block mx-auto'
        htmlType='submit'
      >
        Update
      </Button>
    </MainLayout>
  );
};

export default EditRoom;
