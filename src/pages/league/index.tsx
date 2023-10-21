import SideBarMenu from "@/components/sidebarMenu"
import { sidebarItemData } from "@/components/sidebarMenu/sidebarItem"

import { faHome } from "@fortawesome/free-solid-svg-icons"
import React from "react"

type Props = {}

const LeaguePage = (props: Props) => {
  let menuItems: Array<sidebarItemData> = [
    {
      onClick: () => {},
      children: "Главная",
      selected: true,
      icon: faHome,
    },
    {
      onClick: () => {},
      children: "Участники",
      selected: false,
      icon: faHome,
    },
  ]

  return (
    <div className="mx-auto w-11/12">
      <div>
        <img src={"assets/landing/gallery/gallery1.png"} />
      </div>
      <div>
        <SideBarMenu classname="w-1/5" items={menuItems} />
      </div>
    </div>
  )
}

export default LeaguePage
