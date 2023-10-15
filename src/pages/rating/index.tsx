import { competitorAPI } from "@/services/competitorService"
import { Table } from "react-bootstrap"
import getUnicodeFlagIcon from "country-flag-icons/unicode"
import { Link } from "react-router-dom"
import Input from "react-select/dist/declarations/src/components/Input"
import CompetitorListNode from "./ListNode"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FilterBar from "@/components/filterBar"

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
    <div className="mx-auto flex w-11/12 justify-between py-8 px-2">
      {/* filter bar */}
      <FilterBar />
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
          <div className=" my-4 max-h-[600px] ">
            {competitors?.map((competitor) => (
              <Link to={`competitor/${competitor.id}`}>
                <CompetitorListNode data={competitor} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RatingList
