import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import League from "@/models/League"
import RatingInfo from "./ratingInfo"
import Competitor, { getCompetitorFullname } from "@/models/Competitor"
import { competitorAPI } from "@/services/competitorService"
import PerfectScrollbar from "react-perfect-scrollbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getCompetitorsByRole } from "@/utils/array"
import CompetitorLinkItem from "@/components/competitorLink"
import { leagueAPI } from "@/services/leaugeService"

type Props = {
  league: League
  count: number
  rating: number
}

const items: Array<upMenuItem> = [
  {
    title: "Спортсмены",
    target: "competitor",
    selected: true,
  },
  {
    title: "Судьи",
    target: "judge",
    selected: false,
  },
  {
    title: "Секретари",
    target: "secretary",
    selected: false,
  },
  {
    title: "Организаторы",
    target: "organizer",
    selected: false,
  },
]

const LeagueCompetitors = ({ league, count, rating }: Props) => {
  const { data: competitors } = leagueAPI.useFetchLeagueCompetitorsQuery(
    league.id
  )
  const [targetRole, setTargetRole] = useState("competitor")
  const [searchString, setSearchString] = useState("")

  useEffect(() => {
    setTargetRole("competitor")
  }, [])

  return (
    <div>
      <div className="flex">
        <div className="w-1/2">
          <UpMenuBar changeTarget={setTargetRole} items={items} />
        </div>
        <RatingInfo count={count.toString()} rating={rating.toString()} />
      </div>
      <PerfectScrollbar>
        <div>
          <div className="mb-2 w-full rounded-lg  px-1">
            <div className="text-md flex items-center gap-3 px-2 pb-2 font-medium uppercase text-gray-700">
              <input
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                placeholder="Поиск по фамилии"
                className="rounded-lg border-2 border-gray-300 bg-gray-70 px-4 py-2 text-gray-600 outline-none"
              />
              <FontAwesomeIcon className="text-secondary-500" icon={faSearch} />
            </div>
            <div>
              <div className="max-h-[550px]">
                <div className="my-2 px-2">
                  {competitors &&
                    getCompetitorsByRole(targetRole, competitors)
                      .filter((item) => item.accepted)
                      .map((item, index) => (
                        <div key={index}>
                          <CompetitorLinkItem
                            key={index}
                            competitor={item.competitor}
                          />
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PerfectScrollbar>
    </div>
  )
}

export default LeagueCompetitors
