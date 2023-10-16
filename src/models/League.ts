export default interface League {
  id: number
  name: string
  country: string
  description: string
  president: string
  level: string
  average_rating: number
}

export const getLeagueLevel = (league: League) => {
  return league.level.toLocaleLowerCase() === "pro"
    ? "Профессиональная"
    : "Любительская"
}
