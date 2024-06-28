import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { authEnum } from '../../enums/authEnums'
import { BASE_API_URL } from '../../env'
import { removeToken, removeUser } from '../slices/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: async (headers) => {
        const accessToken = localStorage.getItem(authEnum.LOCAL_STORAGE_TOKEN_KEY)
        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`)
        }
        return headers
    },
})

export const baseApi = createApi({
    baseQuery: async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions)

        if (result?.error?.status === 401) {
            api.dispatch(removeUser())
            api.dispatch(removeToken())
        }
        return result
    },
    tagTypes: [],
    endpoints: () => ({}),
})

export default baseApi.reducer
