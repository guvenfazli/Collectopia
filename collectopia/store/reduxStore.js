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

const store = configureStore({
  reducer: { auth: authSlice.reducer, inboxCount: inboxSlice.reducer }
})

export const authActions = authSlice.actions
export const inboxActions = inboxSlice.actions
export default store