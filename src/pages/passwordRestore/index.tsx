import ActionButton from "@/components/UI/Button"
import CustomInput from "@/components/UI/Input"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ReCAPTCHA from "react-google-recaptcha"
import { useAppDispatch } from "@/hooks/redux"
import { restorePassword } from "@/store/actions/authAction"
import InfoModal from "@/components/modals/infoModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons"

type Props = {}

const PasswordRestorePage = (props: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [accepted, setAccepted] = useState(false)

  const sendRequest = () => {
    if (email) {
      dispatch(restorePassword(email)).then((res) => {
        if (res) {
          if (res.status === 201) {
            setAccepted(true)
            setTimeout(() => {
              navigate("/login")
              window.location.reload()
            }, 3000)
          }
        }
      })
    }
  }

  return (
    <div className="mx-auto w-11/12 items-center justify-center md:flex md:min-h-screen">
      <div className="py-4">
        <div
          className={`${
            accepted && "hidden"
          } mx-auto flex h-[350px] w-full flex-wrap rounded-xl bg-gray-70 p-4 shadow-md md:min-h-[300px] md:w-[500px]`}
        >
          <div className="w-full py-1 text-center text-xl font-semibold">
            Восстановление доступа
          </div>
          <div className="text-center text-sm text-gray-400">
            Мы пошлем вам письмо с инструкцией по изменению пароля.
          </div>
          <div className="w-full">
            <div className="py-1 text-sm text-gray-400">E-mail:</div>

            <CustomInput
              type="email"
              className="w-full py-2 font-medium"
              value={email}
              onChange={setEmail}
              placeholder="Эл. Почта"
            />
          </div>
          <div className="mt-2 w-full">
            <ActionButton className="w-full font-medium" onClick={sendRequest}>
              Восстановить пароль
            </ActionButton>
          </div>

          <div className="w-full text-center">
            <Link
              className="text-sm text-secondary-500 underline transition hover:text-secondary-400"
              to="/"
            >
              Вернуться на главную
            </Link>
          </div>
        </div>
        {accepted && (
          <div className="flex-column flex items-center justify-center rounded-xl bg-gray-70 p-4 shadow-md md:min-h-[300px] md:w-[500px]">
            <div>
              <div className="flex py-2">
                <FontAwesomeIcon
                  className="text-5xl text-secondary-500"
                  icon={faInfoCircle}
                />
              </div>
            </div>
            <div className="py-2 text-xl font-medium">Запрос отправлен</div>
            <div className="text-center text-sm text-gray-400">
              На указанную почту отправлено письмо с временным паролем.
            </div>
            <div className="mt-4">
              <Link to="/login" className="hover:text-gray-700">
                <ActionButton className="font-medium" onClick={() => {}}>
                  Авторизация
                </ActionButton>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PasswordRestorePage
