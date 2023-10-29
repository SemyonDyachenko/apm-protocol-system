import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import {
  TournamentRegistrationData,
  registerForTournament,
} from "@/store/actions/tournamentAction"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"

type Props = {
  closeFunc: () => void
  opened: boolean
  tournamentId?: number
}

const TournamentRegisterWindow = ({
  tournamentId,
  opened,
  closeFunc,
}: Props) => {
  const dispatch = useAppDispatch()
  const { competitor, loading, error } = useAppSelector(
    (state) => state.competitors
  )

  const register = () => {
    let data: TournamentRegistrationData = {
      competitor: (competitor && competitor.id) || -1,
      tournament: tournamentId || -1,
      weight_class: 1,
    }
    console.log(data)
    try {
      dispatch(registerForTournament(data)).then((response) =>
        console.log(response)
      )
    } catch (e) {
      console.log(error)
    }
  }

  return (
    <div
      className={`${
        !opened && "hidden"
      } fixed top-0 left-0 z-[10] h-[100%] w-screen overflow-hidden `}
    >
      <div className="z-[10] h-full w-screen bg-black opacity-40 "></div>
      <div className="absolute left-1/2 top-1/2 z-[50] h-auto -translate-y-1/2 -translate-x-1/2 rounded-2xl bg-white  pb-8 shadow-md md:w-[400px]">
        <div className="flex w-full items-center justify-end py-4 px-4">
          <FontAwesomeIcon
            onClick={closeFunc}
            className="cursor-pointer text-xl transition hover:text-secondary-500"
            icon={faClose}
          />
        </div>
        <div className="w-full justify-center px-4">
          <div className="text-center text-xl font-semibold">
            Регистрация на турнир
          </div>
          <div className="mt-4 w-full">
            <div className="text-gray-400">Категория: </div>
            <select
              className="mt-1 w-full rounded-md bg-gray-200 p-1 py-2 text-lg outline-none"
              defaultValue="Категория"
            >
              <option>Ветераны</option>
              <option>Юниоры 21+</option>
              <option>Юниоры 18+</option>
              <option>Женщины </option>
            </select>
          </div>
          <div className="mt-2 w-full">
            <div className="text-gray-400">Весовая категория: </div>
            <select
              className="mt-1 w-full rounded-md bg-gray-200 p-1 py-2 text-lg outline-none"
              defaultValue="Категория"
            >
              <option>85</option>
              <option>95</option>
              <option>75</option>
              <option>105</option>
            </select>
          </div>
          <div className="mt-2 w-full">
            <div className="text-gray-400">Команда: </div>
            <select
              className="mt-1 w-full rounded-md bg-gray-200 p-1 py-2 text-lg outline-none"
              defaultValue="Категория"
            >
              <option>Отсутствует</option>
              <option>APMTeam</option>
            </select>
          </div>
          <div className="flex items-start gap-2 py-3">
            <div>
              <input type="checkbox" checked={true} />
            </div>
            <div className="text-sm">
              Согласен с{" "}
              <Link className="gap-2 text-secondary-500" to="/">
                условиями проведения
              </Link>{" "}
              турнира
            </div>
          </div>
          <div>
            <button
              onClick={() => register()}
              className="w-full rounded-lg bg-secondary-500 px-4 py-2 font-medium transition hover:bg-secondary-600"
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TournamentRegisterWindow
