import { useEffect, useState } from "react"
import PersonalDataInput from "./PersonalDataInput"

type Props = {}

const SecurityPage = (props: Props) => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  return (
    <div className="pb-2">
      <div className="flex items-end gap-4">
        <PersonalDataInput
          disabled={false}
          title="Старый пароль"
          value={oldPassword}
        />
        <PersonalDataInput
          disabled={false}
          onChange={(e) => setNewPassword(e.target.value)}
          title="Новый пароль"
          value={newPassword}
        />
        <div>
          <button className="rounded-lg bg-secondary-500 px-4 py-2 font-medium transition hover:bg-secondary-600">
            Обновить
          </button>
        </div>
      </div>
      <div className="py-2 text-sm text-secondary-500">
        *Пароль должен быть больше 8 символов и содержать заглавную букву и
        цифры
      </div>
      <div className="flex items-center gap-2 py-3">
        <div>
          <input className="border-secondary-500" type="checkbox" />
        </div>
        <div className="text-gray-400 ">Включить подтверждение по E-mail</div>
      </div>
      <div className="cursor-pointer py-1 text-secondary-500 underline transition hover:text-secondary-400">
        Удалить учетную запись
      </div>
    </div>
  )
}

export default SecurityPage
