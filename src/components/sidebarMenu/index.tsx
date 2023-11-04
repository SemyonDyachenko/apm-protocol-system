import { Link } from "react-router-dom"
import SideBarItem, { sidebarItemData } from "./sidebarItem"
import { useEffect, useCallback, useState } from "react"
import { motion } from "framer-motion"

type Props = {
  classname: string
  items: Array<sidebarItemData>
}

const SideBarMenu = ({ classname, items }: Props) => {
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (selected !== null) {
      items[selected].onClick()
    }
  }, [selected])

  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      whileInView={{ opacity: 1 }}
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
                  setSelected(index)
                }}
                icon={element.icon}
                selected={selected === index}
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
