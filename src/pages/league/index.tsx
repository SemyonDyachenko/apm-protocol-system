import SideBarMenu from "@/components/sidebarMenu"
import { sidebarItemData } from "@/components/sidebarMenu/sidebarItem"
import Image from "/assets/banner.jpg"
import Logo from "/assets/loggo.png"

import {
  faCalendarDays,
  faHome,
  faImage,
  faUser,
  faStar,
  faCheck,
} from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { leagueAPI } from "@/services/leaugeService"
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LeagueInformationWindow from "./informationPage"
import LeagueCompetitors from "./competitorsPage"
import LeagueGallery from "./galleryPage"
import LeagueTournaments from "./tournamentsPage"
import UpBanner from "@/components/upbanner"

type Props = {}

const LeaguePage = (props: Props) => {
  const { leagueId } = useParams()
  const [selectedWindow, setSelectedItem] = useState("general")
  const { data: league } = leagueAPI.useFetchLeagueQuery(Number(leagueId))

  const menuItems: Array<sidebarItemData> = [
    {
      onClick: () => setSelectedItem("general"),
      children: "Главная",
      icon: faHome,
    },
    {
      onClick: () => setSelectedItem("users"),
      children: "Участники",
      icon: faUser,
    },
    {
      onClick: () => setSelectedItem("tournaments"),
      children: "Турниры",
      icon: faCalendarDays,
    },
    {
      onClick: () => setSelectedItem("gallery"),
      children: "Галерея",
      icon: faImage,
    },
  ]

  const getSelectedWindow = () => {
    switch (selectedWindow) {
      case "general":
        return league && <LeagueInformationWindow league={league} />
      case "users":
        return league && <LeagueCompetitors league={league} />
      case "gallery":
        return league && <LeagueGallery />
      case "tournaments":
        return league && <LeagueTournaments league={league} />
    }
  }

  return (
    <div className="mx-auto w-11/12">
      <UpBanner
        disabledButton={false}
        name={league?.name}
        logo={Logo}
        banner={Image}
      />
      <div className="flex w-full justify-between py-8">
        <div className="w-1/5">
          <SideBarMenu classname="w-full" items={menuItems} />
        </div>
        <div className="w-9/12">
          <div className="min-h-[500px] rounded-lg py-2 px-4 shadow-md">
            {getSelectedWindow()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaguePage
