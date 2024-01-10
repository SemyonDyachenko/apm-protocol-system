import { Link, useNavigate, useParams } from "react-router-dom"
import { competitorAPI } from "@/services/competitorService"
import { useEffect, useState } from "react"
import { ColorRing } from "react-loader-spinner"
import getUnicodeFlagIcon from "country-flag-icons/unicode"
import { getCompetitorFullname } from "@/models/Competitor"

import InformationList from "./informationList"
import TournamentsList from "./TournamentsList"
import StatsList from "./statsList"
import UpMenuBar from "@/components/upMenu/upMenuBar"

import Logo from "/assets/utils/nonuserimage.jpg"

type Props = {}

let upMenuButtons = [
  {
    selected: true,
    title: "Основная информация",
    target: "main",
  },
  {
    selected: false,
    title: "Характеристики",
    target: "stats",
  },
  {
    selected: false,
    title: "Турниры",
    target: "tournaments",
  },
  {
    selected: false,
    title: "Поединки",
    target: "matches",
  },
]

const CompetitorCardPage = (props: Props) => {
  const navigate = useNavigate()
  const { competitorId } = useParams()
  const [targetWindow, setTargetWindow] = useState("main")
  const { data: ratingPosition } = competitorAPI.useFetchRatingPositionQuery(
    parseInt(competitorId?.valueOf() || "")
  )

  const {
    isLoading,
    data: competitor,
    error: dataError,
  } = competitorAPI.useFetchCompetitorDataQuery(
    parseInt(competitorId?.valueOf() || "")
  )

  useEffect(() => {
    if (!competitorId || dataError) navigate("/")
  }, [competitorId, dataError])

  const getWindow = () => {
    if (competitor) {
      switch (targetWindow) {
        case "main":
          return (
            <InformationList
              place={ratingPosition?.rating_position || 0}
              competitor={competitor}
            />
          )
        case "stats":
          return (
            <StatsList
              place={ratingPosition?.rating_position || 0}
              competitor={competitor}
            />
          )
        case "tournaments":
          return <TournamentsList competitorId={competitor.id} />
      }
    }
  }

  if (isLoading || dataError)
    return (
      <div className="flex items-center justify-center p-40">
        <ColorRing
          visible={true}
          height="140"
          width="140"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    )

  if (competitor)
    return (
      <div className="w-full py-8">
        <div className="mx-auto h-auto w-11/12 rounded-xl ">
          <div className="rounded-3xl md:rounded-t-3xl md:py-5">
            <div className="flex items-center justify-between px-2 py-2  md:py-3 md:px-5">
              <div className="text-lg font-extrabold uppercase text-gray-700 md:text-4xl">
                {getCompetitorFullname(competitor)}
              </div>
              <div className="cursor-default rounded-full bg-secondary-500 px-4 py-1 text-xl  font-bold text-gray-700 md:flex  md:px-3">
                {competitor.elo_rating}
              </div>
            </div>
          </div>
          <div className="gap-10 rounded-xl py-2 md:flex md:shadow-sm">
            <div className="w-auto py-3 md:pl-4">
              <img
                className="mx-auto h-[280px] w-[220px] rounded-full md:h-[400px]  md:w-[350px] md:rounded-lg"
                src={competitor.image?.toString() || Logo}
              />
            </div>
            <div className="w-full">
              <UpMenuBar items={upMenuButtons} changeTarget={setTargetWindow} />
              {getWindow()}
            </div>
          </div>
        </div>
      </div>
    )
  return <div></div>
}

export default CompetitorCardPage
