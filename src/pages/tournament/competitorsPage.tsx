import Tournament, { TournamentRegistration } from "@/models/Tournament"
import RatingInfo from "../league/ratingInfo"
import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import { tournamentAPI } from "@/services/tournamentsService"

import CompetitorLinkItem from "@/components/competitorLink"
import { getAvarageRating } from "@/utils/eloCalculation"

import { useState } from "react"

type Props = {
  tournament: Tournament
}

const items: Array<upMenuItem> = [
  {
    title: "Мужчины",
    target: "men",
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
    target: "juniors18",
    selected: false,
  },
  {
    title: "Юниоры 21+",
    target: "juniors21",
    selected: false,
  },
]

const TournamentCompetitorsPage = ({ tournament }: Props) => {
  const { data: competitors } =
    tournamentAPI.useFetchTournamentRegistrationQuery(tournament.id)

  const getFilteredCompetitors = (category: string, filter: string) => {
    return competitors
      ?.filter(
        (item) => item.category === category && item.weight_class.name == filter
      )
      .map((registration, index) => (
        <CompetitorLinkItem key={index} competitor={registration.competitor} />
      ))
  }

  let weightClasses = ["65", "75", "85", "95", "105"]

  const [category, setCategory] = useState("men")
  const [weightClass, setWeightClass] = useState(weightClasses[0])
  return (
    <div>
      <div>
        <div className="flex items-start justify-between">
          <div className="w-4/5">
            <UpMenuBar changeTarget={setCategory} items={items} />
          </div>
          {competitors && (
            <RatingInfo
              rating={getAvarageRating(competitors).toString()}
              count={competitors?.length.toString()}
            />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div className="text-md mb-2 text-gray-400">Весовая категория:</div>
            <select
              className="mb-2 rounded-lg border-r-4 border-r-gray-70 bg-gray-70 px-4 py-1 font-semibold outline-none"
              onChange={(e) => setWeightClass(e.target.value)}
              defaultValue={weightClasses[0]}
            >
              {weightClasses.map((item, index) => (
                <option key={index} value={item}>
                  {item} кг
                </option>
              ))}
            </select>
          </div>
          {competitors && getFilteredCompetitors(category, weightClass)}
        </div>
      </div>
    </div>
  )
}

export default TournamentCompetitorsPage
