import { Link } from "react-router-dom"
import SideBarItem, { sidebarItemData } from "./sidebarItem"

type Props = {
  classname: string
  items: Array<sidebarItemData>
}

const SideBarMenu = ({ classname, items }: Props) => {
  return (
    <div className={classname}>
      <div className="w-full py-3">
        {items.map((element, index) =>
          element.link ? (
            <Link key={index} to={element.link}>
              <SideBarItem
                selected={element.selected}
                onClick={element.onClick}
                icon={element.icon}
              >
                {element.children}
              </SideBarItem>
            </Link>
          ) : (
            <SideBarItem
              key={index}
              selected={element.selected}
              onClick={element.onClick}
              icon={element.icon}
            >
              {element.children}
            </SideBarItem>
          )
        )}
      </div>
    </div>
  )
}

export default SideBarMenu
