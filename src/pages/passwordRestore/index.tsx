import ActionButton from "@/components/UI/Button"
import CustomInput from "@/components/UI/Input"
import { useState } from "react"
import { Link } from "react-router-dom"
import ReCAPTCHA from "react-google-recaptcha"

type Props = {}

const PasswordRestorePage = (props: Props) => {
  const [email, setEmail] = useState("")

  function onChange(value: any) {
    console.log("Captcha value:", value)
  }

  return (
    <div className="mx-auto w-11/12 items-center justify-center md:flex md:min-h-screen">
      <div className="py-4">
        <div className="mx-auto flex w-full flex-wrap rounded-xl bg-gray-70 p-4 shadow-md md:min-h-[300px] md:w-[500px]">
          <div className="w-full py-1 text-center text-xl font-semibold">
            Восстановление доступа
          </div>
          <div className="text-center text-sm text-gray-400">
            Мы пошлем вам письмо с инструкцией по изменению пароля.
          </div>
          <div className="w-full">
            <div className="py-1 text-sm text-gray-400">E-mail:</div>

            <CustomInput
              className="w-full py-2 font-medium"
              value={email}
              onChange={setEmail}
              placeholder="Эл. Почта"
            />
          </div>
          <div className="w-full">
            <ActionButton className="w-full font-medium" onClick={() => {}}>
              Восстановить пароль
            </ActionButton>
          </div>
          <div>
            <ReCAPTCHA
              sitekey="6Ldf-hwpAAAAAI8eHR18RRSG_uF1UGZ1mFa1sy8n"
              onChange={onChange}
            />
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
      </div>
    </div>
  )
}

export default PasswordRestorePage
