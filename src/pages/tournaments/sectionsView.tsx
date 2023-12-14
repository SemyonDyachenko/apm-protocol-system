import Tournament from "@/models/Tournament"
import { leagueAPI } from "@/services/leaugeService"
import { getNormalizeDate } from "@/utils/date"
import { motion } from "framer-motion"
import { useEffect } from "react"

import { Link } from "react-router-dom"

type Props = {
  tournaments?: Tournament[]
  search: string
}

const SectionsTournamentsView = ({ tournaments, search }: Props) => {
  return (
    <div className="flex w-full grid-cols-4 grid-rows-2 flex-wrap justify-center gap-x-10 gap-y-12 pt-5 md:grid">
      {tournaments &&
        tournaments
          .filter((item) =>
            item.name.toLowerCase().trim().includes(search.trim().toLowerCase())
          )
          .map((element, index) => (
            <motion.div
              initial={{ opacity: 0.3 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 + index / 10 }}
              viewport={{ once: true, amount: 0.5 }}
              key={index}
              className="relative h-auto min-h-[450px] w-full rounded-3xl shadow-md md:min-h-[500px] md:w-[320px]"
            >
              <Link
                className="transition hover:text-gray-700 "
                to={`/tournaments/${element.id}`}
              >
                <div className="z-1 absolute h-full w-full rounded-3xl">
                  <div className="absolute h-full w-full rounded-3xl bg-black opacity-30"></div>
                  <img
                    className="h-full w-full rounded-2xl"
                    src={element.afisha?.toString()}
                  />
                </div>
                <div className="relative mt-4 flex h-full w-full items-end rounded-2xl">
                  <div className="w-full rounded-2xl bg-white px-4 py-2 pb-2 shadow-md md:h-2/5">
                    <div className="text-md h-1/4 py-2 font-semibold text-gray-700">
                      {element.name}
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div className="flex items-center gap-2 text-sm font-semibold underline">
                        {getNormalizeDate(element.date)}
                      </div>
                      <div className="rounded-full bg-gray-700 px-4 py-1 font-medium text-white">
                        {element.location}
                      </div>
                    </div>
                    <div className="py-3">
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
              </Link>
            </motion.div>
          ))}
    </div>
  )
}

export default SectionsTournamentsView
