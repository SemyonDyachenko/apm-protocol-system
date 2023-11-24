import UpMenuBar from "@/components/upMenu/upMenuBar"
import { CompetitorData } from "@/store/slices/competitorSlice"
import { useState, useEffect } from "react"
import { leaguesNavItems } from "./navItems"
import { leagueAPI } from "@/services/leaugeService"
import ListNode from "@/components/listNode"
import ActionButton from "@/components/UI/Button"

type Props = {
  competitor: CompetitorData
}

const LeaguesWindow = ({ competitor }: Props) => {
  const [target, setTarget] = useState(leaguesNavItems[0].target)
  const { data: leagues } = leagueAPI.useFetchAllLeaguesQuery(100)

  return (
    <div>
      <div className="space-between flex items-end ">
        <div className="w-3/4">
          <UpMenuBar changeTarget={setTarget} items={leaguesNavItems} />
        </div>
        <div className="w-1/4">
          <div className="flex justify-end">
            <ActionButton className="mb-3 font-medium" onClick={() => {}}>
              Создать лигу
            </ActionButton>
          </div>
          <div className="h-[1px] w-full bg-gray-80"></div>
        </div>
      </div>
      <div>
        <div className="p-4">
          {leagues?.map((league, index) => (
            <ListNode key={index}>
              <div>{league.name}</div>
            </ListNode>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LeaguesWindow
