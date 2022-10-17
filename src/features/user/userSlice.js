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
      let initials = 'NA';
      const name= payload.attributes['custom:name'].split(' ');
      if(name.length>1) initials = name[0].charAt(0) + name[1].charAt(0);
      else initials = name.charAt(0);
      state.value.email = payload.attributes.email
      state.value.initials = initials;
      state.value.refreshToken = payload.signInUserSession.refreshToken.token
    },
    resetUser: () => initialState
  },
})

export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer