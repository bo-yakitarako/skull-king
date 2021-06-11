/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { register } from '../actions/app';

const setting: { fontSize: number; cellWidth: number } = localStorage.setting
  ? JSON.parse(localStorage.setting)
  : {
      fontSize: 16,
      cellWidth: 80,
    };

const userName: string = localStorage.userName || '';

const initialState = {
  user: {
    id: 0,
    name: userName,
  },
  comment: '',
  setting,
  socket: new ReconnectingWebSocket(WEBSOCKET_ORIGIN, undefined, {
    maxReconnectionDelay: 4000,
    minReconnectionDelay: 1000,
    connectionTimeout: 1500,
  }),
  dialog: {
    registration: false,
    setting: false,
    scoreSend: false,
  },
};

type User = typeof initialState.user;

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
      state.user = { id, name };
    });
  },
});

export { app, DialogType, Setting };
