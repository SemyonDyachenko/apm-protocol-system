import Tournament, { TournamentRegistration } from "@/models/Tournament"
import RatingInfo from "../league/ratingInfo"
import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import { tournamentAPI } from "@/services/tournamentsService"
import ListNode from "@/components/listNode"
import { competitorAPI } from "@/services/competitorService"
import Competitor, { getCompetitorFullname } from "@/models/Competitor"
import { useEffect } from "react"

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
          <RatingInfo />
        </div>
        <div>
          {competitors &&
            competitors.map((competitor, index) => (
              <ListNode key={index}>
                <div className="flex w-1/4 items-center gap-8">
                  <div>
                    <img
                      className="h-[65px] w-[65px] rounded-full"
                      src={competitor.image?.toString() || ""}
                    />
                  </div>
                  <div className="text-md font-semibold">
                    {getCompetitorFullname(competitor)}
                  </div>
                </div>
                <div className="flex w-1/6 justify-start font-medium">
                  {competitor.city}
                </div>
                <div className="flex w-1/6 justify-start font-medium">
                  {competitor.rank}
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-black text-secondary-500 ">
                    {competitor.elo_rating}
                  </div>
                  <div className="text-md font-semibold">
                    Рейтинг
                    <br />
                    Спортсмена
                  </div>
                </div>
              </ListNode>
            ))}
        </div>
      </div>
    </div>
  )
}

export default TournamentCompetitorsPage
