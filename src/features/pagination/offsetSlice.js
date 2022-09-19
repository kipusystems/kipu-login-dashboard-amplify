import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {start: 0, end: 5},
}

export const offsetSlice = createSlice({
  name: 'offsetValue',
  initialState,
  reducers: {
    updateOffsetValues: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { updateOffsetValues } = offsetSlice.actions

export default offsetSlice.reducer