import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: []
}

export const querySlice = createSlice({
  name: 'instanceQuery',
  initialState,
  reducers: {
    updateQueryResult: (state, action) => {
      state.value = action.payload
    },
    resetQueryResult: () => initialState
  },
})

export const { updateQueryResult, resetQueryResult } = querySlice.actions

export default querySlice.reducer