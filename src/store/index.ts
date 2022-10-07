import { configureStore, combineReducers, AnyAction } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';

import type { Store, StoreState } from './types';
import contentReducer from './contentStore';
import convertReducer from './convertStore';
import { isProd } from '../config/site.config';

const combinedReducer = combineReducers<StoreState>({
  contentStore: contentReducer,
  convertStore: convertReducer,
});

const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer,
    devTools: !isProd,
  });

// export const wrapper = createWrapper(makeStore, { debug: !isProd });
export const wrapper = createWrapper(makeStore);
