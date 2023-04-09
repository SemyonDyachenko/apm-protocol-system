import Competitor from "@/models/Competitor"

export const getUsersByMode = (
  competitors: Competitor[] | undefined,
  mode: string
) => {
  if (competitors)
    return competitors.filter((competitor) => competitor.mode === mode)
  return null
}
