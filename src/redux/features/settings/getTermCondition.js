import { apiSlice } from "../../api/apiSlice";


const getTermCondition = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTermCondition: builder.query({
            query: () => `/info/terms-condition`,
            providesTags: [{ type: "Terms" }]
        })
    })
})

export const { useGetTermConditionQuery } = getTermCondition;
