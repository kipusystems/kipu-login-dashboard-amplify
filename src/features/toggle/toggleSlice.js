import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleView: (state) => {
      state.value = !state.value
    }
  },
})

export const { toggleView } = toggleSlice.actions

export default toggleSlice.reducer