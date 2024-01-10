import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { useState, useEffect } from "react"
import PageNotFound from "../404/PageNotFound"
import { tournamentAPI } from "@/services/tournamentsService"
import { competitorAPI } from "@/services/competitorService"
import Loader from "@/components/loader"
import { getCompetitorFullname } from "@/models/Competitor"
import { text } from "stream/consumers"
import ActionButton from "@/components/UI/Button"
import { useForm } from "react-hook-form"
import { createMatch } from "@/store/actions/matchAction"

type Props = {}

const TestSystem = (props: Props) => {
  const dispatch = useAppDispatch()
  const { competitor, loading, error } = useAppSelector(
    (state) => state.competitors
  )
  const { data: tournaments, isLoading } =
    tournamentAPI.useFetchTournamentsQuery(1)
  const { data: competitors, isLoading: isLoadingCompetitors } =
    competitorAPI.useFetchAllCompetitorQuery(100)

  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    if (data) {
      dispatch(
        createMatch({
          created_at: new Date().toString(),
          ...data,
        })
      )
    }
  }

  const selectStyles =
    "w-full md:max-w-[240px] outline-none rounded-lg border-r-4 bg-gray-200 py-2 px-4 font-medium"

  if (loading || isLoading || isLoadingCompetitors) return <Loader />

  if (
    competitor &&
    competitor.mode !== "competitor" &&
    tournaments &&
    competitors
  )
    return (
      <div className="mx-auto h-full w-11/12">
        <div className="flex items-center justify-center py-5 md:p-10">
          <div className="h-full w-full rounded-xl border-2 border-gray-200 bg-white p-4 shadow-md md:min-h-[400px] md:max-w-[800px]">
            <div className="flex w-full justify-center pt-2 pb-4 text-xl font-semibold text-gray-700">
              Добавление матчей
            </div>
            <div className="grid gap-x-6 gap-y-4 md:grid-cols-3">
              <div>
                <div className="py-1 text-sm text-gray-400">Турнир:</div>
                <select {...register("tournament")} className={selectStyles}>
                  {tournaments.map((tournament, index) => (
                    <option
                      className="font-medium"
                      key={index}
                      value={tournament.id}
                    >
                      {tournament.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="py-1 text-sm text-gray-400">Спортсмен 1:</div>
                <select
                  {...register("first_competitor")}
                  className={selectStyles}
                >
                  {competitors.map((competitor, index) => (
                    <option
                      className="font-medium"
                      key={index}
                      value={competitor.id}
                    >
                      {getCompetitorFullname(competitor)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="py-1 text-sm text-gray-400">Спортсмен 2:</div>
                <select
                  {...register("second_competitor")}
                  className={selectStyles}
                >
                  {competitors.map((competitor, index) => (
                    <option
                      className="font-medium"
                      key={index}
                      value={competitor.id}
                    >
                      {getCompetitorFullname(competitor)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="py-1 text-sm text-gray-400">Победитель</div>
                <select {...register("winner")} className={selectStyles}>
                  {competitors.map((competitor, index) => (
                    <option
                      className="font-medium"
                      key={index}
                      value={competitor.id}
                    >
                      {getCompetitorFullname(competitor)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="py-1 text-sm text-gray-400">Дата и время:</div>
                <input className={selectStyles} type="datetime-local" />
              </div>
              <div>
                <div className="py-1 text-sm text-gray-400">Рука:</div>
                <select {...register("hand")} className={selectStyles}>
                  <option className="font-medium" value="left">
                    Левая
                  </option>
                  <option className="font-medium" value="right">
                    Правая
                  </option>
                </select>
              </div>
            </div>
            <div className="w-full py-8">
              <ActionButton
                className="w-full py-3 font-semibold"
                onClick={handleSubmit(onSubmit)}
              >
                Добавить матч
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    )
  else return <PageNotFound />
}

export default TestSystem
