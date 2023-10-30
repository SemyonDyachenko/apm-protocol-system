import ListNode from "@/components/listNode"
import { tournamentAPI } from "@/services/tournamentsService"
import { getNormalizeDate } from "@/utils/date"

import { Link } from "react-router-dom"

type Props = {
  competitorId: number
}

const TournamentsList = ({ competitorId }: Props) => {
  const { data: tournaments } =
    tournamentAPI.useFetchCompetitorTournamentsQuery(competitorId)
  return (
    <div className="py-2">
      <div className="py-2 pr-4">
        {tournaments?.map((element, index) => (
          <Link
            className="hover:text-gray-700"
            to={`/tournaments/${element.id}`}
            key={index}
          >
            <ListNode>
              <div className="text-md w-1/3 py-2 font-semibold">
                {element.name}
              </div>
              <div className="text-md font-medium">{element.location}</div>
              <div className="text-md font-medium">
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
