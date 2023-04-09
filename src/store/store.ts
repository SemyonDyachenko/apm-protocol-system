import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import competitorReducer from "./slices/competitorSlice"
import { competitorAPI } from "@/services/competitorService"
import { matchAPI } from "@/services/matchService"
import { leagueAPI } from "@/services/leaugeService"
import authSlice from "./slices/authSlice"
import { tournamentAPI } from "@/services/tournamentsService"
import { weightClassAPI } from "@/services/weightClassService"

const rootReducer = combineReducers({
  competitors: competitorReducer.reducer,
  auth: authSlice.reducer,
  [weightClassAPI.reducerPath]: weightClassAPI.reducer,
  [competitorAPI.reducerPath]: competitorAPI.reducer,
  [matchAPI.reducerPath]: matchAPI.reducer,
  [leagueAPI.reducerPath]: leagueAPI.reducer,
  [tournamentAPI.reducerPath]: tournamentAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        competitorAPI.middleware,
        leagueAPI.middleware,
        matchAPI.middleware,
        tournamentAPI.middleware,
        weightClassAPI.middleware,
      ]),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
