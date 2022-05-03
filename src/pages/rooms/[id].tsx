import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { api } from '~/configs/axios';
import { useCountView } from '~/hooks';
import { MainLayout } from '~/layouts';
import { Room } from '~/recoil/state';

const RoomDetail = () => {
  const countView = useCountView();
  const [room, setRoom] = useState<Room | undefined>();

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/rooms/${id}`);
      setRoom(data);
      countView(Number(id), data.view + 1);
    })();
  }, []);

  return (
    <MainLayout>
      <div>
        <div>left</div>
        <div>right</div>
      </div>
    </MainLayout>
  );
};

export default RoomDetail;
