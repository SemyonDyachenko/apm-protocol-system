import axios, { AxiosError } from "axios"
import { AppDispatch } from "../store"

import { SERVER_URL } from "@/api/instance"
import competitorsSlice, { CompetitorData } from "../slices/competitorSlice"
import Competitor from "@/models/Competitor"

export const getCompetitor = async (id: number) => {
  try {
    const response = await axios.get<Competitor>(
      `${SERVER_URL}/competitors/${id}/`
    )
    return response.data
  } catch (error: AxiosError | any) {
    console.log(error.message)
  }
}

export const updateCompetitorImage =
  (id: number, image: File) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put<Competitor>(
        `${SERVER_URL}/updateProfileImage/${id}/`,
        { id, image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      console.log(response)
    } catch (e: AxiosError | any) {
      console.log(e.message)
    }
  }

export const updateCompetitorProfile =
  (id: number, firstname: string, lastname: string, country: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put<Competitor>(
        `${SERVER_URL}/updateProfile/${id}/`,
        { id, firstname, lastname, country }
      )
      console.log(response)
    } catch (e: AxiosError | any) {
      console.log(e.message)
    }
  }

export const getCompetitorData =
  (accessToken: string | null) => async (dispatch: AppDispatch) => {
    if (accessToken) {
      try {
        dispatch(competitorsSlice.actions.getCompetitorLoading())
        const response = await axios.get<CompetitorData[]>(
          `${SERVER_URL}/competitor/`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )

        dispatch(
          competitorsSlice.actions.getCompetitorSuccess(response.data[0])
        )
        return response.status
      } catch (error: AxiosError | any) {
        dispatch(
          competitorsSlice.actions.getCompetitorError(error.response.status)
        )
      }
    }
  }
