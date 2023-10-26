import Tournament from "@/models/Tournament"
import { leagueAPI } from "@/services/leaugeService"

import { Link } from "react-router-dom"

type Props = {
  tournaments: Tournament[]
}

const SectionsTournamentsView = ({ tournaments }: Props) => {
  return (
    <div className="flex w-full flex-wrap gap-x-10 gap-y-12 pt-5">
      {tournaments &&
        tournaments.map((element, index) => (
          <div
            key={index}
            className="relative h-[350px] w-[380px] rounded-2xl shadow-md"
          >
            <div className="z-1 absolute h-full w-full rounded-2xl">
              <div className="absolute h-full w-full rounded-2xl bg-black opacity-30"></div>
              <img
                className="h-full w-full rounded-2xl"
                src="assets/landing/gallery/gallery1.jpg"
              />
            </div>
            <div className="relative mt-4 flex h-full w-full items-end rounded-2xl">
              <div className="h-3/6 w-full rounded-2xl bg-white px-4 py-2 pb-2 shadow-md">
                <div className="text-md py-2 font-semibold text-gray-700">
                  {element.name}
                </div>
                <div className="flex justify-between py-2">
                  <div className="flex items-center gap-2 font-medium">
                    Лига:
                    <Link
                      className=" text-secondary-500 underline"
                      to={`/league/${element.league}`}
                    >
                      {leagueAPI.useFetchLeagueQuery(element.league).data?.name}
                    </Link>
                  </div>
                  <div className="rounded-full bg-gray-700 px-4 py-1 font-medium text-white">
                    {element.location}
                  </div>
                </div>
                <div className="pt-3">
                  <Link
                    className="hover:text-gray-700"
                    to={`/tournaments/${element.id}`}
                  >
                    <button className="text-md w-full rounded-full bg-secondary-500 px-5 py-[10px] font-medium transition hover:bg-secondary-600 ">
                      Участвовать
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default SectionsTournamentsView
