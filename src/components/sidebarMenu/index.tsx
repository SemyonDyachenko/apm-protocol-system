import { Link } from "react-router-dom"
import SideBarItem, { sidebarItemData } from "./sidebarItem"
import { useEffect, useCallback, useState } from "react"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

type Props = {
  classname: string
  items: Array<sidebarItemData>
  disabled?: boolean
}

const SideBarMenu = ({ classname, items, disabled }: Props) => {
  const [selected, setSelected] = useState(0)
  const [listHidden, setListHidden] = useState(true)

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
      <div className={`${classname} hidden md:block`}>
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
      <div className="z-[20] px-4 pb-2  md:hidden">
        <div
          onClick={() => setListHidden(!listHidden)}
          className="flex cursor-pointer items-center gap-3"
        >
          <div className="flex items-center gap-2 text-xl font-semibold">
            <div>
              <FontAwesomeIcon icon={items[selected].icon} />
            </div>
            <div>{items[selected].children}</div>
          </div>
          <div>
            <FontAwesomeIcon
              className="text-xl font-medium text-secondary-500"
              icon={faChevronDown}
            />
          </div>
        </div>
        <motion.div
          hidden={listHidden}
          className="absolute my-2 rounded-lg bg-white px-4 py-2 shadow-sm"
          initial={{ height: 0 }}
          whileInView={{ height: "auto" }}
          transition={{ delay: 0.1 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          {items.map((item, index) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: false, amount: 0.5 }}
              onClick={() => {
                if (!item.disabled) setSelected(index)
                setListHidden(true)
              }}
              className="my-3 flex items-center gap-2 font-medium text-gray-400"
              key={index}
            >
              {item.link ? (
                <Link to={item.link} className="flex items-center gap-2">
                  <FontAwesomeIcon icon={item.icon} />
                  {item.children}
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={item.icon} />
                  {item.children}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default SideBarMenu
