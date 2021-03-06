/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Setting = {
  fontSize: number;
  cellWidth: number;
  rankingWidth: number;
};

const setting = localStorage.setting
  ? (JSON.parse(localStorage.setting) as Setting)
  : {
      fontSize: 16,
      cellWidth: 80,
      rankingWidth: 360,
    };

if (!Object.keys(setting).includes('rankingWidth')) {
  setting.rankingWidth = 360;
}

const userName: string = localStorage.userName || '';

type Data = {
  userId: number;
  userName: string;
  scores: (number | null)[];
}[];

const initialState = {
  user: {
    id: 0,
    name: userName,
  },
  data: [] as Data,
  setting,
  dialog: {
    registration: false,
    setting: false,
    scoreSend: false,
    reset: false,
    resetAll: false,
  },
  editIndex: -1,
  fetched: false,
};

type User = typeof initialState.user;

type DialogType = keyof typeof initialState.dialog;

type SettingPayload = {
  target: keyof Setting;
  value: number;
};

const app = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
    setUserName: (state, { payload }: PayloadAction<string>) => {
      state.user.name = payload;
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
    setEditIndex: (state, { payload }: PayloadAction<number>) => {
      state.editIndex = payload;
    },
    setData: (state, { payload }: PayloadAction<Data>) => {
      const user = payload.find(({ userName }) => userName === state.user.name);
      if (typeof user !== 'undefined') {
        state.user.id = user.userId;
      }
      if (payload.length === 0 && state.user.id > 0) {
        state.user = { id: 0, name: '' };
        localStorage.removeItem('userName');
      }
      state.data = payload;
    },
    fetched: (state) => {
      state.fetched = true;
    },
    fetching: (state) => {
      state.fetched = false;
    },
  },
});

export { app, DialogType, Setting, Data };
