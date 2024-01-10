import UpMenuBar from "@/components/upMenu/upMenuBar"
import { CompetitorData } from "@/store/slices/competitorSlice"
import { useEffect, useState } from "react"
import { teamsNavItems } from "./navItems"
import ActionButton from "@/components/UI/Button"
import ConfirmModal from "@/components/modals/confirmModal"
import CustomInput from "@/components/UI/Input"
import { useAppDispatch } from "@/hooks/redux"
import { createTeam, updateTeamImages } from "@/store/actions/teamAction"
import ErrorModal from "@/components/modals/errorModal"
import { Link, useNavigate } from "react-router-dom"
import { teamAPI } from "@/services/teamService"
import ListNode from "@/components/listNode"
import { getLeagueStatus } from "@/models/Team"
import { setCompetitorTeam } from "@/store/actions/competitorAction"

type Props = {
  competitor: CompetitorData
}

const TeamsWindow = ({ competitor }: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [target, setTarget] = useState(teamsNavItems[0].target)
  const [confirm, setConfirm] = useState(false)
  const [leagueName, setLeagueName] = useState("")
  const [error, setError] = useState(false)
  const [saveButtonHidden, setSaveButtonHidden] = useState(true)
  const [selectedTeam, setSelectedTeam] = useState(
    competitor.team ? competitor.team : 0
  )

  const { data: competitorTeams } = teamAPI.useFetchCompetitorTeamsQuery(
    competitor.id
  )
  const { data: organizedTeams } = teamAPI.useFetchOrganizedTeamsQuery(
    competitor.id
  )

  const getTeams = () => {
    if (target === "organizer") return organizedTeams
    else return competitorTeams?.map((item) => item.team)
  }

  const setTeam = () => {
    if (selectedTeam) {
      dispatch(setCompetitorTeam(competitor.id, selectedTeam)).then((res) => {
        if (res) {
          window.location.reload()
        }
      })
    }
  }

  const createTeamAction = () => {
    if (competitor) {
      if (leagueName.length >= 3) {
        dispatch(createTeam(competitor.id, leagueName)).then((res) => {
          if (res) {
            setConfirm(false)
            navigate(`/team/editing/${res.data.id}`)
            window.location.reload()
          } else {
            setConfirm(false)
            setError(true)
          }
        })
      }
    }
  }

  return (
    <div>
      <div className="flex items-end justify-between">
        <div className="w-full md:w-3/4">
          <UpMenuBar changeTarget={setTarget} items={teamsNavItems} />
        </div>
        <div className="hidden w-1/4 flex-wrap justify-end md:flex">
          <div className="mb-3">
            <ActionButton
              onClick={() => setConfirm(true)}
              className="font-semibold"
            >
              Создать команду
            </ActionButton>
          </div>
          <div className="h-[1px] w-full bg-gray-80"></div>
        </div>
      </div>
      <div className="items-center gap-x-3 pt-4 pb-2 md:flex">
        <div className="mb-[4px] text-sm text-gray-400 md:mb-[0px]">
          Команда в профиле:
        </div>
        <div>
          <select
            onChange={(e) => {
              setSelectedTeam(+e.target.value)
              setSaveButtonHidden(false)
            }}
            className="rounded-lg border-r-4 bg-gray-200 px-4 py-1 text-sm font-medium outline-none"
            value={selectedTeam}
          >
            {!competitor.team && (
              <option value={-1} className="font-medium">
                Нет
              </option>
            )}
            {competitorTeams?.map((item, index) => (
              <option value={item.team.id} className="font-medium" key={index}>
                {item.team.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            onClick={setTeam}
            hidden={saveButtonHidden}
            className="text-sm text-secondary-500 transition hover:text-secondary-400"
          >
            Сохранить
          </button>
        </div>
      </div>
      <div className="py-2">
        {getTeams()?.map((team, index) => (
          <ListNode key={index} classname="font-medium md:text-md text-sm">
            <div className="w-1/4 font-medium md:font-semibold">
              {team.name}
            </div>
            <div className="hidden w-1/4 md:block">{team.country}</div>
            <div className="hidden w-1/4 md:block">{getLeagueStatus(team)}</div>
            <div>
              <Link
                className="hover:text-gray-700"
                to={
                  target === "organizer"
                    ? `/team/editing/${team.id}`
                    : `/team/${team.id}`
                }
              >
                <button
                  className="rounded-lg bg-secondary-500 py-1 px-[8px] text-sm transition hover:bg-secondary-600 md:px-[25px]"
                  onClick={() => {}}
                >
                  Подробнее
                </button>
              </Link>
            </div>
          </ListNode>
        ))}
      </div>
      <ConfirmModal
        text="Вы хотите создать команду?"
        action={createTeamAction}
        active={confirm}
        closeFunc={() => setConfirm(false)}
      >
        <div className="w-full">
          <div className="py-1 text-sm text-gray-400">Название:</div>
          <CustomInput
            className="w-full py-2 font-medium"
            type="text"
            value={leagueName}
            onChange={setLeagueName}
          />
        </div>
      </ConfirmModal>
      <ErrorModal active={error} closeFunc={() => setError(false)} />
    </div>
  )
}

export default TeamsWindow
