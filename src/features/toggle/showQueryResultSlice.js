import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const toggleQuerySlice = createSlice({
  name: 'showQueryResult',
  initialState,
  reducers: {
    toggleQueryResult: (state, action) => {
      state.value = action.payload
    }
  },
})

export const { toggleQueryResult } = toggleQuerySlice.actions

export default toggleQuerySlice.reducer