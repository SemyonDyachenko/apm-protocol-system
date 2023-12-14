import ActionButton from "@/components/UI/Button"
import ListNode from "@/components/listNode"
import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import { useAppDispatch } from "@/hooks/redux"
import { getCompetitorFullname, getCompetitorGender } from "@/models/Competitor"
import League from "@/models/League"
import LeagueCompetitor from "@/models/LeagueCompetitor"
import { leagueAPI } from "@/services/leaugeService"
import {
  LeagueCompetitorStatus,
  acceptCompetitorToLeague,
} from "@/store/actions/leagueActon"
import { getNormalizeDate } from "@/utils/date"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

type Props = {
  league: League
}

const items: Array<upMenuItem> = [
  {
    title: "Заявки",
    target: "requests",
    selected: true,
  },
  {
    title: "Отклоненные",
    target: "declined",
    selected: false,
  },
  {
    title: "Принятые",
    target: "accepted",
    selected: false,
  },
]
const LeagueMessages = ({ league }: Props) => {
  const dispatch = useAppDispatch()
  const [target, setTarget] = useState("requests")

  const { data: competitors } = leagueAPI.useFetchLeagueCompetitorsQuery(
    league.id
  )

  const accept = (id: number) => {
    dispatch(
      acceptCompetitorToLeague(id, LeagueCompetitorStatus.ACCEPTED)
    ).then((res) => {
      if (res) {
        if (res.status === 200) window.location.reload()
      }
    })
  }

  const decline = (id: number) => {
    dispatch(
      acceptCompetitorToLeague(id, LeagueCompetitorStatus.DECLINED)
    ).then((res) => {
      if (res) {
        if (res.status === 200) window.location.reload()
      }
    })
  }

  const getCompetitorsRequests = () => {
    if (competitors) {
      switch (target) {
        case "requests":
          return competitors.filter(
            (item) => item.status === LeagueCompetitorStatus.SENT
          )
          break
        case "accepted":
          return competitors.filter(
            (item) => item.status === LeagueCompetitorStatus.ACCEPTED
          )
        case "declined":
          return competitors.filter(
            (item) => item.status === LeagueCompetitorStatus.DECLINED
          )
        default:
          break
      }
    }
    return Array<LeagueCompetitor>()
  }

  return (
    <div>
      <div>
        <UpMenuBar changeTarget={setTarget} items={items} />
      </div>
      <div className="w-full py-4">
        {getCompetitorsRequests() &&
          getCompetitorsRequests().map((item, index) => (
            <div className="w-full" key={index}>
              <div className="flex w-full justify-end text-sm text-gray-400">
                {getNormalizeDate(new Date(item.request_date).toDateString())}
              </div>
              <div className="py-2">
                <ListNode classname="font-medium">
                  <div className="flex w-2/4 items-center gap-8">
                    <div>
                      <img
                        className="h-[65px] w-[65px] rounded-full"
                        src={item.competitor.image?.toString() || ""}
                      />
                    </div>
                    <div className="text-md font-semibold">
                      <Link
                        className="text-secondary-500 underline transition hover:text-secondary-400"
                        to={`/competitor/${item.competitor.id}`}
                      >
                        {getCompetitorFullname(item.competitor)}
                      </Link>
                    </div>
                  </div>
                  <div className="w-1/5">{item.competitor.country}</div>
                  <div className="w-1/4 text-2xl font-black text-secondary-500">
                    {item.competitor.elo_rating}
                  </div>
                  <div className="flex gap-2">
                    {item.status === "sent" && (
                      <>
                        <ActionButton onClick={() => accept(item.id)}>
                          Принять
                        </ActionButton>
                        <ActionButton
                          className="text-white"
                          gray
                          onClick={() => decline(item.id)}
                        >
                          Отклонить
                        </ActionButton>
                      </>
                    )}
                    {item.status === "declined" && (
                      <div className="text-md">Отклонено</div>
                    )}
                    {item.status === "accepted" && (
                      <div className="text-md">Принято</div>
                    )}
                  </div>
                </ListNode>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default LeagueMessages
