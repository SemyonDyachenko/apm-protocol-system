import { teamAPI } from "@/services/teamService"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import PageNotFound from "../404/PageNotFound"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import Loader from "@/components/loader"
import UpBanner from "@/components/upbanner"
import SideBarMenu from "@/components/sidebarMenu"
import { sidebarItemData } from "@/components/sidebarMenu/sidebarItem"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import CustomInput from "@/components/UI/Input"
import { getCountriesList } from "@/utils/dataUtils"
import { useForm } from "react-hook-form"
import { getLeagueStatus } from "@/models/Team"
import { updateTeam, updateTeamImages } from "@/store/actions/teamAction"
import ErrorModal from "@/components/modals/errorModal"
import { refreshLogin } from "@/store/actions/authAction"
import { getCompetitorData } from "@/store/actions/competitorAction"

type Props = {}

const items: Array<sidebarItemData> = [
  {
    children: "Главная",
    onClick: () => {},
    selected: true,
    icon: faHome,
  },
]

const TeamEditingPage = (props: Props) => {
  const { teamId } = useParams()
  const { data: team, isLoading } = teamAPI.useFetchTeamQuery(
    parseInt(teamId?.valueOf() || "")
  )

  const dispatch = useAppDispatch()
  const [name, setName] = useState("")
  const inputStyle = "bg-gray-200 rounded-lg py-2 px-4 outline-none w-[240px]"
  const [errorModal, setErrorModal] = useState(false)

  useEffect(() => {
    dispatch(refreshLogin()).then(() => {
      dispatch(getCompetitorData(localStorage.getItem("apm_protocols_token")))
    })
  }, [])

  const { competitor, loading } = useAppSelector((state) => state.competitors)

  const { register, handleSubmit } = useForm()

  const update = (data: any) => {
    if (team) {
      dispatch(updateTeam(team?.id, { name, ...data })).then((res) => {
        if (res) {
          if (res.status === 200) {
            window.location.reload()
          } else {
            setErrorModal(true)
          }
        } else {
          setErrorModal(true)
        }
      })
    }
  }

  const updateImage = (type: string, image: any) => {
    let data = type === "banner" ? { banner: image } : { logo: image }
    if (team) {
      dispatch(updateTeamImages(team.id, data)).then((res) =>
        // window.location.reload()
        {}
      )
    }
  }

  useEffect(() => {
    if (team) {
      setName(team.name)
    }
  }, [team])

  if (isLoading || loading) return <Loader />
  if (team && competitor) {
    if (team.organizer !== competitor.id) return <PageNotFound />
  }

  if (team && competitor)
    return (
      <div className="mx-auto w-11/12">
        <div>
          <UpBanner
            disabledButton={false}
            league={false}
            onChangeName={setName}
            onCameraClick={updateImage}
            editing={true}
            rating={0}
            editingLink="team"
            logo={team.logo}
            banner={team.banner}
            name={name}
            onClick={handleSubmit(update)}
          />
        </div>
        <div className="w-full justify-between py-4 md:flex">
          <div className="hidden md:block md:w-2/12">
            <SideBarMenu classname="" items={items} />
          </div>
          <div className="w-full rounded-lg p-4 shadow-sm md:w-9/12">
            <div className="w-full">
              <div className="py-1 text-sm text-gray-400">Описание:</div>
              <textarea
                {...register("description")}
                className="min-h-[100px] w-full rounded-lg border-2 bg-gray-200 py-3 px-4 outline-none focus:border-gray-400"
                defaultValue={team.description}
              ></textarea>
            </div>
            <div className="grid w-full gap-y-8 py-4 md:grid-cols-3">
              <div>
                <div className="py-1 text-sm text-gray-400">Страна:</div>

                <div>
                  <select
                    {...register("country")}
                    className={`${inputStyle} border-r-4`}
                  >
                    {getCountriesList().map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <div className="py-1 text-sm text-gray-400">Адрес/Город:</div>
                <input
                  {...register("location")}
                  defaultValue={team.location}
                  className={inputStyle}
                />
              </div>
              <div>
                <div className="py-1 text-sm text-gray-400">Статус:</div>
                <select
                  {...register("status")}
                  className={`${inputStyle} border-r-4`}
                  defaultValue={team.status}
                >
                  <option value="pro">Профессиональная</option>
                  <option value="casual">Любительская</option>
                </select>
              </div>
              <div>
                <div className="py-1 text-sm text-gray-400">Почта:</div>
                <input
                  {...register("email")}
                  type="email"
                  defaultValue={team.email}
                  className={inputStyle}
                />
              </div>
              <div>
                <div className="py-1 text-sm text-gray-400">
                  Номер телефона:
                </div>
                <input
                  {...register("phone")}
                  type="phone"
                  defaultValue={team.phone}
                  className={inputStyle}
                />
              </div>
            </div>
          </div>
        </div>
        <ErrorModal
          active={errorModal}
          closeFunc={() => setErrorModal(false)}
        />
      </div>
    )
  else return <PageNotFound />
}

export default TeamEditingPage
