import { configureStore } from '@reduxjs/toolkit';
import { sliceAvto } from './api';

export const store = configureStore({
  reducer: {
    [sliceAvto.reducerPath]: sliceAvto.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sliceAvto.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
