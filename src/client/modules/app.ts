/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};

const app = createSlice({
  name: 'template',
  initialState,
  reducers: {},
});

export { app };
