import { useEffect, useState } from "react"
import PersonalDataInput from "./PersonalDataInput"
import Checkbox from "@/components/UI/Checkbox"
import { CompetitorData } from "@/store/slices/competitorSlice"
import { useAppDispatch } from "@/hooks/redux"
import { updateCompetitorPassword } from "@/store/actions/competitorAction"

type Props = {
  competitor: CompetitorData
}

const SecurityPage = ({ competitor }: Props) => {
  const dispatch = useAppDispatch()

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [notification, setNotifcation] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState("")

  const updatePassword = () => {
    if (oldPassword && newPassword && competitor.id) {
      dispatch(
        updateCompetitorPassword(competitor.id, oldPassword, newPassword)
      )
        .then((res) => {
          if (res) {
            if (res.status === 400) {
              setError(
                "Введенный пароль не соответствует установленному паролю"
              )
            }
            if (res.status === 200) {
              window.location.reload()
            }
          }
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <div className="pb-2">
      <div className="flex justify-end pb-2">
        <div
          onClick={() => setDisabled(!disabled)}
          className={`${
            competitor.verified ? "cursor-pointer" : "cursor-default"
          } text-sm text-gray-400 underline transition hover:text-gray-300`}
        >
          {disabled ? "Редактировать" : "Отменить"}
        </div>
      </div>
      <div className="items-end gap-4 md:flex">
        <PersonalDataInput
          disabled={disabled}
          type="password"
          title="Старый пароль"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <PersonalDataInput
          disabled={disabled}
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
          title="Новый пароль"
          value={newPassword}
        />
        <div className="mt-3 md:mt-0">
          <button
            disabled={disabled}
            onClick={updatePassword}
            className="w-full rounded-lg bg-secondary-500 px-4 py-2 font-medium transition hover:bg-secondary-600 disabled:bg-gray-300 disabled:text-gray-400 md:w-auto"
          >
            Обновить
          </button>
        </div>
      </div>
      <div className="py-2 text-sm text-secondary-500">
        *Пароль должен быть больше 8 символов и содержать заглавную букву и
        цифры
      </div>
      {error && <div className="py-1 text-sm text-primary-500">{error}</div>}
      <div className="flex items-center gap-2 py-3">
        <div>
          <Checkbox
            className=""
            isChecked={false}
            changeState={setNotifcation}
          />
        </div>
        <div className="mb-1 text-gray-400 ">
          Включить авторизацию по E-mail
        </div>
      </div>
      <div className="cursor-pointer py-1 text-secondary-500 underline transition hover:text-secondary-400">
        Удалить учетную запись
      </div>
    </div>
  )
}

export default SecurityPage
