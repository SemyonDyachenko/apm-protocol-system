import { SERVER_URL } from "@/api/instance"
import { AppDispatch } from "../store"
import axios, { AxiosError } from "axios"
import Team, { TeamCompetitor } from "@/models/Team"
import { LeagueCompetitorStatus } from "./leagueActon"

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

export const createTeam =
  (organizerId: number, name: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<Team>(`${SERVER_URL}/team/`, {
        organizerId,
        name,
      })
      return response
    } catch (error: AxiosError | any) {
      console.log(error.message)
    }
  }

export const updateTeamImages =
  (teamId: number, data: any) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put<Team>(
        `${SERVER_URL}/teamUpdateImages/${teamId}/`,
        {
          teamId,
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

export const followTeam =
  (team: number, competitor: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<TeamCompetitor>(
        `${SERVER_URL}/competitorTeams/`,
        {
          team,
          competitor,
          status: "sent",
        }
      )
      return response
    } catch (error: AxiosError | any) {
      console.log(error.message)
    }
  }

export const acceptCompetitorToTeam =
  (competitorId: number, status: LeagueCompetitorStatus) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put<TeamCompetitor>(
        `${SERVER_URL}/teamCompetitorAcceptt/${competitorId}/`,
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
