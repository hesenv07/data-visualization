import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery,
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => "products",
      providesTags: ["product"],
    }),
  }),
});

export const { useGetProductQuery } = productsApi;
