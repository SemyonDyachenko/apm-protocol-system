import { competitorAPI } from "@/services/competitorService"
import { Table } from "react-bootstrap"
import getUnicodeFlagIcon from "country-flag-icons/unicode"
import { Link } from "react-router-dom"
import Input from "react-select/dist/declarations/src/components/Input"
import CompetitorListNode from "./ListNode"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type Props = {}

const competitorPropsList = [
  "№",
  "Спортсмен",
  "Пол",
  "Страна",
  "Звание",
  "Рейтинг",
]

const RatingList = (props: Props) => {
  const { data: competitors } = competitorAPI.useFetchAllCompetitorQuery(100)
  console.log(competitors)
  return (
    <div className="mx-auto flex w-11/12 justify-between pt-[150px]">
      {/* filter bar */}
      <div className="w-[280px]">
        <div className=" mr-4 min-h-screen rounded-[10px] border-2 border-gray-300 bg-white p-4">
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
      {/* main bar*/}
      <div className="w-9/12">
        {/* upper bar*/}
        <div className="">
          <div className="w-full rounded-[10px] border-2 border-gray-300 bg-white shadow-sm">
            <div className="flex items-center justify-between py-[10px] px-10">
              {competitorPropsList.map((element) => (
                <div className={`font-semibold text-gray-700 `} key={element}>
                  {element}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* competitors list*/}
        <div>
          <div className=" my-4 max-h-[600px] overflow-y-scroll">
            {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]).map(
              (element) => (
                <CompetitorListNode />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RatingList
