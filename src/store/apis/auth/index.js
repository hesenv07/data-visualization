import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const authApi = createApi({
  reducerPath: "authApis",
  baseQuery,
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => "users/1",
      providesTags: ["user"],
    }),
  }),
});

export const { useLazyGetUserInfoQuery } = authApi;
