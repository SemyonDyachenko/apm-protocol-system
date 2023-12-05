import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { notificationAPI } from "@/services/tournamentService"
import { refreshLogin } from "@/store/actions/authAction"
import { getCompetitorData } from "@/store/actions/competitorAction"
import { getNormalizeDate, getNormalizeDateTime } from "@/utils/date"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

type Props = {}

const NotificationBar = (props: Props) => {
  const dispatch = useAppDispatch()
  const { competitor, loading, error } = useAppSelector(
    (state) => state.competitors
  )
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    dispatch(refreshLogin()).then(() => {
      dispatch(getCompetitorData(localStorage.getItem("token")))
    })
  }, [])

  const { data: notifications } =
    notificationAPI.useFetchAllTournamentNotificationsQuery(competitor?.id || 0)

  const getUnreadNotifcationsCount = () => {
    if (notifications) {
      return notifications.filter((item) => !item.read).length
    }
    return 0
  }

  return (
    <div className="cursor-pointer px-2 text-lg text-white ">
      <div
        onClick={() => {
          getUnreadNotifcationsCount() > 0 && setHidden(!hidden)
        }}
      >
        {getUnreadNotifcationsCount() > 0 && (
          <div className="absolute flex h-[17px] w-[17px] -translate-y-[4px] translate-x-[6px] items-center justify-center rounded-full bg-secondary-500 p-[2px] text-[12px] font-bold text-gray-700">
            {getUnreadNotifcationsCount()}
          </div>
        )}
        <FontAwesomeIcon
          className="transition hover:text-secondary-500"
          icon={faBell}
        />
      </div>

      <div
        hidden={hidden}
        className={`absolute z-[10]  min-w-[300px] rounded-xl bg-gray-700 py-3 shadow-xl`}
      >
        {notifications
          ?.toReversed()
          .slice(0, 5)
          .map((notification, index) => (
            <div className="" key={index}>
              <div className="px-4">
                <div className="flex justify-end text-sm text-gray-400">
                  {getNormalizeDateTime(notification.datetime.toString())}
                </div>
                <div className="flex items-center justify-between py-1">
                  <div className="py-2 text-sm text-white">
                    {notification.message}
                  </div>
                  <div className="py-2 text-sm text-gray-700">
                    <Link
                      className="text-secondary-500 underline transition hover:text-secondary-400"
                      to="/profile"
                    >
                      Смотреть
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default NotificationBar
