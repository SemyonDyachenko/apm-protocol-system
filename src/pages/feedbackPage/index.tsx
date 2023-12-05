import ActionButton from "@/components/UI/Button"
import CustomInput from "@/components/UI/Input"
import { useAppDispatch } from "@/hooks/redux"
import { createSupportRequest } from "@/store/actions/authAction"
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

type Props = {}

const FeedbackPage = (props: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [created, setCreated] = useState(false)

  const createRequest = () => {
    let date = new Date()
    if (email && name && message) {
      dispatch(
        createSupportRequest(email, name, message, date.toISOString())
      ).then((res) => {
        if (res) {
          if (res.status === 201) {
            setCreated(true)
            setTimeout(() => {
              navigate("/")
              window.location.reload()
            }, 3500)
          }
        }
      })
    }
  }

  return (
    <div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="py-4">
          <div
            className={`${
              created && "hidden"
            } mx-auto flex w-full flex-wrap rounded-xl bg-gray-70 p-4 shadow-md md:min-h-[500px] md:w-[700px]`}
          >
            <div className="w-full py-1 text-center text-xl font-semibold">
              Обратная связь и поддержка
            </div>
            <div className="flex w-full justify-center text-center text-sm text-gray-400">
              Мы пошлем вам ответное письмо с решением вопроса на указанный
              E-mail
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
              <div className="py-1 text-sm text-gray-400">Ваше имя:</div>

              <CustomInput
                type="text"
                className="w-full py-2 font-medium"
                value={name}
                onChange={setName}
                placeholder="Как к вам обращаться?"
              />
            </div>
            <div className="mt-2 w-full">
              <div className="py-1 text-sm text-gray-400">Сообщение:</div>

              <textarea
                maxLength={1500}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-lg bg-gray-200 py-2 px-4 font-medium outline-none"
              ></textarea>
            </div>
            <div className="mt-2 w-full">
              <ActionButton
                className="w-full font-medium"
                onClick={createRequest}
              >
                Отправить запрос
              </ActionButton>
            </div>

            <div className="mt-2 w-full text-center">
              <Link
                className="text-sm text-secondary-500 underline transition hover:text-secondary-400"
                to="/"
              >
                Вернуться на главную
              </Link>
            </div>
          </div>
          {created && (
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
                На указанную почту будет отправлено ответ на ваще сообщение
              </div>
              <div className="mt-4">
                <Link to="/" className="hover:text-gray-700">
                  <ActionButton className="font-medium" onClick={() => {}}>
                    На главную
                  </ActionButton>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FeedbackPage
