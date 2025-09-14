import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const sliceAvto = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
  tagTypes: ['Prediction'],
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
      invalidatesTags: ['Prediction'],
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
      invalidatesTags: ['Prediction'],
    }),
    updateThresholds: builder.mutation({
      query: ({ clean_threshold, damage_threshold }) => ({
        url: `/api/v1/update-thresholds?clean_threshold=${clean_threshold}&damage_threshold=${damage_threshold}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetHealthQuery,
  usePredictMutation,
  useGetBatchMutation,
  useUpdateThresholdsMutation,
} = sliceAvto;
