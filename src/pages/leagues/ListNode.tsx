import ListNode from "@/components/listNode"
import { getCompetitorFullname } from "@/models/Competitor"
import League, { getLeagueLevel } from "@/models/League"
import { competitorAPI } from "@/services/competitorService"
import getCountryFlag from "country-flag-icons/unicode"
import React from "react"
import { Link } from "react-router-dom"

type Props = {
  data: League
}

const LeagueListNode = ({ data }: Props) => {
  const baseNodeLabelStyles = "font-medium text-gray-700 text-md"
  const { data: president } = competitorAPI.useFetchCompetitorDataQuery(
    Number(data.president)
  )

  return (
    <ListNode>
      <div className={`w-1/5 font-extrabold ${baseNodeLabelStyles} text-lg `}>
        {data.name}
      </div>
      <div className="flex w-1/5  items-center justify-start">
        {president && (
          <Link
            className="text-secondary-500 underline hover:text-secondary-300"
            to={`/competitor/${president.id}`}
          >
            {getCompetitorFullname(president)}
          </Link>
        )}
      </div>
      <div
        className={`flex w-1/5 items-center justify-center  text-center ${baseNodeLabelStyles}`}
      >
        {data.country}
      </div>
      <div
        className={`flex w-1/5  items-center justify-end  ${baseNodeLabelStyles}`}
      >
        {getLeagueLevel(data)}
      </div>
      <div
        className={`flex w-1/5 items-center justify-end  text-xl font-bold text-secondary-500`}
      >
        {data.average_rating}
      </div>
    </ListNode>
  )
}

export default LeagueListNode
