import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 1,
}

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    goToPage: (state, action) => {
      state.value = action.payload
    },
    nextPage: (state) => {
      state.value += 1
    },
    prevPage: (state) => {
      state.value -= 1
    }
  },
})

export const { goToPage, nextPage, prevPage } = pageSlice.actions

export default pageSlice.reducer