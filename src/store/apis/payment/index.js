import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const paymentApi = createApi({
    reducerPath: "paymentApi",
    baseQuery,
    tagTypes: ['payment'],
    endpoints: (builder) => ({
        payWithMillikart: builder.mutation({
            query: (paymentData) => ({
                url: '/payment/millikart/pay',
                method: 'POST',
                body: paymentData,
            }),
            invalidatesTags: ['payment'],
        }),
        payWithStripe: builder.mutation({
            query: (paymentData) => ({
                url: '/payment/stripe/pay',
                method: 'POST',
                body: paymentData,
            }),
            invalidatesTags: ['payment'],
        }),
        payWithParacoin: builder.mutation({
            query: (paymentData) => ({
                url: '/payment/paracoin/pay',
                method: 'POST',
                body: paymentData,
            }),
            invalidatesTags: ['payment'],
        }),
        payWithSquare: builder.mutation({
            query: (paymentData) => ({
                url: '/payment/squareup/pay',
                method: 'POST',
                body: paymentData,
            }),
            invalidatesTags: ['payment'],
        }),
        payWithPortmanat: builder.mutation({
            query: (paymentData) => ({
                url: '/payment/netcard/pay',
                method: 'POST',
                body: paymentData,
            }),
            invalidatesTags: ['payment'],
        }),
        payWithPayriff: builder.mutation({
            query: (paymentData) => ({
                url: '/payment/payriff/pay',
                method: 'POST',
                body: paymentData,
            }),
            invalidatesTags: ['payment'],
        })
    }),
});

export const { 
    usePayWithMillikartMutation, 
    usePayWithParacoinMutation, 
    usePayWithStripeMutation, 
    usePayWithSquareMutation,
    usePayWithPortmanatMutation,
    usePayWithPayriffMutation 
} = paymentApi
