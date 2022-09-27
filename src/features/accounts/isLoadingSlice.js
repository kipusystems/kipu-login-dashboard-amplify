import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: true
}

export const isLoadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    updateLoadingStatus: (state, action) => {
      state.value = action.payload
    }
  },
})

export const { updateLoadingStatus } = isLoadingSlice.actions

export default isLoadingSlice.reducer