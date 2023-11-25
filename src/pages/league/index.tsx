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
  faMessage,
} from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"
import { leagueAPI } from "@/services/leaugeService"
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LeagueInformationWindow from "./informationPage"
import LeagueCompetitors from "./competitorsPage"
import LeagueGallery from "./galleryPage"
import LeagueTournaments from "./tournamentsPage"
import UpBanner from "@/components/upbanner"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import LeagueMessages from "./leagueMessages"
import { createLeagueCompetitor } from "@/store/actions/leagueActon"
import { formatDate } from "@/utils/date"

type Props = {}

const LeaguePage = (props: Props) => {
  const dispatch = useAppDispatch()
  const { leagueId } = useParams()
  const { competitor, loading, error } = useAppSelector(
    (state) => state.competitors
  )
  const { data: leagueCompetitors } = leagueAPI.useFetchLeagueCompetitorsQuery(
    Number(leagueId)
  )

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

  if (league && competitor) {
    if (+league.president === competitor.id) {
      menuItems.push({
        onClick: () => setSelectedItem("messages"),
        children: "Сообщения",
        icon: faMessage,
      })
    }
  }

  const requestToLeague = () => {
    if (league && competitor) {
      dispatch(
        createLeagueCompetitor(
          league.id,
          competitor.id,
          formatDate(new Date()).toString()
        )
      )
    }
  }

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
      case "messages":
        return league && <LeagueMessages league={league} />
    }
  }

  const checkMembership = () => {
    if (leagueCompetitors && competitor && league) {
      let filtered = leagueCompetitors.filter(
        (item) =>
          item.league.id === league.id &&
          item.competitor.id === competitor.id &&
          item.accepted
      )
      if (filtered.length > 0) return true
    }
    return false
  }

  if (league)
    return (
      <div className="mx-auto w-11/12">
        <UpBanner
          disabledButton={checkMembership()}
          name={league.name}
          logo={Logo}
          banner={Image}
          onClick={requestToLeague}
          onChangeName={() => {}}
          league
          editingButton={
            competitor && competitor.id === +league.president ? true : false
          }
          targetId={league?.id}
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
