import HText from "@/components/UI/HText"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import WeightClass from "@/models/WeightClass"
import { competitorAPI } from "@/services/competitorService"
import { matchAPI } from "@/services/matchService"
import { tournamentAPI } from "@/services/tournamentsService"
import { weightClassAPI } from "@/services/weightClassService"
import {
  getCompetitor,
  getCompetitorData,
} from "@/store/actions/competitorAction"
import { MatchData, createMatch } from "@/store/actions/matchAction"
import { updateCompetitorRating } from "@/store/actions/ratingActions"
import {
  changeTournamentStatus,
  registerForTournament,
} from "@/store/actions/tournamentAction"
import { getNormalizeDate } from "@/utils/date"
import { calculateEloRating } from "@/utils/eloCalculation"
import { useState } from "react"
import { Table } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { Link, useParams } from "react-router-dom"

type Props = {}

const TournamentPage = (props: Props) => {
  const dispatch = useAppDispatch()
  const { tournamentId } = useParams()
  const { data: tournament } = tournamentAPI.useFetchTournamentQuery(
    parseInt(typeof tournamentId === "string" ? tournamentId : "0")
  )
  const { data: competitors } = competitorAPI.useFetchAllCompetitorQuery(1000)
  const { data: weightClasses } = weightClassAPI.useFetchWeightClassesQuery(10)
  const { data: tournamentRegistrations } =
    tournamentAPI.useFetchTournamentRegistrationQuery(
      tournamentId ? parseInt(tournamentId) : 0
    )
  const { data: matches } = matchAPI.useFetchMatchesQuery(
    parseInt(typeof tournamentId === "string" ? tournamentId : "0")
  )

  const [handSelect, setHandSelect] = useState("Right")

  const findCompetitorById = (id: number) => {
    if (competitors) return competitors.find((element) => element.id === id)
    else return null
  }

  const {
    competitor: user,
    loading,
    error,
  } = useAppSelector((state) => state.competitors)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { register: tournamentRegRegister, handleSubmit: handlSubmit } =
    useForm()

  const onSubmit = async (data: any) => {
    let nowDate = new Date()
    const matchData: MatchData = {
      created_at: nowDate.toISOString(),
      date: data.date,
      hand: handSelect,
      tournament: parseInt(
        typeof tournamentId === "string" ? tournamentId : "0"
      ),
      weight_class: parseInt(data.weightclass),
      first_competitor: parseInt(data.competitor1),
      second_competitor: parseInt(data.competitor2),
      winner: parseInt(data.winner),
    }

    dispatch(createMatch(matchData))

    // rating
    const firstCompetitor = await getCompetitor(matchData.first_competitor)
    const secondCompetitor = await getCompetitor(matchData.second_competitor)
    const ratings: number[] = calculateEloRating(
      matchData.first_competitor,
      matchData.second_competitor,
      firstCompetitor?.elo_rating ? firstCompetitor?.elo_rating : 0,
      secondCompetitor?.elo_rating ? secondCompetitor?.elo_rating : 0,
      matchData.winner,
      30,
      10,
      1.5
    )
    console.log(ratings)
    dispatch(
      updateCompetitorRating({
        id: matchData.first_competitor,
        elo_rating: ratings[0],
      })
    )
    dispatch(
      updateCompetitorRating({
        id: matchData.second_competitor,
        elo_rating: ratings[1],
      })
    )
  }

  const onRegisterForTournament = async (data: any) => {
    dispatch(getCompetitorData(localStorage.getItem("token")))
    console.log(data)
    if (tournamentId && user && weightClasses) {
      const getWeightClassId = () => {
        const id = weightClasses.find(
          (weightClass: WeightClass) => weightClass.name === data.weight_class
        )?.id
        return id ? id : 0
      }

      console.log("hello world")
      dispatch(
        registerForTournament({
          tournament: parseInt(tournamentId),
          competitor: user.id,
          weight_class: getWeightClassId(),
        })
      )
    }
  }

  const startTournament = () => {
    tournamentId &&
      dispatch(changeTournamentStatus(parseInt(tournamentId), true))
  }

  return (
    <div className="p-5">
      {tournament && tournamentId ? (
        <div>
          <div className="">
            <HText> {tournament.name}</HText>
          </div>

          <div className="flex gap-4 py-2">
            <div>Локация: {tournament.location} </div>
            <div>Место: {tournament.address}</div>
          </div>
          <div className="flex gap-4">
            <div>
              {findCompetitorById(tournament.main_secretary)?.first_name +
                " " +
                findCompetitorById(tournament.main_secretary)?.last_name}
            </div>
            <div>
              Судья:{" "}
              {findCompetitorById(tournament.main_referee)?.first_name +
                " " +
                findCompetitorById(tournament.main_referee)?.last_name}
            </div>
          </div>
          <div>
            <div>Дата проведения: {getNormalizeDate(tournament.date)}</div>
          </div>
          <div className="flex gap-4 py-3">
            <div>
              <Link to={`/tournaments/system/${tournamentId}`}>
                {!tournament.is_started ? (
                  <button
                    className="w-[280px] rounded-lg bg-secondary-500 py-3 text-lg font-bold text-white shadow-md transition hover:bg-primary-300"
                    onClick={startTournament}
                  >
                    Начать турнир
                  </button>
                ) : (
                  <button className="w-[280px] rounded-lg bg-secondary-500 py-3 text-lg font-bold text-white shadow-md transition hover:bg-primary-300">
                    Протокол турнира
                  </button>
                )}
              </Link>
            </div>
            <div className="">
              <form
                className="flex gap-4"
                onSubmit={handlSubmit(onRegisterForTournament)}
              >
                <div>
                  <select
                    {...tournamentRegRegister("weight_class")}
                    className="rounded-lg border-r-8 border-secondary-500 bg-secondary-500 px-10 py-3 text-lg font-bold text-white"
                  >
                    <option value="95+">95+</option>
                    <option value="95">95</option>
                    <option value="75">75</option>
                  </select>
                </div>
                <div>
                  <button className="rounded-lg bg-primary-400 px-16 py-3 text-lg font-bold text-white transition hover:bg-primary-200">
                    Подать заявку
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex items-center justify-between py-4">
            <div>
              <HText>Участники турнира</HText>
            </div>
          </div>
          <div className="rounded-xl bg-secondary-400 py-3">
            <div id="table" className="p-2">
              <Table
                striped
                hover
                className="mx-auto rounded-lg  bg-white px-10 pb-0"
              >
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Спортсмен</th>
                    <th>Дата регистрации</th>
                    <th>Рейтинг</th>
                  </tr>
                </thead>
                <tbody>
                  {tournamentRegistrations &&
                    competitors &&
                    tournamentRegistrations.map((element, index) => (
                      <tr key={index}>
                        <td>{element.id}</td>
                        <td>
                          {findCompetitorById(element.competitor)?.first_name +
                            " " +
                            findCompetitorById(element.competitor)?.last_name}
                        </td>
                        <td>{getNormalizeDate(element.registration_date)}</td>
                        <td>
                          {findCompetitorById(element.competitor)?.elo_rating}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="flex items-center justify-between py-4">
            <div>
              <HText>Матчи</HText>
            </div>
            <div>
              <button className="rounded-full bg-primary-300 px-5 py-2 font-bold text-white shadow-xl">
                Сохранить
              </button>
            </div>
          </div>
          <div className="rounded-xl bg-secondary-400 py-3">
            <div id="table" className="p-2">
              <Table
                striped
                hover
                className="mx-auto rounded-lg  bg-white px-10 pb-0"
              >
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Турнир</th>
                    <th>Дата и время</th>
                    <th>Рука</th>
                    <th>Участник 1</th>
                    <th>Участник 2</th>
                    <th>Победитель</th>
                  </tr>
                </thead>
                <tbody>
                  {matches &&
                    matches.map((element, index) => (
                      <tr key={index}>
                        <td>{element.id}</td>
                        <td>{tournament.name}</td>
                        <td>{getNormalizeDate(element.date)}</td>
                        <td>{element.hand === "Right" ? "Правая" : "Левая"}</td>
                        <td>
                          {findCompetitorById(element.first_competitor)
                            ?.first_name +
                            " " +
                            findCompetitorById(element.first_competitor)
                              ?.last_name}
                        </td>
                        <td>
                          {findCompetitorById(element.second_competitor)
                            ?.first_name +
                            " " +
                            findCompetitorById(element.second_competitor)
                              ?.last_name}
                        </td>
                        <td>
                          {element.winner &&
                            findCompetitorById(element.winner)?.first_name +
                              " " +
                              findCompetitorById(element.winner)?.last_name}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
            <div className="px-2">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex max-w-full flex-wrap gap-3"
              >
                <input
                  className="text-md rounded-lg bg-white px-4 py-2 text-gray-700 shadow-xl outline-none"
                  placeholder="Дата и время"
                  type="datetime-local"
                  {...register("date", { required: true })}
                />
                <select
                  value={handSelect}
                  onChange={(e) => setHandSelect(e.target.value)}
                  className="text-md rounded-lg border-r-8 border-white bg-white px-5 py-2 pl-3 text-gray-700 shadow-xl outline-none"
                >
                  <option value="Right">Правая</option>
                  <option value="Left">Левая</option>
                </select>
                <input
                  className="text-md rounded-lg bg-white px-3 py-2 text-gray-700 shadow-xl outline-none"
                  type="text"
                  placeholder="Весовая категория"
                  {...register("weightclass", { required: true })}
                />
                <input
                  className="text-md rounded-lg bg-white px-3 py-2 text-gray-700 shadow-xl outline-none"
                  type="text"
                  placeholder="Участник 1"
                  {...register("competitor1", { required: true })}
                />
                <input
                  className="text-md rounded-lg bg-white px-3 py-2 text-gray-700 shadow-xl outline-none"
                  type="text"
                  placeholder="Участник 2"
                  {...register("competitor2", { required: true })}
                />

                <input
                  className="text-md rounded-lg bg-white px-3 py-2 text-gray-700 shadow-xl outline-none"
                  type="text"
                  placeholder="Победитель"
                  {...register("winner", { required: true })}
                />
                <button className="text-md rounded-lg bg-primary-300 px-5 py-2 font-bold text-white shadow-xl outline-none">
                  Добавить
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[300px] py-5">
          <div className="flex  items-center justify-center">
            <HText>Информация о турнире не найдена</HText>
          </div>
          <div className="flex justify-center py-3">
            <Link
              to="/tournaments"
              className="rounded-lg bg-secondary-400 px-5 py-2 text-gray-600 shadow-md transition hover:bg-primary-300 hover:text-white"
            >
              Вернуться назад
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default TournamentPage
