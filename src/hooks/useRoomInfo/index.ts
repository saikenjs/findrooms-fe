import { useEffect, useState } from 'react';

import { api } from '~/configs/axios';
import { Room } from '~/recoil/state';

export function useRoomInfo() {
  const [rooms, setRooms] = useState<Room[]>([]);

  const fetchRoom = async () => {
    const { data } = await api.get('/rooms');
    setRooms(data);
    return data;
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  return { fetchRoom, rooms };
}
