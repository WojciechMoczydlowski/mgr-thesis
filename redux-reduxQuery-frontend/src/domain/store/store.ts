import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { teacherApi, tasksPoolsReducer } from "./teacher";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
    tasksPools: tasksPoolsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(teacherApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
