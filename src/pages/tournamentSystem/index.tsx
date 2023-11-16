import { tournamentAPI } from "@/services/tournamentsService"
import { useEffect, useState } from "react"
import { useParams, useNavigate, matchPath } from "react-router-dom"

import { competitorAPI } from "@/services/competitorService"
import Match from "@/models/Match"
import Competitor, { getCompetitorFullname } from "@/models/Competitor"
import { findCompetitorById } from "@/utils/dataUtils"
import { match } from "assert"
import HText from "@/components/UI/HText"
/*
type Props = {}

interface Round {
  index: number
  name: string
  group1?: Competitor[]
  group2?: Competitor[]
  loosers: Competitor[]
  winners: Competitor[]
}

const TournamentSystem = (props: Props) => {
  const navigate = useNavigate()
  const { tournamentId } = useParams()
  const { data: tournament } = tournamentAPI.useFetchTournamentQuery(
    parseInt(tournamentId?.valueOf() || "")
  )
  const { data: tournamentRegistrations } =
    tournamentAPI.useFetchTournamentRegistrationQuery(
      parseInt(tournamentId?.valueOf() || "")
    )
  const matchButtonStyles =
    "min-w-[280px] cursor-pointer rounded-lg bg-slate-100 py-3 px-10 text-lg font-bold text-gray-700 shadow-md transition hover:bg-green-500 hover:text-white"

  const [round, setRound] = useState(1)
  const { data: competitors } = competitorAPI.useFetchAllCompetitorQuery(100)
  const [competitorsList, setCompetitorsList] = useState<Competitor[]>(
    competitors ? competitors : []
  )
  const [rounds, setRounds] = useState<Round[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  const [finished, setFinished] = useState<Match[]>([])
  const [loosers, setLoosers] = useState<Competitor[]>([])
  const [winners, setWinners] = useState<Competitor[]>([])

  const getTournamentCompetitors = () => {
    let tournamentCompetitors: Competitor[] = []
    if (competitors) {
      tournamentRegistrations?.forEach((element) => {
        const competitor = findCompetitorById(competitors, element.competitor)
        if (competitor) tournamentCompetitors.push(competitor)
      })
    }
    return tournamentCompetitors
  }

  const createGroups = (competitorList: Competitor[]) => {
    const groupA = getTournamentCompetitors().slice(
      0,
      getTournamentCompetitors().length / 2
    )
    const groupB = getTournamentCompetitors().slice(
      getTournamentCompetitors().length / 2
    )
    return { group1: groupA, group2: groupB }
  }

  const generateMatches = (groupA: Competitor[], groupB: Competitor[]) => {
    const newMatches: Match[] = []

    const createMatches = (group: any) => {
      let competitorsCount = 0
      if (group.length % 2) {
        competitorsCount = group.length
      } else {
        competitorsCount = group.length - 1
        groupA.filter((_, index) => index === groupA.length - 1)
        groupB.push(groupA[groupA.length - 1])
      }

      const length = group.length % 2 ? group.length : group.length - 1
      for (let i = 0; i < length; i += 2) {
        if (i + 1 < length) {
          const match = {
            hand: "Right",
            tournament: parseInt(tournamentId?.valueOf() || ""),
            first_competitor: group[i].id,
            second_competitor: group[i + 1].id,
            weight_class: 1,
            date: new Date().toLocaleDateString(),
            round: round,
          }
          newMatches.push(match)
        }
      }
    }

    createMatches(groupA)
    createMatches(groupB)

    console.log(groupA, groupB)
    console.log(newMatches)
    setMatches(newMatches)
  }

  const selectWinner = (match: Match, id: number, looserId: number) => {
    matches.map((element) => {
      if (element == match) {
        return {
          ...element,
          winner: id,
        }
      }
    })
    if (competitors) {
      const winnerCompetitor = findCompetitorById(competitors, id)
      winnerCompetitor && setWinners([...winners, winnerCompetitor])
      const looserCompetitor = findCompetitorById(competitors, looserId)
      looserCompetitor && setLoosers([...loosers, looserCompetitor])
    }

    const mtch = matches.find((element) => element === match)
    mtch && setFinished([...finished, mtch])
    setMatches(matches.filter((value) => value !== match))

    if (matches.length === 1) {
      const newRound: Round = {
        index: round,
        name: `Round ${round.toString()}`,
        loosers,
        winners,
      }
      setRounds([...rounds, newRound])
      setRound(round + 1)
      console.log(loosers, winners)
      generateMatches(loosers, winners)
    }
  }

  useEffect(() => {
    if (tournament && !tournament?.is_started) {
      navigate("/")
    }
  }, [tournament, navigate])

  if (competitors && tournament && tournament?.is_started)
    return (
      <div className="min-h-[500px]">
        <div className="flex w-full justify-between">
          <div className="w-2/5 p-10">
            <div>
              <TournamentCompetitorsList
                tournamentRegistrations={tournamentRegistrations}
                competitors={competitors}
                tournament={tournament}
              />
            </div>
          </div>
          <div className="p-10">
            <div className="mb-4 flex justify-end">
              <button
                onClick={() =>
                  generateMatches(
                    createGroups(competitorsList).group1,
                    createGroups(competitorsList).group2
                  )
                }
                className="rounded-lg bg-green-500 px-10 py-2 text-lg text-white shadow-md transition-all hover:bg-green-400"
              >
                Начать
              </button>
            </div>
            <div>
              {matches
                .map((element, index) => (
                  <div
                    className={`my-4 rounded-2xl bg-gray-400 px-10 py-4 shadow-md ${
                      index === 1 && "bg-gray-200"
                    }`}
                    key={index}
                  >
                    <div className="flex items-center justify-between gap-12">
                      <button
                        className={matchButtonStyles}
                        onClick={() =>
                          selectWinner(
                            element,
                            findCompetitorById(
                              competitors,
                              element.first_competitor
                            )?.id || 0,
                            element.second_competitor
                          )
                        }
                      >
                        {getCompetitorFullname(
                          findCompetitorById(
                            competitors,
                            element.first_competitor
                          )
                        )}
                      </button>
                      <div className="text-xl font-bold text-gray-700">VS</div>
                      <button
                        className={matchButtonStyles}
                        onClick={() =>
                          selectWinner(
                            element,
                            findCompetitorById(
                              competitors,
                              element.second_competitor
                            )?.id || 0,
                            element.first_competitor
                          )
                        }
                      >
                        {getCompetitorFullname(
                          findCompetitorById(
                            competitors,
                            element.second_competitor
                          )
                        )}
                      </button>
                    </div>
                  </div>
                ))
                .slice(0, 2)}
            </div>
            <div>
              <HText>Прошедшие матчи</HText>
            </div>
            <div>
              {finished.map((element, index) => (
                <div
                  className={`my-4 rounded-2xl bg-gray-400 px-10 py-4 shadow-md ${
                    index === 1 && "bg-gray-200"
                  }`}
                  key={index}
                >
                  <div className="flex items-center justify-between gap-12">
                    <button
                      className={`${matchButtonStyles} ${
                        element.first_competitor === element.winner &&
                        "bg-green-400"
                      }`}
                    >
                      {getCompetitorFullname(
                        findCompetitorById(
                          competitors,
                          element.first_competitor
                        )
                      )}
                    </button>
                    <div className="text-xl font-bold text-gray-700">VS</div>
                    <button
                      className={`${matchButtonStyles} ${
                        element.second_competitor === element.winner &&
                        "bg-green-400"
                      }`}
                    >
                      {getCompetitorFullname(
                        findCompetitorById(
                          competitors,
                          element.second_competitor
                        )
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  else return <div>Page Not Found.</div>
}

export default TournamentSystem
*/
