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
  (
    id: number,
    firstname: string,
    lastname: string,
    country: string,
    phone: string
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put<Competitor>(
        `${SERVER_URL}/updateProfile/${id}/`,
        { id, firstname, lastname, country, phone }
      )
      console.log(response)
    } catch (e: AxiosError | any) {
      console.log(e.message)
    }
  }

export const updateCompetitorProps =
  (
    id: number,
    trainer: number,
    birthdate: Date | undefined,
    height: number,
    city: string | undefined,
    weight: number,
    career_start_date: Date | undefined,
    description: string | undefined
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put<Competitor>(
        `${SERVER_URL}/updateProfileProps/${id}/`,
        {
          id,
          trainer,
          birthdate,
          height,
          city,
          weight,
          career_start_date,
          description,
        }
      )
      console.log(response)
    } catch (e: AxiosError | any) {
      console.log(e.message)
    }
  }

export const updateCompetitorStats =
  (
    id: number,
    grip: number | undefined,
    biceps: number | undefined,
    crossbar: number | undefined,
    shaft: number | undefined,
    militarypress: number | undefined,
    hand: number | undefined,
    press: number | undefined,
    side: number | undefined
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put<Competitor>(
        `${SERVER_URL}/updateProfileStats/${id}/`,
        {
          id,
          grip,
          biceps,
          crossbar,
          shaft,
          militarypress,
          hand,
          press,
          side,
        }
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
