import { leagueAPI } from "@/services/leaugeService"
import { Table } from "react-bootstrap"
import getUnicodeFlagIcon from "country-flag-icons/unicode"
import { Link } from "react-router-dom"
import FilterBar from "@/components/filterBar"

type Props = {}

const leaguePropsList = ["Название", "Президент", "Страна", "Статус", "Рейтинг"]

const LeagueList = (props: Props) => {
  const { data: leagues, isLoading: loading } =
    leagueAPI.useFetchAllLeaguesQuery(100)

  return (
    <div className="p-2">
      {loading ? (
        <div className="mx-auto flex w-5/6 justify-center text-xl">LOADING</div>
      ) : (
        <div className="mx-auto flex w-11/12 justify-between py-8">
          <FilterBar />
          {/* main bar*/}
          <div className="w-9/12">
            {/* upper bar*/}
            <div className="">
              <div className="w-full rounded-[10px] border-2 border-gray-300 bg-white shadow-sm">
                <div className="flex items-center justify-between py-[10px] px-10">
                  {leaguePropsList.map((element) => (
                    <div
                      className={`font-semibold text-gray-700 `}
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
              <div className=" my-4 max-h-[600px] ">
                {leagues?.map((league) => (
                  <Link to={`competitor/${league.id}`}></Link>
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
