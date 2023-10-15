import { useAppDispatch } from "@/hooks/redux"
import { signupUser } from "@/store/actions/authAction"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SignupInfo from "@/components/signupInfo"

type Props = {}

const formElements = [
  {
    label: "Имя",
    id: "firstName",
    name: "first_name",
    type: "text",
    requirements: {
      required: true,
    },
  },
  {
    label: "Фамилия",
    id: "lastName",
    type: "text",
    name: "last_name",
    requirements: {
      required: true,
    },
  },
  {
    label: "E-mail",
    id: "email",
    name: "email",
    type: "email",
    requirements: {
      required: true,
      minLength: 6,
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "* E-mail в формате example@mail.ru",
      },
    },
  },
  {
    label: "Пароль",
    id: "password",
    name: "password",
    type: "password",
    requirements: {
      required: true,
      minLength: { value: 8, message: "* Длина пароля меньше 8 символов" },
    },
  },
]

const SignupPage = (props: Props) => {
  const navigate = useNavigate()
  const disptach = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({ mode: "onTouched" })

  const isAuth = localStorage.getItem("token")

  useEffect(() => {
    if (isAuth) window.location.replace("/")
  }, [])

  const onSubmit = (data: any) => {
    if (data) {
      const { first_name, last_name, email, gender, password } = data
      disptach(
        signupUser({
          first_name,
          last_name,
          email,
          gender,
          password,
        })
      ).then((value) => {
        navigate("/login")
      })
    }
  }

  const inputStyles =
    "rounded-md bg-gray-input my-2 px-3 w-[500px] h-[50px] text-md text-gray-700 font-medium shadow-md outline-none placeholder:text-gray-200"
  const labelStyles = "text-md text-gray-700 font-medium"

  return (
    <div className="p-10">
      <div className="mx-auto flex w-5/6 items-start justify-between rounded-xl bg-gray-200 px-5 py-5 shadow-md">
        <div className="flex flex-wrap justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-[500px]">
            <div className="flex justify-center pb-2 text-2xl font-bold text-gray-600">
              Регистрация нового аккаунта
            </div>
            <div className="flex w-full justify-center pb-3 text-sm text-gray-400">
              Уже есть учетная запись ?{" "}
              <Link
                className="px-2 text-secondary-500 underline transition hover:text-primary-500"
                to="/login"
              >
                Авторизоваться
              </Link>
            </div>

            {formElements.map((element, index) => (
              <div key={index}>
                <div className="flex w-full items-center justify-between">
                  <label className={labelStyles}>{element.label}: </label>
                  {errors[element.name] && (
                    <span className="text-sm text-primary-400">
                      {errors[element.name]?.message?.valueOf() ||
                        "* Поле должно быть заполнено"}
                    </span>
                  )}
                </div>
                <input
                  className={`${inputStyles}`}
                  type={element.name}
                  id={element.id}
                  {...register(element.name, { ...element.requirements })}
                />
              </div>
            ))}

            <div className="flex items-center justify-between pt-2">
              <div className={labelStyles}>Пол:</div>
              <div className="flex gap-2">
                <div className="flex gap-2">
                  <input
                    className="w-[20px]"
                    type="radio"
                    id="male"
                    {...register("gender", { required: true })}
                    value="m"
                  />
                  <label className="text-md text-gray-700" htmlFor="m">
                    Мужской
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    className="w-[20px]"
                    type="radio"
                    id="female"
                    {...register("gender", { required: true })}
                    value="f"
                  />
                  <label className="text-md text-gray-700" htmlFor="f">
                    Женский
                  </label>
                </div>
              </div>
              {errors.gender && <span>Обязательное поле</span>}
            </div>

            <div className="my-4 flex items-start justify-between">
              <button
                className="w-full rounded-xl bg-secondary-500 px-16 py-3 text-lg font-medium text-white transition hover:bg-primary-500 disabled:bg-gray-700 disabled:opacity-50"
                type="submit"
                disabled={!isValid || !isDirty}
              >
                Создать аккаунт
              </button>
            </div>
          </form>
        </div>
        <SignupInfo />
      </div>
    </div>
  )
}

export default SignupPage
