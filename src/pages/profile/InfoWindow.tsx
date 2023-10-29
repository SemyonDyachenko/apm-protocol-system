import Competitor from "@/models/Competitor"
import { useState, useEffect } from "react"
import PersonalInfoWindow from "./PersonalInfoWindow"
import { CompetitorData } from "@/store/slices/competitorSlice"
import PropsInfo from "./PropsInfo"
import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"

type Props = {
  competitor: CompetitorData
}

const profileSettingsItems: Array<upMenuItem> = [
  {
    title: "Основная информация",
    selected: true,
    target: "general",
  },
  {
    title: "Безопасность",
    selected: false,
    target: "security",
  },

  {
    title: "Уведомления",
    selected: false,
    target: "notification",
  },
  {
    title: "О себе",
    selected: false,
    target: "about",
  },
]

const InfoWindow = ({ competitor }: Props) => {
  const [targetWindow, setTargetWindow] = useState("general")

  useEffect(() => {
    setTargetWindow("general")
  }, [])

  const getWindow = () => {
    switch (targetWindow) {
      case "general":
        return <PersonalInfoWindow competitor={competitor} />
      case "about":
        return <PropsInfo competitor={competitor} />
      default:
        return <div></div>
    }
  }

  return (
    <div className="">
      <UpMenuBar changeTarget={setTargetWindow} items={profileSettingsItems} />
      <div className="pt-4">{getWindow()}</div>
    </div>
  )
}
export default InfoWindow
