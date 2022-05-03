import { useEffect, useState } from 'react';

import { api } from '~/configs/axios';
import { User } from '~/recoil/state';

export function useFetchUsers() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const { data } = await api.get('/users');
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, fetchUsers };
}
