import { createAsyncThunk } from '@reduxjs/toolkit';
import { post } from '../modules/http';

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
      console.log('失敗しちゃったぁ');
      return null;
    }
  },
);

export { register };
