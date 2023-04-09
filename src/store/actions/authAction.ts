import axios, { AxiosError } from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppDispatch } from "../store"
import authSlice from "../slices/authSlice"
import { SERVER_URL } from "@/api/instance"
import Competitor from "@/models/Competitor"

export type AuthData = {
  access: string
  refresh: string
}

export type RefreshData = {
  access: string
}

export type SignupData = {
  mode: string
  first_name: string
  last_name: string
  email: string
  password: string
  gender: string
}

export const setAuth = (bool: boolean) => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.setAuth(bool))
  } catch (e: Error | any) {
    console.log(e.message)
  }
}

export const loginUser =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setAuthLoading())
      const response = await axios.post<AuthData>(`${SERVER_URL}/token/`, {
        email,
        password,
      })
      localStorage.setItem("token", response.data.access)
      localStorage.setItem("refresh", response.data.refresh)
      dispatch(authSlice.actions.setAuth(true))
      dispatch(authSlice.actions.setAuthSuccess(response.data))
    } catch (error: Error | any) {
      dispatch(authSlice.actions.setAuthError(error.message))
    }
  }

export const refreshLogin = () => async (dispatch: AppDispatch) => {
  try {
    if (localStorage.getItem("refresh") !== null) {
      const response = await axios.post<RefreshData>(
        `${SERVER_URL}/token/refresh/`,
        {
          refresh: localStorage.getItem("refresh"),
        }
      )
      console.log(response.data.access)
      localStorage.setItem("token", response.data.access)
      dispatch(authSlice.actions.refreshTeken(response.data.access))
      dispatch(authSlice.actions.setAuth(true))
    }
  } catch (error: AxiosError | any) {
    console.log(error.message)
  }
}

export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    //const response = await axios.post(`${SERVER_URL}/competitors/logout`)
    setAuth(false)
    localStorage.removeItem("token")
    localStorage.removeItem("refresh")
  } catch (error: Error | any) {
    console.log(error.message)
  }
}

export const signupUser =
  (data: SignupData) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<Competitor>(
        `${SERVER_URL}/competitors/`,
        data
      )
      console.log(response)
    } catch (error: Error | any) {
      console.log(error.message)
    }
  }
