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
          return createdTournaments?.filter((item) => !item.active)
      }
    }
  }

  const createTournament = () => {
    if (organizer)
      dispatch(createDefaultTournament(competitorId)).then((res) => {
        if (res) {
          if (res.status !== 201) {
            openErrorWindow(true)
          } else {
            navigate(`/tournaments/editing/${res.data.id}`)
          }
        } else {
          openErrorWindow(true)
        }
      })
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
        <div className={`${organizer ? "w-3/4" : "w-full"}`}>
          <UpMenuBar
            changeTarget={setTargetWindow}
            items={profileSettingsItems}
          />
        </div>
        {organizer && (
          <div className="w-1/4">
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

      <div className="pt-4">
        {getFilteredTournaments()?.map((element, index) => (
          <ListNode>
            {!element.active && element.organizer === competitorId && (
              <div
                className="cursor-pointer"
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
            <div className="text-md w-1/3 py-2 font-semibold">
              {element.name}
            </div>
            <div className="text-md font-medium">{element.location}</div>
            <div className="text-md font-medium">
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
                <button className="rounded-lg bg-secondary-500 px-4 py-1 text-sm font-medium transition hover:bg-secondary-600">
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
        closeFunc={() => setConfirmWindow(false)}
        text="Вы хотите создать новый турнир?"
        active={confirmWindow}
        action={createTournament}
      >
        <div className="flex w-full gap-2 pt-2 text-sm">
          <Checkbox className="" isChecked={true} changeState={() => {}} />
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
