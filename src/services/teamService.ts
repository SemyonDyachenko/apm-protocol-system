import { SERVER_URL } from "../api/instance"
import Team from "../models/Team"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const teamAPI = createApi({
  reducerPath: "teamAPI",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: (build) => ({
    fetchTeam: build.query<Team, number>({
      query: (teamId) => ({
        url: `team/${teamId}`,
        params: {
          _limit: 500,
        },
      }),
    }),
  }),
})
