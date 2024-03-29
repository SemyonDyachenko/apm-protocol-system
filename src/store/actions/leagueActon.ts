import League from "@/models/League"
import { AppDispatch } from "../store"
import { SERVER_URL } from "@/api/instance"
import axios, { AxiosError } from "axios"
import LeagueCompetitor from "@/models/LeagueCompetitor"

export enum LeagueCompetitorStatus {
  ACCEPTED = "accepted",
  DECLINED = "declined",
  SENT = "sent",
}

export const updateLeagueImages =
  (leagueId: number, data: any) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put<League>(
        `${SERVER_URL}/leagueUpdateImages/${leagueId}/`,
        {
          leagueId,
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

export const deleteLeague =
  (leagueId: number, competitorId: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.delete<any>(
        `${SERVER_URL}/deleteLeague/${competitorId}/`,
        {
          params: {
            competitorId,
            leagueId,
          },
        }
      )
      return response
    } catch (error: AxiosError | any) {
      console.log(error.message)
    }
  }

export const acceptCompetitorToLeague =
  (competitorId: number, status: LeagueCompetitorStatus) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put<any>(
        `${SERVER_URL}/leagueCompetitorAccept/${competitorId}/`,
        {
          competitorId,
          status,
        }
      )
      return response
    } catch (error: AxiosError | any) {
      console.log(error.message)
    }
  }

export const createLeagueCompetitor =
  (
    leagueId: number,
    competitorId: number,
    request_date: string,
    role: string
  ) =>
  async (dispatch: AppDispatch) => {
    console.log(request_date)
    try {
      const response = await axios.post<LeagueCompetitor>(
        `${SERVER_URL}/leagueCompetitorCreate/`,
        {
          league: leagueId,
          competitor: competitorId,
          request_date,
          role,
        }
      )
      return response
    } catch (error: AxiosError | any) {
      console.log(error.message)
    }
  }

export const updateLeague =
  (leagueId: number, data: any) => async (dispatch: AppDispatch) => {
    try {
      console.log(data)
      const response = await axios.put<any>(
        `${SERVER_URL}/updateLeague/${leagueId}/`,
        {
          leagueId,
          ...data,
        }
      )
      return response
    } catch (error: AxiosError | any) {
      console.log(error.message)
    }
  }

export const createDefaultLeague =
  (president: number, name: string) => async (dispatch: AppDispatch) => {
    try {
      const defaultData = {
        name,
        country: "Россия",
        description: "-",
        level: "casual",
        president,
      }

      const response = await axios.post<League>(
        `${SERVER_URL}/leagues/`,
        defaultData
      )
      return response
    } catch (error: AxiosError | any) {
      console.log(error.message)
    }
  }
