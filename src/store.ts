import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducer/TodoSlice";

const rootReducer = combineReducers({ todoReducer });

export const store = configureStore({
  reducer: {
    todoReducer: todoReducer,
  },
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
