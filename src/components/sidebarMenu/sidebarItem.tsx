import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

export type sidebarItemData = {
  onClick: () => void
  selected: boolean
  icon: any
  children: React.ReactNode
  link?: string
}

type Props = sidebarItemData

const SideBarItem = ({ onClick, selected, icon, children }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`${
        selected && "border-r-4"
      } flex w-full cursor-pointer items-center gap-3 border-secondary-400 px-5 py-3
       text-gray-400 transition hover:border-r-4
        hover:bg-gray-200 hover:bg-opacity-25 hover:text-gray-700`}
    >
      <FontAwesomeIcon className="text-xl" icon={icon} />
      <div>{children}</div>
    </div>
  )
}

export default SideBarItem
