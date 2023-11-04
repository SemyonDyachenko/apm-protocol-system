import Competitor from "@/models/Competitor"
import WeightClass, { TournamentWeightClass } from "@/models/WeightClass"

export const getCompetitorsByRole = (
  role: string,
  competitors: Array<Competitor>
): Array<Competitor> => {
  return competitors.filter((item) => item.mode === role)
}

export const getOnlyWeightClasses = (classes: TournamentWeightClass[]) => {
  return classes.map((value) => value.weight_class)
}
