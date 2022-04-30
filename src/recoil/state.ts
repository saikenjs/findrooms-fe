import { atom } from 'recoil';

export interface Room {
  id: number;
  title: string;
  description: string;
  price: number;
  status: string;
  area: number;
  districtId: number;
  wardId: number;
  detail: string;
}

export const roomsAtom = atom<Room[]>({
  key: 'rooms-atom',
  default: [],
});

export interface User {
  id: number;
  username: string;
  password: string;
  fullname: string;
  gender: boolean;
  phone: string;
  email: string;
  districtId: number;
  wardId: number;
  detail: string;
}

export const userAtom = atom<User | null>({
  key: 'user-atom',
  default: null,
});

export interface District {
  id: number;
  name: string;
  prefix: string;
}

export const districtAtom = atom<District[]>({
  key: 'distrcict-atom',
  default: [
    {
      id: 1,
      name: 'Liên Chiểu',
      prefix: 'Quận',
    },
    {
      id: 2,
      name: 'Thanh Khê',
      prefix: 'Quận',
    },
    {
      id: 3,
      name: 'Hải Châu',
      prefix: 'Quận',
    },
    {
      id: 4,
      name: 'Sơn Trà',
      prefix: 'Quận',
    },
    {
      id: 5,
      name: 'Ngũ Hành Sơn',
      prefix: 'Quận',
    },
    {
      id: 6,
      name: 'Cẩm Lệ',
      prefix: 'Quận',
    },
    {
      id: 7,
      name: 'Hòa Vang',
      prefix: 'Huyện',
    },
    {
      id: 8,
      name: 'Hoàng Sa',
      prefix: 'Huyện',
    },
  ],
});

export interface Ward {
  id: number;
  name: string;
  prefix: string;
  districtId: number;
}

