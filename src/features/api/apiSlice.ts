// src/features/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (newBook) => ({
        url: 'books',
        method: 'POST',
        body: newBook,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
    getBooks: builder.query({
      query: () => 'books',
    }),

  }),
});

export const { useAddBookMutation , useGetBooksQuery  } = bookApi;
