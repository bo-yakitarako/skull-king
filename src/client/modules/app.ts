/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchData, register } from '../actions/app';

const setting: { fontSize: number; cellWidth: number } = localStorage.setting
  ? JSON.parse(localStorage.setting)
  : {
      fontSize: 16,
      cellWidth: 80,
    };

const userName: string = localStorage.userName || '';

const initialData = [...Array(3)].map((v, index) => {
  const scores: (number | null)[] = [...Array(10)].map(() => null);
  return { userId: -index, userName: '-', scores };
});

const initialState = {
  user: {
    id: 0,
    name: userName,
  },
  comment: '',
  data: initialData,
  setting,
  dialog: {
    registration: false,
    setting: false,
    scoreSend: false,
  },
};

type User = typeof initialState.user;
type Data = typeof initialData;

type DialogType = keyof typeof initialState.dialog;

type Setting = keyof typeof initialState.setting;
type SettingPayload = {
  target: Setting;
  value: number;
};

const app = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
    setComment: (state, { payload }: PayloadAction<string>) => {
      state.comment = payload;
    },
    openDialog: (state, { payload }: PayloadAction<DialogType>) => {
      state.dialog[payload] = true;
    },
    closeDialog: (state, { payload }: PayloadAction<DialogType>) => {
      state.dialog[payload] = false;
    },
    setSetting: (state, { payload }: PayloadAction<SettingPayload>) => {
      const { target, value } = payload;
      state.setting[target] = value;
      localStorage.setting = JSON.stringify(state.setting);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, { payload }) => {
      if (payload === null) {
        return;
      }
      const { userId: id, userName: name } = payload;
      localStorage.userName = name;
      state.user = { id, name };
    });
    builder.addCase(fetchData.fulfilled, (state, { payload }) => {
      const user = payload.find(({ userName }) => userName === state.user.name);
      if (typeof user !== 'undefined') {
        state.user.id = user.userId;
      }
      state.data = payload;
    });
  },
});

export { app, DialogType, Setting, Data };
