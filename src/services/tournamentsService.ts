import { SERVER_URL } from "@/api/instance"
import Tournament, { TournamentRegistration } from "@/models/Tournament"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const tournamentAPI = createApi({
  reducerPath: "tournamentAPI",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: (build) => ({
    fetchAllTournaments: build.query<Tournament[], number>({
      query: (limit: number = 5000) => ({
        url: "tournaments/",
        params: {
          _limit: limit,
        },
      }),
    }),
    fetchTournament: build.query<Tournament, number>({
      query: (id: number) => ({
        url: "tournaments/" + id.toString(),
      }),
    }),
    fetchTournamentRegistration: build.query<TournamentRegistration[], number>({
      query: (tournamentId: number) => ({
        url: "tournament_registration/",
        params: {
          tournamentId,
        },
      }),
    }),
  }),
})
