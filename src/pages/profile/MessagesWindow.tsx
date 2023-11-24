import UpMenuBar from "@/components/upMenu/upMenuBar"
import { CompetitorData } from "@/store/slices/competitorSlice"
import { useState } from "react"
import { messagesNavItems } from "./navItems"
import TournamentMessagesPage from "./messages/tournamentMessages"

type Props = {
  competitor: CompetitorData
}

const MessagesWindow = ({ competitor }: Props) => {
  const [target, setTarget] = useState(messagesNavItems[0].target)

  const getWindow = () => {
    switch (target) {
      case "tournaments":
        return <TournamentMessagesPage competitor={competitor} />
        break

      default:
        break
    }
  }

  return (
    <div>
      <div>
        <UpMenuBar changeTarget={setTarget} items={messagesNavItems} />
      </div>
      <div>{getWindow()}</div>
    </div>
  )
}

export default MessagesWindow
