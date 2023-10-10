import { createApi } from "@reduxjs/toolkit/query/react";
import { getFromLocale } from "utils";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api/`,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${getFromLocale()}`);
      headers.set("Language", `${getFromLocale("language")}`);
      return headers;
    },
  	}),
    tagTypes: ['user', 'user-domain', 'user-hosting', 'user-vps', 'user-server', 'user-reseller'],
    endpoints: (builder) => ({
        changePassword: builder.mutation({
            query: (passwordData) => ({
                url: '/user/update-password',
                method: 'POST',
                body: passwordData,
            }),
            invalidatesTags: ['user'],
        }),
        editUserData: builder.mutation({
      		query: (data) => ({
		        url: "/user/update-detail",
		        method: "POST",
		        body: data,
		        formData: true,
		      }),
		    invalidatesTags: ["user"],
	    }),
        updateUserCurrency: builder.mutation({
            query: (data) => ({
              url: "/user/update-currency",
              method: "POST",
              body: data
            }),
          invalidatesTags: ["user"],
        }),
        getUserDomains: builder.query({
            query: () => "/user/domain",
            providesTags: ["user-domain"],
        }),
        changeDomainNS: builder.mutation({
            query: (body) => ({
                url: 'domain/modify',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['user-domain'],
        }),
        renewDomain: builder.mutation({
            query: (body) => ({
                url: 'domain/renew',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['user-domain'],
        }),
        getUserHostings: builder.query({
            query: () => "/user/hosting",
            providesTags: ["user-hosting"],
        }),
        increaseHostingTime: builder.mutation({
            query: (body) => ({
                url: 'hosting/raise',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['user-hosting'],
        }),
        resetHostingPassword: builder.mutation({
            query: (body) => ({
                url: 'hosting/reset-password',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['user-hosting'],
        }),
        getUserVPS: builder.query({
            query: () => "/user/vps",
            providesTags: ["user-vps"],
        }),
        increaseVPSTime: builder.mutation({
            query: (body) => ({
                url: 'vps/raise',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['user-vps'],
        }),
        getUserServers: builder.query({
            query: () => "/user/server",
            providesTags: ["user-server"],
        }),
        increaseServerTime: builder.mutation({
            query: (body) => ({
                url: 'server/raise',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['user-server'],
        }),
        getUserResellers: builder.query({
            query: () => "/user/reseller",
            providesTags: ["user-reseller"],
        }),
        increaseResellerTime: builder.mutation({
            query: (body) => ({
                url: 'vps/reseller/raise',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['user-reseller'],
        }),
    }),
});

export const { 
    useChangePasswordMutation, 
    useEditUserDataMutation, 
    useGetUserDomainsQuery, 
    useGetUserHostingsQuery, 
    useGetUserVPSQuery, 
    useGetUserServersQuery,
    useChangeDomainNSMutation ,
    useRenewDomainMutation,
    useIncreaseHostingTimeMutation,
    useResetHostingPasswordMutation,
    useUpdateUserCurrencyMutation,
    useGetUserResellersQuery,
    useIncreaseServerTimeMutation,
    useIncreaseVPSTimeMutation,
    useIncreaseResellerTimeMutation
} = userApi
