import SideBarMenu from "@/components/sidebarMenu"
import { sidebarItemData } from "@/components/sidebarMenu/sidebarItem"
import Image from "../../../public/assets/banner.jpg"
import Logo from "../../../public/assets/loggo.png"

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

type Props = {}

const LeaguePage = (props: Props) => {
  const { leagueId } = useParams()
  const [selectedWindow, setSelectedItem] = useState("general")

  let menuItems: Array<sidebarItemData> = [
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

  const { data: league } = leagueAPI.useFetchLeagueQuery(Number(leagueId))
  1
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
      <div className="relative mt-12 h-[380px] w-full rounded-t-xl rounded-b-2xl shadow-lg">
        <div className="z-[1] ">
          <img
            className="z-4 absolute h-full w-full  rounded-t-xl rounded-b-2xl"
            src={Image}
          />
        </div>
        <div className="absolute z-[5] h-full w-full rounded-xl bg-black opacity-30"></div>
        <div className="relative -bottom-1 z-[10] flex h-full w-full items-end">
          <div className="flex h-1/3 w-full justify-between rounded-2xl bg-gray-80">
            <div className="flex px-10">
              <div className="-translate-y-6">
                <div className="h-[85px] w-[85px] rounded-full bg-gray-80">
                  <img className="h-full w-full rounded-full p-1" src={Logo} />
                </div>
              </div>
              <div className="py-4 px-2">
                <div className="flex items-center gap-3 text-xl font-bold">
                  <div>{league?.name}</div>
                  <FontAwesomeIcon color="green" icon={faCheck} />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1 py-2">
                    {new Array(1, 2, 3, 4, 5).map((element, index) => (
                      <FontAwesomeIcon
                        className="text-secondary-500"
                        key={index}
                        icon={faStar}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-400">(4.09)</div>
                </div>
              </div>
            </div>
            <div className="px-10 py-4">
              <div>
                <button className="rounded-xl bg-secondary-500 py-2 px-4 font-medium text-gray-700 shadow-md transition hover:bg-secondary-400 active:translate-y-1">
                  Подать заявку
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 py-2 text-sm text-gray-400">
                <div>Вы участник </div>
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </div>
          </div>
        </div>
      </div>
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
