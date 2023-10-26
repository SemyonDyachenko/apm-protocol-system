import FilterBar from "@/components/filterBar"
import { leagueAPI } from "@/services/leaugeService"
import { tournamentAPI } from "@/services/tournamentsService"
import { faList, faTable } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link } from "react-router-dom"
import SectionsTournamentsView from "./sectionsView"
import ListTournamentsView from "./listView"

type Props = {}

const TournamentsPage = (props: Props) => {
  const { data: tournaments } = tournamentAPI.useFetchTournamentsQuery(0)
  const [tournamentsView, setTournamentsView] = useState("list")

  const getTournamentsView = () => {
    if (tournaments) {
      switch (tournamentsView) {
        case "list":
          return <ListTournamentsView tournaments={tournaments} />
        case "sections":
          return <SectionsTournamentsView tournaments={tournaments} />
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
    <div className="mx-auto flex min-h-[650px] w-11/12 items-start justify-between py-5">
      <div className="">
        <FilterBar />
      </div>
      <div className="w-9/12">
        <div className="flex w-full justify-between pr-5">
          <div className="text-3xl font-bold">Актуальные турниры</div>
          <div className="flex gap-2 text-xl font-medium  ">
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
              }`}
            >
              <FontAwesomeIcon icon={faList} />
            </div>
          </div>
        </div>
        {getTournamentsView()}
      </div>
    </div>
  )
}

export default TournamentsPage
