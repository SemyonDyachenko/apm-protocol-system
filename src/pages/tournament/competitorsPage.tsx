import Tournament, { TournamentRegistration } from "@/models/Tournament"
import RatingInfo from "../league/ratingInfo"
import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import { tournamentAPI } from "@/services/tournamentsService"

import CompetitorLinkItem from "@/components/competitorLink"
import { getAvarageRating } from "@/utils/eloCalculation"

import { useState } from "react"
import WeightClass, { TournamentWeightClass } from "@/models/WeightClass"

type Props = {
  tournament: Tournament
  weightClasses: TournamentWeightClass[]
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

const TournamentCompetitorsPage = ({ tournament, weightClasses }: Props) => {
  const { data: competitors } =
    tournamentAPI.useFetchTournamentRegistrationQuery(tournament.id)

  const getFilteredCompetitors = (category: string, filter: number) => {
    const weight = weightClasses.find((item) => item.id === filter)
    return competitors
      ?.filter(
        (item) =>
          item.category === category &&
          item.weight_class.name == weight?.weight_class.name
      )
      .map((registration, index) => (
        <CompetitorLinkItem key={index} competitor={registration.competitor} />
      ))
  }

  const [category, setCategory] = useState("men")
  const [weightClass, setWeightClass] = useState(weightClasses[0].id)
  return (
    <div>
      <div>
        <div className="flex items-start justify-between">
          <div className="w-full md:w-4/5">
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
              onChange={(e) => setWeightClass(+e.target.value)}
              defaultValue={weightClasses[0].id}
            >
              {weightClasses
                .filter((item) => item.category === category)
                .map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.weight_class.name} кг
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
