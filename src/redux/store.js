import { configureStore } from '@reduxjs/toolkit'
import auth from './auth/authSlice'
import loading from './loading/loadingSlice'

export const store = configureStore({
  reducer: { auth, loading },
})
