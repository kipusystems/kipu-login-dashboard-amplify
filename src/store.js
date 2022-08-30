import { configureStore } from '@reduxjs/toolkit'
import toggleReducer from './features/toggle/toggleSlice'
import userReducer from './features/user/userSlice'
import instanceReducer from './features/instances/instanceSlice'
import queryReducer from './features/instances/querySlice'
import queryResultReducer from './features/toggle/showQueryResultSlice'
import messageBodyReducer from './features/messages/contentSlice'
import displayMessageReducer from './features/toggle/displayMessageSlice'

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    user: userReducer,
    instance: instanceReducer,
    query: queryReducer,
    showQueryResult: queryResultReducer,
    messageBody: messageBodyReducer,
    displayMessage: displayMessageReducer,
  },
})