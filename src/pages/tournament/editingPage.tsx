import ActionButton from "@/components/UI/Button"
import Competitor, { getCompetitorFullname } from "@/models/Competitor"
import Tournament from "@/models/Tournament"
import { competitorAPI } from "@/services/competitorService"
import { leagueAPI } from "@/services/leaugeService"
import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import League from "@/models/League"
import { weightClassAPI } from "@/services/weightClassService"
import Checkbox from "@/components/UI/Checkbox"
import Select from "react-select"
import ValueType from "react-select"
import OptionTypeBase from "react-select"
import WeightClassCreation from "@/components/modals/weightClass"

type Props = {
  tournament: Tournament
  setData: (data: any) => void
  setLeague: (data: League) => void
}

interface OptionType {
  value: number
  label: string
}

const EditingPage = ({ tournament, setData, setLeague }: Props) => {
  const inputStyle = "bg-gray-200 rounded-lg py-2 px-4 outline-none w-[240px]"
  const { data: competitors } = competitorAPI.useFetchAllCompetitorQuery(100)
  const { data: leagues } = leagueAPI.useFetchAllLeaguesQuery(15)
  const { data: weightclasses } = weightClassAPI.useFetchWeightClassesQuery(100)
  const [saved, setSaved] = useState(false)

  // weight categiores
  const [selectedOptions, setSelectedOptions] = useState<Array<OptionType>>([])
  const [weightOptions, setWeightOptions] = useState<Array<OptionType>>([])
  const [weightClassWindow, openWeightClassWindow] = useState(true)

  useEffect(() => {
    if (weightclasses && weightOptions.length === 0)
      weightclasses.forEach((item, index) => {
        setWeightOptions((prev) => [
          { value: item.id, label: item.name },
          ...prev,
        ])
      })
  }, [saved])

  useEffect(() => {
    if (saved) {
      // Устанавливаем таймер для изменения значения обратно на false через 5 секунд
      const timeoutId = setTimeout(() => {
        setSaved(false)
      }, 1500)

      // Очистка таймера при размонтировании компонента или изменении значения `saved`
      return () => clearTimeout(timeoutId)
    }
  }, [saved])

  const { register, handleSubmit, getValues } = useForm()

  const onSubmit = (data: any) => {
    setData(data)
    if (leagues) {
      let league = leagues?.find(
        (item: any) => item.id === +getValues("league")
      )

      if (league) setLeague(league)
    }
    setSaved(true)
  }

  const handleChange = (selectedValues: Array<OptionType>) => {
    setSelectedOptions(selectedValues)
  }

  return (
    <div>
      <div className="w-full py-2">
        <div className="py-1 text-sm text-gray-400 ">Описание:</div>
        <div>
          <textarea
            defaultValue={tournament.description}
            {...register("description")}
            className="min-h-[150px] w-full rounded-lg bg-gray-200 px-4 py-3 outline-none"
          ></textarea>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-y-4 pb-4 md:grid-cols-4">
        <div>
          <div className="py-1 text-sm text-gray-400">Лига:</div>
          <div>
            {leagues && (
              <select
                className={`${inputStyle} border-r-8`}
                defaultValue={tournament.league}
                {...register("league")}
              >
                {leagues.map((element, index) => (
                  <option key={index} value={element.id}>
                    {element.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        <div>
          <div className="py-1 text-sm text-gray-400">Дата проведения:</div>
          <div>
            <input
              defaultValue={tournament.date}
              className={inputStyle}
              type="date"
              {...register("date")}
            />
          </div>
        </div>
        <div>
          <div className="py-1 text-sm text-gray-400">Город:</div>
          <div>
            <input
              defaultValue={tournament.location}
              className={inputStyle}
              type="text"
              {...register("city")}
            />
          </div>
        </div>
        <div>
          <div className="py-1 text-sm text-gray-400">Телефон:</div>
          <div>
            <input
              defaultValue={tournament.phone}
              className={inputStyle}
              type="text"
              {...register("phone")}
            />
          </div>
        </div>
        <div>
          <div className="py-1 text-sm text-gray-400">Статус:</div>
          <div>
            <select
              className={`${inputStyle} border-r-8`}
              defaultValue={tournament.level}
              {...register("level")}
            >
              <option value="pro">Профессиональный</option>
              <option value="casual">Любительский</option>
            </select>
          </div>
        </div>
        <div>
          <div className="py-1 text-sm text-gray-400">Судья:</div>
          <div>
            {competitors && (
              <select
                defaultValue={tournament.main_referee}
                className={`${inputStyle} border-r-8`}
                {...register("judge")}
              >
                {competitors
                  .filter((item) => item.mode === "judge")
                  .map((competitor, index) => (
                    <option key={index} value={competitor.id}>
                      {getCompetitorFullname(competitor)}
                    </option>
                  ))}
              </select>
            )}
          </div>
        </div>
        <div>
          <div className="py-1 text-sm text-gray-400">Секретарь:</div>
          <div>
            {competitors && (
              <select
                defaultValue={tournament.main_secretary}
                {...register("secretary")}
                className={`${inputStyle} border-r-8`}
              >
                {competitors
                  .filter((item) => item.mode === "secretary")
                  .map((competitor, index) => (
                    <option key={index} value={competitor.id}>
                      {getCompetitorFullname(competitor)}
                    </option>
                  ))}
              </select>
            )}
          </div>
        </div>
        <div>
          <div className="py-1 text-sm text-gray-400">Афиша:</div>
          <label className="">
            <label className="w-full cursor-pointer rounded-lg bg-gray-700 px-4 py-2 font-medium text-white transition hover:bg-gray-600 ">
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="hover:bg-secondary-00 hidden w-full rounded-lg bg-secondary-500 py-2 shadow-md transition"
              />
              Загрузить
            </label>
          </label>
        </div>
        <div>
          <div>
            <div className="py-1 text-sm text-gray-400">Весовые категории:</div>
            <Select
              className="z-[25]"
              options={weightOptions}
              isMulti
              value={selectedOptions}
              onChange={() => handleChange}
            />
          </div>
        </div>
        <div className="mx-4">
          <div className="py-1 text-sm text-gray-400">Новая категория:</div>
          <ActionButton onClick={() => openWeightClassWindow(true)}>
            Создать категорию
          </ActionButton>
        </div>
      </div>
      <div className="flex items-end gap-4 pb-2">
        <ActionButton
          className="font-medium disabled:bg-gray-400"
          disabled={saved}
          onClick={handleSubmit(onSubmit)}
        >
          Сохранить
        </ActionButton>
        <motion.div
          initial={{ opacity: 0.3 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: false, amount: 0.5 }}
          className={`${!saved && "hidden"}`}
        >
          <div className="py-2 text-sm text-gray-400">
            <FontAwesomeIcon className="mr-1 text-green-500" icon={faCheck} />
            <span>Изменения сохранены</span>
          </div>
        </motion.div>
      </div>
      <WeightClassCreation
        visible={weightClassWindow}
        closeFunc={() => openWeightClassWindow(false)}
      />
    </div>
  )
}

export default EditingPage
