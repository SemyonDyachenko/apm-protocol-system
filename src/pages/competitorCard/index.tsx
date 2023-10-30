import { Link, useNavigate, useParams } from "react-router-dom"
import { competitorAPI } from "@/services/competitorService"
import { useEffect, useState } from "react"
import { ColorRing } from "react-loader-spinner"
import getUnicodeFlagIcon from "country-flag-icons/unicode"
import { getCompetitorFullname } from "@/models/Competitor"

import { matchAPI } from "@/services/matchService"

import UpMenuBar from "@/components/upMenu/upMenuBar"
import { getNormalizeDate } from "@/utils/date"
import InformationList from "./informationList"
import TournamentsList from "./TournamentsList"
import StatsList from "./statsList"

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
]

const CompetitorCardPage = (props: Props) => {
  const navigate = useNavigate()
  const { competitorId } = useParams()
  const [targetWindow, setTargetWindow] = useState("main")
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
          return <InformationList competitor={competitor} />
        case "stats":
          return <StatsList competitor={competitor} />
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
        <div className="mx-auto h-auto w-11/12 rounded-xl shadow-xl md:w-5/6">
          <div className="rounded-t-xl bg-gray-700">
            <div className="flex items-center justify-between py-3 px-5">
              <div className="text-xl font-bold uppercase text-white">
                {getCompetitorFullname(competitor)}
              </div>
              <div className=" cursor-default rounded-full  px-3 py-1 text-lg font-semibold text-white">
                {getUnicodeFlagIcon("RU")} {competitor.country}
              </div>
            </div>
          </div>
          <div className="flex gap-10 py-2">
            <div className="w-auto py-3 pl-4">
              <img
                className="h-full max-w-[320px] rounded-lg"
                src={
                  competitor.image?.toString() ||
                  "assets/utils/nonuserimage.png"
                }
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
