import { useAppDispatch } from "@/hooks/redux"
import { signupUser } from "@/store/actions/authAction"
import React from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

type Props = {}

const SignupPage = (props: Props) => {
  const disptach = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: any) => {
    if (data) {
      console.log(data)
      disptach(
        signupUser({
          mode: data.userType,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          gender: data.gender,
          password: data.password,
        })
      )
    }
  }

  const inputStyles =
    "rounded-md w-full bg-gray-400 my-2 px-3 h-[38px] text-md text-white shadow-md outline-none placeholder:text-gray-200"

  return (
    <div className="p-10">
      <div className="flex w-4/5  justify-between">
        <div className="mx-auto flex w-2/5 flex-wrap justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-[400px]">
            <div className="flex justify-center py-4 text-2xl font-bold text-gray-600">
              Регистрация нового аккаунта
            </div>
            <div>
              <select
                className={`${inputStyles} border-r-4 border-gray-400`}
                id="userType"
                {...register("userType")}
              >
                <option value="judge">Судья</option>
                <option value="secretary">Секретарь</option>
                <option value="leagueCreator">Создатель лиги</option>
                <option value="tournamentOrganizer">Организатор турнира</option>
                <option value="athlete">Спортсмен</option>
              </select>
            </div>
            <div className="flex justify-between gap-2">
              <input
                className={`${inputStyles} `}
                type="text"
                id="firstName"
                placeholder="Имя"
                {...register("first_name", { required: true })}
              />{" "}
              {errors.firstName && <span>Обязательное поле</span>}
            </div>
            <div>
              <input
                className={`${inputStyles} `}
                type="text"
                id="lastName"
                placeholder="Фамилия"
                {...register("last_name", { required: true })}
              />
              {errors.lastName && <span>Обязательное поле</span>}
            </div>
            <div>
              <input
                className={inputStyles}
                type="email"
                placeholder="E-mail"
                {...register("email", { required: true })}
              />
              {errors.email && <span>Обязательное поле</span>}
            </div>
            <div>
              <input
                className={inputStyles}
                type="password"
                placeholder="Пароль"
                {...register("password", { required: true })}
              />
              {errors.password && <span>Обязательное поле</span>}
            </div>
            <div>
              <input
                className={inputStyles}
                type="password"
                placeholder="Повтор пароля"
                {...register("confirmPassword", { required: true })}
              />
              {errors.confirmPassword && <span>Обязательное поле</span>}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-md py-2 text-gray-600">Пол</div>
              <div className="flex gap-2">
                <div className="flex gap-2">
                  <input
                    type="radio"
                    id="male"
                    {...register("gender", { required: true })}
                    value="m"
                  />
                  <label htmlFor="m">Мужской</label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    id="female"
                    {...register("gender", { required: true })}
                    value="f"
                  />
                  <label htmlFor="f">Женский</label>
                </div>
              </div>
              {errors.gender && <span>Обязательное поле</span>}
            </div>
            <div className="flex">
              <input
                type="checkbox"
                {...register("policyAgreement", { required: true })}
              />
              <div className="px-2 text-sm">
                Согласен с политикой конфиденциальности и обработки данных
              </div>
              {errors.policyAgreement && <span>Обязательное поле</span>}
            </div>
            <div className="my-4 flex items-start justify-between">
              <button
                className="rounded-xl bg-secondary-500 px-16 py-3 text-lg text-white"
                type="submit"
              >
                Далее
              </button>
              <div className="text-right">
                <div className="text-sm text-gray-400">
                  Уже есть учетная запись?
                </div>
                <div className="py-1 text-primary-500 transition-all">
                  <Link
                    className="transition hover:text-secondary-400"
                    to="/login"
                  >
                    Авторизация
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

/*<div className="mx-auto flex w-2/5">
          <div className="flex justify-between gap-4 py-3">
            {new Array("Участник", "Судья", "Администратор", "Организатор").map(
              (element) => (
                <div className="h-[30px] cursor-pointer border-primary-500 text-lg text-gray-700 transition hover:border-b-2">
                  {element}
                </div>
              )
            )}
          </div>
          <div></div>
        </div> */

export default SignupPage
