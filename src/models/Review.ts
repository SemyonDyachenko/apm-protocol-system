import Competitor from "./Competitor"

export interface TournamentReview {
  id: number
  text: string
  author: Competitor
  rating: number
  date: Date
}

export interface AverageRating {
  average_rating: number
}
