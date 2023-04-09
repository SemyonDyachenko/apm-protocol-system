import { SERVER_URL } from "@/api/instance"
import Competitor from "@/models/Competitor"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const competitorAPI = createApi({
  reducerPath: "competitorAPI",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: (build) => ({
    fetchAllCompetitor: build.query<Competitor[], number>({
      query: (limit: number = 5000) => ({
        url: "competitors/",
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
})
