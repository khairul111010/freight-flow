import { baseApi } from ".";

const vendorApi = baseApi
    .enhanceEndpoints({ addTagTypes: ["Vendors"] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllVendors: builder.query<any, void>({
                query: () => `/vendors/all`,
                providesTags: ["Vendors"],
                transformResponse: (response: any) => response.result,
            }),
            getVendors: builder.query<any, any>({
                query: (pagination) =>
                    `/vendors?page=${pagination.page || 1}&search=${
                        pagination.search || ""
                    }`,
                providesTags: ["Vendors"],
                transformResponse: (response: any) => response.result,
            }),
            getVendor: builder.query<any, any>({
                query: (id) => `/vendors/${id}`,
                providesTags: ["Vendors"],
                transformResponse: (response: any) => response.result,
            }),
            getBillsByVendor: builder.query<any, any>({
                query: (pagination) => `/invoices/bill/vendor/${pagination.id}?page=${pagination.page || 1}&search=${
                        pagination.search || ""
                    }`,
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

export const {
    useGetBillsByVendorQuery,
    useLazyGetBillsByVendorQuery,
    useGetAllVendorsQuery,
    useLazyGetAllVendorsQuery,
    useCreateVendorMutation,
    useGetVendorQuery,
    useGetVendorsQuery,
    useLazyGetVendorQuery,
    useLazyGetVendorsQuery,
    useUpdateVendorMutation,
} = vendorApi;
