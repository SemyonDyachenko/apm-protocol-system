import ActionButton from "@/components/UI/Button"
import ListNode from "@/components/listNode"
import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import { useAppDispatch } from "@/hooks/redux"
import { getCompetitorFullname, getCompetitorGender } from "@/models/Competitor"
import League from "@/models/League"
import { leagueAPI } from "@/services/leaugeService"
import { acceptCompetitorToLeague } from "@/store/actions/leagueActon"
import { getNormalizeDate } from "@/utils/date"
import { useState, useEffect } from "react"

type Props = {
  league: League
}

const items: Array<upMenuItem> = [
  {
    title: "Заявки",
    target: "requests",
    selected: true,
  },
]
const LeagueMessages = ({ league }: Props) => {
  const dispatch = useAppDispatch()

  const { data: competitors } = leagueAPI.useFetchLeagueCompetitorsQuery(
    league.id
  )

  const accept = (id: number) => {
    dispatch(acceptCompetitorToLeague(id)).then((res) => {
      if (res) {
        if (res.status === 200) window.location.reload()
      }
    })
  }

  const decline = (id: number) => {}

  return (
    <div>
      <div>
        <UpMenuBar items={items} />
      </div>
      <div className="w-full py-4">
        {competitors &&
          competitors
            .filter((item) => !item.accepted)
            .map((item, index) => (
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
                        {getCompetitorFullname(item.competitor)}
                      </div>
                    </div>
                    <div className="w-1/5">{item.competitor.country}</div>
                    <div className="w-1/4 text-2xl font-black text-secondary-500">
                      {item.competitor.elo_rating}
                    </div>
                    <div className="flex gap-2">
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
