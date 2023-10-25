import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import League from "@/models/League"
import RatingInfo from "./ratingInfo"
import { tournamentAPI } from "@/services/tournamentsService"
import ListNode from "@/components/listNode"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

type Props = {
  league: League
}

const items: Array<upMenuItem> = [
  {
    title: "Актуальные",
    target: "present",
    selected: true,
  },
  {
    title: "Прошедшие",
    target: "past",
    selected: false,
  },
]

const LeagueTournaments = ({ league }: Props) => {
  const { data: tournaments } = tournamentAPI.useFetchAllTournamentsQuery(
    league.id
  )
  const [tournamentsTarget, changeTournamentsTarget] = useState("present")

  useEffect(() => {
    changeTournamentsTarget("present")
  }, [])

  const getFilteredTournaments = (target: string) => {
    const date = new Date()
    return (
      tournaments &&
      tournaments.filter((item) =>
        target === "present"
          ? new Date(item.date).getDate() > date.getDate()
          : new Date(item.date).getDate() < date.getDate()
      )
    )
  }

  return (
    <div>
      <div className="flex w-full">
        <div className="w-1/2">
          <UpMenuBar changeTarget={changeTournamentsTarget} items={items} />
        </div>
        <RatingInfo />
      </div>
      <div>
        {getFilteredTournaments(tournamentsTarget)?.map((element, index) => (
          <Link
            key={index}
            className="hover:text-gray-700"
            to={`/tournaments/${element.id}`}
          >
            <ListNode>
              <div className="text-md py-2 font-semibold">{element.name}</div>
              <div className="text-md font-medium">{element.location}</div>
              <div className="text-md font-medium">{element.date}</div>
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

export default LeagueTournaments
