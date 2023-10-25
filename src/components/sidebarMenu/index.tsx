import { Link } from "react-router-dom"
import SideBarItem, { sidebarItemData } from "./sidebarItem"
import { useReducer } from "react"

type Props = {
  classname: string
  items: Array<sidebarItemData>
}

const SideBarMenu = ({ classname, items }: Props) => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0)
  const selectItem = (item: sidebarItemData) => {
    items.map((element) => {
      if (element !== item) {
        if (element.selected) element.selected = false
      } else element.selected = true
    })
  }
  return (
    <div className={classname}>
      <div className="w-full py-3">
        {items.map((element, index) =>
          element.link ? (
            <Link key={index} to={element.link}>
              <SideBarItem
                onClick={() => {
                  element.onClick
                  selectItem(element)
                }}
                selected={element.selected}
                icon={element.icon}
              >
                {element.children}
              </SideBarItem>
            </Link>
          ) : (
            <SideBarItem
              key={index}
              onClick={() => {
                selectItem(element)
                element.onClick()
                forceUpdate()
              }}
              icon={element.icon}
              selected={element.selected}
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
