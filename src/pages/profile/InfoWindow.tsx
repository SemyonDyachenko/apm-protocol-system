import Competitor from "@/models/Competitor"
import { useState, useEffect } from "react"
import PersonalInfoWindow from "./PersonalInfoWindow"
import { CompetitorData } from "@/store/slices/competitorSlice"
import PropsInfo from "./PropsInfo"
import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import SecurityPage from "./securityPage"
import NotificationPage from "./notificationPage"
import { profileSettingsItems } from "./navItems"

type Props = {
  competitor: CompetitorData
}

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
      case "security":
        return <SecurityPage />
      case "notification":
        return <NotificationPage />
      default:
        return <div></div>
    }
  }

  return (
    <div>
      <UpMenuBar changeTarget={setTargetWindow} items={profileSettingsItems} />
      <div className="pt-4">{getWindow()}</div>
    </div>
  )
}
export default InfoWindow
