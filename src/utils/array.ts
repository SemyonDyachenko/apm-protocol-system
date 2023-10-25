import Competitor from "@/models/Competitor"

export const getCompetitorsByRole = (
  role: string,
  competitors: Array<Competitor>
): Array<Competitor> => {
  return competitors.filter((item) => item.mode === role)
}
