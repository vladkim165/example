import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { StoreState } from '../types';
import type { AfterCovertSlice } from './types';
import initialState from './initialState';

export const afterConvertSlice = createSlice({
  name: 'afterConvert',
  initialState: initialState.afterCovert,
  reducers: {
    setDownloadUrl: (state, action: PayloadAction<AfterCovertSlice['downloadUrl']>) => {
      state.downloadUrl = action.payload;
    },
    setTitle: (state, action: PayloadAction<AfterCovertSlice['title']>) => {
      state.title = action.payload;
    },
  },
});

export const { setDownloadUrl, setTitle } = afterConvertSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDownloadUrl = (state: StoreState): AfterCovertSlice['downloadUrl'] => {
  return state.convertStore.afterCovert.downloadUrl;
};

export const selectTitle = (state: StoreState): AfterCovertSlice['title'] => {
  return state.convertStore.afterCovert.title;
};

export default afterConvertSlice.reducer;
