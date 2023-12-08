import { leagueAPI } from "@/services/leaugeService"
import { Link } from "react-router-dom"
import FilterBar from "@/components/filterBar"
import { ColorRing } from "react-loader-spinner"
import LeagueListNode from "./ListNode"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import Checkbox from "@/components/UI/Checkbox"
import { Country, countryItems } from "@/components/filterBar/items"

type Props = {}

const leaguePropsList = ["Название", "Президент", "Страна", "Статус", "Рейтинг"]

const LeagueList = (props: Props) => {
  const { data: leagues, isLoading: loading } =
    leagueAPI.useFetchAllLeaguesQuery(100)

  const [searchString, setSearchString] = useState("")

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
    <div className="p-2">
      {loading ? (
        <div className="flex items-center justify-center p-40">
          <ColorRing
            visible={true}
            height="120"
            width="120"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#FFC132", "#FFC132", "#FFC132", "#FFC132", "#FFC132"]}
          />
        </div>
      ) : (
        <div className="mx-auto flex w-11/12 justify-between py-8">
          <FilterBar
            className="hidden md:block"
            genderFilter={false}
            searchString={searchString}
            setSearchString={setSearchString}
          >
            <div className="mt-3">
              <div className="flex cursor-pointer items-center justify-between">
                <div className="text-md font-semibold text-gray-700">
                  Уровень
                </div>
                <div>
                  <FontAwesomeIcon className="text-sm" icon={faChevronDown} />
                </div>
              </div>
              <div className="py-3">
                <div className="flex gap-2">
                  <Checkbox
                    className="mt-[1px]"
                    isChecked={false}
                    changeState={() => {}}
                  />
                  <div className="text-md font-medium text-gray-700">
                    Профессиональный
                  </div>
                </div>
                <div className="mt-2 flex gap-2">
                  <Checkbox
                    className="mt-[1px]"
                    isChecked={true}
                    changeState={() => {}}
                  />
                  <div className="text-md font-medium text-gray-700">
                    Любительский
                  </div>
                </div>
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
          </FilterBar>
          {/* main bar*/}
          <div className="w-full md:w-10/12 md:pl-2">
            {/* upper bar*/}
            <div className="">
              <div className="border-1 w-full rounded-[10px] border-gray-300 bg-white shadow-sm">
                <div className="flex items-center justify-between py-[10px] px-10 ">
                  {leaguePropsList.map((element) => (
                    <div
                      className={`hidden font-semibold text-gray-700 first:block last:block md:block`}
                      key={element}
                    >
                      {element}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* competitors list*/}
            <div>
              <div className="my-4 md:max-h-[600px] ">
                {leagues &&
                  leagues
                    .filter((item) =>
                      item.name
                        .toLowerCase()
                        .includes(searchString.trim().toLowerCase())
                    )
                    .filter((item) => checkboxState[item.country as Country])
                    .map((league) => (
                      <Link to={`/league/${league.id}`}>
                        <LeagueListNode data={league} />
                      </Link>
                    ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LeagueList
