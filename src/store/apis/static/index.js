import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const staticApi = createApi({
  reducerPath: "staticApis",
  baseQuery,
  tagTypes: ["about"],
  endpoints: (builder) => ({
    getAboutInfos: builder.query({
      query: () => "/about",
      providesTags: ["about"],
    }),
  }),
});

export const {
  useGetAboutInfosQuery
} = staticApi;
