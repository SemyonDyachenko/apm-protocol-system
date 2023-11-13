import Competitor from "./Competitor"
import League from "./League"
import WeightClass from "./WeightClass"

export default interface Tournament {
  id: number
  name: string
  location: string
  description: string
  photo: File | null
  avg_rating: number
  address: string
  organizer: number
  main_secretary: number
  main_referee: number
  date: string
  league: number
  is_started: boolean
  level: string
  phone: string
  active: boolean
}

export interface TournamentRegistration {
  id: number
  tournament: number
  competitor: Competitor
  weight_class: WeightClass
  registration_date: string
  category: string
}

export const getTournamentLevel = (tournament: Tournament) => {
  return tournament.level.toLocaleLowerCase() === "pro"
    ? "Профессиональный"
    : "Любительский"
}
