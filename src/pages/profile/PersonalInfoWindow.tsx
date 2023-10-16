import { CompetitorData } from "@/store/slices/competitorSlice"
import profilePhoto from "/assets/profilePage.png"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useAppDispatch } from "@/hooks/redux"
import {
  updateCompetitorImage,
  updateCompetitorProfile,
} from "@/store/actions/competitorAction"

type Props = {
  competitor: CompetitorData | null
}

type InputProps = {
  value: string | undefined
  title: string
  disabled?: boolean
  onChange?: (target: any) => void
}

const PersonalDataInput = ({
  value,
  title,
  disabled = true,
  onChange,
}: InputProps) => {
  return (
    <div>
      <p
        className={`pb-2 text-sm ${
          disabled ? "text-gray-400" : "font-medium text-gray-700"
        }`}
      >
        {title}:{" "}
      </p>
      <input
        className="w-[260px] rounded-lg  px-4 py-2 font-medium text-gray-700 outline-none enabled:bg-gray-200 disabled:bg-none"
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  )
}

const PersonalInfoWindow = ({ competitor }: Props) => {
  const dispatch = useAppDispatch()
  const [formIsDisabled, setFormIsDisabled] = useState(true)
  const [firstnameValue, setFirstnameValue] = useState(competitor?.first_name)
  const [lastnameValue, setLastnameValue] = useState(competitor?.last_name)
  const [countryValue, setCountryValue] = useState(competitor?.country)

  useEffect(() => {
    if (competitor) console.log(competitor.image)
  }, [])

  function clearUnsaveValues() {
    setFirstnameValue(competitor?.first_name)
    setLastnameValue(competitor?.last_name)
    setCountryValue(competitor?.country)
  }

  const updateProfile = () => {
    if (firstnameValue && lastnameValue && countryValue) {
      console.log(true)
      competitor &&
        dispatch(
          updateCompetitorProfile(
            competitor.id,
            firstnameValue,
            lastnameValue,
            countryValue
          )
        ).then((value) => setFormIsDisabled(true))
    }
  }

  const updateProfileImage = (data: any) => {
    console.log(data)
    competitor && dispatch(updateCompetitorImage(competitor.id, data))
  }

  return (
    <div>
      <div className="flex items-center justify-between text-sm text-gray-400">
        <div>Фотография профиля</div>
        <div
          onClick={() => {
            setFormIsDisabled(!formIsDisabled)
            if (!formIsDisabled) clearUnsaveValues()
          }}
          className="cursor-pointer underline transition hover:opacity-50"
        >
          {formIsDisabled ? "Редактировать" : "Отменить"}
        </div>
      </div>
      <div className="flex w-full items-start gap-8">
        <div className="w-1/5 text-center">
          <div className="py-3">
            {competitor && (
              <img
                className="h-[300px] rounded-xl"
                src={competitor.image?.toString()}
                alt="user pictures"
              />
            )}
          </div>
          <div>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  updateProfileImage(e.target.files[0])
                }
              }}
              accept="image/png, image/jpeg"
              className="w-full rounded-lg bg-secondary-500 py-2 shadow-md transition hover:bg-secondary-300"
            />

            <button className="px-10 pt-2 text-sm text-gray-300 hover:text-gray-700">
              Удалить фото
            </button>
          </div>
        </div>
        <div className="py-3 pl-10">
          <div className="text-lg text-gray-400">Основная информация</div>
          <div className="grid grid-cols-2 gap-4 py-4">
            <PersonalDataInput value={competitor?.email} title="E-mail" />
            <PersonalDataInput
              disabled={formIsDisabled}
              value={firstnameValue}
              title="Имя"
              onChange={(e) => setFirstnameValue(e.target.value)}
            />
            <PersonalDataInput
              disabled={formIsDisabled}
              value={lastnameValue}
              onChange={(e) => setLastnameValue(e.target.value)}
              title="Фамилмя"
            />
            <PersonalDataInput
              disabled={formIsDisabled}
              value={countryValue}
              onChange={(e) => setCountryValue(e.target.value)}
              title="Страна"
            />
            <PersonalDataInput
              value={competitor?.gender === "m" ? "Мужской" : "Женский"}
              title="Пол"
            />
            <PersonalDataInput
              value={
                competitor?.is_active ? "E-mail подтвержден" : "Не подтвержден"
              }
              title="Статус"
            />

            <div>
              <button
                onClick={() => updateProfile()}
                disabled={formIsDisabled}
                className="rounded-md bg-secondary-500 py-2 px-4 font-medium text-gray-700 transition enabled:hover:bg-secondary-300 disabled:bg-gray-300 disabled:text-gray-400"
              >
                Обновить информацию
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfoWindow
