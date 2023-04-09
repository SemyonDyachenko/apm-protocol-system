import { SERVER_URL } from "@/api/instance"
import WeightClass from "@/models/WeightClass"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const weightClassAPI = createApi({
  reducerPath: "weightclassAPI",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: (build) => ({
    fetchWeightClasses: build.query<WeightClass[], number>({
      query: (limit: number = 5000) => ({
        url: "weightclasses/",
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
})
