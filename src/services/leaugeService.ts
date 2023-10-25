import { SERVER_URL } from "@/api/instance"
import League from "@/models/League"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const leagueAPI = createApi({
  reducerPath: "leagueAPI",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: (build) => ({
    fetchAllLeagues: build.query<League[], number>({
      query: (limit: number = 5000) => ({
        url: "leagues/",
        params: {
          _limit: limit,
        },
      }),
    }),
    fetchLeague: build.query<League,number>({
      query: (id,limit: number = 1) => ({
        url: `leagues/${id}`,
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
})
