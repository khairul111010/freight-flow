import { baseApi } from ".";

const organizationApi = baseApi
    .enhanceEndpoints({ addTagTypes: ["Organization"] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getOrganization: builder.query<any, void>({
                query: () => `/organizations`,
                providesTags: ["Organization"],
                transformResponse: (response: any) => response.result,
            }),
            updateOrganization: builder.mutation({
                query: (body) => ({
                    url: `organizations/${body.id}`,
                    method: "POST",
                    body: body.body,
                }),
                invalidatesTags: ["Organization"],
            }),
        }),
    });

export const { useGetOrganizationQuery, useUpdateOrganizationMutation } = organizationApi;
