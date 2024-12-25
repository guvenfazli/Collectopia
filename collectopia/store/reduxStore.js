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