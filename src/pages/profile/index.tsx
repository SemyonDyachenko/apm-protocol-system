import HText from "@/components/UI/HText"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { logoutUser, refreshLogin } from "@/store/actions/authAction"
import { getCompetitorData } from "@/store/actions/competitorAction"
import {
  faBuilding,
  faBuildingColumns,
  faComment,
  faDisplay,
  faHouse,
  faList,
  faMessage,
  faRightFromBracket,
  faVolleyball,
} from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"

import { Link, useNavigate } from "react-router-dom"
import PersonalInfoWindow from "./PersonalInfoWindow"
import CompetitorMatchList from "./TournamentsList"
import { ColorRing } from "react-loader-spinner"
import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import { sidebarItemData } from "@/components/sidebarMenu/sidebarItem"
import SideBarMenu from "@/components/sidebarMenu"
import InfoWindow from "./InfoWindow"
import CompetitorTournamentsList from "./TournamentsList"
import MessagesWindow from "./MessagesWindow"
import LeaguesWindow from "./leaguesWindow"
import { todayIsBirthdate } from "@/utils/date"
import Loader from "@/components/loader"

type Props = {}

const ProfilePage = (props: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { competitor, loading } = useAppSelector((state) => state.competitors)

  const [profileWindow, setProfileWindow] = useState("personal")

  const setWindow = (window: string) => {
    setProfileWindow(window)
  }

  let sidebarItems: Array<sidebarItemData> = [
    {
      onClick: () => setWindow("personal"),
      selected: false,
      icon: faHouse,
      children: "Профиль",
    },
    {
      onClick: () => setWindow("tournaments"),
      selected: false,
      icon: faList,
      children: "Турниры",
      disabled: !competitor?.verified,
    },
    {
      onClick: () => setWindow("messages"),
      selected: false,
      icon: faComment,
      children: "Сообщения",
      disabled: !competitor?.verified,
    },
    {
      onClick: () => setWindow("leagues"),
      selected: false,
      icon: faBuildingColumns,
      children: "Лиги",
      disabled: !competitor?.verified,
    },
    {
      onClick: () => {},
      selected: false,
      icon: faRightFromBracket,
      children: "Выйти",
      link: "/logout",
    },
  ]

  let organizerItems: Array<sidebarItemData> = [
    {
      onClick: () => {},
      selected: false,
      icon: faDisplay,
      children: "Трансляции",
      disabled: true,
    },
    {
      onClick: () => {},
      selected: false,
      icon: faVolleyball,
      children: "Тренировки",
      disabled: true,
    },
  ]

  if (competitor?.mode === "organizer") {
    sidebarItems.splice(
      sidebarItems.length - 1,
      0,
      organizerItems[0],
      organizerItems[1]
    )
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    } else {
      try {
        dispatch(refreshLogin()).then(() => {
          dispatch(getCompetitorData(localStorage.getItem("token"))).then(
            (value) => {
              if (!value) {
                dispatch(logoutUser())
                navigate("/login")
              }
            }
          )
        })
      } catch (err) {
        console.log(err)
      }
    }
  }, [])

  const getCurrentWindow = () => {
    if (competitor) {
      switch (profileWindow) {
        case "personal":
          return <InfoWindow competitor={competitor} />
        case "tournaments":
          return (
            <CompetitorTournamentsList
              organizer={competitor.mode === "organizer"}
              competitorId={competitor.id}
            />
          )
        case "leagues":
          return <LeaguesWindow competitor={competitor} />
        case "messages":
          return <MessagesWindow competitor={competitor} />
      }
    } else {
      return <div>NOT FOUND</div>
    }
  }

  competitor?.birthdate &&
    console.log(todayIsBirthdate(competitor.birthdate.toString()))

  if (loading) return <Loader />

  return (
    <div>
      {competitor && (
        <div className="mx-auto w-11/12 py-10">
          <div className="flex w-full items-center justify-between px-4 md:px-10">
            <HText>
              {competitor.birthdate &&
              todayIsBirthdate(competitor.birthdate.toString())
                ? "С днем рождения, "
                : `Добро пожаловать, `}
              {competitor?.first_name + " " + competitor?.last_name}
              {!competitor.verified && (
                <div className="pt-1 text-sm font-medium text-secondary-500">
                  * Ссылка для подтверждения аккаунта направлена на E-mail
                </div>
              )}
            </HText>

            <div className="hidden items-center gap-4 text-lg text-gray-700 md:flex">
              <div className="cursor-default rounded-full bg-secondary-500  py-2 px-5 text-lg font-black text-gray-700 shadow-md transition md:text-xl">
                {competitor?.elo_rating}
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between gap-4 py-5">
            <div className="hidden rounded-xl md:block md:w-1/5 ">
              <SideBarMenu
                disabled={!competitor.verified}
                classname="w-full py-3"
                items={sidebarItems}
              />
            </div>
            <div className="w-full rounded-xl shadow-md md:w-4/5">
              <div className="py-2 px-5">
                <div className="">{getCurrentWindow()}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfilePage
