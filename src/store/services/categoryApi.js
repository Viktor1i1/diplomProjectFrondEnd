import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "./../../env"

export const categoryApi = createApi({
    reducerPath : "categoriesApi",
    baseQuery: fetchBaseQuery({ baseUrl: env.apiUrl }),
    tagTypes: ["Categories"],
    endpoints: (build) => ({
        getCategories: build.query({
            query: (params) => ({
                url: "categories",
                params: params,
            }),
            providesTags: ["Categories"],
        }),

        getCategory: build.query({
            query: (id) => ({
                url: `categories/${id}`,
            }),
            providesTags: ["Category"],
        }),

        addCategory : build.mutation({
            query : (data) => ({
                url : "categories",
                method : "POST",
                body : data,
            }),
            invalidatesTags : ["Categories"]
        })
    })
})
export const {
    useGetCategoryQuery,
    useGetCategoriesQuery,
    useAddCategoryMutation,
} = categoryApi;
