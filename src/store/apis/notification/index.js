import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const notificationApi = createApi({
  reducerPath: "notificationApis",
  baseQuery,
  tagTypes: ["notifications"],
  endpoints: (builder) => ({
    getNotificationList: builder.query({
      query: () => "/user/notification",
      providesTags: ["notifications"],
    }),
    markNotification: builder.mutation({
      query: (body) => ({
        url: "/user/notification/mark-read",
        method: "POST",
        body,
      }),
      invalidatesTags: ["notifications"],
    }),
    deleteNotification: builder.mutation({
      query: (body) => ({
        url: "/user/notification/delete",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["notifications"],
    }),
  }),
});

export const {
  useGetNotificationListQuery,
  useMarkNotificationMutation,
  useDeleteNotificationMutation,
} = notificationApi;
