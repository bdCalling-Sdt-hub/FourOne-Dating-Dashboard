import { apiSlice } from "../../api/apiSlice";

const subscription = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSubscription: builder.query({
            query: () => ({
                url: `/subscription?sortBy=createdAt:desc`,
                method: "GET",
            }),
            providesTags: ["Subscription"],  // You provide this tag here for caching
        }),

        createSubscription: builder.mutation({
            query: (data) => ({
                url: `/subscription`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Subscription"], // Invalidate the "Subscription" tag when creating a subscription
        }),
        updateSubscription: builder.mutation({
            query: ({ data, id }) => ({
                url: `/subscription/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Subscription"], // Invalidate the "Subscription" tag when updating a subscription
        }),
    }),
});

export const { useGetSubscriptionQuery, useCreateSubscriptionMutation , useUpdateSubscriptionMutation } = subscription;
