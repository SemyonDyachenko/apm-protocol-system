import UpMenuBar, { upMenuItem } from "@/components/upMenu/upMenuBar"
import { getCompetitorFullname } from "@/models/Competitor"
import League, { getLeagueLevel } from "@/models/League"
import { competitorAPI } from "@/services/competitorService"
import React from "react"
import { Link } from "react-router-dom"
import RatingInfo from "./ratingInfo"

type Props = {
  league: League
}

const items: Array<upMenuItem> = [
  {
    title: "Основная информация",
    target: "general",
    selected: true,
  },
]

const LeagueInformationWindow = ({ league }: Props) => {
  const { data: president } = competitorAPI.useFetchCompetitorDataQuery(
    Number(league.president)
  )

  const gridItems = [
    {
      title: "Президент",
      value: (
        <Link
          className="text-secondary-500 underline transition hover:text-secondary-400"
          to={`/competitor/${president?.id}`}
        >
          {getCompetitorFullname(president)}
        </Link>
      ),
    },
    {
      title: "Дата создания",
      value: "23 сентября 2015",
    },
    {
      title: "Статус",
      value: getLeagueLevel(league),
    },
    {
      title: "Страна",
      value: league.country,
    },
    {
      title: "Телефон",
      value: "+7 (918)-064-33-82",
    },
    {
      title: "Почта",
      value: "apm@league.com",
    },
    {
      title: "Телефон",
      value: "+7 (918)-064-33-82",
    },
    {
      title: "Почта",
      value: "apm@league.com",
    },
  ]

  return (
    <div>
      <div className="flex items-start justify-between">
        <div className="w-1/2">
          <UpMenuBar items={items} />
        </div>
        <RatingInfo league={league} />
      </div>
      <div>
        <div className="py-2">
          <span className="text-sm text-gray-400">Описание:</span>
          <p className="pt-1 text-sm font-medium text-gray-700">
            {league.description}
          </p>
        </div>
        <div className="grid w-full grid-cols-4 grid-rows-2 gap-12 py-4">
          {gridItems.map((element, index) => (
            <div key={index}>
              <span className="text-sm text-gray-400">{element.title}:</span>
              <div className="text-sm font-medium text-gray-700">
                {element.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LeagueInformationWindow
