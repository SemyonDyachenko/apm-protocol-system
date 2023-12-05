import axios, { AxiosError } from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppDispatch } from "../store"
import authSlice from "../slices/authSlice"
import { SERVER_URL } from "@/api/instance"
import Competitor from "@/models/Competitor"
import rolesSlice, { setRole } from "../slices/roleSlice"
import competitorsSlice from "../slices/competitorSlice"

export type AuthData = {
  access: string
  refresh: string
}

export type RefreshData = {
  access: string
}

export type SignupData = {
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
      return error.request
    }
  }

export const setUserRole = (role: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(rolesSlice.actions.setRole(role))
  } catch (error: Error | any) {
    dispatch(authSlice.actions.setAuthError(error.message))
    return error.request
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
    localStorage.removeItem("role")
    dispatch(rolesSlice.actions.setRole(null))

    setAuth(false)
    localStorage.removeItem("token")
    localStorage.removeItem("refresh")
  } catch (error: Error | any) {
    console.log(error.message)
    return error.request.status
  }
}

export const signupUser =
  (data: SignupData) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<Competitor>(
        `${SERVER_URL}/competitors/`,
        data
      )
    } catch (error: Error | any) {
      if (error.request.status === 400) return 400
      if (error === null) return 200
    }
  }

export const restorePassword =
  (email: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get<any>(
        `${SERVER_URL}/passwordRestore/restore_passord/`,
        {
          params: {
            email,
          },
        }
      )
      return response
    } catch (error: Error | any) {
      console.log(error)
      return error
    }
  }

export const createSupportRequest =
  (email: string, name: string, message: string, datetime: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<any>(`${SERVER_URL}/supportRequest/`, {
        email,
        name,
        message,
        datetime,
      })
      return response
    } catch (error: Error | any) {
      console.log(error)
      return error
    }
  }
