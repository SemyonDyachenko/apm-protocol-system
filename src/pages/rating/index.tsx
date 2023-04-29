import { competitorAPI } from "@/services/competitorService"
import { Table } from "react-bootstrap"
import getUnicodeFlagIcon from "country-flag-icons/unicode"
import { Link } from "react-router-dom"

type Props = {}

const RatingList = (props: Props) => {
  const { data: competitors } = competitorAPI.useFetchAllCompetitorQuery(100)
  console.log(competitors)
  return (
    <div className="p-5">
      <div className="rounded-xl bg-secondary-400 p-2">
        <Table
          striped
          hover
          className="mx-auto rounded-lg  bg-white px-10 pb-0"
        >
          <thead>
            <tr>
              <th>№</th>
              <th>Спортсмен</th>
              <th>Пол</th>
              <th>Страна</th>
              <th>Достижения</th>
              <th>Рейтинг</th>
            </tr>
          </thead>
          <tbody>
            {competitors &&
              competitors.map((element, index) => (
                <tr key={index} className="relative hover:bg-secondary-400">
                  <td>
                    <Link
                      className="absolute block w-full hover:text-black"
                      to={`/competitor/${element.id}`}
                    >
                      {element.id}
                    </Link>
                  </td>
                  <td>
                    {element.first_name} {element.last_name}
                  </td>
                  <td>{element.gender === "m" ? "Муж." : "Жен."}</td>
                  <td>Россия {getUnicodeFlagIcon("RU")}</td>
                  <td>Отсутствуют</td>
                  <td>{element.elo_rating}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default RatingList
