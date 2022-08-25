import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    email: '',
    refreshToken: ''
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.value.email = JSON.parse(action.payload).username
      state.value.refreshToken = JSON.parse(action.payload).signInUserSession.refreshToken.token
    },
    resetUser: () => initialState
  },
})

export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer