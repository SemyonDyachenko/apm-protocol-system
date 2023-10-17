import { CompetitorData } from "@/store/slices/competitorSlice"
import React from "react"
import PersonalDataInput from "./PersonalDataInput"
import { getCompetitorFullname } from "@/models/Competitor"
import { competitorAPI } from "@/services/competitorService"

type Props = {
  competitor: CompetitorData
}

const PropsInfo = ({ competitor }: Props) => {
  const { data: trainer } = competitorAPI.useFetchCompetitorDataQuery(
    Number(competitor.trainer)
  )

  const { data: competitors } = competitorAPI.useFetchAllCompetitorQuery(10)

  return (
    <div>
      <div className="w-full py-2">
        <div className="flex items-center justify-between">
          <div className="text-lg text-gray-400">Подробная информацию</div>
          <div className="cursor-pointer text-sm text-gray-400 underline transition hover:text-gray-700">
            Редактировать
          </div>
        </div>
        <div className="grid w-2/3 grid-cols-3 gap-4 pt-4">
          <div>
            <div
              className={`"text-gray-400" } 
             pb-2
              text-sm font-medium`}
            >
              Тренер:
            </div>
            <select
              className=" rounded-lg border-r-8 border-gray-200 bg-gray-200 py-[10px] px-3 font-medium text-gray-700"
              defaultValue="Тренер"
            >
              {competitors &&
                competitors.map((element, index) => (
                  <option className="font-medium text-gray-700" key={index}>
                    {getCompetitorFullname(element)}
                  </option>
                ))}
            </select>
          </div>
          <PersonalDataInput
            value={competitor?.birthdate}
            type="date"
            title="Дата рождения"
            disabled={false}
          />
          <PersonalDataInput
            value={competitor?.height?.toString()}
            title="Рост"
            disabled={false}
          />

          <PersonalDataInput
            disabled={false}
            value={competitor?.city}
            title="Город"
          />
          <PersonalDataInput
            value={competitor?.weight.toString()}
            title="Вес"
            disabled={false}
          />

          <PersonalDataInput
            value={competitor?.career_start_date}
            title="Начало карьеры"
            type="date"
            disabled={false}
          />
          <div>
            <div
              className={`"text-gray-400" } 
             pb-2
              text-sm font-medium`}
            >
              Описание:
            </div>
            <textarea className=" w-[500px] rounded-lg border-none bg-gray-200 px-4 py-2 font-medium text-gray-700 outline-none"></textarea>
          </div>
        </div>
        <div className="py-3">
          <button
            disabled={true}
            className="rounded-lg px-8 py-2 font-medium text-gray-700 transition enabled:bg-secondary-500 enabled:hover:bg-secondary-400 disabled:bg-gray-400 "
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropsInfo
