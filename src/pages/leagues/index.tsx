import { leagueAPI } from "@/services/leaugeService"
import { Table } from "react-bootstrap"
import getUnicodeFlagIcon from "country-flag-icons/unicode"

type Props = {}

const LeagueList = (props: Props) => {
  const { data: leagues, isLoading: loading } =
    leagueAPI.useFetchAllLeaguesQuery(100)

  return (
    <div className="p-5">
      <div className="rounded-xl bg-secondary-400 p-2">
        {loading ? (
          <div className="mx-auto flex w-5/6 justify-center text-xl">
            LOADING
          </div>
        ) : (
          <Table
            striped
            hover
            className="mx-auto rounded-lg  bg-white px-10 pb-0"
          >
            <thead>
              <tr>
                <th>Название</th>
                <th>Страна</th>
                <th>Описание</th>
                <th>Президент</th>
                <th>Уровень</th>
              </tr>
            </thead>
            <tbody>
              {leagues &&
                leagues.map((element, index) => (
                  <tr className="h-[60px] bg-white" key={index}>
                    <td>{element.name}</td>
                    <td>
                      {element.country + " "}
                      {getUnicodeFlagIcon("RU")}
                    </td>
                    <td>{element.description}</td>
                    <td>{element.president}</td>
                    <td>{element.level}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  )
}

export default LeagueList
