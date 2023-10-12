import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

type Props = {}

const SignupInfo = (props: Props) => {
  return (
    <div className="flex max-w-[450px] flex-wrap">
      <div className="text-lg font-bold text-gray-700">
        Для чего нужна учетная запись?
      </div>
      <div className="py-4">
        <div className="py-3">
          <FontAwesomeIcon
            icon={faCheck}
            size="lg"
            className="w-[25px] pr-2 text-green-700"
          />
          Возможность просмотра трансляциий и тренировок в качестве гостя или
          спортсмена
        </div>
        <div className="py-3">
          <FontAwesomeIcon
            icon={faCheck}
            size="lg"
            className="w-[25px] pr-2 text-green-700"
          />
          Возможность принимать участие в турнирах в роли спортсмена, судьи или
          секретаря, повышать свой рейтинг
        </div>
        <div className="py-3">
          <FontAwesomeIcon
            icon={faCheck}
            size="lg"
            className="w-[25px] pr-2 text-green-700"
          />
          Возможность стать организатором турнира, создать свою лигу или команду
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
