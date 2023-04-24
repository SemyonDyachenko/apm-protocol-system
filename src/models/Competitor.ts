export default interface Competitor {
  id: number
  email: string
  first_name: string
  last_name: string
  gender: string
  elo_rating: number
  kFactor: number
  mode: string
  weight: number
  country?: string
}

export const getCompetitorFullname = (
  competitor: Competitor | null | undefined
) => {
  if (competitor) return competitor.first_name + " " + competitor.last_name
  else return null
}
