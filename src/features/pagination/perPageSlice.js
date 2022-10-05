import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 5,
}

export const perPageSlice = createSlice({
  name: 'rowsPerPage',
  initialState,
  reducers: {
    updateRowsPerPage: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { updateRowsPerPage } = perPageSlice.actions

export default perPageSlice.reducer