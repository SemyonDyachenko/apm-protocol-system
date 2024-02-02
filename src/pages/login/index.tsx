import {
  loginUser,
  logoutUser,
  refreshLogin,
  setUserRole,
} from "@/store/actions/authAction"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import SignupInfo from "@/components/signupInfo"

import PageNotFound from "../404/PageNotFound"

type Props = {}

const LoginPage = (props: Props) => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({ mode: "onTouched" })

  const dispatch = useAppDispatch()

  const [authError, setAuthError] = useState("")
  const isAuth = localStorage.getItem("token")

  const { competitor } = useAppSelector((state) => state.competitors)

  useEffect(() => {
    if (isAuth && competitor) {
      navigate("/profile")
      window.location.reload()
    }
  }, [])

  const onSubmit = (data: any) => {
    try {
      dispatch(loginUser(data.email, data.password)).then((res) => {
        if (res) {
          if (res.response.status !== 200 || 201) {
            setAuthError("Вы ввели неверный E-mail или пароль")
          }
        } else {
          navigate("/profile")
        }
      })
    } catch (error: Error | any) {
      console.log(error.message)
    }
  }

  const inputStyles = `${
    authError && "border-[1px] border-primary-500"
  } rounded-md bg-gray-input my-2 px-3 w-full md:w-[500px] h-[50px] text-md text-gray-700 font-medium shadow-md outline-none placeholder:text-gray-200`
  const labelStyles = "text-md text-gray-700 font-medium"

  return (
    <div className="py-10">
      <div className="mx-auto w-full rounded-xl md:w-9/12 md:bg-gray-70  md:shadow-md">
        <div className="mx-auto flex w-full items-start justify-center px-3 md:w-11/12 md:justify-between  md:py-28 md:px-5 ">
          <div className="w-full md:w-auto md:px-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full md:max-w-[500px]"
            >
              <div className="flex justify-center pb-2 text-xl font-bold text-gray-600 md:text-2xl">
                Вход в учетную запись
              </div>
              <div className="flex w-full justify-center pb-3 text-sm text-gray-400">
                Еще нет учетной записи ?
                <Link
                  className="px-2 text-secondary-500 underline transition hover:text-primary-500"
                  to="/signup"
                >
                  Регистрация
                </Link>
              </div>

              <div>
                <div className="flex w-full items-center justify-between">
                  <label className={labelStyles}>E-mail: </label>
                  {errors.email && (
                    <span className="text-sm text-primary-400">
                      {errors.email.message?.valueOf().toString() ||
                        "* E-mail должен быть заполнен"}
                    </span>
                  )}
                </div>
                <input
                  id="email"
                  type="email"
                  className={inputStyles}
                  {...register("email", {
                    required: true,
                    minLength: 6,
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "* E-mail в формате example@mail.ru",
                    },
                  })}
                />
              </div>
              <div>
                <div className="flex w-full items-center justify-between">
                  <label className={labelStyles}>Пароль: </label>
                  {errors.password && (
                    <span className="text-sm text-primary-400">
                      {errors.password.message?.valueOf().toString() ||
                        "* Пароль должен быть заполнен"}
                    </span>
                  )}
                </div>
                <input
                  className={inputStyles}
                  type="password"
                  id="password"
                  {...register("password", {
                    required: true,
                    minLength: {
                      value: 8,
                      message: "* Длина пароля меньше 8 символов",
                    },
                  })}
                />
              </div>
              <div className="pt-2 text-sm  text-gray-400">
                Забыли пароль ?
                <Link
                  className="px-1 text-secondary-500 underline transition hover:text-secondary-400"
                  to="/password-restore"
                >
                  Восстановление пароля
                </Link>
              </div>
              {authError && (
                <div className="flex items-center pt-3 text-sm font-medium text-primary-500">
                  {authError}
                </div>
              )}
              <div className="my-4  flex items-start justify-between">
                <button
                  className="disabled:opacity-7 w-full rounded-xl  bg-secondary-500 px-16 py-3 text-lg font-semibold text-gray-700 transition hover:bg-secondary-600 active:translate-y-1 disabled:bg-gray-700 disabled:text-gray-400 disabled:opacity-50"
                  type="submit"
                  disabled={!isValid || !isDirty}
                >
                  Авторизоваться
                </button>
              </div>
            </form>
          </div>
          <div className="hidden md:block">
            <SignupInfo />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
