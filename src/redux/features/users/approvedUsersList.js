import { apiSlice } from "../../api/apiSlice";


// const getApprovedUsers = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         getApprovedUsers: builder.query({
//             query: ({  text}) => ({
//                 url: `/admin-userList/showAllVerifyUser?name=${text}`,
//                 method: "GET"
//             })
//         })
//     })
// })


// export const {useGetApprovedUsersQuery} = getApprovedUsers;

const getApprovedUsers = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getApprovedUsers: builder.query({
            query: () => ({
                url: `/admin/users/all?sortBy=createdAt:desc`,///admin/users/all?sortBy=createdAt:desc
                method: "GET",
            }),
        }),
    }),
});

export const { useGetApprovedUsersQuery } = getApprovedUsers;
