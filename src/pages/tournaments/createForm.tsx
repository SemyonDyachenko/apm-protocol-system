import { useAppDispatch } from "@/hooks/redux"
import Competitor from "@/models/Competitor"
import Tournament from "@/models/Tournament"
import { competitorAPI } from "@/services/competitorService"
import { leagueAPI } from "@/services/leaugeService"
import {
  TournamentData,
  createTournament,
} from "@/store/actions/tournamentAction"
import { getUsersByMode } from "@/utils/dataUtils"
import { useState } from "react"
import { useForm } from "react-hook-form"

type Props = {}

const TournamentCreateForm = (props: Props) => {
  const dispatch = useAppDispatch()
  const { data: competitors } = competitorAPI.useFetchAllCompetitorQuery(100)
  const { data: leagues } = leagueAPI.useFetchAllLeaguesQuery(10)
  const [leagueOption, setLeagueOption] = useState(0)
  const [refereeOption, setRefereeOption] = useState(0)
  const [secretaryOption, setSecretaryOption] = useState(0)

  const inputStyles =
    "text-md rounded-lg bg-white px-4 py-2 text-gray-700 shadow-xl outline-none"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: any) => {
    const tournament: TournamentData = {
      name: data.name,
      location: data.location,
      description: data.description,
      date: new Date(data.date).toISOString().slice(0, 10),
      address: data.address,
      organizer: 14,
      main_referee: parseInt(data.main_referee),
      main_secretary: parseInt(data.main_secretary),
      league: parseInt(data.league),
    }
    console.log()
    if (data) dispatch(createTournament(tournament))
  }

  return (
    <section id="create" className="py-5">
      <div>
        <div className="px-2">
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit(onSubmit)}
            className="flex max-w-full flex-wrap gap-3"
          >
            <input
              placeholder="Дата и время"
              className={inputStyles}
              type="datetime-local"
              {...register("date", { required: true })}
            />
            <input
              placeholder="Локация"
              className={inputStyles}
              type="text"
              {...register("location", { required: true })}
            />
            <input
              className={inputStyles}
              type="text"
              placeholder="Место"
              {...register("address", { required: true })}
            />
            <input
              className={inputStyles}
              type="text"
              placeholder="Название"
              {...register("name", { required: true })}
            />
            <textarea
              className={inputStyles}
              placeholder="Описание"
              {...register("description", { required: true })}
            ></textarea>
            <select
              value={leagueOption}
              {...register("league")}
              className={inputStyles}
              onChange={(e) => setLeagueOption(parseInt(e.target.value))}
            >
              {leagues?.map((element, index) => (
                <option value={element.id} key={index}>
                  {element.name}
                </option>
              ))}
            </select>
            <select
              value={secretaryOption}
              {...register("main_secretary")}
              className={inputStyles}
              onChange={(e) => {
                setSecretaryOption(parseInt(e.target.value))
              }}
            >
              {getUsersByMode(competitors, "secretary")?.map((element) => (
                <option value={element.id} key={element.email.toString()}>
                  {element.first_name + " " + element.last_name}
                </option>
              ))}
            </select>
            <select
              value={refereeOption}
              {...register("main_referee")}
              className={inputStyles}
              onChange={(e) => {
                setRefereeOption(parseInt(e.target.value))
              }}
            >
              {getUsersByMode(competitors, "judge")?.map((element) => (
                <option value={element.id} key={element.email.toString()}>
                  {element.first_name + " " + element.last_name}
                </option>
              ))}
            </select>

            <input
              type="file"
              className="max-w-[250px]"
              {...register("photo", { required: true })}
            />
            <button className="text-md rounded-lg bg-primary-300 px-5 py-2 font-bold text-white shadow-xl outline-none">
              Добавить
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default TournamentCreateForm
