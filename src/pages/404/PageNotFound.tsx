import React from "react"
import { Link } from "react-router-dom"

type Props = {}

const PageNotFound = (props: Props) => {
  return (
    <div className="mx-auto  flex min-h-[700px] w-11/12 items-center">
      <div className="mx-auto flex  w-10/12 items-start justify-between">
        <div className="flex w-3/4 flex-col">
          <span className="animate-pulse text-[100px] font-black text-secondary-500">
            404
          </span>
          <span className="text-[50px] font-bold">
            СТРАНИЦА <span className="text-secondary-500">НЕ</span> НАЙДЕНА
          </span>
          <div className="my-4">
            <Link
              className="  text-xl font-medium text-secondary-500 underline transition hover:text-secondary-400"
              to="/"
            >
              Вернуться на главную
            </Link>
          </div>
        </div>
        <div className="w-2/4">
          <div className="py-4">
            <h2 className="text-lg font-medium text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut
            </h2>
          </div>
          <div className="flex gap-4 py-4">
            <div>
              <Link to="/tournaments">
                <button className="text-md rounded-xl bg-secondary-500 px-5 py-3 font-semibold text-gray-700 shadow-md transition hover:bg-secondary-400">
                  Перейти к турнирам
                </button>
              </Link>
            </div>
            <div>
              <Link to="/login">
                <button className="text-md rounded-xl bg-secondary-500 px-5 py-3 font-semibold text-gray-700 shadow-md transition hover:bg-secondary-400">
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
