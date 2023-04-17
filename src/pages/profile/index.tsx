import HText from "@/components/UI/HText"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { refreshLogin } from "@/store/actions/authAction"
import { getCompetitorData } from "@/store/actions/competitorAction"
import {
  faHouse,
  faList,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import ProfileMenuItem from "./ProfileMenuItem"
import { Link } from "react-router-dom"
import PersonalInfoWindow from "./PersonalInfoWindow"
import CompetitorMatchList from "./CompetitorMatchList"

type Props = {}

const profileSettingsItems = [
  {
    title: "Основная информация",
    selected: true,
  },
  {
    title: "Безопасность",
    selected: false,
  },

  {
    title: "Уведомления",
    selected: false,
  },
  {
    title: "Дополнительно",
    selected: false,
  },
]

const ProfilePage = (props: Props) => {
  const dispatch = useAppDispatch()
  const { competitor, loading, error } = useAppSelector(
    (state) => state.competitors
  )
  const [profileWindow, setProfileWindow] = useState("personal")

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.replace("/login")
    } else {
      try {
        dispatch(refreshLogin()).then(() => {
          dispatch(getCompetitorData(localStorage.getItem("token")))
        })
      } catch (err) {
        console.log(err)
      }
    }
  }, [])

  return (
    <div>
      {competitor && (
        <div className="px-20 py-10">
          <div className="flex items-center justify-between pr-10">
            <HText>
              Добро пожаловать,{" "}
              {competitor?.first_name + " " + competitor?.last_name}
            </HText>
            <div className="flex items-center gap-4 text-lg text-gray-700">
              <div className="cursor-default rounded-full bg-secondary-400 px-5 py-2 text-lg font-bold text-white shadow-md transition">
                {competitor?.elo_rating}
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between gap-4 py-5">
            <div className="w-1/5 rounded-xl shadow-md  shadow-teal-100">
              <div className="w-full py-3">
                <ProfileMenuItem
                  onClick={() => {
                    setProfileWindow("personal")
                  }}
                  icon={faHouse}
                  selected
                >
                  Профиль
                </ProfileMenuItem>
                <ProfileMenuItem
                  onClick={() => {
                    setProfileWindow("matches")
                  }}
                  icon={faList}
                >
                  Матчи
                </ProfileMenuItem>
                <Link to="/logout" className="hover:text-gray-300">
                  <ProfileMenuItem icon={faRightFromBracket}>
                    Выйти
                  </ProfileMenuItem>
                </Link>
              </div>
            </div>
            <div className="w-4/5 rounded-xl shadow-md shadow-teal-100">
              <div className="py-2 px-5">
                <div className="flex items-center gap-8">
                  {profileSettingsItems.map((element, index) => (
                    <div className="py-3">
                      <button
                        key={index}
                        className={`${
                          element.selected
                            ? "rounded-lg border-2 border-secondary-400 text-secondary-400"
                            : "text-gray-300"
                        } text-md px-3 py-2  transition hover:text-secondary-400
                    `}
                      >
                        {element.title}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="h-[0.5px] w-full bg-gray-100"></div>
                <div className="pt-4">
                  {profileWindow === "personal" ? (
                    <PersonalInfoWindow competitor={competitor} />
                  ) : (
                    <CompetitorMatchList
                      competitorId={competitor.id?.valueOf() | 0}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfilePage
