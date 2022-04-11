import { atom } from 'recoil';

interface User {
  fullname: string;
  username: string;
  gender: string;
  phone: string;
  facebook: string;
  role: string;
  address: {
    district: {
      name: string;
      prefix: string;
    };
    ward: {
      name: string;
      prefix: string;
    };
    detail: string;
  };
}

export const userAtom = atom<User | null>({
  key: 'user-atom',
  default: null,
});
