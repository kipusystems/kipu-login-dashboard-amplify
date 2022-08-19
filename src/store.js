import { configureStore } from '@reduxjs/toolkit'
import toggleReducer from './features/toggle/toggleSlice'
import userReducer from './features/user/userSlice'
import instanceReducer from './features/instances/instanceSlice'

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    user: userReducer,
    instance: instanceReducer
  },
})