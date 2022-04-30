import { Button, message, Table } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { api } from '~/configs/axios';
import { useRoomInfo } from '~/hooks';
import { MainLayout } from '~/layouts';
import { roomsAtom, userAtom } from '~/recoil/state';

const RoomManage = () => {
  useRoomInfo();

  const rooms = useRecoilValue(roomsAtom);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const onDeleteRoom = async (id: number) => {
    try {
      await api.delete(`/rooms/${id}`);
      message.success('Xóa thành công');
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
      key: 'status',
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'create_at',
      key: 'create_at',
    },
    {
      title: 'Action',
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
      <Table dataSource={rooms} columns={columns} />;
    </MainLayout>
  );
};

export default RoomManage;
