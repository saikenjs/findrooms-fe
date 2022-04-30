import { useRecoilState } from 'recoil';

import { api } from '~/configs/axios';
import { userAtom } from '~/recoil/state';

export function useUserInfo() {
  const [user, setUser] = useRecoilState(userAtom);
  return async () => {
    const { data } = await api.get(`/users/${user?.id}`);
    setUser(data);
  };
}
