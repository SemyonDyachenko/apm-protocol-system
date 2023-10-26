import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

type Props = {}

const FilterBar = (props: Props) => {
  return (
    <div className="w-[350px]">
      <div className=" mr-4  rounded-[10px]  bg-white p-4 shadow-md">
        <div>
          <div className="flex cursor-pointer items-center justify-between">
            <div className="text-lg font-semibold text-gray-700">Рука</div>
            <div>
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
          </div>
          <div className="py-3">
            <div className="flex items-center gap-2 ">
              <div>
                <input className="" type="checkbox" />
              </div>
              <div className="text-md font-medium text-gray-700">Правая</div>
            </div>
            <div className="flex items-center gap-2 pt-3">
              <div>
                <input className="" type="checkbox" />
              </div>
              <div className="text-md font-medium text-gray-700">Левая</div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex cursor-pointer items-center justify-between">
            <div className="text-lg font-semibold text-gray-700">Страна</div>
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
              <div className="text-md font-medium text-gray-700">Беларусь</div>
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
  )
}

export default FilterBar
