import FilterBar from "@/components/filterBar"
import { leagueAPI } from "@/services/leaugeService"
import { tournamentAPI } from "@/services/tournamentsService"
import {
  faCalendar,
  faCalendarDays,
  faChevronCircleDown,
  faChevronDown,
  faList,
  faTable,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link } from "react-router-dom"
import SectionsTournamentsView from "./sectionsView"
import ListTournamentsView from "./listView"
import CalendarView from "./calendarView"
import Checkbox from "@/components/UI/Checkbox"
import { Country, countryItems } from "@/components/filterBar/items"
import MobileFilterBar from "@/components/mobileFilterBar"

type Props = {}

const TournamentsPage = (props: Props) => {
  const { data: tournaments } = tournamentAPI.useFetchTournamentsQuery(1)
  const [tournamentsView, setTournamentsView] = useState("sections")
  const [searchString, setSearchString] = useState("")
  const [actualTournaments, setActuallTournaments] = useState(true)
  const [casualFilter, setCasualFilter] = useState(true)
  const [proFilter, setProFilter] = useState(true)

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

  const getFilteredTournaments = () => {
    const date = new Date()
    if (tournaments) {
      if (actualTournaments) {
        return tournaments
          .filter((item) => {
            if (casualFilter && proFilter) {
              return item.level
            }
            if (casualFilter) {
              return item.level === "casual"
            }

            if (proFilter) {
              return item.level === "pro"
            }
          })
          .filter((item) => new Date(item.date).getTime() > date.getTime())
      } else {
        return tournaments
          .filter((item) => {
            if (casualFilter && proFilter) {
              return item.level
            }
            if (casualFilter) {
              return item.level === "casual"
            }

            if (proFilter) {
              return item.level === "pro"
            }
          })
          .filter((item) => new Date(item.date).getTime() < date.getTime())
      }
    }
  }

  const getTournamentsView = () => {
    if (tournaments) {
      switch (tournamentsView) {
        case "list":
          return (
            <ListTournamentsView
              search={searchString}
              tournaments={getFilteredTournaments()}
            />
          )
        case "sections":
          return (
            <SectionsTournamentsView
              search={searchString}
              tournaments={getFilteredTournaments()}
            />
          )
        case "calendar":
          return <CalendarView tournaments={tournaments} />
        default:
          return (
            <div className="text-2xl font-bold text-secondary-500">
              NOT FOUND
            </div>
          )
      }
    }
  }

  return (
    <div className="mx-auto flex w-11/12 items-start justify-between py-5 md:min-h-[650px]">
      <div className="">
        <FilterBar
          className="hidden md:block"
          genderFilter={false}
          searchString={searchString}
          setSearchString={setSearchString}
        >
          <div className="mt-3">
            <div className="flex cursor-pointer items-center justify-between">
              <div className="text-md font-semibold text-gray-700">Статус</div>
              <div>
                <FontAwesomeIcon className="text-sm" icon={faChevronDown} />
              </div>
            </div>
            <div className="py-3">
              <div className="flex gap-2">
                <input
                  defaultChecked={true}
                  name="status"
                  onClick={() => setActuallTournaments(true)}
                  type="radio"
                />
                <label className="text-md font-medium text-gray-700">
                  Актуальные
                </label>
              </div>
              <div className="mt-2 flex gap-2">
                <input
                  onClick={() => setActuallTournaments(false)}
                  name="status"
                  type="radio"
                />
                <label className="text-md font-medium text-gray-700">
                  Прошедшие
                </label>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex cursor-pointer items-center justify-between">
              <div className="text-md font-semibold text-gray-700">Уровень</div>
              <div>
                <FontAwesomeIcon className="text-sm" icon={faChevronDown} />
              </div>
            </div>
            <div className="py-3">
              <div className="flex gap-2">
                <Checkbox
                  className="mt-[1px]"
                  isChecked={proFilter}
                  changeState={setProFilter}
                />
                <div className="text-md font-medium text-gray-700">
                  Профессиональный
                </div>
              </div>
              <div className="mt-2 flex gap-2">
                <Checkbox
                  className="mt-[1px]"
                  isChecked={casualFilter}
                  changeState={setCasualFilter}
                />
                <div className="text-md font-medium text-gray-700">
                  Любительский
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex cursor-pointer items-center justify-between">
              <div className="text-md font-semibold text-gray-700">Дата</div>
              <div>
                <FontAwesomeIcon className="text-sm" icon={faChevronDown} />
              </div>
            </div>
            <div className="flex gap-2 py-3">
              <div className="flex items-center gap-2">
                <input
                  className="w-[100px] rounded-lg border-[1px] border-gray-400 bg-white px-2 py-1 text-sm text-gray-400 outline-none transition focus:border-gray-700 focus:shadow-md"
                  type="date"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">до: </span>
                <input
                  className="w-[100px] rounded-lg border-[1px] border-gray-400 bg-white px-2 py-1 text-sm text-gray-400 outline-none transition focus:border-gray-700 focus:shadow-md"
                  type="date"
                />
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex cursor-pointer items-center justify-between">
              <div className="text-md font-semibold text-gray-700">Страна</div>
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
      </div>
      <div className="relative w-full md:w-10/12 md:pl-6">
        <div className="flex w-full justify-between px-3 md:px-0 md:pr-5 ">
          <div className="text-2xl font-bold md:text-3xl">
            {actualTournaments ? "Актуальные турниры" : "Прошедшие турниры"}
          </div>

          <div className=" hidden gap-2 text-xl font-medium md:flex">
            <div
              onClick={() => setTournamentsView("sections")}
              className={`cursor-pointer transition hover:text-secondary-500 ${
                tournamentsView === "sections" && "text-secondary-500"
              }`}
            >
              <FontAwesomeIcon icon={faTable} />
            </div>
            <div
              onClick={() => setTournamentsView("list")}
              className={`cursor-pointer transition hover:text-secondary-500  ${
                tournamentsView === "list" && "text-secondary-500"
              } hidden md:block`}
            >
              <FontAwesomeIcon icon={faList} />
            </div>
          </div>
        </div>
        <MobileFilterBar
          className="md:hidden"
          searchString={searchString}
          setSearchString={setSearchString}
        >
          <div className="px-4 py-4">
            <div>
              <div className="mb-1 text-sm text-gray-400">Статус</div>
              <div className="flex w-full gap-2 text-sm">
                <div
                  onClick={() => setActuallTournaments(true)}
                  className={`${
                    actualTournaments
                      ? "bg-secondary-500 text-white"
                      : "bg-white"
                  } w-1/2 rounded-md border-[1px] px-4 py-2 text-center font-medium`}
                >
                  Актуальные
                </div>
                <div
                  onClick={() => setActuallTournaments(false)}
                  className={`rounded-md border-[1px] ${
                    !actualTournaments
                      ? "bg-secondary-500 text-white"
                      : "bg-white"
                  } w-1/2 px-4 py-2 text-center font-medium`}
                >
                  Прошедшие
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="mb-1 text-sm text-gray-400">Уровень</div>
              <div className="flex w-full gap-2 text-sm">
                <div
                  onClick={() => setCasualFilter(!casualFilter)}
                  className={`${
                    casualFilter ? "bg-secondary-500 text-white" : "bg-white"
                  } w-1/2 rounded-md border-[1px] px-4 py-2 text-center font-medium`}
                >
                  Любительский
                </div>
                <div
                  onClick={() => setProFilter(!proFilter)}
                  className={`rounded-md border-[1px] ${
                    proFilter ? "bg-secondary-500 text-white" : "bg-white"
                  } w-1/2 px-4 py-2 text-center font-medium`}
                >
                  Про
                </div>
              </div>
            </div>
          </div>
        </MobileFilterBar>
        <div className="mb-[70px] px-2 md:mb-[0px] md:px-0">
          {getTournamentsView()}
        </div>
      </div>
    </div>
  )
}

export default TournamentsPage

/*
 
            <div
              onClick={() => setTournamentsView("calendar")}
              className={`cursor-pointer transition hover:text-secondary-500 ${
                tournamentsView === "calendar" && "text-secondary-500"
              }`}
            >
              <FontAwesomeIcon icon={faCalendarDays} />
            </div>
*/
