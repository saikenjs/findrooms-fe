import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { api } from '~/configs/axios';
import { roomsAtom } from '~/recoil/state';

export function useRoomInfo() {
  const setRooms = useSetRecoilState(roomsAtom);

  const fetchRoom = async () => {
    const { data } = await api.get('/rooms');
    setRooms(data);
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  return { fetchRoom };
}
