import {
  IconDefinition,
  faColumns,
  faHome,
  faList,
  faNewspaper,
  faSearch,
  faUser,
  faVolleyball,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

type Props = {}

type MobileBarItem = {
  title: string
  icon: IconDefinition
  target: string
  disabled?: boolean
}

const items: Array<MobileBarItem> = [
  {
    title: "Главная",
    icon: faHome,
    target: "/",
  },
  {
    title: "Рейтинг",
    icon: faUser,
    target: "/rating",
  },
  {
    title: "Турниры",
    icon: faVolleyball,
    target: "/tournaments",
  },
  {
    title: "Лиги",
    icon: faColumns,
    target: "/leagues",
  },
  {
    title: "Новости",
    icon: faNewspaper,
    target: "/news",
    disabled: true,
  },
]

const MobileNavBar = (props: Props) => {
  const location = useLocation()
  return (
    <div
      className={`fixed left-0 bottom-0 z-[20]  h-[70px] w-full ${
        location.pathname === "/" ? "bg-gray-700" : "bg-white"
      } shadow-inner md:hidden`}
    >
      <div className="flex h-full items-center justify-between px-4 py-4">
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.target}
            className={`${
              !item.disabled
                ? "transition hover:text-secondary-400"
                : "link-disabled hover:text-gray-disabled"
            }  `}
          >
            <div
              className={`text-center ${
                location.pathname === item.target
                  ? "text-secondary-500"
                  : "text-gray-400"
              }`}
            >
              <FontAwesomeIcon className="text-lg" icon={item.icon} />
              <div className="text-[12px] ">{item.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MobileNavBar
