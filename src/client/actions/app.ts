import { createAsyncThunk } from '@reduxjs/toolkit';
import { Data } from '../modules/app';
import { get, post } from '../modules/http';

// type Thunk = {
//   dispatch: Dispatch;
//   state: Store;
// };

type Register = {
  userId: number;
  userName: string;
};

const register = createAsyncThunk<Register | null, string>(
  'register',
  async (userName) => {
    try {
      const { userId } = await post<{ userId: number }>('/api/register', {
        userName,
      });
      return { userId, userName };
    } catch {
      return null;
    }
  },
);

const fetchData = createAsyncThunk('fetchData', async () => {
  const data = await get<Data>('/api/data');
  return data;
});

export { register, fetchData };
