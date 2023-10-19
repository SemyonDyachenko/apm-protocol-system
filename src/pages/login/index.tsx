import { loginUser } from "@/store/actions/authAction"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { getCompetitorData } from "@/store/actions/competitorAction"
import SignupInfo from "@/components/signupInfo"

type Props = {}

const LoginPage = (props: Props) => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({ mode: "onTouched" })

  const dispatch = useAppDispatch()
  const { access, refresh, loading, error } = useAppSelector(
    (state) => state.auth
  )
  const isAuth = localStorage.getItem("token")

  useEffect(() => {
    if (isAuth) window.location.replace("/")
  }, [])

  const onSubmit = (data: any) => {
    try {
      dispatch(loginUser(data.email, data.password)).then(() => navigate("/"))
    } catch (error: Error | any) {
      console.log(error.message)
    }
  }

  const inputStyles =
    "rounded-md bg-gray-input my-2 px-3 w-[500px] h-[50px] text-md text-gray-700 font-medium shadow-md outline-none placeholder:text-gray-200"
  const labelStyles = "text-md text-gray-700 font-medium"

  return (
    <div className="p-10">
      {!isAuth ? (
        <div className="mx-auto flex w-5/6 items-start justify-between rounded-xl bg-gray-200 px-5 py-5 shadow-md">
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[500px]">
              <div className="flex justify-center pb-2 text-2xl font-bold text-gray-600">
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
                  className="px-1 text-secondary-500 underline"
                  to="/password-restore"
                >
                  Восстановление пароля
                </Link>
              </div>
              <div className="my-4  flex items-start justify-between">
                <button
                  className="w-full rounded-xl bg-secondary-500 px-16 py-3 text-lg font-medium text-white transition hover:bg-primary-500 disabled:bg-gray-700 disabled:opacity-70"
                  type="submit"
                  disabled={!isValid || !isDirty}
                >
                  Войти
                </button>
              </div>
            </form>
          </div>
          <SignupInfo />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default LoginPage
