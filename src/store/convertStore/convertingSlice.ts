import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';

import type { StoreState } from '../types';
import { ConvertingSlice, STATUS } from './types';
import initialState from './initialState';
import { selectProgress, selectStatus, setErrorMsg, setProgress, setStatus } from './statusSlice';
import { selectFormat, selectUrlInfo } from './beforeConvertSlice';
import initConvertRequest from '../../API/requests/convert/init';
import fetchStatusRequest from '../../API/requests/convert/status';

import { setDownloadUrl, setTitle } from './afterConvertSlice';

type FProps = {
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
  getState: () => StoreState;
};

const setErrorStatus = (msg: string = '', { dispatch }: FProps) => {
  dispatch(setStatus(STATUS.ERROR));
  const errorMsg = msg || `error_others_${process.env.SITE_NAME}`;
  dispatch(setErrorMsg(errorMsg));
};

const setProgressStatus = (serverProgress: NodeJS.Timer, { dispatch, getState }: FProps) => {
  dispatch(setStatus(STATUS.PROGRESS));
  const progress = selectProgress(getState());
  const updatedProgress = Math.min(Math.max(serverProgress as unknown as number, progress), 98);
  dispatch(setProgress(updatedProgress));
};

const setDoneStatus = (
  { title, downloadUrl }: { title: string; downloadUrl: string },
  { dispatch }: FProps
) => {
  dispatch(setStatus(STATUS.DONE));
  dispatch(setProgress(100));
  dispatch(setTitle(title));
  dispatch(setDownloadUrl(downloadUrl));
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const initConvertAsync = createAsyncThunk(
  'convertStore/converting/initConvert',
  // @ts-ignore
  async (_, { getState, dispatch }) => {
    try {
      const state = getState() as StoreState;
      const status = selectStatus(state);
      const format = selectFormat(state);
      const { serviceId, videoId } = selectUrlInfo(state);

      if (status !== STATUS.IDLE) {
        throw new Error('Convert is already started');
      }

      if (!serviceId || !videoId) {
        throw new Error('Invalid video url');
      }

      if (!format.id) {
        throw new Error('Invalid target format');
      }

      dispatch(setStatus(STATUS.INITIALIZED));

      const response = await initConvertRequest(serviceId, videoId, format.id);
      const { data } = response;

      const { convertKey, msg } = data;
      if (!convertKey) {
        throw new Error(msg);
      }
      dispatch(setConvertKey(convertKey));

      await handleCheckStatus({ dispatch, getState } as FProps);
    } catch (error: any) {
      setErrorStatus(error.message, { dispatch } as FProps);
    }
  }
);

const MAX_RETRIES = 10;
let errorThreshold = MAX_RETRIES;
const handleCheckStatus = async ({ dispatch, getState }: FProps) => {
  let status = selectStatus(getState());
  while (status !== STATUS.DONE && status !== STATUS.ERROR) {
    while (errorThreshold > 0) {
      try {
        await sleep(2000);
        await checkStatus({ dispatch, getState });
        break;
      } catch (error: any) {
        errorThreshold -= 1;
        if (errorThreshold === 0) {
          setErrorStatus(error.message, { dispatch } as FProps);
        }
      }
    }

    errorThreshold = MAX_RETRIES;
    status = selectStatus(getState());
  }
};

const checkStatus = async ({ dispatch, getState }: FProps) => {
  const convertKey = selectConvertKey(getState());
  const response = await fetchStatusRequest(convertKey);
  const { data } = response;

  switch (data.status) {
    case STATUS.INITIALIZED: {
      break;
    }
    case STATUS.ERROR: {
      const { msg } = data;
      setErrorStatus(msg, { dispatch } as FProps);
      break;
    }
    case STATUS.PROGRESS: {
      const { progress } = data;
      setProgressStatus(progress, { dispatch, getState });
      break;
    }
    case STATUS.DONE: {
      const { title, downloadUrl } = data;
      setDoneStatus({ title, downloadUrl }, { dispatch } as FProps);
      break;
    }

    default: {
      throw new Error('Invalid status');
    }
  }
};

export const convertingSlice = createSlice({
  name: 'converting',
  initialState: initialState.converting,
  reducers: {
    setConvertKey: (state, action: PayloadAction<ConvertingSlice['convertKey']>) => {
      state.convertKey = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initConvertAsync.pending, (state, action) => {})
      .addCase(initConvertAsync.fulfilled, (state, action) => {
        // @ts-ignore
        action.meta.arg?.resolve();
      })
      .addCase(initConvertAsync.rejected, (state, action) => {
        // @ts-ignore
        action.meta.arg?.resolve();
      });
  },
});

export const { setConvertKey } = convertingSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectConvertKey = (state: StoreState): ConvertingSlice['convertKey'] => {
  return state.convertStore.converting.convertKey;
};

export default convertingSlice.reducer;
