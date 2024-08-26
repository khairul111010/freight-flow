import { baseApi } from ".";

const bankApi = baseApi
    .enhanceEndpoints({ addTagTypes: ["Bank", "Cash"] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getBanks: builder.query<any, void>({
                query: () => `/bank`,
                providesTags: ["Bank"],
                transformResponse: (response: any) => response.result,
            }),
            getBank: builder.query<any, any>({
                query: (id) => `/bank/${id}`,
                providesTags: ["Bank"],
                transformResponse: (response: any) => response.result,
            }),
            createBank: builder.mutation({
                query: (body) => ({
                    url: `bank`,
                    method: "POST",
                    body,
                }),
                invalidatesTags: ["Bank"],
            }),
            updateBank: builder.mutation({
                query: (body) => ({
                    url: `bank/${body.id}`,
                    method: "PATCH",
                    body: body.body,
                }),
                invalidatesTags: ["Bank"],
            }),
            getAllBankAccounts: builder.query<any, void>({
                query: () => `/bank-account/all`,
                providesTags: ["Bank"],
                transformResponse: (response: any) => response.result,
            }),
            getBankAccounts: builder.query<any, any>({
                query: (pagination) =>
                    `/bank-account?page=${pagination.page || 1}&search=${
                        pagination.search || ""
                    }`,
                providesTags: ["Bank"],
                transformResponse: (response: any) => response.result,
            }),
            getBankAccount: builder.query<any, any>({
                query: (id) => `/bank-account/${id}`,
                providesTags: ["Bank"],
                transformResponse: (response: any) => response.result,
            }),
            getBankAccountTransactions: builder.query<any, any>({
                query: (pagination) =>
                    `/bank-account/transactions/${pagination.id}?month=${
                        pagination.month || new Date().getMonth() + 1
                    }&year=${pagination.year || new Date().getFullYear()}`,
                providesTags: ["Bank"],
                transformResponse: (response: any) => response.result,
            }),
            getCashTransactions: builder.query<any, any>({
                query: (pagination) =>
                    `/organizations/transactions/cash?month=${
                        pagination.month || new Date().getMonth() + 1
                    }&year=${pagination.year || new Date().getFullYear()}`,
                providesTags: ["Cash"],
                transformResponse: (response: any) => response.result,
            }),
            createBankAccount: builder.mutation({
                query: (body) => ({
                    url: `bank-account`,
                    method: "POST",
                    body,
                }),
                invalidatesTags: ["Bank"],
            }),
            withdrawBankAccount: builder.mutation({
                query: (body) => ({
                    url: `bank-account/withdraw/${body.id}`,
                    method: "POST",
                    body: body.body,
                }),
                invalidatesTags: ["Bank"],
            }),
            updateBankAccount: builder.mutation({
                query: (body) => ({
                    url: `bank-account/${body.id}`,
                    method: "PATCH",
                    body: body.body,
                }),
                invalidatesTags: ["Bank"],
            }),
        }),
    });

export const {
    useWithdrawBankAccountMutation,
    useGetCashTransactionsQuery,
    useLazyGetCashTransactionsQuery,
    useGetBankAccountTransactionsQuery,
    useLazyGetBankAccountTransactionsQuery,
    useGetAllBankAccountsQuery,
    useLazyGetAllBankAccountsQuery,
    useCreateBankMutation,
    useGetBankQuery,
    useGetBanksQuery,
    useLazyGetBankQuery,
    useLazyGetBanksQuery,
    useUpdateBankMutation,
    useCreateBankAccountMutation,
    useGetBankAccountQuery,
    useGetBankAccountsQuery,
    useLazyGetBankAccountQuery,
    useLazyGetBankAccountsQuery,
    useUpdateBankAccountMutation,
} = bankApi;
