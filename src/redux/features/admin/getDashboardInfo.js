
import { apiSlice } from "../../api/apiSlice";


const allDashboardInfo = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        allDashboardInfo: builder.query({
            query: () => ({
                url: `/admin/dashboard/status`,
                method: "GET",
            })
        }),
        sevenDays: builder.query({
            query: () => ({
                url: `/admin/dashboard/status?day=7`,
                method: "GET",
            })
        }),
    })
})

export const { useAllDashboardInfoQuery, useSevenDaysQuery } = allDashboardInfo;


