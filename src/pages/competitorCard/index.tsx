import { Link, useNavigate, useParams } from "react-router-dom"
import { competitorAPI } from "@/services/competitorService"
import { useEffect } from "react"
import { ColorRing } from "react-loader-spinner"
import getUnicodeFlagIcon from "country-flag-icons/unicode"
import { getCompetitorFullname } from "@/models/Competitor"
import MatchesList from "./MatchesList"
import { matchAPI } from "@/services/matchService"

import profilePhoto from "/assets/profilePage.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons"
import UpMenuBar from "@/components/upMenu/upMenuBar"

type Props = {}

let upMenuButtons = [
  {
    selected: true,
    title: "Основная информация",
  },
  {
    selected: false,
    title: "Характеристики",
  },
  {
    selected: false,
    title: "Лиги",
  },
]

const CompetitorCardPage = (props: Props) => {
  const navigate = useNavigate()
  const { competitorId } = useParams()
  const {
    isLoading,
    data: competitor,
    error: dataError,
  } = competitorAPI.useFetchCompetitorDataQuery(
    parseInt(competitorId?.valueOf() || "")
  )
  const { isLoading: isMatchesLoading, data: matches } =
    matchAPI.useFetchCompetitorMatchesQuery(
      parseInt(competitorId?.valueOf() || "")
    )

  useEffect(() => {
    if (!competitorId || dataError) navigate("/")
  }, [competitorId, dataError])

  let linkStyles = "text-secondary-500 underline hover:text-secondary-300"

  let competitorPropElements = [
    {
      title: "Вес",
      value: competitor?.weight,
    },
    {
      title: "Рост",
      value: "182 См",
    },
    {
      title: "Начало карьеры",
      value: "2014 Год",
    },
    {
      title: "Город",
      value: "Москва",
    },
    {
      title: "Дата рождения",
      value: "13 Февраля 1989",
    },

    {
      title: "Команда",
      value: (
        <Link className={linkStyles} to="/">
          APMTeam
        </Link>
      ),
    },
    {
      title: "Тренер",
      value: (
        <Link className={linkStyles} to="/">
          Валентин Морозов
        </Link>
      ),
    },
  ]

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
      <div className="w-full p-8">
        <div className="mx-auto h-auto w-5/6 rounded-xl shadow-xl">
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
            <div className="w-auto py-3">
              <img
                className="h-[450px] max-w-[320px] rounded-xl"
                src={profilePhoto}
              />
            </div>
            <div className="w-full">
              <UpMenuBar items={upMenuButtons} />
              <div className="flex gap-6 pt-3 pb-2 text-lg">
                <div className="text-xl font-extrabold text-gray-700">
                  Информация о спортсмене
                </div>
              </div>
              <div>
                <div className="font-semibo text-smld w-11/12 py-2 text-gray-400">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Sapiente molestiae aspernatur totam dolorum qui nostrum? Quasi
                  iusto, delectus doloribus expedita neque cum quisquam ipsam
                  earum ullam omnis, ipsa eius? Iusto dolore eius nemo quaerat
                  eum repudiandae provident accusantium debitis est illum soluta
                  quod excepturi esse, cumque officia placeat perspiciatis qui!
                  earum ullam omnis, ipsa eius? Iusto dolore eius nemo quaerat
                  eum repudiandae provident accusantium debitis est illum soluta
                  quod excepturi esse, cumque officia placeat perspiciatis qui!
                </div>
              </div>
              <div className="flex w-11/12 justify-between gap-12 py-4">
                <div className="grid grid-cols-4 grid-rows-2 gap-12">
                  {competitorPropElements.map((element) => (
                    <div className="flex flex-col gap-1">
                      <div className="text-sm text-gray-400">
                        {element.title}
                      </div>
                      <div className="text-md my-1  font-medium text-gray-700">
                        {element.value}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-12">
                  <div className="flex gap-3">
                    <div className="flex w-1/2 justify-end text-5xl font-extrabold text-secondary-500">
                      {competitor.elo_rating}
                    </div>
                    <div className="text-md font-black ">
                      Место в<br /> рейтинге
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className=" flex w-1/2 justify-end text-5xl font-black text-gray-700">
                      {competitor.id}
                    </div>
                    <div className="text-md font-semibold">
                      Место в<br /> рейтинге
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  return <div></div>
}

export default CompetitorCardPage
