"use client"
import { createSlice, configureStore } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: 'auth',
  initialState: { isLogged: false, userInfo: undefined },
  reducers: {
    logInUser(state, action) {
      state.isLogged = true,
        state.userInfo = action.payload
    },
    logOutUser(state, action) {
      state.isLogged = false,
        state.userInfo = action.payload
    }

  }
})

const inboxSlice = createSlice({
  name: 'inbox',
  initialState: { messageCount: 0 },
  reducers: {
    getCount(state, action) {
      state.messageCount = action.payload
    },
    controlCount(state) {
      state.messageCount.messageCount -= 1
    }
  }
})

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: { notificationCount: 0 },
  reducers: {
    getCount(state, action) {
      state.notificationCount = action.payload
    },
    controlCount(state) {
      state.notificationCount.notificationCount = 0
    }
  }
})

const store = configureStore({
  reducer: { auth: authSlice.reducer, inboxCount: inboxSlice.reducer, notificationCount: notificationSlice.reducer }
})

export const authActions = authSlice.actions
export const inboxActions = inboxSlice.actions
export const notificationActions = notificationSlice.actions
export default store