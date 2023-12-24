import Checkbox from "@/components/UI/Checkbox"
import ListNode from "@/components/listNode"
import { tournamentAPI } from "@/services/tournamentsService"
import { getNormalizeDate } from "@/utils/date"

import { Link } from "react-router-dom"
import { useState } from "react"

type Props = {
  competitorId: number
}

const TournamentsList = ({ competitorId }: Props) => {
  const { data: tournaments } =
    tournamentAPI.useFetchCompetitorTournamentsQuery(competitorId)

  const [actuall, setActuall] = useState(true)
  const [past, setPast] = useState(true)

  const getFilteredTournaments = () => {
    let now = new Date()
    if (tournaments) {
      if (actuall && past) {
        return tournaments
      } else if (actuall) {
        return tournaments.filter(
          (item) => new Date(item.date).getTime() > now.getTime()
        )
      } else if (past) {
        return tournaments.filter(
          (item) => new Date(item.date).getTime() < now.getTime()
        )
      }
    }
    return tournaments
  }

  return (
    <div className="pt-2">
      <div className="flex items-center gap-3 pt-2 pr-4">
        <div className="flex  gap-1">
          <Checkbox
            className="mt-[2px]"
            isChecked={actuall}
            changeState={setActuall}
          />
          <div className="text-sm font-medium">Актуальные</div>
        </div>
        <div className="flex gap-1">
          <Checkbox
            className="mt-[2px]"
            isChecked={past}
            changeState={setPast}
          />
          <div className="text-sm font-medium">Прошедшие</div>
        </div>
      </div>
      <div className="py-2 md:pr-4">
        {getFilteredTournaments()?.map((element, index) => (
          <Link
            className="hover:text-gray-700"
            to={`/tournaments/${element.id}`}
            key={index}
          >
            <ListNode classname="">
              <div className="md:text-md w-full py-2 text-sm font-semibold md:w-1/3">
                {element.name}
              </div>
              <div className="text-md hidden font-medium md:block">
                {element.location}
              </div>
              <div className="text-md hidden font-medium md:block">
                {getNormalizeDate(element.date)}
              </div>
              <div>
                <button className="rounded-lg bg-secondary-500 px-4 py-1 text-sm font-medium transition hover:bg-secondary-600">
                  Подробнее
                </button>
              </div>
            </ListNode>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TournamentsList
