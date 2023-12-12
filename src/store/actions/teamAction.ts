import { SERVER_URL } from "@/api/instance"
import { AppDispatch } from "../store"
import axios, { AxiosError } from "axios"

export const updateTeam =
  (teamId: number, data: any) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put<any>(`${SERVER_URL}/team/${teamId}/`, {
        teamId,
        ...data,
      })
      return response
    } catch (error: AxiosError | any) {
      console.log(error.message)
    }
  }
