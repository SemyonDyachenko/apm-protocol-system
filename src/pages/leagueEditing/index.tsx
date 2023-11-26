import SideBarMenu from "@/components/sidebarMenu"
import { sidebarItemData } from "@/components/sidebarMenu/sidebarItem"
import UpBanner from "@/components/upbanner"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import Image from "/assets/banner.jpg"
import Logo from "/assets/loggo.png"
import { leagueAPI } from "@/services/leaugeService"
import { ColorRing } from "react-loader-spinner"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import PageNotFound from "../404/PageNotFound"
import { getCountries } from "react-phone-number-input"
import { getCountriesList } from "@/utils/dataUtils"
import { useForm } from "react-hook-form"
import { updateLeague, updateLeagueImages } from "@/store/actions/leagueActon"

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

const LeagueEditingPage = (props: Props) => {
  const dispatch = useAppDispatch()
  const { leagueId } = useParams()
  const inputStyle = "bg-gray-200 rounded-lg py-2 px-4 outline-none w-[240px]"

  const { competitor, loading, error } = useAppSelector(
    (state) => state.competitors
  )

  const { data: league, isLoading } = leagueAPI.useFetchLeagueQuery(
    Number(leagueId)
  )

  const [leagueName, setLeagueName] = useState("")

  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    if (league) {
      dispatch(updateLeague(league.id, { name: leagueName, ...data })).then(
        (res) => {
          if (res) {
            if (res.status === 200) {
              window.location.reload()
            } else {
            }
          }
        }
      )
    }
  }

  const updateImage = (type: string, image: any) => {
    let data = type === "banner" ? { banner: image } : { logo: image }
    if (league) {
      dispatch(updateLeagueImages(league?.id, data)).then((res) =>
        window.location.reload()
      )
    }
  }

  useEffect(() => {
    if (league) {
      setLeagueName(league.name)
    }
  }, [league])

  if (league) {
    if (competitor) {
      if (+league.president !== competitor.id) return <PageNotFound />
    } else {
      return <PageNotFound />
    }
  }

  if (isLoading || loading)
    return (
      <div className="flex items-center justify-center p-40">
        <ColorRing
          visible={true}
          height="120"
          width="120"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#FFC132", "#FFC132", "#FFC132", "#FFC132", "#FFC132"]}
        />
      </div>
    )

  if (league)
    return (
      <div className="mx-auto w-11/12">
        <UpBanner
          disabledButton={false}
          name={leagueName}
          logo={league.logo}
          editing={true}
          banner={league.banner}
          onChangeName={setLeagueName}
          onClick={handleSubmit(onSubmit)}
          onCameraClick={updateImage}
          league
          rating={1.0}
        />
        <div className="flex w-full justify-between py-8">
          <div className="w-1/5">
            <SideBarMenu classname="w-full" items={menuItems} />
          </div>
          <div className="w-9/12">
            <div className="min-h-[500px] rounded-lg py-2 px-4 shadow-md">
              <div>
                <div className="py-1 text-sm text-gray-400">Описание:</div>
                <div>
                  <textarea
                    className={`${inputStyle} min-h-[150px] w-full py-3`}
                    defaultValue={league.description}
                    {...register("description")}
                  ></textarea>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-y-4">
                <div>
                  <div className="py-1 text-sm text-gray-400">Телефон:</div>

                  <div>
                    <input
                      defaultValue={league.phone}
                      className={inputStyle}
                      type="number"
                      {...register("phone")}
                    />
                  </div>
                </div>
                <div>
                  <div className="py-1 text-sm text-gray-400">Почта:</div>

                  <div>
                    <input
                      defaultValue={league.email}
                      className={inputStyle}
                      type="email"
                      {...register("email")}
                    />
                  </div>
                </div>
                <div>
                  <div className="py-1 text-sm text-gray-400">
                    Дата создания:
                  </div>

                  <div>
                    <input
                      defaultValue={league.creation_date?.toString()}
                      className={inputStyle}
                      type="date"
                      {...register("creation_date")}
                    />
                  </div>
                </div>
                <div>
                  <div className="py-1 text-sm text-gray-400">Уровень:</div>

                  <div>
                    <select
                      defaultValue="pro"
                      {...register("level")}
                      className={`${inputStyle} border-r-4`}
                    >
                      <option value="pro">Профессиональная</option>
                      <option value="casual">Любительская</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div className="py-1 text-sm text-gray-400">Страна:</div>

                  <div>
                    <select
                      className={`${inputStyle} border-r-4`}
                      {...register("country")}
                    >
                      {getCountriesList().map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  else return <div></div>
}

export default LeagueEditingPage
