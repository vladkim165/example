import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../types';
import type { Content, ContentStore } from './types';
import { STATUS } from './types';
import initialState from './initialState';

export const contentStore = createSlice({
  name: 'contentStore',
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<ContentStore['content']>) => {
      state.content = action.payload;
    },
    setStatus: (state, action: PayloadAction<ContentStore['status']>) => {
      state.status = action.payload;
    },
  },
});

export const { setContent, setStatus } = contentStore.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectContent = (state: RootState): Content => {
  return state.contentStore.content;
};
export const selectStatus = (state: RootState): STATUS => {
  return state.contentStore.status;
};

export default contentStore.reducer;
