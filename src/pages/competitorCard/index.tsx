import { useNavigate, useParams } from "react-router-dom"
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

type Props = {}

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
    console.log(competitor)
    if (!competitorId || dataError) navigate("/")
  }, [competitorId, dataError])

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
      <div className="w-full p-10">
        <div className="mx-auto w-5/6 rounded-lg shadow-xl">
          <div className="rounded-lg bg-gray-700">
            <div className="flex items-center justify-between py-3 px-5">
              <div className="text-xl font-bold uppercase text-white">
                {getCompetitorFullname(competitor)}
              </div>
              <div className=" cursor-default rounded-full bg-primary-400  px-3 py-1 text-lg font-bold text-white">
                {competitor.elo_rating}
              </div>
            </div>
            <div className="  bg-primary-500 py-3 px-4 text-xl font-bold text-white">
              {getUnicodeFlagIcon("RU")} {competitor.country}
            </div>
          </div>
          <div className="flex gap-10">
            <div className="w-auto">
              <img className="max-w-[300px] rounded-xl" src={profilePhoto} />
            </div>
            <div className="w-full">
              <div className="flex gap-6 pt-3 pb-2 text-lg">
                <div className="text-2xl font-bold text-gray-700">
                  Информация о спортсмене
                </div>
              </div>
              <div>
                <div className="py-2 pr-10 text-sm text-gray-400">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Sapiente molestiae aspernatur totam dolorum qui nostrum? Quasi
                  iusto, delectus doloribus expedita neque cum quisquam ipsam
                  earum ullam omnis, ipsa eius? Iusto dolore eius nemo quaerat
                  eum repudiandae provident accusantium debitis est illum soluta
                  quod excepturi esse, cumque officia placeat perspiciatis qui!
                </div>
              </div>
              <div className="flex gap-12 py-4">
                <div className="grid grid-cols-3 grid-rows-3 gap-12">
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-gray-400">Вес</div>
                    <div className="text-md font-medium text-gray-700">
                      83 Kg
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-gray-400">Рост</div>
                    <div className="text-md font-medium text-gray-700">
                      180 См
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-gray-400">Начало карьеры</div>
                    <div className="text-md font-medium text-gray-700">
                      2014 Год
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-gray-400">Дата рождения</div>
                    <div className="text-md font-medium text-gray-700">
                      13 Февраля 1989
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-gray-400">Дата рождения</div>
                    <div className="text-md font-medium text-gray-700">
                      13 Февраля 1989
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-gray-400">Дата рождения</div>
                    <div className="text-md font-medium text-gray-700">
                      13 Февраля 1989
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-12">
                  <div className="flex gap-3">
                    <div className="text-5xl font-bold text-gray-700">11</div>
                    <div className="text-md font-medium">
                      Место в<br /> рейтинге
                    </div>
                  </div>
                  <div>
                    <button className="rounded-xl bg-secondary-500 px-3 py-2 text-sm text-white transition hover:bg-primary-500">
                      Вся информация <FontAwesomeIcon icon={faArrowRightLong} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            {!isMatchesLoading && matches ? (
              <MatchesList competitor={competitor} matches={matches} />
            ) : (
              <div className="flex w-full items-center justify-center py-16">
                <ColorRing
                  visible={true}
                  height="140"
                  width="140"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    )
}

/*

  <div>
                {!isMatchesLoading && matches ? (
                  <MatchesList competitor={competitor} matches={matches} />
                ) : (
                  <div className="flex w-full items-center justify-center py-16">
                    <ColorRing
                      visible={true}
                      height="140"
                      width="140"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={[
                        "#e15b64",
                        "#f47e60",
                        "#f8b26a",
                        "#abbd81",
                        "#849b87",
                      ]}
                    />
                  </div>
                )}
              </div>

*/

export default CompetitorCardPage
