import { configureStore } from '@reduxjs/toolkit';
import { sliceAvto } from './api';

export const store = configureStore({
  reducer: {
    [sliceAvto.reducerPath]: sliceAvto.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sliceAvto.middleware),
});
