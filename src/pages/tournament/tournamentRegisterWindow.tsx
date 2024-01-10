import Checkbox from "@/components/UI/Checkbox"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import WeightClass, { TournamentWeightClass } from "@/models/WeightClass"
import { teamAPI } from "@/services/teamService"
import { refreshLogin } from "@/store/actions/authAction"
import { getCompetitorData } from "@/store/actions/competitorAction"
import {
  TournamentRegistrationData,
  getTournamentWeightClasses,
  registerForTournament,
} from "@/store/actions/tournamentAction"
import { CompetitorData } from "@/store/slices/competitorSlice"
import { faCircleCheck, faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Link } from "react-router-dom"

type Props = {
  closeFunc: () => void
  opened: boolean
  tournamentId?: number
  weightClasses: TournamentWeightClass[]
  competitor: CompetitorData
}

const TournamentRegisterWindow = ({
  tournamentId,
  opened,
  closeFunc,
  weightClasses,
  competitor,
}: Props) => {
  const dispatch = useAppDispatch()

  const popupRef = useRef<HTMLDivElement | null>(null)

  const [category, setCategory] = useState("men")
  const [weightClass, setWeightClass] = useState(weightClasses[0].id)
  const [successRegister, setSuccessRegister] = useState(false)
  const [privacyChecked, setPrivacyChecked] = useState(false)

  const { data: competitorTeams } = teamAPI.useFetchCompetitorTeamsQuery(
    competitor.id
  )

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as HTMLElement)
      ) {
        closeFunc()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const register = () => {
    let data: TournamentRegistrationData = {
      competitor: (competitor && competitor.id) || -1,
      tournament: tournamentId || -1,
      weight_class: weightClass,
      category,
    }

    try {
      dispatch(registerForTournament(data)).then((response) => {
        if (response) {
          console.log(response)
          if (response.status === 201) {
            setSuccessRegister(true)
          }
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div
      className={`${
        !opened && "hidden"
      } fixed top-0 left-0 z-[10] h-[100%] w-screen overflow-hidden `}
    >
      <div className="z-[10] h-full w-screen bg-black opacity-40 "></div>
      <motion.div
        initial={{ opacity: 0.5 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        viewport={{ amount: 0.5 }}
        ref={popupRef}
      >
        <div className="absolute left-1/2 top-1/2 z-[50] h-screen w-screen -translate-y-1/2 -translate-x-1/2  bg-white pb-8  shadow-md md:h-auto md:w-[400px] md:rounded-2xl">
          <div className="flex w-full items-center justify-end py-2 px-4 pt-4">
            <FontAwesomeIcon
              onClick={closeFunc}
              className="cursor-pointer text-xl transition hover:text-secondary-500"
              icon={faClose}
            />
          </div>
          <div
            className={`${
              successRegister && "hidden"
            } w-full justify-center px-4`}
          >
            <div className="text-center text-xl font-semibold">
              Регистрация на турнир
            </div>
            <div className="mt-4 w-full">
              <div className="text-gray-400">Категория: </div>
              <select
                className="mt-1 w-full rounded-md border-r-8 bg-gray-200 p-1 py-3 text-lg outline-none md:py-2"
                defaultValue="men"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="men">Мужчины</option>
                <option value="women">Женщины</option>
                <option value="juniors21">Юниоры 21+</option>
                <option value="juniors18">Юниоры 18+</option>
                <option value="old">Ветераны</option>
              </select>
            </div>
            <div className="mt-2 w-full">
              <div className="text-gray-400">Весовая категория: </div>
              <select
                className="mt-1 w-full rounded-md border-r-8 bg-gray-200 px-1 py-3 text-lg outline-none md:py-2"
                defaultValue={0}
                onChange={(e) => setWeightClass(+e.target.value)}
              >
                {weightClasses
                  .filter((item) => item.category === category)
                  .map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.weight_class.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mt-2 w-full">
              <div className="text-gray-400">Команда:</div>
              <select
                className="mt-1 w-full rounded-md border-r-8 bg-gray-200 px-1 py-3 text-lg outline-none md:py-2"
                defaultValue="Категория"
              >
                <option value={-1}>Отсутствует</option>
                {competitorTeams?.map((item, index) => (
                  <option key={index} value={item.team.id}>
                    {item.team.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-start gap-1 py-3">
              <div>
                <Checkbox
                  changeState={setPrivacyChecked}
                  isChecked={privacyChecked}
                  className=""
                />
              </div>
              <div className="text-sm">
                Согласен с{" "}
                <Link
                  className="gap-2 text-secondary-500 transition hover:text-secondary-400 hover:underline"
                  to="/"
                >
                  условиями проведения
                </Link>{" "}
                турнира
              </div>
            </div>
            <div>
              <button
                disabled={!privacyChecked}
                onClick={() => register()}
                className="w-full rounded-lg bg-secondary-500 px-4 py-2 font-medium transition hover:bg-secondary-600 disabled:bg-gray-400"
              >
                Отправить
              </button>
            </div>
          </div>
          <div
            className={`${
              !successRegister && "hidden"
            } w-full justify-center text-center`}
          >
            <motion.div
              initial={{ opacity: 0.3 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ amount: 0.5 }}
            >
              <div className="w-full justify-center py-2 ">
                <FontAwesomeIcon
                  className="text-5xl text-secondary-500"
                  icon={faCircleCheck}
                />
              </div>
              <div className="py-3 font-medium">
                Вы зарегестрированы на турнир
              </div>
              <div>
                <button
                  onClick={() => {
                    closeFunc()
                    window.location.reload()
                  }}
                  className=" my-4 rounded-xl bg-secondary-500 px-8 py-2 text-lg font-medium shadow-md transition hover:bg-secondary-600"
                >
                  Перейти к турниру
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default TournamentRegisterWindow
