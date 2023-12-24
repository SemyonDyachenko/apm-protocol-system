import Competitor from "@/models/Competitor"

type Props = {
  competitor: Competitor
  place: number
}

const StatsList = ({ competitor, place }: Props) => {
  const competitorStats = [
    {
      title: "Хват",
      value: competitor.grip + " Кг",
    },
    {
      title: "Бицепс",
      value: competitor.biceps + " Кг",
    },
    {
      title: "Турник",
      value: competitor.crossbar + " Раз",
    },
    {
      title: "Луч",
      value: competitor.shaft + " Кг",
    },
    {
      title: "Армжим",
      value: competitor.militarypress + " Кг",
    },
    {
      title: "Кисть",
      value: competitor.hand + " Кг",
    },
    {
      title: "Жим",
      value: competitor.press + " Кг",
    },
    {
      title: "Бок",
      value: competitor.side + " Кг",
    },
  ]
  return (
    <div>
      {" "}
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
      <div className=" w-11/12  justify-between gap-12 py-4  md:flex">
        <div className="grid  grid-cols-2 gap-12 md:grid-cols-4 md:grid-rows-2">
          {competitorStats.map((element, index) => (
            <div key={index} className="flex flex-col gap-1">
              <div className="text-sm text-gray-400">{element.title}</div>
              <div className="text-md my-1 min-w-[180px]  font-medium text-gray-700">
                {element.value}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-12 md:mt-0 md:flex-col">
          <div className="flex gap-3">
            <div className="flex w-1/2 justify-end text-3xl font-extrabold text-secondary-500 md:text-5xl">
              {competitor.elo_rating}
            </div>
            <div className="md:text-md font-black ">
              Рейтинг
              <br /> спортсмена
            </div>
          </div>
          <div className="flex gap-3">
            <div className=" flex w-1/2 justify-end text-3xl font-black text-gray-700 md:text-5xl">
              {place}
            </div>
            <div className="md:text-md  font-black">
              Место в<br /> рейтинге
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsList
