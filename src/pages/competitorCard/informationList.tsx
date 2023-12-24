import Competitor, { getCompetitorFullname } from "@/models/Competitor"
import { competitorAPI } from "@/services/competitorService"
import { getNormalizeDate } from "@/utils/date"
import { Link } from "react-router-dom"

type Props = {
  competitor: Competitor
  place: number
}

const InformationList = ({ competitor, place }: Props) => {
  let linkStyles = "text-secondary-500 underline hover:text-secondary-300"
  const { data: trainer } = competitorAPI.useFetchCompetitorDataQuery(
    Number(competitor?.trainer)
  )

  let competitorPropElements = [
    {
      title: "Вес",
      value: competitor?.weight + " Кг",
    },
    {
      title: "Рост",
      value: competitor?.height + " См",
    },
    {
      title: "Начало карьеры",
      value:
        competitor?.career_start_date &&
        new Date(competitor?.career_start_date).getFullYear() + " Год",
    },
    {
      title: "Город",
      value: competitor?.city,
    },
    {
      title: "Дата рождения",
      value:
        competitor?.birthdate &&
        getNormalizeDate(competitor?.birthdate.toString()),
    },

    {
      title: "Команда",
      value: competitor.team ? (
        <Link className={linkStyles} to={`/team/${competitor.team?.id}`}>
          {competitor.team?.name}
        </Link>
      ) : (
        "Нет"
      ),
    },
    {
      title: "Тренер",
      value: (
        <Link className={linkStyles} to={`/competitor/${trainer?.id}`}>
          {getCompetitorFullname(trainer)}
        </Link>
      ),
    },
  ]

  return (
    <div>
      <div className="flex gap-6 pt-3 pb-2 text-lg">
        <div className="text-xl font-extrabold text-gray-700">
          Информация о спортсмене
        </div>
      </div>
      <div>
        <div className="font-semibo text-smld w-11/12 py-2 text-gray-400">
          {competitor.description}
        </div>
      </div>
      <div className="w-11/12 justify-between gap-12 py-4 md:flex">
        <div className="grid w-full grid-cols-2 gap-12 md:grid-cols-4 md:grid-rows-2">
          {competitorPropElements.map((element, index) => (
            <div key={index} className="flex flex-col gap-1">
              <div className="text-sm text-gray-400">{element.title}</div>
              <div className="text-md my-1 min-w-[180px]  font-medium text-gray-700">
                {element.value}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-12">
          <div className="flex gap-3">
            <div className="flex w-full justify-end text-5xl font-extrabold text-secondary-500 md:w-1/2">
              {competitor.elo_rating}
            </div>
            <div className="text-md font-black ">
              Рейтинг
              <br /> спортсмена
            </div>
          </div>
          <div className="flex gap-3">
            <div className=" flex w-full justify-end text-5xl font-black text-gray-700 md:w-1/2">
              {place}
            </div>
            <div className="text-md font-black">
              Место в<br /> рейтинге
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InformationList
