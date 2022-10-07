import { makeStore } from './index';
import type { ContentStore } from './contentStore/types';
import type { ConvertStore } from './convertStore/types';

export interface StoreState {
  contentStore: ContentStore;
  convertStore: ConvertStore;
}

export type Store = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<Store['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = Store['dispatch'];
