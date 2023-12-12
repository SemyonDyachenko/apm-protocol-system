import { competitorAPI } from "@/services/competitorService"
import { Link } from "react-router-dom"
import CompetitorListNode from "./ListNode"
import FilterBar from "@/components/filterBar"
import PerfectScrollbar from "react-perfect-scrollbar"
import { useState } from "react"
import { Country, countryItems } from "@/components/filterBar/items"
import { useForm } from "react-hook-form"
import Checkbox from "@/components/UI/Checkbox"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
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
  const [search, setSearch] = useState("")
  const { data: competitors } = competitorAPI.useFetchAllCompetitorQuery(100)
  const [filterData, setFilterData] = useState([0])

  const [checkboxState, setCheckboxState] = useState<Record<Country, boolean>>({
    [Country.Russia]: true,
    [Country.Belarus]: true,
    [Country.Poland]: true,
    [Country.Kaz]: true,
    [Country.UZB]: true,
  })

  const handleCheckboxChange = (country: Country) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [country]: !prevState[country],
    }))
  }

  return (
    <div className="mx-auto flex w-11/12 justify-between py-8 md:px-2">
      {/* filter bar */}
      <FilterBar
        searchString={search}
        setSearchString={setSearch}
        className="hidden md:block"
        countryItems={countryItems}
        genderFilter={true}
        setData={setFilterData}
        hand={true}
      >
        {countryItems && (
          <div className="mt-3">
            <div className="flex cursor-pointer items-center justify-between">
              <div className="text-md font-semibold text-gray-700">Страна</div>
              <div>
                <FontAwesomeIcon className="text-sm" icon={faChevronDown} />
              </div>
            </div>
            <div className="py-3">
              {countryItems.map((item, index) => (
                <div className="flex items-center gap-2 pt-2">
                  <div>
                    <Checkbox
                      isChecked={checkboxState[item.title as Country]}
                      className="mt-1"
                      changeState={() =>
                        handleCheckboxChange(item.title as Country)
                      }
                    />
                  </div>
                  <div className="text-md font-medium text-gray-700">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </FilterBar>
      {/* main bar*/}
      <div className="w-full md:w-10/12 md:pl-6">
        {/* upper bar*/}
        <div className="px-2 text-2xl font-bold md:text-3xl">
          Рейтинг спортсменов
        </div>
        <div className="hidden">
          <div className="w-full rounded-[10px]  border-gray-300 bg-white shadow-md">
            <div className="flex items-center justify-between py-[10px] px-10">
              {competitorPropsList.map((element) => (
                <div
                  className={`font-semibold text-gray-700 first:hidden   md:first:block md:last:block`}
                  key={element}
                >
                  {element}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* competitors list*/}
        <div className="flex w-full flex-wrap  justify-center px-1 md:block md:w-auto md:px-0">
          <PerfectScrollbar>
            <div className="py-4 md:max-h-screen">
              <div className="md:pr-4">
                {competitors
                  ?.filter(
                    (item) =>
                      item.last_name
                        .toLowerCase()
                        .includes(search.trim().toLowerCase()) ||
                      item.first_name
                        .toLowerCase()
                        .includes(search.trim().toLowerCase())
                  )
                  .filter((item) => checkboxState[item.country as Country])
                  .filter((item) =>
                    !filterData[0] ? item.gender === "f" : item.gender
                  )
                  .filter((item) =>
                    !filterData[1] ? item.gender === "m" : item.gender
                  )
                  .map((competitor, index) => (
                    <Link to={`/competitor/${competitor.id}`}>
                      <CompetitorListNode place={index + 1} data={competitor} />
                    </Link>
                  ))}
              </div>
            </div>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  )
}

export default RatingList
