import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import React from "react"
import RatingInfo from "../league/ratingInfo"

type Props = {}

const items: Array<upMenuItem> = [
  {
    title: "Основная информация",
    target: "general",
    selected: true,
  },
]

const TournamentInfoPage = (props: Props) => {
  return (
    <div>
      <div className="flex items-start justify-between">
        <div className="w-1/2">
          <UpMenuBar items={items} />
        </div>
        <RatingInfo />
      </div>
    </div>
  )
}

export default TournamentInfoPage
