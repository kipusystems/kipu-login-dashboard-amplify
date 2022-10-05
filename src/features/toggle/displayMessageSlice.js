import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const messageSlice = createSlice({
  name: 'displayMessage',
  initialState,
  reducers: {
    displayMessage: (state, action) => {
      state.value = action.payload
    }
  },
})

export const { displayMessage } = messageSlice.actions

export default messageSlice.reducer