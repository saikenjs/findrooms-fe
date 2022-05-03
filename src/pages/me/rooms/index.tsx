import { Button, message, Table, Tag } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { api } from '~/configs/axios';
import { useFormatDate, useRoomInfo } from '~/hooks';
import { MainLayout } from '~/layouts';
import { districtAtom, userAtom } from '~/recoil/state';

const RoomManage = () => {
  const { rooms, fetchRoom } = useRoomInfo();

  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const formatDate = useFormatDate();
  const districts = useRecoilValue(districtAtom);

  const onDeleteRoom = async (id: number) => {
    try {
      await api.delete(`/rooms/${id}`);
      message.success('Xóa thành công');
      fetchRoom();
    } catch (error: any) {
      message.error(error.message);
    }
  };

  if (!user) return <MainLayout>Login first</MainLayout>;

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (text: string) => (
        <Tag color={text === 'WAIT' ? 'orange' : 'green'}>{text}</Tag>
      ),
      key: 'status',
    },
    {
      title: 'Quận/Huyện',
      dataIndex: 'districtId',
      render: (_districtId: number) =>
        districts.find((e) => e.id === _districtId)?.name,
      key: 'districtId',
    },
    {
      title: 'Ngày đăng',
      render: (_text: string) => formatDate(_text),
      key: 'create_at',
    },
    {
      title: 'Hành động',
      render: (_text: any, record: any) => {
        return (
          <div className='flex gap-4'>
            <Button onClick={() => navigate(`/me/rooms/edit/${record.id}`)}>
              Sửa
            </Button>
            <Button
              className='bg-red-400 text-white'
              onClick={() => onDeleteRoom(record.id)}
            >
              Xóa
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <MainLayout>
      <Button className='mb-4 bg-blue-400 text-white border-0 hover:border'>
        <Link to='/me/rooms/create'>Tạo tin mới</Link>
      </Button>
      <Table dataSource={rooms} columns={columns} />
    </MainLayout>
  );
};

export default RoomManage;
