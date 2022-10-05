import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const contentSlice = createSlice({
  name: 'messageBody',
  initialState,
  reducers: {
    messageBody: (state, action) => {
      state.value = action.payload
    }
  },
})

export const { messageBody } = contentSlice.actions

export default contentSlice.reducer