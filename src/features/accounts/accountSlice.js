import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: []
}

export const accountSlice = createSlice({
  name: 'accountAccess',
  initialState,
  reducers: {
    updateAccounts: (state, action) => {
      state.value = action.payload
    },
    resetAccounts: () => initialState
  },
})

export const { updateAccounts, resetAccounts } = accountSlice.actions

export default accountSlice.reducer