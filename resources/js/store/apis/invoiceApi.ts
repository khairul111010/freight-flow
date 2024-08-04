import { baseApi } from ".";

const invoiceApi = baseApi
    .enhanceEndpoints({ addTagTypes: ["Invoice"] })
    .injectEndpoints({
        endpoints: (builder) => ({
            // getAllInvoice: builder.query<any, void>({
            //     query: () => `/Invoice/all`,
            //     providesTags: ["Invoice"],
            //     transformResponse: (response: any) => response.result,
            // }),
            getInvoices: builder.query<any, any>({
                query: (pagination) => `/invoices?page=${pagination.page || 1}&search=${pagination.search || ""}`,
                providesTags: ["Invoice"],
                transformResponse: (response: any) => response.result,
            }),
            // getVendor: builder.query<any, any>({
            //     query: (id) => `/Invoice/${id}`,
            //     providesTags: ["Invoice"],
            //     transformResponse: (response: any) => response.result,
            // }),
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
            // updateVendor: builder.mutation({
            //     query: (body) => ({
            //         url: `Invoice/${body.id}`,
            //         method: "PATCH",
            //         body: body.body,
            //     }),
            //     invalidatesTags: ["Invoice"],
            // }),
        }),
    });

export const { useGetInvoicePDFQuery, useLazyGetInvoicePDFQuery, useCreateInvoiceMutation , useGetInvoicesQuery, useLazyGetInvoicesQuery } = invoiceApi;
