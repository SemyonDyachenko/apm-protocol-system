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
}

export interface TournamentRegistration {
  id: number
  tournament: number
  competitor: number
  weight_class: number
  registration_date: string
}
