import { configureStore } from '@reduxjs/toolkit'
import toggleReducer from './features/toggle/toggleSlice'
import userReducer from './features/user/userSlice'
import accountReducer from './features/accounts/accountSlice'
import queryReducer from './features/accounts/querySlice'
import loadingReducer from './features/accounts/isLoadingSlice'
import queryResultReducer from './features/toggle/showQueryResultSlice'
import messageBodyReducer from './features/messages/contentSlice'
import displayMessageReducer from './features/toggle/displayMessageSlice'
import paginationReducer from './features/pagination/paginationSlice'
import perPageReducer from './features/pagination/perPageSlice'
import offsetReducer from './features/pagination/offsetSlice'
import alertReducer from './features/alerts/alertSlice'

export const store = configureStore({
  reducer: {
    toggleView: toggleReducer,
    user: userReducer,
    accounts: accountReducer,
    queryResult: queryReducer,
    showQueryResult: queryResultReducer,
    messageBody: messageBodyReducer,
    displayMessage: displayMessageReducer,
    currentPage: paginationReducer,
    rowsPerPage: perPageReducer,
    offset: offsetReducer,
    isLoading: loadingReducer,
    alert: alertReducer,
  },
})