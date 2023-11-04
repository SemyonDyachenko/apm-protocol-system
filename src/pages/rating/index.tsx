import { competitorAPI } from "@/services/competitorService"
import { Link } from "react-router-dom"
import CompetitorListNode from "./ListNode"
import FilterBar from "@/components/filterBar"
import PerfectScrollbar from "react-perfect-scrollbar"

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
  const { data: competitors } = competitorAPI.useFetchAllCompetitorQuery(100)
  console.log(competitors)
  return (
    <div className="mx-auto flex w-11/12 justify-between py-8 px-2">
      {/* filter bar */}
      <FilterBar />
      {/* main bar*/}
      <div className="w-10/12 pl-2">
        {/* upper bar*/}
        <div className="">
          <div className="w-full rounded-[10px]  border-gray-300 bg-white shadow-md">
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
          <PerfectScrollbar>
            <div className="my-4 max-h-[620px]">
              <div className="pr-4">
                {competitors?.map((competitor, index) => (
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
