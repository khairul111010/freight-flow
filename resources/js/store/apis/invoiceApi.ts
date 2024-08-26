import { baseApi } from ".";

const invoiceApi = baseApi
    .enhanceEndpoints({ addTagTypes: ["Invoice", "Bill"] })
    .injectEndpoints({
        endpoints: (builder) => ({
            // getAllInvoice: builder.query<any, void>({
            //     query: () => `/Invoice/all`,
            //     providesTags: ["Invoice"],
            //     transformResponse: (response: any) => response.result,
            // }),
            getInvoices: builder.query<any, any>({
                query: (pagination) =>
                    `/invoices?page=${pagination.page || 1}&search=${
                        pagination.search || ""
                    }`,
                providesTags: ["Invoice"],
                transformResponse: (response: any) => response.result,
            }),
            getBills: builder.query<any, any>({
                query: (pagination) =>
                    `/invoices/bill?page=${pagination.page || 1}&search=${
                        pagination.search || ""
                    }`,
                providesTags: ["Bill"],
                transformResponse: (response: any) => response.result,
            }),
            getInvoice: builder.query<any, any>({
                query: (id) => `/invoices/${id}`,
                providesTags: ["Invoice"],
                transformResponse: (response: any) => response.result,
            }),
            getBill: builder.query<any, any>({
                query: (id) => `/invoices/bill/${id}`,
                providesTags: ["Bill"],
                transformResponse: (response: any) => response.result,
            }),
            getInvoicePDF: builder.query<any, any>({
                query: (id) => `/invoices/generate-pdf/${id}`,
                providesTags: ["Invoice"],
            }),
            createInvoice: builder.mutation({
                query: (body) => ({
                    url: `invoices`,
                    method: "POST",
                    body,
                }),
                invalidatesTags: ["Invoice"],
            }),
            createDiscountInvoice: builder.mutation({
                query: (body) => ({
                    url: `invoices/discount/${body.id}`,
                    method: "POST",
                    body: body.body,
                }),
                invalidatesTags: ["Invoice"],
            }),
            updateInvoice: builder.mutation({
                query: ({ id, ...body }) => ({
                    url: `invoices/${id}`,
                    method: "POST",
                    body,
                }),
                invalidatesTags: ["Invoice"],
            }),
            updateBill: builder.mutation({
                query: ({ id, ...body }) => ({
                    url: `invoices/bill/${id}`,
                    method: "POST",
                    body,
                }),
                invalidatesTags: ["Bill"],
            }),
        }),
    });

export const {
    useCreateDiscountInvoiceMutation,
    useUpdateBillMutation,
    useGetBillQuery,
    useLazyGetBillQuery,
    useUpdateInvoiceMutation,
    useGetBillsQuery,
    useLazyGetBillsQuery,
    useGetInvoicePDFQuery,
    useLazyGetInvoicePDFQuery,
    useCreateInvoiceMutation,
    useGetInvoicesQuery,
    useLazyGetInvoicesQuery,
    useGetInvoiceQuery,
    useLazyGetInvoiceQuery,
} = invoiceApi;
