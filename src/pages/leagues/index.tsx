import { leagueAPI } from "@/services/leaugeService"
import { Link } from "react-router-dom"
import FilterBar from "@/components/filterBar"
import { ColorRing } from "react-loader-spinner"
import LeagueListNode from "./ListNode"
import { useState } from "react"

type Props = {}

const leaguePropsList = ["Название", "Президент", "Страна", "Статус", "Рейтинг"]

const LeagueList = (props: Props) => {
  const { data: leagues, isLoading: loading } =
    leagueAPI.useFetchAllLeaguesQuery(100)

  const [searchString, setSearchString] = useState("")

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
          />
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
                {leagues
                  ?.filter((item) =>
                    item.name
                      .toLowerCase()
                      .includes(searchString.trim().toLowerCase())
                  )
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
