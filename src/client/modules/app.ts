/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  comment: '',
};

const app = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setComment: (state, { payload }: PayloadAction<string>) => {
      state.comment = payload;
    },
  },
});

export { app };
