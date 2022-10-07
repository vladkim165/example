import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { StoreState } from '../types';
import type { BeforeConvertSlice } from './types';
import initialState from './initialState';

export const beforeConvertSlice = createSlice({
  name: 'beforeConvert',
  initialState: initialState.beforeConvert,
  reducers: {
    setFormat: (state, action: PayloadAction<BeforeConvertSlice['format']>) => {
      state.format = action.payload;
    },
    setVideoUrl: (state, action: PayloadAction<BeforeConvertSlice['videoUrl']>) => {
      state.videoUrl = action.payload;
    },
    setUrlInfo: (state, action: PayloadAction<BeforeConvertSlice['urlInfo']>) => {
      state.urlInfo = action.payload;
    },
  },
});

export const { setUrlInfo, setFormat, setVideoUrl } = beforeConvertSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFormat = (state: StoreState): BeforeConvertSlice['format'] => {
  return state.convertStore.beforeConvert.format;
};
export const selectVideoUrl = (state: StoreState): BeforeConvertSlice['videoUrl'] => {
  return state.convertStore.beforeConvert.videoUrl;
};
export const selectUrlInfo = (state: StoreState): BeforeConvertSlice['urlInfo'] => {
  return state.convertStore.beforeConvert.urlInfo;
};

export default beforeConvertSlice.reducer;
