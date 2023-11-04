import axios, { AxiosError } from "axios"
import { AppDispatch } from "../store"
import { SERVER_URL } from "@/api/instance"
import Tournament from "@/models/Tournament"
import { TournamentWeightClass } from "@/models/WeightClass"

export interface TournamentData {
  name: string
  location: string
  description: string
  photo: File | null
  address: string
  organizer: number
  main_secretary: number
  main_referee: number
  date: string
  league: number
}

export interface TournamentRegistrationData {
  competitor: number
  tournament: number
  weight_class: number
  category: string
}

export const changeTournamentStatus =
  (tournamentId: number, status: boolean) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put<Tournament>(
        `${SERVER_URL}/startTournament/${tournamentId}/`,
        { activated: status, tournamentId }
      )
    } catch (e: AxiosError | any) {
      console.log(e.message)
    }
  }

export const getTournamentWeightClasses =
  (tournamentId: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get<TournamentWeightClass[]>(
        `${SERVER_URL}/tournament_weightclasses/?tournamentId=${tournamentId}`
      )
      return response.data
    } catch (e: AxiosError | any) {
      console.log(e.message)
    }
  }

export const registerForTournament =
  (data: TournamentRegistrationData) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/tournament_registration/`,
        data
      )
      console.log(response.data)
    } catch (e: AxiosError | any) {
      console.log(e.message)
    }
  }

export const createTournament =
  (data: TournamentData) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<Tournament>(
        `${SERVER_URL}/tournaments/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      console.log(response.data)
    } catch (error: AxiosError | any) {
      console.log(error.message)
    }
  }
