import { SERVER_URL } from "@/api/instance"
import Competitor from "@/models/Competitor"
import Tournament, { TournamentRegistration } from "@/models/Tournament"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const tournamentAPI = createApi({
  reducerPath: "tournamentAPI",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: (build) => ({
    fetchAllTournaments: build.query<Tournament[], number>({
      query: (league?: number) => ({
        url: "tournaments/",
        params: {
          _limit: 1000,
          league,
        },
      }),
    }),
    fetchTournaments: build.query<Tournament[], number>({
      query: () => ({
        url: "tournaments/",
        params: {
          _limit: 1000,
        },
      }),
    }),
    fetchTournament: build.query<Tournament, number>({
      query: (id: number) => ({
        url: "tournaments/" + id.toString(),
      }),
    }),
    fetchTournamentRegistration: build.query<Competitor[], number>({
      query: (tournamentId: number) => ({
        url: "tournamentCompetitors/",
        params: {
          tournamentId,
        },
      }),
    }),
    fetchCompetitorTournaments: build.query<Tournament[], number>({
      query: (competitorId: number) => ({
        url: "competitorTournaments/",
        params: {
          competitorId,
        },
      }),
    }),
  }),
})
