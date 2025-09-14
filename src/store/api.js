import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const sliceAvto = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
  endpoints: (builder) => ({
    getHealth: builder.query({
      query: () => '/api/v1/health',
    }),
    predict: builder.mutation({
      query: (imageFile) => {
        const formData = new FormData();
        formData.append('file', imageFile);

        return {
          url: '/api/v1/predict',
          method: 'POST',
          body: formData,
        };
      },
    }),
    getBatch: builder.mutation({
      query: (imageFile) => {
        const formData = new FormData();
        imageFile.forEach((e) => {
          formData.append('files', e);
        });

        return {
          url: '/api/v1/predict/batch',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useGetHealthQuery, usePredictMutation, useGetBatchMutation } = sliceAvto;
