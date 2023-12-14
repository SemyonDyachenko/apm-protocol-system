import { useAppSelector } from "@/hooks/redux"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

type Props = {}

const PageNotFound = (props: Props) => {
  return (
    <div className="mx-auto  flex min-h-[700px] w-11/12 items-center">
      <div className="mx-auto w-11/12 items-start  justify-between md:flex md:w-10/12">
        <div className="flex w-full flex-col  md:w-3/4 ">
          <span className="animate-pulse text-[100px] font-black text-secondary-500">
            404
          </span>
          <span className="text-4xl font-bold md:text-[50px]">
            СТРАНИЦА <span className="text-secondary-500">НЕ</span> НАЙДЕНА
          </span>
          <div className="my-4">
            <Link
              className=" text-lg font-medium text-secondary-500 underline transition hover:text-secondary-400 md:text-xl"
              to="/"
            >
              Вернуться на главную
            </Link>
          </div>
        </div>
        <div className="w-full md:w-2/4">
          <div className="py-4">
            <h2 className="text-md  text-justify font-medium text-gray-400 md:text-lg">
              Запрашиваемая страница не существует или недоступна из-за
              отсутствия необходимых прав доступа. Попробуйте авторизоваться или
              обновить страницу.
            </h2>
          </div>
          <div className="gap-4 py-4 md:flex">
            <div className="my-2">
              <Link to="/tournaments">
                <button className="md:text-md w-full rounded-xl bg-secondary-500 px-5 py-3 text-sm font-semibold text-gray-700 shadow-md transition hover:bg-secondary-400 md:w-auto">
                  Перейти к турнирам
                </button>
              </Link>
            </div>
            <div className="my-2">
              <Link to="/login">
                <button className="md:text-md w-full rounded-xl bg-secondary-500 px-5 py-3 text-sm font-semibold text-gray-700 shadow-md transition hover:bg-secondary-400 md:w-auto">
                  Стать участником
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
