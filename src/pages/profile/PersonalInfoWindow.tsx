import { CompetitorData } from "@/store/slices/competitorSlice"
import profilePhoto from "/assets/profilePage.png"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useAppDispatch } from "@/hooks/redux"
import {
  updateCompetitorImage,
  updateCompetitorProfile,
} from "@/store/actions/competitorAction"
import PersonalDataInput from "./PersonalDataInput"

type Props = {
  competitor: CompetitorData | null
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
                className="h-[300px] w-full rounded-xl"
                src={
                  competitor.image?.toString() ||
                  "assets/utils/nonuserimage.jpg"
                }
                alt="user pictures"
              />
            )}
          </div>
          <div>
            <label className="w-full cursor-pointer rounded-lg bg-secondary-500 py-2 font-medium text-gray-700 transition hover:bg-secondary-400 ">
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    updateProfileImage(e.target.files[0])
                    //window.location.reload()
                  }
                }}
                accept="image/png, image/jpeg"
                className="hidden w-full rounded-lg bg-secondary-500 py-2 shadow-md transition hover:bg-secondary-300"
              />
              Обновить фото
            </label>

            <button className="px-10 pt-3 text-sm text-gray-400 hover:text-gray-700">
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
              title="Фамилия"
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
