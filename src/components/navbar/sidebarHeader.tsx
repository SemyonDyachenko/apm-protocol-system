import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"
import { NavLink } from "."

type Props = {
  navLinks: Array<NavLink>
  sidebarOpened: boolean
  openSidebar: (val: boolean) => void
}

const SideBarHeader = ({ sidebarOpened, openSidebar, navLinks }: Props) => {
  return (
    <div
      className={`${
        sidebarOpened ? "" : "hidden -translate-x-[500px]"
      } fixed right-0 top-0 z-40  h-screen w-[280px]  bg-gray-700 p-4 transition`}
    >
      <div className="flex items-center justify-between px-2 text-lg font-medium text-white">
        <div>
          <FontAwesomeIcon
            className="cursor-pointer transition hover:text-secondary-500"
            onClick={() => openSidebar(false)}
            icon={faCircleXmark}
          />
        </div>
        <div className="rounded-lg bg-secondary-500 px-3 py-1 text-sm transition hover:bg-secondary-600 active:-translate-y-1">
          <Link className="text-gray-700 hover:text-gray-700" to="/profile">
            Профиль
          </Link>
        </div>
      </div>
      <div className="py-4 px-2 text-white">
        <ul className="flex flex-col gap-2 py-4">
          {navLinks.map((item, index) => (
            <li key={index}>
              <Link
                className={`font-medium ${
                  item.path === location.pathname && "text-secondary-400"
                } ${
                  !item.disabled
                    ? "transition hover:text-secondary-400"
                    : "link-disabled text-gray-400 hover:text-gray-disabled"
                }   `}
                to={item.path}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SideBarHeader
