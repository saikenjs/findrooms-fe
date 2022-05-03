import {
  CalendarOutlined,
  EyeOutlined,
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Form, Select, Slider, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { env } from '~/configs/env';
import {
  useDocumentTitle,
  useFetchUsers,
  useFormatDate,
  useRoomInfo,
} from '~/hooks';
import { MainLayout } from '~/layouts';
import { districtAtom, Room, wardsAtom } from '~/recoil/state';

const Home = () => {
  useDocumentTitle('Trang chủ');
  const [form] = Form.useForm();
  const formatDate = useFormatDate();
  const { rooms } = useRoomInfo();
  const { users } = useFetchUsers();

  const navigate = useNavigate();

  const districts = useRecoilValue(districtAtom);
  const wards = useRecoilValue(wardsAtom);
  const [filter, setFilter] = useState({
    districtId: 0,
    wardId: 0,
    area: null,
    price: [0, 10000000],
  });

  const RoomCard = (room: Room) => {
    const images = room.images ? room.images.split('|') : null;

    return (
      <div className='flex shadow mb-8'>
        <div className='w-52 h-52 flex justify-center items-center bg-slate-400 text-white'>
          {images ? (
            <img
              src={`${env.SERVER_URL}/${images[0]}`}
              className='object-cover w-52 h-52'
            />
          ) : (
            'Không có hình ảnh'
          )}
        </div>
        <div className='flex flex-col px-6 py-2'>
          <h3 className='text-xl font-bold mb-5'>{room.title}</h3>
          <p className='font-bold'>
            <span className='text-red-400'>
              {room.price.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })}
            </span>
            <span> - </span>
            <span> {room.area} m2</span>
          </p>
          <p className='mt-4'>{room.description}</p>
          <div className='mt-auto'>
            <div className='flex gap-6'>
              <div className='mb-2 flex items-center gap-2'>
                <CalendarOutlined />
                {formatDate(room.create_at)}
              </div>
              <div className='mb-2 flex items-center gap-2'>
                <HomeOutlined />
                {districts.find((e) => e.id === room.districtId)?.name}
              </div>
              <div className='mb-2 flex items-center gap-2'>
                <UserOutlined />
                {users.find((e) => e.id === room.userId)?.fullname}
              </div>
              <div className='mb-2 flex items-center gap-2'>
                <EyeOutlined />
                {room.view}
              </div>
            </div>

            <div>
              <Button onClick={() => navigate(`/rooms/${room.id}`)}>
                Chi tiết
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      <div>
        <Typography.Title level={3}>Tìm kiếm nhanh</Typography.Title>
        <Form
          className='flex gap-4 items-center'
          layout='vertical'
          onValuesChange={(change, all) => {
            if (change.districtId) {
              setFilter({ ...all, wardId: 0 });
              form.setFieldsValue({ ...all, wardId: 0 });
            } else {
              setFilter(all);
            }
          }}
          onFinish={() => console.log(filter)}
        >
          <Form.Item
            name='districtId'
            initialValue={0}
            label='Quận/Huyện'
            className='w-40'
          >
            <Select>
              <Select.Option value={0}>Tất cả</Select.Option>
              {districts.map((e) => (
                <Select.Option key={e.id} value={e.id}>
                  {e.prefix} {e.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name='wardId'
            initialValue={0}
            className='w-40'
            label='Xã/Phường'
          >
            <Select>
              <Select.Option value={0}>Tất cả</Select.Option>
              {wards
                .filter((e) => e.districtId === filter.districtId)
                .map((e) => (
                  <Select.Option key={e.id} value={e.id}>
                    {e.prefix} {e.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item name='price' initialValue={[0, 10000000]} label='Giá'>
            <Slider
              step={500000}
              className='w-64'
              range
              min={0}
              max={10000000}
              tipFormatter={(value) => value && `${value / 1000000} triệu`}
            />
          </Form.Item>

          <Form.Item>
            <Button className='bg-blue-400 text-white' htmlType='submit'>
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        {rooms
          .filter((e) =>
            filter.districtId ? e.districtId === filter.districtId : true
          )
          .filter((e) => (filter.wardId ? e.wardId === filter.wardId : true))
          .filter(
            (e) => filter.price[0] <= e.price && e.price <= filter.price[1]
          )
          .map((e) => (
            <RoomCard key={e.title} {...e} />
          ))}
      </div>
    </MainLayout>
  );
};

export default Home;
