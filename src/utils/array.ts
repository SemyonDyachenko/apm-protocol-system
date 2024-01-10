import Competitor from "@/models/Competitor"
import LeagueCompetitor from "@/models/LeagueCompetitor"
import WeightClass, { TournamentWeightClass } from "@/models/WeightClass"

export const getCompetitorsByRole = (
  role: string,
  competitors: Array<LeagueCompetitor>
): Array<LeagueCompetitor> => {
  return competitors.filter((item) => item.role === role)
}

export const getOnlyWeightClasses = (classes: TournamentWeightClass[]) => {
  return classes.map((value) => value.weight_class)
}
