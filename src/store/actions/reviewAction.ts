import { SERVER_URL } from "@/api/instance"
import { AppDispatch } from "../store"
import { LeagueReview, TournamentReview } from "@/models/Review"
import axios, { AxiosError } from "axios"
import Competitor from "@/models/Competitor"

interface ReviewData {
  text: string
  author: number
  date: string
  rating: number
}

export interface TournamentReviewData extends ReviewData {
  tournament: number
}

export interface LeagueReviewData extends ReviewData {
  league: number
}

export const createTournamentReview =
  (data: TournamentReviewData) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<TournamentReview>(
        `${SERVER_URL}/tournamentReviews/`,
        data
      )
      console.log(response.data)
    } catch (error: AxiosError | any) {
      console.log(error.message)
    }
  }

export const createLeagueReview =
  (data: LeagueReviewData) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<LeagueReview>(
        `${SERVER_URL}/leagueReviews/`,
        data
      )
      console.log(response.data)
      return response
    } catch (error: AxiosError | any) {
      console.log(error.message)
    }
  }
