import {
  faArrowDown,
  faBars,
  faCaretDown,
  faChevronDown,
  faFilter,
  faSearch,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import React, { useState } from "react"

type Props = {
  className: string
  searchString: string
  setSearchString: (val: string) => void
  children: React.ReactNode
}

const MobileFilterBar = ({
  searchString,
  setSearchString,
  className,
  children,
}: Props) => {
  const [opened, open] = useState(true)
  return (
    <div className={className}>
      <div className="mt-4 w-full px-2">
        <div className="flex w-full">
          <div className="w-full">
            <input
              className="text-md w-full rounded-l-lg bg-gray-80 px-4 py-3 text-gray-700 outline-none transition "
              value={searchString}
              placeholder="Поиск"
              onChange={(e) => setSearchString(e.target.value)}
            />
          </div>
          <div className="rounded-r-lg bg-secondary-500 py-3 px-4 font-medium">
            <FontAwesomeIcon
              className="text-lg font-medium text-white"
              icon={faSearch}
            />
          </div>
        </div>
      </div>
      <div className="px-2">
        <div
          onClick={() => open(!opened)}
          className={`mt-2 flex w-full items-center justify-center gap-4 ${
            !opened ? "rounded-t-lg" : "rounded-lg"
          }  bg-gray-80  py-2 text-lg`}
        >
          <div className="text-lg">
            <FontAwesomeIcon icon={faBars} />
          </div>
          <div className="text-sm font-semibold">Фильтры</div>
          <div className="text-sm text-secondary-500">
            <FontAwesomeIcon
              className={`${!opened && "rotate-180"} transition  delay-75`}
              icon={faCaretDown}
            />
          </div>
        </div>
        <motion.div
          hidden={opened}
          className="h-[100px] w-full rounded-b-lg bg-gray-80"
          initial={{ opacity: 0, height: 0 }}
          whileInView={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.25 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}

export default MobileFilterBar
