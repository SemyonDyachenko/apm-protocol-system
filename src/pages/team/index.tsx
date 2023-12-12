import {
  faCheck,
  faHome,
  faImage,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from "react"
import Logo from "/assets/loggo.png"
import UpBanner from "@/components/upbanner"
import SideBarMenu from "@/components/sidebarMenu"
import { sidebarItemData } from "@/components/sidebarMenu/sidebarItem"
import TeamInformationPage from "./informationPage"
import { useParams } from "react-router-dom"
import { teamAPI } from "@/services/teamService"
import PageNotFound from "../404/PageNotFound"
import Loader from "@/components/loader"
import { useAppSelector } from "@/hooks/redux"

type Props = {}

const items: Array<sidebarItemData> = [
  {
    children: "Главная",
    selected: true,
    onClick: () => {},
    icon: faHome,
  },
  {
    children: "Участники",
    selected: true,
    onClick: () => {},
    icon: faUser,
  },
  {
    children: "Галерея",
    selected: true,
    onClick: () => {},
    icon: faImage,
  },
]

const TeamPage = (props: Props) => {
  const { teamId } = useParams()
  const { data: team, isLoading } = teamAPI.useFetchTeamQuery(
    parseInt(teamId?.valueOf() || "")
  )

  const { competitor, loading } = useAppSelector((state) => state.competitors)

  if (isLoading) return <Loader />

  if (team) {
    return (
      <div className="mx-auto w-11/12">
        <div>
          <UpBanner
            disabledButton={false}
            editingButton={competitor?.id === team.organizer}
            league={false}
            onChangeName={() => {}}
            onCameraClick={() => {}}
            editing={false}
            rating={0}
            editingLink="team"
            logo={team.logo}
            banner={team.banner}
            name={team.name}
            targetId={team.id}
          />
        </div>
        <div className="flex w-full justify-between py-4">
          <div className="hidden w-2/12 md:block">
            <SideBarMenu classname="" items={items} />
          </div>
          <div className="w-full rounded-lg px-4 py-2 shadow-md md:min-h-[500px] md:w-9/12">
            <TeamInformationPage team={team} />
          </div>
        </div>
      </div>
    )
  } else {
    return <PageNotFound />
  }
}

export default TeamPage
