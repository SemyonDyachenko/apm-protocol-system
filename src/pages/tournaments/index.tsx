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

type Props = {}

const TournamentsPage = (props: Props) => {
  const { data: tournaments } = tournamentAPI.useFetchTournamentsQuery(1)
  const [tournamentsView, setTournamentsView] = useState("sections")
  const [searchString, setSearchString] = useState("")
  const [actualTournaments, setActuallTournaments] = useState(true)
  const [casualFilter, setCasualFilter] = useState(true)
  const [proFilter, setProFilter] = useState(true)

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
      <div className="hidden md:block">
        <FilterBar
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
              <div className="text-lg font-semibold text-gray-700">Дата</div>
              <div>
                <FontAwesomeIcon className="text-sm" icon={faChevronDown} />
              </div>
            </div>
            <div className="flex gap-2 py-3">
              <div className="flex items-center gap-2">
                <input
                  className="w-[100px] rounded-lg border-2 border-gray-400 bg-gray-70 px-2 py-1 text-sm text-gray-400"
                  type="date"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">до: </span>
                <input
                  className="w-[100px] rounded-lg border-2 border-gray-400 bg-gray-70 px-2 py-1 text-sm text-gray-400"
                  type="date"
                />
              </div>
            </div>
          </div>
        </FilterBar>
      </div>
      <div className="w-full md:w-10/12 md:pl-6">
        <div className="flex w-full justify-between px-3 md:px-0 md:pr-5">
          <div className="text-xl font-bold md:text-3xl">
            {actualTournaments ? "Актуальные турниры" : "Прошедшие турниры"}
          </div>
          <div className="flex gap-2 text-xl font-medium">
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
        <div className="px-2 md:px-0">{getTournamentsView()}</div>
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