export const wardsAtom = atom<Ward[]>({
  key: 'ward-atom',
  default: [
    {
      id: 1,
      name: 'Hòa Hiệp Bắc',
      prefix: 'Phường',
      districtId: 1,
    },
    {
      id: 2,
      name: 'Hòa Hiệp Nam',
      prefix: 'Phường',
      districtId: 1,
    },
    {
      id: 3,
      name: 'Hòa Khánh Bắc',
      prefix: 'Phường',
      districtId: 1,
    },
    {
      id: 4,
      name: 'Hòa Khánh Nam',
      prefix: 'Phường',
      districtId: 1,
    },
    {
      id: 5,
      name: 'Hòa Minh',
      prefix: 'Phường',
      districtId: 1,
    },
    {
      id: 6,
      name: 'Tam Thuận',
      prefix: 'Phường',
      districtId: 2,
    },
    {
      id: 7,
      name: 'Thanh Khê Tây',
      prefix: 'Phường',
      districtId: 2,
    },
    {
      id: 8,
      name: 'Thanh Khê Đông',
      prefix: 'Phường',
      districtId: 2,
    },
    {
      id: 9,
      name: 'Xuân Hà',
      prefix: 'Phường',
      districtId: 2,
    },
    {
      id: 10,
      name: 'Tân Chính',
      prefix: 'Phường',
      districtId: 2,
    },
    {
      id: 11,
      name: 'Chính Gián',
      prefix: 'Phường',
      districtId: 2,
    },
    {
      id: 12,
      name: 'Vĩnh Trung',
      prefix: 'Phường',
      districtId: 2,
    },
    {
      id: 13,
      name: 'Thạc Gián',
      prefix: 'Phường',
      districtId: 2,
    },
    {
      id: 14,
      name: 'An Khê',
      prefix: 'Phường',
      districtId: 2,
    },
    {
      id: 15,
      name: 'Hòa Khê',
      prefix: 'Phường',
      districtId: 2,
    },
    {
      id: 16,
      name: 'Thanh Bình',
      prefix: 'Phường',
      districtId: 3,
    },
    {
      id: 17,
      name: 'Thuận Phước',
      prefix: 'Phường',
      districtId: 3,
    },
    {
      id: 18,
      name: 'Thạch Thang',
      prefix: 'Phường',
      districtId: 3,
    },
    {
      id: 19,
      name: 'Hải Châu I',
      prefix: 'Phường',
      districtId: 3,
    },
    {
      id: 20,
      name: 'Hải Châu II',
      prefix: 'Phường',
      districtId: 3,
    },
    {
      id: 21,
      name: 'Phước Ninh',
      prefix: 'Phường',
      districtId: 3,
    },
    {
      id: 22,
      name: 'Hòa Thuận Tây',
      prefix: 'Phường',
      districtId: 3,
    },
    {
      id: 23,
      name: 'Hòa Thuận Đông',
      prefix: 'Phường',
      districtId: 3,
    },
    {
      id: 24,
      name: 'Nam Dương',
      prefix: 'Phường',
      districtId: 3,
    },
    {
      id: 25,
      name: 'Bình Hiên',
      prefix: 'Phường',
      districtId: 3,
    },
    {
      id: 26,
      name: 'Bình Thuận',
      prefix: 'Phường',
      districtId: 3,
    },
    {
      id: 27,
      name: 'Hòa Cường Bắc',
      prefix: 'Phường',
      districtId: 3,
    },
    {
      id: 28,
      name: 'Hòa Cường Nam',
      prefix: 'Phường',
      districtId: 3,
    },
    {
      id: 29,
      name: 'Thọ Quang',
      prefix: 'Phường',
      districtId: 4,
    },
    {
      id: 30,
      name: 'Nại Hiên Đông',
      prefix: 'Phường',
      districtId: 4,
    },
    {
      id: 31,
      name: 'Mân Thái',
      prefix: 'Phường',
      districtId: 4,
    },
    {
      id: 32,
      name: 'An Hải Bắc',
      prefix: 'Phường',
      districtId: 4,
    },
    {
      id: 33,
      name: 'Phước Mỹ',
      prefix: 'Phường',
      districtId: 4,
    },
    {
      id: 34,
      name: 'An Hải Tây',
      prefix: 'Phường',
      districtId: 4,
    },
    {
      id: 35,
      name: 'An Hải Đông',
      prefix: 'Phường',
      districtId: 4,
    },
    {
      id: 36,
      name: 'Mỹ An',
      prefix: 'Phường',
      districtId: 5,
    },
    {
      id: 37,
      name: 'Khuê Mỹ',
      prefix: 'Phường',
      districtId: 5,
    },
    {
      id: 38,
      name: 'Hoà Quý',
      prefix: 'Phường',
      districtId: 5,
    },
    {
      id: 39,
      name: 'Hoà Hải',
      prefix: 'Phường',
      districtId: 5,
    },
    {
      id: 40,
      name: 'Khuê Trung',
      prefix: 'Phường',
      districtId: 6,
    },
    {
      id: 41,
      name: 'Hòa Phát',
      prefix: 'Phường',
      districtId: 6,
    },
    {
      id: 42,
      name: 'Hòa An',
      prefix: 'Phường',
      districtId: 6,
    },
    {
      id: 43,
      name: 'Hòa Thọ Tây',
      prefix: 'Phường',
      districtId: 6,
    },
    {
      id: 44,
      name: 'Hòa Thọ Đông',
      prefix: 'Phường',
      districtId: 6,
    },
    {
      id: 45,
      name: 'Hòa Xuân',
      prefix: 'Phường',
      districtId: 6,
    },
    {
      id: 46,
      name: 'Hòa Bắc',
      prefix: 'Xã',
      districtId: 7,
    },
    {
      id: 47,
      name: 'Hòa Liên',
      prefix: 'Xã',
      districtId: 7,
    },
    {
      id: 48,
      name: 'Hòa Ninh',
      prefix: 'Xã',
      districtId: 7,
    },
    {
      id: 49,
      name: 'Hòa Sơn',
      prefix: 'Xã',
      districtId: 7,
    },
    {
      id: 50,
      name: 'Hòa Nhơn',
      prefix: 'Xã',
      districtId: 7,
    },
    {
      id: 51,
      name: 'Hòa Phú',
      prefix: 'Xã',
      districtId: 7,
    },
    {
      id: 52,
      name: 'Hòa Phong',
      prefix: 'Xã',
      districtId: 7,
    },
    {
      id: 53,
      name: 'Hòa Châu',
      prefix: 'Xã',
      districtId: 7,
    },
    {
      id: 54,
      name: 'Hòa Tiến',
      prefix: 'Xã',
      districtId: 7,
    },
    {
      id: 55,
      name: 'Hòa Phước',
      prefix: 'Xã',
      districtId: 7,
    },
    {
      id: 56,
      name: 'Hòa Khương',
      prefix: 'Xã',
      districtId: 7,
    },
  ],
});
