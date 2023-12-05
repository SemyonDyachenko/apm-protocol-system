import ListNode from "@/components/listNode"
import Tournament from "@/models/Tournament"
import { leagueAPI } from "@/services/leaugeService"
import { getNormalizeDate } from "@/utils/date"
import { Link } from "react-router-dom"

type Props = {
  tournaments?: Tournament[]
  search: string
}

const ListTournamentsView = ({ tournaments, search }: Props) => {
  const { data: leagues } = leagueAPI.useFetchAllLeaguesQuery(100)
  return (
    <div className="w-full pt-5">
      {tournaments &&
        tournaments
          .filter((item) =>
            item.name.toLowerCase().trim().includes(search.trim().toLowerCase())
          )
          .map((tournament, index) => (
            <Link
              className="font-medium hover:text-gray-700"
              key={index}
              to={`/tournaments/${tournament.id}`}
            >
              <ListNode classname="py-3">
                <div className="w-full md:w-1/3">{tournament.name}</div>
                <div className="hidden w-1/6 md:block">
                  <Link
                    className="text-secondary-500 underline hover:text-secondary-400"
                    to={`/league/${tournament.league}`}
                  >
                    {
                      leagues?.find((item) => item.id === tournament.league)
                        ?.name
                    }
                  </Link>
                </div>
                <div className="hidden w-1/6 md:block">
                  {tournament.location}
                </div>
                <div className="hidden w-1/6 md:block">
                  {getNormalizeDate(tournament.date)}
                </div>
                <div>
                  <button className="rounded-lg bg-secondary-500 px-3 py-1 text-sm transition hover:bg-secondary-600">
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
