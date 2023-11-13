import { SERVER_URL } from "@/api/instance"
import { AppDispatch } from "../store"
import { TournamentReview } from "@/models/Review"
import axios, { AxiosError } from "axios"
import Competitor from "@/models/Competitor"

export interface TournamentReviewData {
  text: string
  author: number
  date: string
  rating: number
  tournament: number
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
