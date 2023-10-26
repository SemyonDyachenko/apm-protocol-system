import ListNode from "@/components/listNode"
import Tournament from "@/models/Tournament"
import { leagueAPI } from "@/services/leaugeService"
import { getNormalizeDate } from "@/utils/date"
import { Link } from "react-router-dom"

type Props = {
  tournaments: Tournament[]
}

const ListTournamentsView = ({ tournaments }: Props) => {
  return (
    <div className="w-full pt-5">
      {tournaments.map((tournament, index) => (
        <Link
          className="font-medium hover:text-gray-700"
          key={index}
          to={`/tournaments/${tournament.id}`}
        >
          <ListNode classname="py-3">
            <div className="w-1/3">{tournament.name}</div>
            <div>
              <Link
                className="text-secondary-500 underline hover:text-secondary-400"
                to={`/league/${tournament.league}`}
              >
                {leagueAPI.useFetchLeagueQuery(tournament.league).data?.name}
              </Link>
            </div>
            <div>{tournament.location}</div>
            <div>{getNormalizeDate(tournament.date)}</div>
            <div>
              <button className="rounded-lg bg-secondary-500 px-2 py-1 text-sm transition hover:bg-secondary-600">
                Подробнее
              </button>
            </div>
          </ListNode>
        </Link>
      ))}
    </div>
  )
}

export default ListTournamentsView
