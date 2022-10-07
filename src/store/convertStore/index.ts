import { combineReducers } from '@reduxjs/toolkit';

import type { ConvertStore } from './types';
import statusSlice from './statusSlice';
import afterConvertSlice from './afterConvertSlice';
import convertingSlice from './convertingSlice';
import beforeConvertSlice from './beforeConvertSlice';

const combinedReducer = combineReducers<ConvertStore>({
  afterCovert: afterConvertSlice,
  converting: convertingSlice,
  beforeConvert: beforeConvertSlice,
  status: statusSlice,
});

export default combinedReducer;
