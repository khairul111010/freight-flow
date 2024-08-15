import { baseApi } from ".";

const profitLossApi = baseApi
    .enhanceEndpoints({ addTagTypes: ["PNL"] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getProfitLoss: builder.query<any, any>({
                query: (pagination) =>
                    `/profit-and-lost?month=${
                        pagination.month || new Date().getMonth() + 1
                    }&year=${pagination.year || new Date().getFullYear()}`,
                providesTags: ["PNL"],
                transformResponse: (response: any) => response.result,
            }),
        }),
    });

export const { useGetProfitLossQuery, useLazyGetProfitLossQuery } =
    profitLossApi;
