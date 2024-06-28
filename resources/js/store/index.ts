import {configureStore} from '@reduxjs/toolkit'

import apiReducer, {baseApi} from './apis'
import {errorMiddleware} from './middlewares/errorMiddleware'
import authReducer from './slices/authSlice'

export const store = configureStore({
    reducer: {
        api: apiReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware, errorMiddleware),
})

export type BaseState = ReturnType<typeof store.getState>
