import {
  faChevronDown,
  faClose,
  faSearch,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Checkbox from "../UI/Checkbox"
import { FilterItem } from "./items"

type Props = {
  className?: string
  searchString: string
  setSearchString: (val: string) => void
  countryItems?: Array<FilterItem>
  genderFilter: boolean
  setData?: ([]: any) => void
  hand?: boolean
  children?: React.ReactNode
}

const FilterBar = ({
  searchString,
  setSearchString,
  className,
  countryItems,
  genderFilter,
  setData,
  hand,
  children,
}: Props) => {
  const [menCheck, setMenCheck] = useState(true)
  const [womenCheck, setWomenCheck] = useState(true)
  const [rightHand, setRightHand] = useState(true)
  const [leftHand, setLeftHand] = useState(true)

  useEffect(() => {
    if (setData) setData([menCheck, womenCheck, rightHand, leftHand])
  }, [menCheck, womenCheck, rightHand, leftHand])

  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className={` md:min-w-[300px] ${className}`}>
        <div className=" mr-4  rounded-[10px]  bg-white p-4 shadow-sm">
          <div>
            <div className="flex cursor-pointer items-center justify-between">
              <div className="text-md font-semibold text-gray-700">Поиск</div>
              <div>
                <FontAwesomeIcon className="text-sm" icon={faChevronDown} />
              </div>
            </div>
            <div className="flex items-center  gap-3 py-3">
              <div className="w-2/3">
                <input
                  value={searchString}
                  onChange={(e) => setSearchString(e.target.value)}
                  type="text"
                  placeholder="Поиск"
                  className="w-full rounded-lg border-2  border-gray-400 bg-gray-70 p-3 py-1 text-sm font-medium text-gray-700 outline-none transition focus:border-gray-600"
                />
              </div>
              <div>
                <FontAwesomeIcon
                  className="cursor-default text-secondary-500"
                  icon={faSearch}
                />
              </div>
            </div>
          </div>
          {hand && (
            <div className="mt-3">
              <div className="flex cursor-pointer items-center justify-between">
                <div className="text-md font-semibold text-gray-700">Рука</div>
                <div>
                  <FontAwesomeIcon className="text-sm" icon={faChevronDown} />
                </div>
              </div>
              <div className="py-3">
                <div className="flex items-center gap-x-2">
                  <div className="pt-1">
                    <Checkbox
                      isChecked={rightHand}
                      changeState={setRightHand}
                      className=""
                    />
                  </div>
                  <div className="text-md font-medium text-gray-700">
                    Правая
                  </div>
                </div>
                <div className="flex items-center gap-x-2 pt-2">
                  <div className="pt-1">
                    <Checkbox
                      isChecked={leftHand}
                      changeState={setLeftHand}
                      className=""
                    />
                  </div>
                  <div className="text-md font-medium text-gray-700">Левая</div>
                </div>
              </div>
            </div>
          )}

          {children}
          {genderFilter && (
            <div className="mt-3">
              <div className="flex cursor-pointer items-center justify-between">
                <div className="text-lg font-semibold text-gray-700">Пол</div>
                <div>
                  <FontAwesomeIcon className="text-sm" icon={faChevronDown} />
                </div>
              </div>
              <div className="py-3">
                <div className="flex items-center gap-2 ">
                  <div>
                    <Checkbox
                      isChecked={menCheck}
                      changeState={setMenCheck}
                      className="mt-1"
                    />
                  </div>
                  <div className="text-md font-medium text-gray-700">
                    Мужской
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <div>
                    <Checkbox
                      isChecked={womenCheck}
                      changeState={setWomenCheck}
                      className="mt-1"
                    />
                  </div>
                  <div className="text-md font-medium text-gray-700 ">
                    Женский
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default FilterBar
