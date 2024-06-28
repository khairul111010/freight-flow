import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const errorMiddleware: Middleware = () => (next) => (action) => {
    if (isRejectedWithValue(action)) {        
        console.log(action);
        
        const message =
            action.payload?.data?.error || action.payload?.data?.message || 'Something went wrong!'
        if (action.payload?.status !== 404 || action.payload?.status !== 400) toast.error(message)
    }

    return next(action)
}
