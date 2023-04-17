import { loginUser } from "@/store/actions/authAction"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { getCompetitorData } from "@/store/actions/competitorAction"

type Props = {}

const LoginPage = (props: Props) => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

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
    "w-[400px] rounded-md bg-secondary-400 my-2 p-3 py-2 text-lg text-white shadow-md outline-none placeholder:text-gray-50"

  return (
    <div className="p-10">
      {!isAuth ? (
        <div className="mx-auto flex w-2/5 flex-wrap justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-3">
              <h1 className="text-center text-2xl">Авторизация</h1>
            </div>
            <div>
              <div className="pt-1 text-gray-400">E-mail: </div>
              <input
                className={inputStyles}
                placeholder="E-mail"
                {...register("email")}
              />
            </div>
            <div>
              <div className="pt-1 text-gray-400">Пароль: </div>
              <input
                className={inputStyles}
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </div>
            <div className="my-4  flex items-start justify-between">
              <button
                className="rounded-xl bg-primary-500 px-16 py-3 text-lg text-white"
                type="submit"
              >
                Войти
              </button>
              <div className="text-right">
                <div className="text-sm text-gray-400">
                  Еще нет учетной записи?
                </div>
                <div className="py-1 text-primary-500 transition-all">
                  <Link
                    className="transition hover:text-secondary-400"
                    to="/signup"
                  >
                    Создать аккаунт
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default LoginPage
