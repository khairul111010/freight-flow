import { createSlice } from '@reduxjs/toolkit'
import { authEnum } from '../../enums/authEnums'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
            localStorage.setItem(authEnum.LOCAL_STORAGE_TOKEN_KEY, action.payload)
        },
        removeToken: (state) => {
            state.token = null
            localStorage.removeItem(authEnum.LOCAL_STORAGE_TOKEN_KEY)
        },
        removeUser: (state) => {
            state.user = null
        },
    },
})

export const {setUser, setToken, removeToken, removeUser} = authSlice.actions
export default authSlice.reducer
