import { createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import { app } from '../modules/app';
import { post } from '../modules/http';
import { Store } from '../modules/store';

type Thunk = {
  dispatch: Dispatch;
  state: Store;
};

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

const checkRegistration = createAsyncThunk<void, void, Thunk>(
  'checkRegistration',
  async (v, { dispatch, getState }) => {
    const { user } = getState();
    const userName = user.name;
    const { userId } = await post<{ userId: number | null }>(
      '/api/checkRegistration',
      { userName },
    );
    if (userId) {
      dispatch(app.actions.setUser({ ...user, id: userId }));
    }
  },
);

export { register, checkRegistration };
