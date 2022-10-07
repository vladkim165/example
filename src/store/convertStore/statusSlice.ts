import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { StoreState } from '../types';
import initialState from './initialState';
import type { StatusSlice } from './types';

export const statusSlice = createSlice({
  name: 'status',
  initialState: initialState.status,
  reducers: {
    setStatus: (state, action: PayloadAction<StatusSlice['phase']>) => {
      state.phase = action.payload;
    },
    setProgress: (state, action: PayloadAction<StatusSlice['progress']>) => {
      state.progress = action.payload;
    },
    setErrorMsg: (state, action: PayloadAction<StatusSlice['errorMsg']>) => {
      state.errorMsg = action.payload;
    },
  },
});

export const { setStatus, setProgress, setErrorMsg } = statusSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectStatus = (state: StoreState): StatusSlice['phase'] => {
  return state.convertStore.status.phase;
};

export const selectProgress = (state: StoreState): StatusSlice['progress'] => {
  return state.convertStore.status.progress;
};

export const selectErrorMsg = (state: StoreState): StatusSlice['errorMsg'] => {
  return state.convertStore.status.errorMsg;
};

export default statusSlice.reducer;
