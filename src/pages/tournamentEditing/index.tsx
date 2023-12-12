import ActionButton from "@/components/UI/Button"
import SideBarMenu from "@/components/sidebarMenu"
import { sidebarItemData } from "@/components/sidebarMenu/sidebarItem"
import UpBanner from "@/components/upbanner"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { getCompetitorFullname } from "@/models/Competitor"
import { competitorAPI } from "@/services/competitorService"
import { leagueAPI } from "@/services/leaugeService"
import { tournamentAPI } from "@/services/tournamentsService"
import { weightClassAPI } from "@/services/weightClassService"
import { createTournamentNotification } from "@/store/actions/notificationAction"
import {
  updateTournament,
  updateTournamentImages,
} from "@/store/actions/tournamentAction"
import { faCheck, faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import PageNotFound from "../404/PageNotFound"
import Loader from "@/components/loader"
import CategoryModal from "@/components/modals/categoryModal"

type Props = {}

const menuItems: Array<sidebarItemData> = [
  {
    children: "Главная",
    onClick: () => {},
    disabled: false,
    selected: true,
    icon: faHome,
  },
]

const TournamentEditingPage = (props: Props) => {
  const dispatch = useAppDispatch()
  const { tournamentId } = useParams()

  const { competitor, loading, error } = useAppSelector(
    (state) => state.competitors
  )

  const { data: tournament, isLoading } = tournamentAPI.useFetchTournamentQuery(
    Number(tournamentId)
  )

  const inputStyle = "bg-gray-200 rounded-lg py-2 px-4 outline-none w-[240px]"

  const { data: competitors } = competitorAPI.useFetchAllCompetitorQuery(100)
  const { data: leagues } = leagueAPI.useFetchAllLeaguesQuery(15)
  const { data: weightclasses } = weightClassAPI.useFetchWeightClassesQuery(100)

  const [categoryWindow, setCategoryWindow] = useState(false)

  const [afisha, setAfisha] = useState<any>()

  const [tournamentName, setTournamentName] = useState(tournament?.name)

  useEffect(() => {
    if (tournament) setTournamentName(tournament.name)
  }, [tournament])

  const { register, handleSubmit, getValues } = useForm()

  const updateImage = (type: string, image: any) => {
    let data = type === "banner" ? { banner: image } : { logo: image }
    if (tournament) {
      dispatch(updateTournamentImages(tournament.id, data)).then((res) =>
        window.location.reload()
      )
    }
  }

  const onSubmit = (data: any) => {
    if (tournament && leagues) {
      let league = leagues?.find(
        (item: any) => item.id === +getValues("league")
      )
      console.log(afisha)

      if (data) {
        dispatch(
          updateTournament(tournament.id, {
            name: tournamentName,
            afisha: afisha,
            ...data,
          })
        ).then((res) => {
          dispatch(
            createTournamentNotification({
              message: "Новый турнир",
              tournament: tournament.id,
              competitor: league ? +league.president : 0,
              datetime: new Date(),
              read: false,
            })
          ).then((res) => console.log(res))
          window.location.reload()
        })
      }
    }
  }

  if (isLoading || loading) return <Loader />

  if (competitor && tournament) {
    if (competitor.id !== tournament.organizer) {
      return <PageNotFound />
    }
  } else {
    return <PageNotFound />
  }

  if (tournament && competitor)
    return (
      <div className="mx-auto w-11/12">
        <UpBanner
          disabledButton={false}
          editingLink="tournaments"
          name={tournamentName}
          logo={tournament?.logo}
          editing={true}
          banner={tournament?.banner}
          onChangeName={setTournamentName}
          onClick={handleSubmit(onSubmit)}
          onCameraClick={updateImage}
          league
          rating={1.0}
        />
        <div className="flex w-full justify-between py-8">
          <div className="w-1/5">
            <SideBarMenu classname="w-full" items={menuItems} />
          </div>
          <div className="w-9/12 rounded-lg py-2 px-4 shadow-md">
            <div>
              <div className="w-full py-2">
                <div className="py-1 text-sm text-gray-400 ">Описание:</div>
                <div>
                  <textarea
                    defaultValue={tournament.description}
                    {...register("description")}
                    className="min-h-[150px] w-full rounded-lg bg-gray-200 px-4 py-3 outline-none"
                  ></textarea>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-y-4 pb-4 md:grid-cols-4">
                <div>
                  <div className="py-1 text-sm text-gray-400">Лига:</div>
                  <div>
                    {leagues && (
                      <select
                        className={`${inputStyle} border-r-8`}
                        defaultValue={tournament.league}
                        {...register("league")}
                      >
                        {leagues.map((element, index) => (
                          <option key={index} value={element.id}>
                            {element.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
                <div>
                  <div className="py-1 text-sm text-gray-400">
                    Дата проведения:
                  </div>
                  <div>
                    <input
                      defaultValue={tournament.date}
                      className={inputStyle}
                      type="date"
                      {...register("date")}
                    />
                  </div>
                </div>
                <div>
                  <div className="py-1 text-sm text-gray-400">Город:</div>
                  <div>
                    <input
                      defaultValue={tournament.location}
                      className={inputStyle}
                      type="text"
                      {...register("city")}
                    />
                  </div>
                </div>
                <div>
                  <div className="py-1 text-sm text-gray-400">Телефон:</div>
                  <div>
                    <input
                      defaultValue={tournament.phone}
                      className={inputStyle}
                      type="text"
                      {...register("phone")}
                    />
                  </div>
                </div>
                <div>
                  <div className="py-1 text-sm text-gray-400">Статус:</div>
                  <div>
                    <select
                      className={`${inputStyle} border-r-8`}
                      defaultValue={tournament.level}
                      {...register("level")}
                    >
                      <option value="pro">Профессиональный</option>
                      <option value="casual">Любительский</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div className="py-1 text-sm text-gray-400">Судья:</div>
                  <div>
                    {competitors && (
                      <select
                        defaultValue={tournament.main_referee}
                        className={`${inputStyle} border-r-8`}
                        {...register("judge")}
                      >
                        {competitors
                          .filter((item) => item.mode === "judge")
                          .map((competitor, index) => (
                            <option key={index} value={competitor.id}>
                              {getCompetitorFullname(competitor)}
                            </option>
                          ))}
                      </select>
                    )}
                  </div>
                </div>
                <div>
                  <div className="py-1 text-sm text-gray-400">Секретарь:</div>
                  <div>
                    {competitors && (
                      <select
                        defaultValue={tournament.main_secretary}
                        {...register("secretary")}
                        className={`${inputStyle} border-r-8`}
                      >
                        {competitors
                          .filter((item) => item.mode === "secretary")
                          .map((competitor, index) => (
                            <option key={index} value={competitor.id}>
                              {getCompetitorFullname(competitor)}
                            </option>
                          ))}
                      </select>
                    )}
                  </div>
                </div>
                <div>
                  <div className="py-1 text-sm text-gray-400">Афиша:</div>
                  <label>
                    <label className="w-full cursor-pointer rounded-lg bg-gray-700 px-4 py-2 font-medium text-white transition hover:bg-gray-600 ">
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={(e) => {
                          if (e.target.files) {
                            setAfisha(e.target.files[0])
                          }
                        }}
                        className="hover:bg-secondary-00 hidden w-full rounded-lg bg-secondary-500 py-2 shadow-md transition"
                      />
                      Загрузить
                    </label>
                  </label>
                </div>
                <div className="">
                  <div className="py-1 text-sm text-gray-400">
                    Весовые категории:
                  </div>
                  <ActionButton onClick={() => setCategoryWindow(true)}>
                    Указать категории
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CategoryModal
          dispatch={dispatch}
          tournament={tournament}
          active={categoryWindow}
          closeFunc={() => {
            setCategoryWindow(false)
            document.body.style.overflowY = "scroll"
          }}
        ></CategoryModal>
      </div>
    )
  else return <div></div>
}

export default TournamentEditingPage
