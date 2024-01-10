import ListNode from "@/components/listNode"
import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import { useState } from "react"
import { tournamentAPI } from "@/services/tournamentsService"
import { getNormalizeDate } from "@/utils/date"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/hooks/redux"
import {
  createDefaultTournament,
  deleteTournament,
} from "@/store/actions/tournamentAction"
import ErrorModal from "@/components/modals/errorModal"
import ConfirmModal from "@/components/modals/confirmModal"
import Checkbox from "@/components/UI/Checkbox"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDeleteLeft, faTrash } from "@fortawesome/free-solid-svg-icons"
import { createTournamentNotification } from "@/store/actions/notificationAction"
import { leagueAPI } from "@/services/leaugeService"

type Props = {
  competitorId: number
  organizer: boolean
}

const profileSettingsItems: Array<upMenuItem> = [
  {
    title: "Актуальные",
    selected: true,
    target: "present",
  },
  {
    title: "Прошедшие",
    selected: false,
    target: "past",
  },
  {
    title: "Организатор",
    selected: false,
    target: "created",
  },
]

const CompetitorTournamentsList = ({ competitorId, organizer }: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { data: tournaments } =
    tournamentAPI.useFetchCompetitorTournamentsQuery(competitorId)
  const { data: createdTournaments } =
    tournamentAPI.useFetchOrganizedTournamentsQuery(competitorId)
  const [targetWindow, setTargetWindow] = useState("present")
  const [errorWindow, openErrorWindow] = useState(false)
  const [confirmWindow, setConfirmWindow] = useState(false)
  const [removeWindow, setRemoveWindow] = useState(false)
  const [targetTournament, setTargetTournament] = useState(-1)

  const [confirm, setConfirm] = useState(true)
  const [selectedLeague, setSelectedLeague] = useState(-1)

  const { data: competitorLeagues } =
    leagueAPI.useFetchCompetitorLeaguesQuery(competitorId)

  const getFilteredTournaments = () => {
    const date = new Date()
    if (tournaments) {
      switch (targetWindow) {
        case "present":
          return tournaments.filter(
            (item) => new Date(item.date).getTime() > date.getTime()
          )
        case "past":
          return tournaments.filter(
            (item) => new Date(item.date).getTime() < date.getTime()
          )
        case "created":
          return createdTournaments
            ?.slice()
            .sort((a, b) => (a.active === b.active ? 0 : a.active ? 1 : -1))
      }
    }
  }

  const createTournament = () => {
    if (organizer && selectedLeague !== -1)
      dispatch(createDefaultTournament(competitorId, selectedLeague)).then(
        (res) => {
          if (res) {
            if (res.status !== 201) {
              openErrorWindow(true)
            } else {
              navigate(`/tournaments/editing/${res.data.id}`)
            }
          } else {
            openErrorWindow(true)
          }
        }
      )
  }

  const removeTournament = () => {
    dispatch(deleteTournament(targetTournament)).then((res) => {
      setTargetTournament(-1)
      setRemoveWindow(false)
      window.location.reload()
    })
  }

  return (
    <div>
      <div className="flex items-end justify-between">
        <div className={`${organizer ? "w-full md:w-3/4" : "w-full"}`}>
          <UpMenuBar
            changeTarget={setTargetWindow}
            items={profileSettingsItems}
          />
        </div>
        {organizer && (
          <div className="hidden w-1/4 md:block">
            <div className="flex justify-end">
              <button
                onClick={() => setConfirmWindow(true)}
                className="mb-3 rounded-lg bg-secondary-500 py-2 px-4 font-semibold transition hover:bg-secondary-600"
              >
                Создать турнир
              </button>
            </div>
            <div className="h-[1px] w-full bg-gray-80"></div>
          </div>
        )}
      </div>

      <div className="md:text-md pt-4 text-sm">
        {getFilteredTournaments()?.map((element, index) => (
          <ListNode>
            {!element.active && element.organizer === competitorId && (
              <div
                className="w-1/4 cursor-pointer md:w-auto"
                onClick={() => {
                  setTargetTournament(element.id)
                  setRemoveWindow(true)
                }}
              >
                <FontAwesomeIcon
                  className="transition hover:text-secondary-500"
                  icon={faTrash}
                />
              </div>
            )}
            <div className="text-md w-2/3 py-2 font-medium md:w-1/3 md:font-semibold">
              {element.name}
            </div>
            <div className="text-md hidden w-1/6 font-medium md:block">
              {element.location}
            </div>
            <div className="text-md hidden w-1/6 font-medium md:block">
              {getNormalizeDate(element.date)}
            </div>
            <div>
              <Link
                className="hover:text-gray-700"
                to={`/tournaments/${!element.active ? "editing/" : ""}${
                  element.id
                }`}
                key={index}
              >
                <button className="rounded-lg bg-secondary-500 py-1 px-[8px] text-sm font-medium transition hover:bg-secondary-600 md:px-[25px]">
                  Подробнее
                </button>
              </Link>
            </div>
          </ListNode>
        ))}
      </div>
      <ErrorModal
        closeFunc={() => openErrorWindow(false)}
        active={errorWindow}
      />
      <ConfirmModal
        disabledButton={!confirm || selectedLeague === -1}
        closeFunc={() => setConfirmWindow(false)}
        text="Вы хотите создать новый турнир?"
        active={confirmWindow}
        action={createTournament}
      >
        <div className="my-2 w-full">
          <div className="my-1 text-sm text-gray-400">Лига:</div>
          <select
            defaultValue={competitorLeagues && competitorLeagues[0].league.id}
            onChange={(e) => setSelectedLeague(+e.target.value)}
            className="w-full rounded-lg border-r-8 bg-gray-200 py-2 px-4 font-medium outline-none"
          >
            <option value={-1} className="font-medium">
              Нет
            </option>
            {competitorLeagues?.map((item, index) => (
              <option
                value={item.league.id}
                key={index}
                className="font-medium"
              >
                {item.league.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-full gap-2 pt-2 text-sm">
          <Checkbox className="" isChecked={confirm} changeState={setConfirm} />
          <div className="-mt-1">
            Я ознакомился с{" "}
            <Link
              className="text-secondary-500 underline transition hover:text-secondary-400"
              to="/"
            >
              правилами создания и ведения турнира
            </Link>
          </div>
        </div>
      </ConfirmModal>
      <ConfirmModal
        closeFunc={() => setRemoveWindow(false)}
        text="Вы уверены, что хотите удалить турнир?"
        active={removeWindow}
        action={removeTournament}
      />
    </div>
  )
}

export default CompetitorTournamentsList
