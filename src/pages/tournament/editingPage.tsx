import { getCompetitorFullname } from "@/models/Competitor"
import Tournament from "@/models/Tournament"
import { competitorAPI } from "@/services/competitorService"
import { leagueAPI } from "@/services/leaugeService"
import { useState } from "react"
import { Link } from "react-router-dom"

type Props = {
  tournament: Tournament
}

const EditingPage = ({ tournament }: Props) => {
  const inputStyle = "bg-gray-200 rounded-lg py-2 px-4 outline-none"
  const { data: competitors } = competitorAPI.useFetchAllCompetitorQuery(100)

  const { data: league } = leagueAPI.useFetchLeagueQuery(tournament.league)
  return (
    <div>
      <div className="w-full py-2">
        <div className="py-1 text-sm text-gray-400 ">Описание:</div>
        <div>
          <textarea className="min-h-[150px] w-full rounded-lg bg-gray-200 px-4 py-2 outline-none"></textarea>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-y-4">
        <div>
          <div className="py-1 text-sm text-gray-400">Лига:</div>
          <div>
            <Link
              className="text-secondary-500 underline transition hover:text-secondary-400"
              to={`/league/${tournament.league}`}
            >
              {league?.name}
            </Link>
          </div>
        </div>
        <div>
          <div className="py-1 text-sm text-gray-400">Дата проведения:</div>
          <div>
            <input className={inputStyle} type="date" />
          </div>
        </div>
        <div>
          <div className="py-1 text-sm text-gray-400">Город:</div>
          <div>
            <input className={inputStyle} type="text" />
          </div>
        </div>
        <div>
          <div className="py-1 text-sm text-gray-400">Телефон:</div>
          <div>
            <input className={inputStyle} type="text" />
          </div>
        </div>
        <div>
          <div className="py-1 text-sm text-gray-400">Статус:</div>
          <div>
            <input className={inputStyle} type="text" />
          </div>
        </div>
        <div>
          <div className="py-1 text-sm text-gray-400">Судья:</div>
          <div>
            <select className={inputStyle}>
              {competitors &&
                competitors
                  .filter((item) => item.mode === "judge")
                  .map((competitor, index) => (
                    <option key={index} value={competitor.id}>
                      {getCompetitorFullname(competitor)}
                    </option>
                  ))}
            </select>
          </div>
        </div>
        <div>
          <div className="py-1 text-sm text-gray-400">Секретарь:</div>
          <div>
            <select className={inputStyle}>
              {competitors &&
                competitors
                  .filter((item) => item.mode === "secretary")
                  .map((competitor, index) => (
                    <option key={index} value={competitor.id}>
                      {getCompetitorFullname(competitor)}
                    </option>
                  ))}
            </select>
          </div>
        </div>
        <div>
          <div className="py-1 text-sm text-gray-400">Афиша:</div>
          <label className="">
            <label className="w-full cursor-pointer rounded-lg bg-secondary-500 px-4 py-2 font-medium text-gray-700 transition hover:bg-secondary-600 ">
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="hover:bg-secondary-00 hidden w-full rounded-lg bg-secondary-500 py-2 shadow-md transition"
              />
              Загрузить
            </label>
          </label>
        </div>
      </div>
    </div>
  )
}

export default EditingPage
