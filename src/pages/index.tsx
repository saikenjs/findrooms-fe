import { Button, Form, Select } from 'antd';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { useDocumentTitle } from '~/hooks';
import { MainLayout } from '~/layouts';
import { districtAtom, Room, roomsAtom, wardsAtom } from '~/recoil/state';

const Home = () => {
  useDocumentTitle('Trang chủ');
  const districts = useRecoilValue(districtAtom);
  const [form] = Form.useForm();
  const wards = useRecoilValue(wardsAtom);
  const rooms = useRecoilValue(roomsAtom);
  const [filter, setFilter] = useState({ districtId: 0 });

  const RoomCard = (room: Room) => {
    return (
      <div className='flex shadow mb-8'>
        <div className='w-52 h-52 flex justify-center items-center bg-slate-400'>
          Image here
        </div>
        <div className='flex flex-col p-6'>
          <h3 className='text-xl font-bold mb-5'>{room.title}</h3>
          <p className='font-bold'>
            <span className='text-red-400'>{room.price} VND</span>
            <span> - </span>
            <span> {room.area} m2</span>
          </p>
          <p className='mt-4'>{room.description}</p>
          <div className='mt-auto'>
            <p>{room.create_at}</p>
            <div>
              <Button>Chi tiết</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      <div>
        <Form
          layout='vertical'
          className='flex gap-3'
          onValuesChange={(change, all) => {
            if (change.districtId) {
              setFilter({ ...all, wardId: 0 });
              form.setFieldsValue({ ...all, wardId: 0 });
            } else {
              setFilter(all);
            }
          }}
        >
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

          <Form.Item
            rules={[{ required: true }]}
            name='wardId'
            label='Xã/phường'
          >
            <Select>
              <Select.Option value={0}>Chọn xã/phường</Select.Option>
              {wards
                .filter((e) => e.districtId === filter.districtId)
                .map((e) => (
                  <Select.Option key={e.id} value={e.id}>
                    {e.prefix} {e.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </div>
      <div>
        {rooms.map((e) => (
          <RoomCard {...e} />
        ))}
      </div>
    </MainLayout>
  );
};

export default Home;
