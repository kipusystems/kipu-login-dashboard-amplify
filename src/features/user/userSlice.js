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
      let payload = JSON.parse(action.payload)
      state.value.email = payload.attributes.email
      state.value.refreshToken = payload.signInUserSession.refreshToken.token
    },
    resetUser: () => initialState
  },
})

export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer