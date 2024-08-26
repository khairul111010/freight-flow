import { baseApi } from ".";

const customerApi = baseApi
    .enhanceEndpoints({ addTagTypes: ["Customers"] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllCustomers: builder.query<any, void>({
                query: () => `/customers/all`,
                providesTags: ["Customers"],
                transformResponse: (response: any) => response.result,
            }),
            getCustomerTransactions: builder.query<any, any>({
                query: (pagination) =>
                    `/customers/transactions/${pagination.id}?month=${
                        pagination.month || new Date().getMonth() + 1
                    }&year=${pagination.year || new Date().getFullYear()}`,
                providesTags: ["Customers"],
                transformResponse: (response: any) => response.result,
            }),
            getCustomers: builder.query<any, any>({
                query: (pagination) =>
                    `/customers?page=${pagination.page || 1}&search=${
                        pagination.search || ""
                    }`,
                providesTags: ["Customers"],
                transformResponse: (response: any) => response.result,
            }),
            getInvoicesByCustomer: builder.query<any, any>({
                query: (pagination) =>
                    `invoices/customer/${pagination.id}?page=${
                        pagination.page || 1
                    }&search=${pagination.search || ""}`,
                providesTags: ["Customers"],
                transformResponse: (response: any) => response.result,
            }),
            getCustomer: builder.query<any, any>({
                query: (id) => `/customers/${id}`,
                providesTags: ["Customers"],
                transformResponse: (response: any) => response.result,
            }),
            createCustomer: builder.mutation({
                query: (body) => ({
                    url: `customers`,
                    method: "POST",
                    body,
                }),
                invalidatesTags: ["Customers"],
            }),
            updateCustomer: builder.mutation({
                query: (body) => ({
                    url: `customers/${body.id}`,
                    method: "PATCH",
                    body: body.body,
                }),
                invalidatesTags: ["Customers"],
            }),
        }),
    });

export const {
    useGetCustomerTransactionsQuery,
    useLazyGetCustomerTransactionsQuery,
    useGetInvoicesByCustomerQuery,
    useLazyGetInvoicesByCustomerQuery,
    useGetAllCustomersQuery,
    useGetCustomersQuery,
    useLazyGetAllCustomersQuery,
    useCreateCustomerMutation,
    useLazyGetCustomersQuery,
    useGetCustomerQuery,
    useLazyGetCustomerQuery,
    useUpdateCustomerMutation,
} = customerApi;
