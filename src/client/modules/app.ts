/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ReconnectingWebSocket from 'reconnecting-websocket';

const setting: { fontSize: number; cellWidth: number } = localStorage.setting
  ? JSON.parse(localStorage.setting)
  : {
      fontSize: 16,
      cellWidth: 80,
    };

const initialState = {
  comment: '',
  setting,
  socket: new ReconnectingWebSocket(WEBSOCKET_ORIGIN, undefined, {
    maxReconnectionDelay: 4000,
    minReconnectionDelay: 1000,
    connectionTimeout: 1500,
  }),
  dialog: {
    setting: false,
    scoreSend: false,
  },
};

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
});

export { app, DialogType, Setting };
