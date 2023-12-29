import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { tournamentAPI } from "@/services/tournamentsService"
import { useNavigate, useParams } from "react-router-dom"

import {
  faCheck,
  faComment,
  faHome,
  faImage,
  faStar,
  faUsd,
  faUser,
} from "@fortawesome/free-solid-svg-icons"

import Image from "/assets/banner.jpg"
import Logo from "/assets/loggo.png"
import SideBarMenu from "@/components/sidebarMenu"
import { sidebarItemData } from "@/components/sidebarMenu/sidebarItem"

import { useState, useEffect } from "react"
import UpBanner from "@/components/upbanner"
import TournamentInfoPage from "./informationPage"
import TournamentCompetitorsPage from "./competitorsPage"
import TournamentRegisterWindow from "./tournamentRegisterWindow"
import {
  getTournamentWeightClasses,
  updateTournament,
  updateTournamentImages,
} from "@/store/actions/tournamentAction"
import WeightClass, { TournamentWeightClass } from "@/models/WeightClass"
import { getOnlyWeightClasses } from "@/utils/array"
import { refreshLogin } from "@/store/actions/authAction"
import { getCompetitorData } from "@/store/actions/competitorAction"
import ReviewsPage from "./reviewsPage"
import { ColorRing } from "react-loader-spinner"
import PageNotFound from "../404/PageNotFound"

import { createTournamentNotification } from "@/store/actions/notificationAction"
import League from "@/models/League"
import { reviewAPI } from "@/services/reviewService"
import GalleryPage from "./galleryPage"
import { leagueAPI } from "@/services/leaugeService"
import Loader from "@/components/loader"

type Props = {}

const TournamentPage = (props: Props) => {
  const dispatch = useAppDispatch()
  const { competitor, loading, error } = useAppSelector(
    (state) => state.competitors
  )
  const navigate = useNavigate()
  const { tournamentId } = useParams()

  const { data: tournament, isLoading: isTournamentLoading } =
    tournamentAPI.useFetchTournamentQuery(
      parseInt(tournamentId?.valueOf() || "")
    )
  const [weightClasses, setWeightClasses] = useState<TournamentWeightClass[]>(
    []
  )
  const { data: league, isLoading } = leagueAPI.useFetchLeagueQuery(
    tournament?.league || -1
  )

  const [selectedWindow, setSelectedItem] = useState("general")
  const [registerWindow, openRegisterWindow] = useState(false)

  const { data: averageRating } = reviewAPI.useFetchTournamentRatingQuery(
    tournament?.id || 0
  )

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

  useEffect(() => {
    if (tournamentId)
      dispatch(getTournamentWeightClasses(+tournamentId)).then(
        (weightClasses) => {
          if (weightClasses) setWeightClasses(weightClasses)
        }
      )
  }, [])

  const getWindow = () => {
    if (tournament && league) {
      switch (selectedWindow) {
        case "general":
          return (
            <TournamentInfoPage
              league={league}
              editing={false}
              tournament={tournament}
            />
          )

        case "users":
          return (
            weightClasses.length > 0 && (
              <TournamentCompetitorsPage
                weightClasses={weightClasses}
                tournament={tournament}
              />
            )
          )
        case "reviews":
          return (
            competitor && (
              <ReviewsPage
                tournament={tournament}
                competitorId={competitor.id}
              />
            )
          )
        case "gallery":
          return <GalleryPage />
      }
    }
  }

  if (isLoading || loading || isTournamentLoading) {
    return <Loader />
  }

  if (!tournament?.active) {
    if (competitor && league) {
      if (
        competitor.id === +league.president ||
        competitor.id === tournament?.organizer
      ) {
      } else return <PageNotFound />
    } else return <PageNotFound />
  }

  const getTimeStatus = (): boolean => {
    if (tournament) {
      if (new Date(tournament.date).getTime() < new Date().getTime()) {
        return true
      } else {
        return false
      }
    }
    return false
  }

  if (tournament)
    return (
      <div className="mx-auto w-11/12">
        {tournament && (
          <UpBanner
            disabledButton={getTimeStatus()}
            name={tournament.name}
            onChangeName={() => {}}
            logo={tournament.logo}
            editingLink="tournaments"
            banner={tournament.banner}
            onClick={() => {
              if (competitor && competitor.verified && weightClasses.length > 0)
                openRegisterWindow(true)
              else navigate("/signup")
            }}
            editing={false}
            editingButton={competitor?.id === tournament.organizer}
            verified={tournament.active}
            targetId={tournament.id}
            league={false}
            onCameraClick={() => {}}
            rating={averageRating?.average_rating || 0}
          />
        )}
        {competitor && weightClasses.length > 0 && (
          <TournamentRegisterWindow
            competitor={competitor}
            weightClasses={weightClasses}
            tournamentId={tournament?.id}
            opened={registerWindow}
            closeFunc={() => openRegisterWindow(false)}
          />
        )}
        <div className="w-full justify-between py-8 md:flex">
          <div className=" md:block md:w-2/12">
            <SideBarMenu classname="" items={menuItems} />
          </div>
          <div className="w-full md:w-9/12">
            <div className="min-h-[500px] w-full rounded-lg py-2 px-4 shadow-md">
              {getWindow()}
            </div>
          </div>
        </div>
      </div>
    )
  else return <PageNotFound />
}

export default TournamentPage
