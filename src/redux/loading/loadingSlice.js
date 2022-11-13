import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload
    },
  },
})

export const { setIsLoading } = loadingSlice.actions

export const selectIsLoading = ({ loading: { isLoading } }) => isLoading

export default loadingSlice.reducer
