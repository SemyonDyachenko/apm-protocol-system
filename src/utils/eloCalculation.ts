import Competitor from "@/models/Competitor"
import LeagueCompetitor from "@/models/LeagueCompetitor"
import { TournamentRegistration } from "@/models/Tournament"
import { CommonExecOptions } from "child_process"

export const calculateEloRating = (
  competitor1: number,
  competitor2: number,
  rating1: number,
  rating2: number,
  winner: number,
  competitor1KFactor: number,
  competitor2KFactor: number,
  tournamentCoefficient: number
) => {
  let outcome = winner === competitor1 ? 1 : 0
  let expectedPlayerScore = 1 / (1 + Math.pow(10, (rating2 - rating1) / 400))
  let expectedOpponentScore = 1 - expectedPlayerScore
  console.log(expectedPlayerScore)
  let updatedPlayerRating =
    rating1 +
    competitor1KFactor * tournamentCoefficient * (outcome - expectedPlayerScore)
  console.log(updatedPlayerRating)
  let updatedOpponentRating =
    rating2 +
    competitor2KFactor *
      tournamentCoefficient *
      (1 - outcome - expectedOpponentScore)
  console.log(updatedOpponentRating)
  return [Math.round(updatedPlayerRating), Math.round(updatedOpponentRating)]
}

export const getAvarageRating = (
  competitors: Array<TournamentRegistration>
) => {
  const totalRating = competitors.reduce(
    (accum, item) => accum + item.competitor.elo_rating,
    0
  )
  return Math.round(totalRating / competitors.length)
}

export const getLeagueAvarageRating = (
  competitors: Array<LeagueCompetitor>
) => {
  const totalRating = competitors.reduce(
    (accum, item) => accum + item.competitor.elo_rating,
    0
  )
  return Math.round(totalRating / competitors.length)
}
