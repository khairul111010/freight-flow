import { baseApi } from ".";

const bankApi = baseApi
    .enhanceEndpoints({ addTagTypes: ["Bank"] })
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
            createBankAccount: builder.mutation({
                query: (body) => ({
                    url: `bank-account`,
                    method: "POST",
                    body,
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
