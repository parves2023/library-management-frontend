// src/features/api/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (newBook) => ({
        url: "books",
        method: "POST",
        body: newBook,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    getBooks: builder.query({
      query: ({
        page = 1,
        limit = 10,
        filter = "",
        sortBy = "createdAt",
        sort = "desc",
      }) => {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          sortBy,
          sort,
        });
        if (filter) params.append("filter", filter);

        return `books?${params.toString()}`;
      },
    }),
    getABook: builder.query({
      query: (bookId: string) => `books/${bookId}`,
    }), //{{base_url}}/api/books/68709ee7a67eaa056547b184

    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `books/${bookId}`,
        method: "DELETE",
      }), //console.log the response from the server
      transformResponse: (response) => {
        console.log("Delete response:", response);
        return response;
      },
    }),
    updateBook: builder.mutation({
      query: ({ id, updatedBook }) => ({
        url: `books/${id}`,
        method: "PUT",
        body: updatedBook,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    borrowBook: builder.mutation<
      void,
      { book: string; quantity: number; dueDate: string }
    >({
      query: (borrowData) => ({
        url: "borrow",
        method: "POST",
        body: borrowData,
      }),
    }),
borrowSummary: builder.query<
  {
    success: boolean;
    message: string;
    data: { totalQuantity: number; book: { title: string; isbn: string } }[];
  },
  void
>({
  query: () => 'borrow',
}),

  }),
});

export const {
  useAddBookMutation,
  useGetBooksQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useBorrowBookMutation,
  useGetABookQuery,
  useBorrowSummaryQuery,
} = bookApi;
