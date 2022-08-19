import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: []
}

export const instanceSlice = createSlice({
  name: 'instanceAccess',
  initialState,
  reducers: {
    updateInstances: (state, action) => {
      state.value = action.payload
    },
    resetInstances: () => initialState
  },
})

export const { updateInstances, resetInstances } = instanceSlice.actions

export default instanceSlice.reducer