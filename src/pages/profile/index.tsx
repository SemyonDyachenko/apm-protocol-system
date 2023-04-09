import HText from "@/components/UI/HText"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { refreshLogin } from "@/store/actions/authAction"
import { getCompetitorData } from "@/store/actions/competitorAction"
import { useEffect } from "react"

type Props = {}

const ProfilePage = (props: Props) => {
  const dispatch = useAppDispatch()
  const { competitor, loading, error } = useAppSelector(
    (state) => state.competitors
  )

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.replace("/login")
    } else {
      try {
        dispatch(refreshLogin()).then(() => {
          dispatch(getCompetitorData(localStorage.getItem("token")))
        })
        // dispatch(getCompetitorData(localStorage.getItem("token")))
      } catch (err) {
        console.log(err)
      }
    }
  }, [])

  const inputStyles =
    "bg-secondary-400 px-3 py-2 h-[45px] outline-none rounded-lg text-gray-600 shadow-md"

  return (
    <div>
      <div className="p-5">
        <div className="flex items-center justify-between pr-10">
          <HText>
            Добро пожаловать,{" "}
            {competitor?.first_name + " " + competitor?.last_name}
          </HText>
          <div className="flex items-center gap-4 text-lg text-gray-700">
            <div className="rounded-full bg-secondary-400 px-5 py-2 text-lg font-bold text-white shadow-md">
              {competitor?.elo_rating}
            </div>
          </div>
        </div>
        <div className="py-4">
          <div className="text-xl text-gray-700">Информация о вас</div>
          <div className="flex w-2/5 flex-wrap gap-2 py-3">
            <input
              className={inputStyles}
              value={competitor?.first_name}
            ></input>
            <input
              className={inputStyles}
              value={competitor?.last_name}
            ></input>
            <input className={inputStyles} value={competitor?.country}></input>
            <input className={inputStyles} value={competitor?.gender}></input>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
