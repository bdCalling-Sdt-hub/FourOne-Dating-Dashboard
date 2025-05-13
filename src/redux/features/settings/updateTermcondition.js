import { apiSlice } from "../../api/apiSlice";


const updateTermcondition = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateTermcondition: builder.mutation({
            query: (data) => ({
                url: `/info/terms-condition`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{ type: "Terms" }]
        })
    }),
})

export const { useUpdateTermconditionMutation } = updateTermcondition;
