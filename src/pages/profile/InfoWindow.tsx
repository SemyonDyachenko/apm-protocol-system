import Competitor from "@/models/Competitor"
import React from "react"
import PersonalInfoWindow from "./PersonalInfoWindow"
import { CompetitorData } from "@/store/slices/competitorSlice"
import PropsInfo from "./PropsInfo"

type Props = {
  target: string
  competitor: CompetitorData
}

const InfoWindow = ({ competitor, target }: Props) => {
  switch (target) {
    case "general":
      return <PersonalInfoWindow competitor={competitor} />
    case "about":
      return <PropsInfo competitor={competitor} />
    default:
      return <div></div>
  }
}
export default InfoWindow
