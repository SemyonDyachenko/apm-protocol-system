import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Competitor from "../../models/Competitor"
import { fetchCompetitors } from "../thunks/competitors"

export interface CompetitorData {
  id: number
  first_name: string
  last_name: string
  gender: string
  elo_rating: number
  email: string
  country: string
  is_active: boolean
  is_staff: boolean
}

export interface competitorState {
  competitor: CompetitorData | null
  loading: boolean
  error: string | null
}

const initialState: competitorState = {
  competitor: null,
  loading: false,
  error: null,
}

const competitorsSlice = createSlice({
  name: "competitors",
  initialState: initialState,
  reducers: {
    getCompetitorLoading: (state) => {
      state.loading = true
    },
    getCompetitorSuccess: (state, action: PayloadAction<CompetitorData>) => {
      state.competitor = action.payload
      state.loading = false
      state.error = null
    },
    getCompetitorError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
})

export const {
  getCompetitorLoading,
  getCompetitorSuccess,
  getCompetitorError,
} = competitorsSlice.actions

export default competitorsSlice
