import ActionButton from "@/components/UI/Button"
import ListNode from "@/components/listNode"
import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import { useAppDispatch } from "@/hooks/redux"
import { getCompetitorFullname } from "@/models/Competitor"
import Team, { TeamCompetitor } from "@/models/Team"
import { LeagueCompetitorStatus } from "@/store/actions/leagueActon"
import { acceptCompetitorToTeam } from "@/store/actions/teamAction"
import { getNormalizeDate } from "@/utils/date"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

type Props = {
  team: Team
  competitors?: TeamCompetitor[]
}

const items: Array<upMenuItem> = [
  {
    selected: true,
    target: "sent",
    title: "Заявки",
  },
  {
    selected: false,
    target: "accepted",
    title: "Принятые",
  },
  {
    selected: false,
    target: "declined",
    title: "Отклоненные",
  },
]

const TeamMessages = ({ team, competitors }: Props) => {
  const dispatch = useAppDispatch()
  const [target, setTarget] = useState(items[0].target)

  const getCompetitors = () => {
    if (competitors) {
      return competitors.filter((item) => item.status === target)
    }
  }

  const accept = (id: number) => {
    dispatch(acceptCompetitorToTeam(id, LeagueCompetitorStatus.ACCEPTED)).then(
      (res) => {
        if (res) window.location.reload()
      }
    )
  }

  const decline = (id: number) => {
    dispatch(acceptCompetitorToTeam(id, LeagueCompetitorStatus.DECLINED)).then(
      (res) => {
        if (res) window.location.reload()
      }
    )
  }

  return (
    <div>
      <div>
        <UpMenuBar changeTarget={setTarget} items={items} />
      </div>
      <div className="py-4">
        {getCompetitors()?.map((item, index) => (
          <div className="w-full" key={index}>
            <div className="flex w-full justify-end text-sm text-gray-400">
              {getNormalizeDate(new Date(item.datetime).toDateString())}
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

export default TeamMessages
