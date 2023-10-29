import ListNode from "@/components/listNode"
import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import { useState } from "react"
import { tournamentAPI } from "@/services/tournamentsService"
import { getNormalizeDate } from "@/utils/date"
import { Link } from "react-router-dom"

type Props = {
  competitorId: number
}

const profileSettingsItems: Array<upMenuItem> = [
  {
    title: "Актуальные",
    selected: true,
    target: "present",
  },
  {
    title: "Прошедшие",
    selected: false,
    target: "pas",
  },
]

const CompetitorTournamentsList = ({ competitorId }: Props) => {
  const { data: tournaments } =
    tournamentAPI.useFetchCompetitorTournamentsQuery(competitorId)
  const [targetWindow, setTargetWindow] = useState("general")

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
      <div>
        <UpMenuBar
          changeTarget={setTargetWindow}
          items={profileSettingsItems}
        />
      </div>

      <div className="pt-4">
        {getFilteredTournaments(targetWindow)?.map((element, index) => (
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

export default CompetitorTournamentsList