import Competitor from "./Competitor"

export default interface Team {
  id: number
  name: string
  location: string
  country: string
  phone: string
  email: string
  status: string
  organizer: number
  description: string

  logo?: File
  banner?: File
}

export const getLeagueStatus = (team: Team) => {
  return team.status.toLocaleLowerCase() === "pro"
    ? "Профессиональная"
    : "Любительская"
}
