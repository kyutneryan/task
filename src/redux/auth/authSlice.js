import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedInUser: null,
  isAuthenticating: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticating: (state, { payload }) => {
      state.isAuthenticating = payload
    },
    setLoggedInUser: (state, { payload }) => {
      state.loggedInUser = payload
    },
  },
})

export const { setIsAuthenticating, setLoggedInUser } = authSlice.actions

export const selectLoggedInUser = ({ auth: { loggedInUser } }) => loggedInUser
export const selectIsAuthenticating = ({ auth: { isAuthenticating } }) => isAuthenticating

export default authSlice.reducer
