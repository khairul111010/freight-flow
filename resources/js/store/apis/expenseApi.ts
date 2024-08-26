import { baseApi } from ".";

const expenseApi = baseApi
    .enhanceEndpoints({ addTagTypes: ["Expense"] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getExpense: builder.query<any, any>({
                query: (pagination) =>
                    `/expenses?month=${
                        pagination.month || new Date().getMonth() + 1
                    }&year=${
                        pagination.year || new Date().getFullYear()
                    }&page=${pagination.page || 1}&search=${
                        pagination.search || ""
                    }`,
                providesTags: ["Expense"],
                transformResponse: (response: any) => response.result,
            }),
            createExpense: builder.mutation({
                query: (body) => ({
                    url: `expenses`,
                    method: "POST",
                    body,
                }),
                invalidatesTags: ["Expense"],
            }),
        }),
    });

export const { useGetExpenseQuery, useLazyGetExpenseQuery, useCreateExpenseMutation } = expenseApi;
