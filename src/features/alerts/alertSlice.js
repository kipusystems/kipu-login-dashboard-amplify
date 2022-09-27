import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
      body: '', 
      type: 'success', 
      visible: false
    }
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.value = action.payload
    },
    resetAlert: () => initialState
  },
})

export const { setAlert, resetAlert } = alertSlice.actions

export default alertSlice.reducer