import League from "./League"

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
}

export interface TournamentRegistration {
  id: number
  tournament: number
  competitor: number
  weight_class: number
  registration_date: string
}

export const getTournamentLevel = (tournament: Tournament) => {
  return tournament.level.toLocaleLowerCase() === "pro"
    ? "Профессиональный"
    : "Любительский"
}
