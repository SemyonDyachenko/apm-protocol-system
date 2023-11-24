import { TournamentNotification } from "@/models/Notification"
import { AppDispatch } from "../store"
import { SERVER_URL } from "@/api/instance"
import axios, { AxiosError } from "axios"

export interface TournamentNotficationData {
  message: String
  tournament: number
  competitor: number
  read: boolean
  datetime: Date
}

export const createTournamentNotification =
  (data: TournamentNotficationData) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<TournamentNotification>(
        `${SERVER_URL}/tournamentNotificationCreate/`,
        data
      )
      console.log(response.data)
    } catch (error: AxiosError | any) {
      console.log(error.message)
    }
  }
