import { faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import React from "react"
import Checkbox from "../UI/Checkbox"

type Props = {}

const FilterBar = (props: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="md:min-w-[300px]">
        <div className=" mr-4  rounded-[10px]  bg-white p-4 shadow-md">
          <div>
            <div className="flex cursor-pointer items-center justify-between">
              <div className="text-md font-semibold text-gray-700">Поиск</div>
              <div>
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
            <div className="flex items-center  gap-3 py-3">
              <div className="w-2/3">
                <input
                  type="text"
                  placeholder="Введите имя"
                  className="w-full rounded-lg border-2 border-gray-400 bg-gray-70 p-3 py-1 text-sm font-medium text-gray-700 outline-none"
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
          <div className="mt-3">
            <div className="flex cursor-pointer items-center justify-between">
              <div className="text-md font-semibold text-gray-700">Рука</div>
              <div>
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
            <div className="py-3">
              <div className="flex items-center gap-x-2">
                <div className="pt-1">
                  <Checkbox className="" />
                </div>
                <div className="text-md font-medium text-gray-700">Правая</div>
              </div>
              <div className="flex items-center gap-x-2 pt-2">
                <div className="pt-1">
                  <Checkbox className="" />
                </div>
                <div className="text-md font-medium text-gray-700">Левая</div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex cursor-pointer items-center justify-between">
              <div className="text-md font-semibold text-gray-700">Страна</div>
              <div>
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
            <div className="py-3">
              <div className="flex items-center gap-2">
                <div>
                  <input className="" type="checkbox" />
                </div>
                <div className="text-md font-medium text-gray-700">Россия</div>
              </div>
              <div className="flex items-center gap-2 pt-3">
                <div>
                  <input className="" type="checkbox" />
                </div>
                <div className="text-md font-medium text-gray-700">
                  Беларусь
                </div>
              </div>
              <div className="flex items-center gap-2 pt-3">
                <div>
                  <input className="" type="checkbox" />
                </div>
                <div className="text-md font-medium text-gray-700">Польша</div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex cursor-pointer items-center justify-between">
              <div className="text-lg font-semibold text-gray-700">Пол</div>
              <div>
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
            <div className="py-3">
              <div className="flex items-center gap-2 ">
                <div>
                  <input className="" type="checkbox" />
                </div>
                <div className="text-md font-medium text-gray-700">Мужской</div>
              </div>
              <div className="flex items-center gap-2 pt-3">
                <div>
                  <input className="" type="checkbox" />
                </div>
                <div className="text-md font-medium text-gray-700">Женский</div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex cursor-pointer items-center justify-between">
              <div className="text-lg font-semibold text-gray-700">Вес</div>
              <div>
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
            <div className="py-3">
              <div className="flex items-center gap-2 ">
                <div>
                  <input className="" type="checkbox" />
                </div>
                <div className="text-md font-medium text-gray-700">95 кг</div>
              </div>
              <div className="flex items-center gap-2 pt-3">
                <div>
                  <input className="" type="checkbox" />
                </div>
                <div className="text-md font-medium text-gray-700">85 кг</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default FilterBar
