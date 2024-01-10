import CompetitorLinkItem from "@/components/competitorLink"
import ListNode from "@/components/listNode"
import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import Team, { TeamCompetitor } from "@/models/Team"
import { teamAPI } from "@/services/teamService"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

type Props = {
  team: Team
  competitors?: TeamCompetitor[]
}

const items: Array<upMenuItem> = [
  {
    title: "Спортсмены",
    target: "info",
    selected: true,
  },
]

const TeamCompetitors = ({ team, competitors }: Props) => {
  const [searchString, setSearchString] = useState("")

  return (
    <div>
      <div>
        <UpMenuBar items={items} />
      </div>
      <div className="py-4">
        <div className="text-md flex items-center gap-3 px-2 pb-2 font-medium uppercase text-gray-700">
          <input
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="Поиск по фамилии"
            className="rounded-lg border-2 border-gray-300 bg-gray-70 px-4 py-2 text-gray-600 outline-none"
          />
          <FontAwesomeIcon className="text-secondary-500" icon={faSearch} />
        </div>
        <div className="my-2 md:px-2">
          {competitors
            ?.filter((item) =>
              item.competitor.last_name
                .toLowerCase()
                .includes(searchString.toLowerCase().trim())
            )
            ?.filter((item) => item.status === "accepted")
            .map((item, index) => (
              <CompetitorLinkItem key={index} competitor={item.competitor} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default TeamCompetitors
