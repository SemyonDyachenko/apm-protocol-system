import Tournament, { TournamentRegistration } from "@/models/Tournament"
import RatingInfo from "../league/ratingInfo"
import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import { tournamentAPI } from "@/services/tournamentsService"
import ListNode from "@/components/listNode"
import { competitorAPI } from "@/services/competitorService"
import Competitor, { getCompetitorFullname } from "@/models/Competitor"
import { useEffect } from "react"
import CompetitorLinkItem from "@/components/competitorLink"
import { getAvarageRating } from "@/utils/eloCalculation"

type Props = {
  tournament: Tournament
}

const items: Array<upMenuItem> = [
  {
    title: "Мужчины",
    target: "man",
    selected: true,
  },
  {
    title: "Женщины",
    target: "women",
    selected: false,
  },
  {
    title: "Ветераны",
    target: "old",
    selected: false,
  },
  {
    title: "Юниоры 18+",
    target: "old",
    selected: false,
  },
  {
    title: "Юниоры 21+",
    target: "old",
    selected: false,
  },
]

const TournamentCompetitorsPage = ({ tournament }: Props) => {
  const { data: competitors } =
    tournamentAPI.useFetchTournamentRegistrationQuery(tournament.id)

  return (
    <div>
      <div>
        <div className="flex items-start justify-between">
          <div className="w-4/5">
            <UpMenuBar items={items} />
          </div>
          {competitors && (
            <RatingInfo
              rating={getAvarageRating(competitors).toString()}
              count={competitors?.length.toString()}
            />
          )}
        </div>
        <div>
          {competitors &&
            competitors.map((competitor, index) => (
              <CompetitorLinkItem key={index} competitor={competitor} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default TournamentCompetitorsPage
