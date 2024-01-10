import {
  faCheck,
  faHome,
  faImage,
  faMessage,
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
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import TeamCompetitors from "./competitorsPage"
import { followTeam } from "@/store/actions/teamAction"
import ErrorModal from "@/components/modals/errorModal"
import TeamMessages from "./messagesPage"

type Props = {}

const TeamPage = (props: Props) => {
  const dispatch = useAppDispatch()
  const { teamId } = useParams()
  const { data: team, isLoading } = teamAPI.useFetchTeamQuery(
    parseInt(teamId?.valueOf() || "")
  )

  const [targetWindow, setWindow] = useState("general")
  const [error, setError] = useState(false)

  const items: Array<sidebarItemData> = [
    {
      children: "Главная",
      selected: true,
      onClick: () => setWindow("general"),
      icon: faHome,
    },
    {
      children: "Участники",
      selected: true,
      onClick: () => setWindow("competitors"),
      icon: faUser,
    },
    {
      children: "Галерея",
      selected: true,
      onClick: () => {},
      icon: faImage,
    },
  ]

  const { competitor, loading } = useAppSelector((state) => state.competitors)
  const { data: competitors } = teamAPI.useFetchTeamCompetitorsQuery(
    team?.id || 0
  )

  if (team && competitor) {
    if (team.organizer === competitor.id) {
      items.push({
        onClick: () => setWindow("messages"),
        children: "Сообщения",
        icon: faMessage,
      })
    }
  }

  const action = () => {
    if (competitor && team) {
      dispatch(followTeam(team.id, competitor.id)).then((res) => {
        if (res) {
          if (res.status === 200 || res.status === 201) {
            window.location.reload()
          } else {
            setError(true)
          }
        } else {
          setError(true)
        }
      })
    }
  }

  const checkMembership = () => {
    if (competitors && competitor && team) {
      let filtered = competitors.filter(
        (item) =>
          item.team.id === team.id && item.competitor.id === competitor.id
      )
      if (filtered.length > 0) return filtered[0].status
    }
    return false
  }

  if (isLoading) return <Loader />

  const getWindow = () => {
    if (team) {
      switch (targetWindow) {
        case "general":
          return <TeamInformationPage team={team} />
          break
        case "competitors":
          return <TeamCompetitors competitors={competitors} team={team} />
        case "messages":
          return <TeamMessages competitors={competitors} team={team} />
      }
    }
  }

  if (team) {
    return (
      <div className="mx-auto w-11/12">
        <div>
          <UpBanner
            disabledButton={checkMembership()}
            editingButton={competitor?.id === team.organizer}
            league={false}
            onChangeName={() => {}}
            onCameraClick={() => {}}
            editing={false}
            rating={0}
            onClick={action}
            editingLink="team"
            logo={team.logo}
            banner={team.banner}
            name={team.name}
            targetId={team.id}
          />
        </div>
        <div className="w-full justify-between py-4 md:flex">
          <div className="w-full md:w-2/12">
            <SideBarMenu classname="" items={items} />
          </div>
          <div className="mb-[70px] w-full rounded-lg px-[5px] py-2 md:mb-[0px] md:min-h-[500px] md:w-9/12 md:px-[25px] md:shadow-md">
            {getWindow()}
          </div>
        </div>
        <ErrorModal active={error} closeFunc={() => setError(false)} />
      </div>
    )
  } else {
    return <PageNotFound />
  }
}

export default TeamPage
