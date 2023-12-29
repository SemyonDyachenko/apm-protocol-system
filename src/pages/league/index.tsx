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
  faComment,
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
import {
  getAvarageRating,
  getLeagueAvarageRating,
} from "@/utils/eloCalculation"
import ReviewsPage from "./reviewsPage"
import { reviewAPI } from "@/services/reviewService"
import PageNotFound from "../404/PageNotFound"
import Loader from "@/components/loader"

type Props = {}

const LeaguePage = (props: Props) => {
  const dispatch = useAppDispatch()
  const { leagueId } = useParams()
  const { competitor, loading, error } = useAppSelector(
    (state) => state.competitors
  )
  const { data: leagueCompetitors, isLoading } =
    leagueAPI.useFetchLeagueCompetitorsQuery(Number(leagueId))

  const [selectedWindow, setSelectedItem] = useState("general")
  const { data: league, isLoading: leagueLoading } =
    leagueAPI.useFetchLeagueQuery(Number(leagueId))

  const { data: averageRating } = reviewAPI.useFetchLeagueRatingQuery(
    league?.id || 0
  )

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
    {
      onClick: () => setSelectedItem("reviews"),
      children: "Отзывы",
      icon: faComment,
    },
  ]

  if (leagueLoading || loading || isLoading) return <Loader />

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
      ).then((res) => window.location.reload())
    }
  }

  const getSelectedWindow = () => {
    switch (selectedWindow) {
      case "general":
        return (
          league &&
          leagueCompetitors && (
            <LeagueInformationWindow
              count={leagueCompetitors?.length}
              rating={getLeagueAvarageRating(leagueCompetitors)}
              league={league}
            />
          )
        )
      case "users":
        return (
          league &&
          leagueCompetitors && (
            <LeagueCompetitors
              count={leagueCompetitors?.length}
              rating={getLeagueAvarageRating(leagueCompetitors)}
              league={league}
            />
          )
        )
      case "gallery":
        return (
          league &&
          leagueCompetitors && (
            <LeagueGallery
              count={leagueCompetitors?.length}
              rating={getLeagueAvarageRating(leagueCompetitors)}
            />
          )
        )
      case "tournaments":
        return (
          league &&
          leagueCompetitors && (
            <LeagueTournaments
              count={leagueCompetitors?.length}
              rating={getLeagueAvarageRating(leagueCompetitors)}
              league={league}
            />
          )
        )
      case "messages":
        return league && <LeagueMessages league={league} />
      case "reviews":
        return (
          league &&
          leagueCompetitors &&
          competitor && (
            <ReviewsPage
              competitorId={competitor.id}
              count={leagueCompetitors.length}
              rating={getLeagueAvarageRating(leagueCompetitors)}
              league={league}
            />
          )
        )
    }
  }

  const checkMembership = () => {
    if (leagueCompetitors && competitor && league) {
      let filtered = leagueCompetitors.filter(
        (item) =>
          item.league.id === league.id && item.competitor.id === competitor.id
      )
      if (filtered.length > 0) return filtered[0].status
    }
    return false
  }

  if (league)
    return (
      <div className="mx-auto w-11/12">
        <UpBanner
          disabledButton={checkMembership()}
          name={league.name}
          logo={league.logo}
          banner={league.banner}
          onClick={requestToLeague}
          onChangeName={() => {}}
          league
          onCameraClick={() => {}}
          editingLink="league"
          rating={averageRating?.average_rating || 0}
          editingButton={
            competitor && competitor.id === +league.president ? true : false
          }
          targetId={league?.id}
        />
        <div className="w-full justify-between py-8 md:flex">
          <div className="w-full md:block  md:w-1/5">
            <SideBarMenu classname="w-full" items={menuItems} />
          </div>
          <div className="w-full md:w-9/12">
            <div className="min-h-[500px] rounded-lg py-2 px-4 shadow-md">
              {getSelectedWindow()}
            </div>
          </div>
        </div>
      </div>
    )
  else return <PageNotFound />
}

export default LeaguePage
