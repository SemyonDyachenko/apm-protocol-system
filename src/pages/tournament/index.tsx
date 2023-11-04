import { useAppDispatch } from "@/hooks/redux"
import { tournamentAPI } from "@/services/tournamentsService"
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCheck,
  faComment,
  faHome,
  faImage,
  faStar,
  faUsd,
  faUser,
} from "@fortawesome/free-solid-svg-icons"

import Image from "../../../public/assets/banner.jpg"
import Logo from "../../../public/assets/loggo.png"
import SideBarMenu from "@/components/sidebarMenu"
import { sidebarItemData } from "@/components/sidebarMenu/sidebarItem"

import { useState, useEffect } from "react"
import UpBanner from "@/components/upbanner"
import TournamentInfoPage from "./informationPage"
import TournamentCompetitorsPage from "./competitorsPage"
import TournamentRegisterWindow from "./tournamentRegisterWindow"
import { getTournamentWeightClasses } from "@/store/actions/tournamentAction"
import WeightClass, { TournamentWeightClass } from "@/models/WeightClass"
import { getOnlyWeightClasses } from "@/utils/array"
import { refreshLogin } from "@/store/actions/authAction"
import { getCompetitorData } from "@/store/actions/competitorAction"

type Props = {}

const TournamentPage = (props: Props) => {
  const dispatch = useAppDispatch()
  const { tournamentId } = useParams()
  const { data: tournament } = tournamentAPI.useFetchTournamentQuery(
    parseInt(tournamentId?.valueOf() || "")
  )
  const [weightClasses, setWeightClasses] = useState<WeightClass[]>([])

  const [selectedWindow, setSelectedItem] = useState("general")
  const [registerWindow, openRegisterWindow] = useState(false)

  useEffect(() => {
    if (tournamentId)
      dispatch(getTournamentWeightClasses(+tournamentId)).then(
        (weightClasses) => {
          if (weightClasses)
            setWeightClasses(getOnlyWeightClasses(weightClasses))
        }
      )
  }, [])

  useEffect(() => {
    document.body.style.overflowY = registerWindow ? "hidden" : "scroll"

    dispatch(refreshLogin()).then(() => {
      dispatch(getCompetitorData(localStorage.getItem("token")))
    })
  }, [registerWindow])

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
      onClick: () => setSelectedItem("gallery"),
      children: "Галерея",
      icon: faImage,
    },
    {
      onClick: () => setSelectedItem("reviews"),
      children: "Отзывы",
      icon: faComment,
    },
  ]

  const getWindow = () => {
    if (tournament) {
      switch (selectedWindow) {
        case "general":
          return <TournamentInfoPage tournament={tournament} />
        case "users":
          return <TournamentCompetitorsPage tournament={tournament} />
      }
    }
  }

  return (
    <div className="mx-auto w-11/12">
      <UpBanner
        name={tournament?.name}
        logo={Logo}
        banner={tournament?.photo || Image}
        onClick={() => openRegisterWindow(true)}
      />
      <TournamentRegisterWindow
        weightClasses={weightClasses}
        tournamentId={tournament?.id}
        opened={registerWindow}
        closeFunc={() => openRegisterWindow(false)}
      />
      <div className=" flex w-full justify-between py-8">
        <div className="w-2/12">
          <SideBarMenu classname="" items={menuItems} />
        </div>
        <div className="w-9/12">
          <div className="w- min-h-[500px] rounded-lg py-2 px-4 shadow-md">
            {getWindow()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TournamentPage
