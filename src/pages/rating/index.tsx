import { competitorAPI } from "@/services/competitorService"
import { Link } from "react-router-dom"
import CompetitorListNode from "./ListNode"
import FilterBar from "@/components/filterBar"
import PerfectScrollbar from "react-perfect-scrollbar"
import { useState } from "react"
type Props = {}

const competitorPropsList = [
  "№",
  "Спортсмен",
  "Пол",
  "Страна",
  "Звание",
  "________",
]

const RatingList = (props: Props) => {
  const [search, setSearch] = useState("")
  const { data: competitors } = competitorAPI.useFetchAllCompetitorQuery(100)
  console.log(competitors)
  return (
    <div className="mx-auto flex w-11/12 justify-between py-8 md:px-2">
      {/* filter bar */}
      <FilterBar
        searchString={search}
        setSearchString={setSearch}
        className="hidden md:block"
      />
      {/* main bar*/}
      <div className="w-full pl-2 md:w-10/12">
        {/* upper bar*/}
        <div className="">
          <div className="w-full rounded-[10px]  border-gray-300 bg-white shadow-md">
            <div className="flex items-center justify-between py-[10px] px-10">
              {competitorPropsList.map((element) => (
                <div
                  className={`font-semibold text-gray-700 first:hidden last:hidden last:text-transparent  md:first:block md:last:block`}
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
          <PerfectScrollbar>
            <div className="my-4 md:max-h-[620px]">
              <div className="pr-4">
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
