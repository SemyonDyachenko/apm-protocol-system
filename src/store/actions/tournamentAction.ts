import axios, { AxiosError } from "axios"
import { AppDispatch } from "../store"
import { SERVER_URL } from "@/api/instance"
import Tournament from "@/models/Tournament"
import { TournamentWeightClass } from "@/models/WeightClass"

export interface TournamentData {
  name: string
  location: string
  description: string
  logo?: File | null
  banner?: File | null
  address: string
  organizer: number
  main_secretary?: number
  main_referee?: number
  date: string
  league?: number
  afisha?: File | null
}

export interface TournamentRegistrationData {
  competitor: number
  tournament: number
  weight_class: number
  category: string
}

export const updateTournamentImages =
  (tournamentId: number, data: any) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put<Tournament>(
        `${SERVER_URL}/tournamentUpdateImage/${tournamentId}/`,
        {
          tournamentId,
          ...data,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      return response
    } catch (error: AxiosError | any) {
      console.log(error.message)
    }
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
      return response
    } catch (e: AxiosError | any) {
      console.log(e.message)
    }
  }

export const createDefaultTournament =
  (organizer: number, league: number) => async (dispatch: AppDispatch) => {
    try {
      const defaultData: TournamentData = {
        name: "Новый турнир",
        location: "-",
        description: "Описание",
        address: "-",
        organizer: organizer,
        date: new Date().toISOString().slice(0, 10),
        league: league,
      }

      const response = await axios.post<Tournament>(
        `${SERVER_URL}/tournaments/`,
        defaultData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      return response
    } catch (error: AxiosError | any) {
      console.log(error.message)
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

export const deleteTournament =
  (tournamentId: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.delete<any>(
        `${SERVER_URL}/deleteTournament/${tournamentId}`,
        {
          params: { tournamentId },
        }
      )
      console.log(response.data)
    } catch (error: AxiosError | any) {
      console.log(error.message)
    }
  }

export const updateTournament =
  (tournamentId: number, data: any) => async (dispatch: AppDispatch) => {
    try {
      console.log(data)
      const response = await axios.put<any>(
        `${SERVER_URL}/updateTournament/${tournamentId}/`,
        {
          tournamentId,
          ...data,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      return response
    } catch (error: AxiosError | any) {
      console.log(error.message)
    }
  }

export const tournamentActive =
  (tournamentId: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put<any>(
        `${SERVER_URL}/tournamentActive/${tournamentId}/`,
        {
          tournamentId,
        }
      )
    } catch (error: AxiosError | any) {
      console.log(error.message)
    }
  }

export const createTournamentWeightClasses =
  (tournamentId: number, data: any) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<any>(
        `${SERVER_URL}/createTournamentWeightClasses/`,
        {
          tournamentId,
          ...data,
        }
      )
      return response
    } catch (error: AxiosError | any) {
      console.log(error.message)
    }
  }
