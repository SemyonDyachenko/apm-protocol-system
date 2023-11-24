import { Link } from "react-router-dom"
import SideBarItem, { sidebarItemData } from "./sidebarItem"
import { useEffect, useCallback, useState } from "react"
import { motion } from "framer-motion"

type Props = {
  classname: string
  items: Array<sidebarItemData>
  disabled?: boolean
}

const SideBarMenu = ({ classname, items, disabled }: Props) => {
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (!disabled) {
      if (selected !== null) {
        if (!items[selected].disabled) items[selected].onClick()
      }
    }
  }, [selected])

  return (
    <motion.div
      initial={{ x: 50 }}
      whileInView={{ x: 0 }}
      transition={{ delay: 0.1 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className={classname}>
        <div className="w-full py-3">
          {items.map((element, index) =>
            element.link ? (
              <Link key={index} to={element.link}>
                <SideBarItem
                  onClick={() => {
                    element.onClick()
                  }}
                  selected={selected === index}
                  icon={element.icon}
                >
                  {element.children}
                </SideBarItem>
              </Link>
            ) : (
              <SideBarItem
                key={index}
                onClick={() => {
                  if (!element.disabled) setSelected(index)
                }}
                icon={element.icon}
                selected={selected === index}
                disabled={element.disabled}
              >
                {element.children}
              </SideBarItem>
            )
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default SideBarMenu
