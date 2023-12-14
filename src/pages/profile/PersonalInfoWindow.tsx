import { CompetitorData } from "@/store/slices/competitorSlice"
import profilePhoto from "/assets/profilePage.png"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useAppDispatch } from "@/hooks/redux"
import {
  deleteCompetitorImage,
  updateCompetitorImage,
  updateCompetitorProfile,
} from "@/store/actions/competitorAction"
import PersonalDataInput from "./PersonalDataInput"
import { formatPhoneInput } from "@/utils/input"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

import NonImage from "/assets/utils/nonuserimage.jpg"
import { getCountriesList } from "@/utils/dataUtils"
import ConfirmModal from "@/components/modals/confirmModal"

type Props = {
  competitor: CompetitorData | null
}

const PersonalInfoWindow = ({ competitor }: Props) => {
  const dispatch = useAppDispatch()
  const [formIsDisabled, setFormIsDisabled] = useState(true)
  const [firstnameValue, setFirstnameValue] = useState(competitor?.first_name)
  const [lastnameValue, setLastnameValue] = useState(competitor?.last_name)
  const [countryValue, setCountryValue] = useState(competitor?.country)
  const [phoneValue, setPhoneValue] = useState(competitor?.phone)

  const [photoModalActive, setPhotoModalActive] = useState(false)

  const handlePhoneInput = (value: string) => {
    const formattedPhone = formatPhoneInput(value)
    setPhoneValue(formattedPhone)
  }

  function clearUnsaveValues() {
    setFirstnameValue(competitor?.first_name)
    setLastnameValue(competitor?.last_name)
    setCountryValue(competitor?.country)
    setPhoneValue(competitor?.phone)
  }

  const updateProfile = () => {
    if (firstnameValue && lastnameValue && countryValue && phoneValue) {
      competitor &&
        dispatch(
          updateCompetitorProfile(
            competitor.id,
            firstnameValue,
            lastnameValue,
            countryValue,
            phoneValue
          )
        ).then((value) => {
          console.log(value)
          setFormIsDisabled(true)
          window.location.reload()
        })
    }
  }

  const updateProfileImage = (data: any) => {
    competitor &&
      dispatch(updateCompetitorImage(competitor.id, data)).then((res) =>
        window.location.reload()
      )
  }
  const removeProfileImage = () => {
    competitor &&
      dispatch(deleteCompetitorImage(competitor.id)).then((res) =>
        window.location.reload()
      )
  }

  return (
    <div>
      <div className="flex items-center justify-between text-sm text-gray-400">
        <div>Фотография профиля</div>
        <div
          onClick={() => {
            if (competitor?.verified) {
              setFormIsDisabled(!formIsDisabled)
              if (!formIsDisabled) clearUnsaveValues()
            }
          }}
          className={` ${
            !competitor?.verified ? "cursor-default" : "cursor-pointer"
          } underline transition hover:opacity-50`}
        >
          {formIsDisabled ? "Редактировать" : "Отменить"}
        </div>
      </div>
      <div className="w-full items-start gap-8 md:flex">
        <div className="w-full text-center md:w-1/5">
          <div className="py-3">
            {competitor && (
              <img
                className="mx-auto h-[280px] w-[220px]  rounded-full md:h-[350px] md:w-full md:rounded-xl"
                src={
                  competitor.image?.toString() ||
                  "assets/utils/nonuserimage.jpg"
                }
                alt="user pictures"
              />
            )}
          </div>
          <div>
            <label className="w-full cursor-pointer rounded-lg bg-secondary-500 py-2 font-medium text-gray-700 transition hover:bg-secondary-600 ">
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    updateProfileImage(e.target.files[0])
                  }
                }}
                disabled={!competitor?.verified}
                accept="image/png, image/jpeg"
                className="hidden w-full rounded-lg bg-secondary-500 py-2 shadow-md transition hover:bg-secondary-600"
              />
              Обновить фото
            </label>
            {competitor?.image && (
              <button
                onClick={(e) => {
                  setPhotoModalActive(true)
                }}
                className="px-10 pt-2 text-sm text-gray-400 hover:text-gray-700"
              >
                Удалить фото
              </button>
            )}
          </div>
        </div>
        <div className="py-3 md:pl-10">
          <div className="text-lg text-gray-400">Основная информация</div>
          <div className="grid gap-4 py-4 md:grid-cols-2">
            <PersonalDataInput
              type="phone"
              disabled={formIsDisabled}
              value={phoneValue}
              placeholder="Телефон без +7 или 8"
              onChange={(e) => handlePhoneInput(e.target.value)}
              title="Телефон"
            />
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
            <div>
              <div
                className={`pb-2 text-sm ${
                  formIsDisabled ? "text-gray-400" : "font-medium text-gray-700"
                }`}
              >
                Страна:
              </div>
              <select
                defaultValue={competitor?.country}
                onChange={(e) => setCountryValue(e.target.value)}
                disabled={formIsDisabled}
                className="w-full rounded-lg border-r-4 px-4 py-2  font-medium text-gray-700 outline-none enabled:bg-gray-200 disabled:border-r-4 disabled:border-r-white disabled:bg-white md:w-[260px]"
              >
                {getCountriesList().map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <PersonalDataInput
              value={competitor?.gender === "m" ? "Мужской" : "Женский"}
              title="Пол"
            />
            <div>
              <div className="pb-2 text-sm text-gray-400">Статус:</div>
              <div className="px-4 py-2 font-medium">
                {competitor?.verified ? (
                  <div>
                    E-mail подтвержден{" "}
                    <FontAwesomeIcon
                      className="px-2 text-secondary-500"
                      icon={faCheck}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Не подтвержден
                    <span className="text-secondary-500 ">*</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <button
                onClick={() => {
                  updateProfile()
                }}
                disabled={formIsDisabled}
                className="rounded-md bg-secondary-500 py-2 px-4 font-medium text-gray-700 transition enabled:hover:bg-secondary-300 disabled:bg-gray-300 disabled:text-gray-400"
              >
                Обновить информацию
              </button>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        action={removeProfileImage}
        active={photoModalActive}
        closeFunc={() => setPhotoModalActive(false)}
        text="Вы хотите удалить фотографию?"
      ></ConfirmModal>
    </div>
  )
}

export default PersonalInfoWindow
