import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { tournamentAPI } from "@/services/tournamentsService"
import { useParams } from "react-router-dom"

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
} from "@/store/actions/tournamentAction"
import WeightClass, { TournamentWeightClass } from "@/models/WeightClass"
import { getOnlyWeightClasses } from "@/utils/array"
import { refreshLogin } from "@/store/actions/authAction"
import { getCompetitorData } from "@/store/actions/competitorAction"
import ReviewsPage from "./reviewsPage"
import { ColorRing } from "react-loader-spinner"
import PageNotFound from "../404/PageNotFound"
import EditingPage from "./editingPage"
import { createTournamentNotification } from "@/store/actions/notificationAction"
import League from "@/models/League"

type Props = {}

const TournamentPage = (props: Props) => {
  const dispatch = useAppDispatch()
  const { tournamentId } = useParams()

  const { data: tournament } = tournamentAPI.useFetchTournamentQuery(
    parseInt(tournamentId?.valueOf() || "")
  )
  const [weightClasses, setWeightClasses] = useState<WeightClass[]>([])
  const editing = window.location.pathname.includes("editing")

  const [selectedWindow, setSelectedItem] = useState("general")
  const [registerWindow, openRegisterWindow] = useState(false)

  const { competitor, loading, error } = useAppSelector(
    (state) => state.competitors
  )

  const [editingData, setEditingData] = useState([])
  const [editingName, setEditingName] = useState(tournament?.name)
  const [selectedLeague, setSelectedLeague] = useState<League>()

  console.log(selectedLeague)

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
          if (weightClasses)
            setWeightClasses(getOnlyWeightClasses(weightClasses))
        }
      )
  }, [])

  const getWindow = () => {
    if (tournament) {
      switch (selectedWindow) {
        case "general":
          return editing ? (
            <EditingPage
              setLeague={setSelectedLeague}
              setData={setEditingData}
              tournament={tournament}
            />
          ) : (
            <TournamentInfoPage editing={editing} tournament={tournament} />
          )
        case "users":
          return <TournamentCompetitorsPage tournament={tournament} />
        case "reviews":
          return (
            competitor && (
              <ReviewsPage
                tournament={tournament}
                competitorId={competitor.id}
              />
            )
          )
      }
    }
  }

  const updateTournamentData = () => {
    if (tournament) {
      if (editingData) {
        dispatch(
          updateTournament(tournament.id, {
            name: editingName,
            ...editingData,
          })
        ).then((res) => {
          dispatch(
            createTournamentNotification({
              message: "Новый турнир",
              tournament: tournament.id,
              competitor: selectedLeague ? +selectedLeague.president : 0,
              datetime: new Date(),
              read: false,
            })
          ).then((res) => console.log(res))
          window.location.reload()
        })
      }
    }
  }

  if (editing) {
    if (!competitor) return <PageNotFound />
    if (tournament?.organizer !== competitor.id) return <PageNotFound />
  }

  return (
    <div className="mx-auto w-11/12">
      {tournament && (
        <UpBanner
          disabledButton={false}
          name={editing ? editingName : tournament.name}
          onChangeName={setEditingName}
          logo={Logo}
          banner={tournament?.photo || Image}
          onClick={() => {
            if (!editing) openRegisterWindow(true)
            else updateTournamentData()
          }}
          editing={editing}
          verified={tournament.active}
          targetId={tournament.id}
        />
      )}
      <TournamentRegisterWindow
        weightClasses={weightClasses}
        tournamentId={tournament?.id}
        opened={registerWindow}
        closeFunc={() => openRegisterWindow(false)}
      />
      <div className="flex w-full justify-between py-8">
        <div className="w-3/12 md:w-2/12">
          <SideBarMenu classname="" disabled={editing} items={menuItems} />
        </div>
        <div className="w-8/12 md:w-9/12">
          <div className="w- min-h-[500px] rounded-lg py-2 px-4 shadow-md">
            {getWindow()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TournamentPage
