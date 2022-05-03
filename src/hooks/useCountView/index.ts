import { api } from '~/configs/axios';

export function useCountView() {
  const update = async (roomID: number, count: number) => {
    await api.patch(`/rooms/${roomID}`, { view: count });
  };
  return update;
}
