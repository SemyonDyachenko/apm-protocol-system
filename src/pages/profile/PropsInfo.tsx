import { CompetitorData } from "@/store/slices/competitorSlice"

import PersonalDataInput from "./PersonalDataInput"
import { getCompetitorFullname } from "@/models/Competitor"
import { competitorAPI } from "@/services/competitorService"
import { useAppDispatch } from "@/hooks/redux"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { updateCompetitorProps } from "@/store/actions/competitorAction"
import { isDataView } from "util/types"

type Props = {
  competitor: CompetitorData
}

const PropsInfo = ({ competitor }: Props) => {
  const dispatch = useAppDispatch()

  const [trainerInput, setTrainer] = useState(competitor.trainer)
  const [birthdateInput, setBirthdate] = useState(competitor.birthdate)
  const [height, setHeight] = useState(competitor.height)
  const [weight, setWeight] = useState(competitor.weight)
  const [city, setCity] = useState(competitor.city)
  const [career, setCareer] = useState(competitor.career_start_date)
  const [description, setDescription] = useState(competitor.description)

  const { data: competitors } = competitorAPI.useFetchAllCompetitorQuery(10)
  const [isDisabled, setIsDisabled] = useState(true)

  const updateProps = () => {
    competitor &&
      dispatch(
        updateCompetitorProps(
          competitor.id,
          Number(trainerInput),
          birthdateInput,
          Number(height),
          city,
          Number(weight),
          career,
          description
        )
      )
  }

  return (
    <div>
      <div className="w-full py-2">
        <div className="flex items-center justify-between">
          <div className="text-lg text-gray-400">Подробная информация</div>
          <div
            onClick={() => setIsDisabled(!isDisabled)}
            className="cursor-pointer text-sm text-gray-400 underline transition hover:text-gray-700"
          >
            {isDisabled ? "Редактировать" : "Отменить"}
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-4 pt-4 md:w-2/3 md:grid-cols-3">
          <div>
            <div
              className={`${isDisabled && "text-gray-400"} 
             pb-2
              text-sm font-medium`}
            >
              Тренер:
            </div>
            <select
              className=" rounded-lg border-r-8 border-gray-200 bg-gray-200 py-[10px] px-3 font-medium text-gray-700"
              onChange={(e) => setTrainer(Number(e.target.value))}
              disabled={isDisabled}
              value={trainerInput}
            >
              {competitors &&
                competitors
                  .filter((item) => item.id !== competitor.id) // removes an authorized user from the list
                  .map((element, index) => (
                    <option
                      value={element.id}
                      className="font-medium text-gray-700"
                      key={index}
                    >
                      {getCompetitorFullname(element)}
                    </option>
                  ))}
            </select>
          </div>
          <PersonalDataInput
            value={birthdateInput}
            onChange={(e) => setBirthdate(e.target.value)}
            type="date"
            title="Дата рождения"
            disabled={isDisabled}
          />
          <PersonalDataInput
            value={height?.toString()}
            onChange={(e) => setHeight(e.target.value)}
            title="Рост"
            disabled={isDisabled}
          />

          <PersonalDataInput
            disabled={isDisabled}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            title="Город"
          />
          <PersonalDataInput
            value={weight.toString()}
            title="Вес"
            onChange={(e) => setWeight(e.target.value)}
            disabled={isDisabled}
          />

          <PersonalDataInput
            value={career}
            onChange={(e) => setCareer(e.target.value)}
            title="Начало карьеры"
            type="date"
            disabled={isDisabled}
          />
          <div>
            <div
              className={`"text-gray-400" } 
             pb-2
              text-sm font-medium`}
            >
              Описание:
            </div>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-lg border-none px-4 py-2 font-medium text-gray-700 outline-none enabled:bg-gray-200 disabled:overflow-hidden md:w-[650px]"
              defaultValue={description}
              disabled={isDisabled}
            ></textarea>
          </div>
        </div>
        <div className="py-3">
          <button
            onClick={() => {
              updateProps()
              setIsDisabled(true)
              window.location.reload()
            }}
            disabled={isDisabled}
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
