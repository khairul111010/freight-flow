import { baseApi } from ".";

const vendorApi = baseApi
    .enhanceEndpoints({ addTagTypes: ["Vendors"] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getVendors: builder.query<any, any>({
                query: (pagination) => `/vendors?page=${pagination.page || 1}&search=${pagination.search || ""}`,
                providesTags: ["Vendors"],
                transformResponse: (response: any) => response.result,
            }),
            getVendor: builder.query<any, any>({
                query: (id) => `/vendors/${id}`,
                providesTags: ["Vendors"],
                transformResponse: (response: any) => response.result,
            }),
            createVendor: builder.mutation({
                query: (body) => ({
                    url: `vendors`,
                    method: "POST",
                    body,
                }),
                invalidatesTags: ["Vendors"],
            }),
            updateVendor: builder.mutation({
                query: (body) => ({
                    url: `vendors/${body.id}`,
                    method: "PATCH",
                    body: body.body,
                }),
                invalidatesTags: ["Vendors"],
            }),
        }),
    });

export const { useCreateVendorMutation, useGetVendorQuery, useGetVendorsQuery, useLazyGetVendorQuery, useLazyGetVendorsQuery, useUpdateVendorMutation } = vendorApi;
