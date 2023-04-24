import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

type Props = {}

const SignupInfo = (props: Props) => {
  return (
    <div className="flex max-w-[450px] flex-wrap">
      <div className="text-lg font-bold text-gray-700">
        Welcome to Alpaca Broker API!
      </div>
      <div className="py-4">
        <div className="py-3">
          <FontAwesomeIcon
            icon={faCheck}
            size="lg"
            className="w-[25px] pr-2 text-green-700"
          />
          Sign up with your name and email and start exploring Alpaca's Broker
          APIs.
        </div>
        <div className="py-3">
          <FontAwesomeIcon
            icon={faCheck}
            size="lg"
            className="w-[25px] pr-2 text-green-700"
          />
          Want to build a trading app? Integrate trading into a banking app, or
          a payroll app? We got you covered. Our APIs are super flexible and
          scalable.
        </div>
        <div className="py-3">
          <FontAwesomeIcon
            icon={faCheck}
            size="lg"
            className="w-[25px] pr-2 text-green-700"
          />
          Ready to go live? Migrate your app to production whenever you're
          ready.
        </div>
        <div className="py-2 text-sm text-gray-700">
          Есть проблемы с регистрацией ?{" "}
          <Link
            className="text-secondary-500 underline hover:text-primary-500"
            to="/"
          >
            Задать вопросы
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignupInfo
