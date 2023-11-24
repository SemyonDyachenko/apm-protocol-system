import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

export type sidebarItemData = {
  onClick: () => void
  selected?: boolean
  icon: any
  children: React.ReactNode
  link?: string
  disabled?: boolean
}

type Props = sidebarItemData

const SideBarItem = ({
  onClick,
  selected,
  icon,
  children,
  disabled,
}: Props) => {
  return (
    <div
      onClick={onClick}
      className={`${
        selected && "border-r-4 font-medium text-gray-700"
      } flex w-full cursor-pointer items-center gap-3 border-secondary-400 px-5 py-3
        transition ${!disabled && "hover:border-r-4"}
        hover:bg-gray-200 hover:bg-opacity-25 hover:text-gray-700 ${
          disabled ? "text-gray-200" : "text-gray-400"
        } `}
    >
      <FontAwesomeIcon className="text-xl" icon={icon} />
      <div>{children}</div>
    </div>
  )
}

export default SideBarItem
