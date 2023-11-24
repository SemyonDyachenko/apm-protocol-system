import ListNode from "@/components/listNode"
import { useAppDispatch } from "@/hooks/redux"
import { notificationAPI } from "@/services/tournamentService"
import { tournamentActive } from "@/store/actions/tournamentAction"
import { CompetitorData } from "@/store/slices/competitorSlice"
import { getNormalizeDate } from "@/utils/date"
import { useState, useEffect } from "react"
import { ColorRing } from "react-loader-spinner"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

type Props = {
  competitor: CompetitorData
}

const TournamentMessagesPage = ({ competitor }: Props) => {
  const dispatch = useAppDispatch()
  const { data: notifcations } =
    notificationAPI.useFetchAllTournamentNotificationsQuery(competitor.id)

  const activateTournament = (tournamentId: number) => {
    dispatch(tournamentActive(tournamentId)).then((res) => {
      window.location.reload()
    })
  }

  return (
    <div className="py-4">
      {notifcations
        ?.filter((item) => item.tournament.active === false)
        .map((element, index) => (
          <div key={index}>
            <div className="flex justify-end text-sm text-gray-400">
              {getNormalizeDate(element.datetime.toString())}
            </div>
            <ListNode classname="py-2 mt-2 font-medium">
              <div>
                <Link
                  className="text-secondary-500 underline transition hover:text-secondary-400"
                  to={`/tournament/${element.tournament.id}`}
                >
                  {element.tournament.name}
                </Link>
              </div>
              <div>{getNormalizeDate(element.tournament.date.toString())}</div>
              <div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => activateTournament(element.tournament.id)}
                    className="rounded-lg bg-secondary-500 px-4 py-1  font-medium transition hover:bg-secondary-600"
                  >
                    Принять
                  </button>
                  <button className="rounded-lg bg-gray-600 px-4 py-1 font-medium text-white transition hover:bg-gray-700">
                    Отклонить
                  </button>
                </div>
              </div>
            </ListNode>
          </div>
        ))}
    </div>
  )
}

export default TournamentMessagesPage
