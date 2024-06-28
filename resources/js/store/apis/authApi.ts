
import { baseApi } from '.';
import { setToken, setUser } from '../slices/authSlice';

const setUserState = (result: any, dispatch: any) => {
    const {user, token} = result?.data?.result
    dispatch(setUser(user))
    dispatch(setToken(token))
}

const authApi = baseApi.enhanceEndpoints({addTagTypes: ['Auth']}).injectEndpoints({
    endpoints: (builder) => ({
        // autoLogin: builder.query<any, void>({
        //     async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        //         const accessToken = localStorage.getItem(authEnum.LOCAL_STORAGE_TOKEN_KEY)
        //         if (accessToken) {
        //             return await fetchWithBQ({
        //                 url: '/auth/refresh-access-token',
        //             })
        //         } else {
        //             return {data: {result: null}}
        //         }
        //     },
        //     providesTags: ['Auth'],
        //     async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        //         try {
        //             const result = await queryFulfilled
        //             if (result?.data?.result === null) return
        //             setUserState(result, dispatch)
        //         } catch (error: any) {
        //             console.log(error)
        //         }
        //     },
        // }),
        login: builder.mutation({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Auth'],
            onQueryStarted(arg, {queryFulfilled, dispatch}) {
                queryFulfilled.then((result) => {
                    setUserState(result, dispatch)                    
                })
            },
        }),
        // register: builder.mutation({
        //     query: (body) => ({
        //         url: '/auth/register',
        //         method: 'POST',
        //         body,
        //     }),
        // }),
        // forgotPassword: builder.mutation({
        //     query: (body) => ({
        //         url: '/users/forget-password',
        //         method: 'POST',
        //         body,
        //     }),
        // }),
        // codeVerification: builder.mutation<any, any>({
        //     query: (body) => ({
        //         url: `/users/code-verification`,
        //         method: 'POST',
        //         body,
        //     }),
        //     invalidatesTags: ['Auth'],
        //     transformResponse: (response: any) => response.result,
        // }),
        // recoverPassword: builder.mutation<any, any>({
        //     query: (body) => ({
        //         url: `/users/recover-password`,
        //         method: 'POST',
        //         body,
        //     }),
        //     invalidatesTags: ['Auth'],
        //     transformResponse: (response: any) => response.result,
        // }),
        // updatePassword: builder.mutation<any, any>({
        //     query: (body) => ({
        //         url: `/users/update-password`,
        //         method: 'PATCH',
        //         body,
        //     }),
        //     invalidatesTags: ['Auth'],
        //     transformResponse: (response: any) => response.result,
        // }),
        // resetPassword: builder.mutation({
        //     query: (body) => ({
        //         url: '/auth/reset-password',
        //         method: 'POST',
        //         body,
        //     }),
        // }),
        // refreshToken: builder.mutation({
        //     query: (body) => ({
        //         url: '/auth/refresh-token',
        //         method: 'POST',
        //         body,
        //     }),
        // }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useLoginMutation,
    useLogoutMutation,
} = authApi
