import ProfilePhoto from "../../assets/profilePhoto.jpg"
import { CompetitorData } from "@/store/slices/competitorSlice"

type Props = {
  competitor: CompetitorData | null
}

type InputProps = {
  value: string | undefined
  title: string
}

const PersonalDataInput = ({ value, title }: InputProps) => {
  return (
    <div>
      <p className="pb-2  text-sm text-gray-300">{title}: </p>
      <input
        className="w-[260px] rounded-lg  px-4 py-2  text-gray-700 outline-none"
        value={value}
        disabled
      />
    </div>
  )
}

const PersonalInfoWindow = ({ competitor }: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between text-sm text-gray-300">
        <div>Фотография профиля</div>
        <div className="cursor-pointer underline transition hover:opacity-50">
          Редактировать
        </div>
      </div>
      <div className="flex w-full items-start gap-8">
        <div className="w-1/5">
          <div className="py-3">
            <img className="rounded-xl" src={ProfilePhoto} alt="photo" />
          </div>
          <div>
            <button className="w-full rounded-lg bg-secondary-500 py-2 shadow-md transition hover:bg-violet-500">
              Изменить фото
            </button>
            <button className="px-10 pt-2 text-sm text-gray-300 hover:text-violet-500">
              Удалить фото
            </button>
          </div>
        </div>
        <div className="py-3 pl-10">
          <div className="text-lg text-gray-300">Основная информация</div>
          <div className="grid grid-cols-2 gap-4 py-4">
            <PersonalDataInput value={competitor?.email} title="E-mail" />
            <PersonalDataInput value={competitor?.first_name} title="Имя" />
            <PersonalDataInput value={competitor?.last_name} title="Фамилмя" />
            <PersonalDataInput value={competitor?.country} title="Страна" />
            <PersonalDataInput
              value={competitor?.gender === "m" ? "Мужской" : "Женский"}
              title="Пол"
            />
            <PersonalDataInput
              value={
                competitor?.is_active ? "E-mail подтвержден" : "Не подтвержден"
              }
              title="Пол"
            />

            <div>
              <button
                disabled
                className="rounded-lg bg-secondary-500 py-2 px-4 transition enabled:hover:bg-violet-500"
              >
                Обновить профиль
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfoWindow
