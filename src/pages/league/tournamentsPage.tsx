import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import League from "@/models/League"
import RatingInfo from "./ratingInfo"
import { tournamentAPI } from "@/services/tournamentsService"
import ListNode from "@/components/listNode"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getNormalizeDate } from "@/utils/date"
import Tournament from "@/models/Tournament"

type Props = {
  league: League
  count: number
  rating: number
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

const LeagueTournaments = ({ league, count, rating }: Props) => {
  const { data: tournaments } = tournamentAPI.useFetchAllTournamentsQuery(
    league.id
  )
  const [tournamentsTarget, changeTournamentsTarget] = useState("present")

  const getFilteredTournaments = () => {
    const date = new Date()

    if (tournaments) {
      switch (tournamentsTarget) {
        case "present":
          return tournaments.filter(
            (item) => new Date(item.date).getTime() > date.getTime()
          )
        case "past":
          return tournaments.filter(
            (item) => new Date(item.date).getTime() < date.getTime()
          )
      }
    }
  }

  return (
    <div>
      <div className="flex w-full">
        <div className="w-full md:w-1/2">
          <UpMenuBar changeTarget={changeTournamentsTarget} items={items} />
        </div>
        <RatingInfo count={count.toString()} rating={rating.toString()} />
      </div>
      <div>
        {getFilteredTournaments()?.map((element, index) => (
          <Link
            key={index}
            className="hover:text-gray-700"
            to={`/tournaments/${element.id}`}
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

export default LeagueTournaments
