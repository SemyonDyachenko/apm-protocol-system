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
import MobileFilterBar from "@/components/mobileFilterBar"

type Props = {}

// const leaguePropsList = ["Название", "Президент", "Страна", "Статус", "Рейтинг"]

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

  const [proLeague, setProLeague] = useState(true)
  const [casualLeague, setCasualLeague] = useState(true)

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
                    isChecked={proLeague}
                    changeState={setProLeague}
                  />
                  <div className="text-md font-medium text-gray-700">
                    Профессиональная
                  </div>
                </div>
                <div className="mt-2 flex gap-2">
                  <Checkbox
                    className="mt-[1px]"
                    isChecked={casualLeague}
                    changeState={setCasualLeague}
                  />
                  <div className="text-md font-medium text-gray-700">
                    Любительская
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex cursor-pointer items-center justify-between">
                <div className="text-md font-semibold text-gray-700">
                  Страна
                </div>
                <div>
                  <FontAwesomeIcon className="text-sm" icon={faChevronDown} />
                </div>
              </div>
              <div className="py-2">
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
          </FilterBar>
          {/* main bar*/}
          <div className="w-full md:w-10/12 md:pl-6">
            {/* upper bar*/}
            <div className="text-2xl font-bold md:text-3xl">Активные лиги</div>
            {/* competitors list*/}
            <MobileFilterBar
              className="md:hidden"
              searchString={searchString}
              setSearchString={setSearchString}
            >
              <div className="p-4">
                <div className="">
                  <div className="mb-1 text-sm text-gray-400">Уровень</div>
                  <div className="flex w-full gap-2 text-sm">
                    <div
                      onClick={() => setCasualLeague(!casualLeague)}
                      className={`${
                        casualLeague
                          ? "bg-secondary-500 text-white"
                          : "bg-white"
                      } w-1/2 rounded-md border-[1px] px-4 py-2 text-center font-medium`}
                    >
                      Любительская
                    </div>
                    <div
                      onClick={() => setProLeague(!proLeague)}
                      className={`rounded-md border-[1px] ${
                        proLeague ? "bg-secondary-500 text-white" : "bg-white"
                      } w-1/2 px-4 py-2 text-center font-medium`}
                    >
                      Про
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="mb-1 text-sm text-gray-400">Страна</div>
                  <div className="grid grid-cols-2 flex-wrap gap-2">
                    {countryItems.map((item, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          handleCheckboxChange(item.title as Country)
                        }
                        className={`rounded-md border-[1px] ${
                          checkboxState[item.title as Country]
                            ? "bg-secondary-500 text-white"
                            : "bg-white"
                        } w-full px-4 py-2 text-center font-medium`}
                      >
                        {item.title}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </MobileFilterBar>
            <div>
              <div className="pt-4 md:max-h-[600px] ">
                {leagues &&
                  leagues
                    .filter((item) => {
                      if (proLeague && casualLeague) {
                        return item
                      }
                      if (casualLeague) {
                        return item.level === "casual"
                      }
                      if (proLeague) {
                        return item.level === "pro"
                      }
                    })
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
