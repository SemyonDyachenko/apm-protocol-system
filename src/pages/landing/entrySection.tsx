import React from "react"
import { Link } from "react-router-dom"

type Props = {}

const EntrySection = (props: Props) => {
  return (
    <div className="relative flex w-full bg-gray-700">
      <div className="z-10 mx-auto h-auto min-h-screen w-11/12 px-4 pt-[160px] pb-[50px] text-white">
        <div className="relative w-3/5">
          <div className="space-x-2  text-6xl  font-bold leading-tight tracking-wider">
            <div>
              АРМ-
              <span className=" animate-pulse text-secondary-500">РЕЙТ</span> -
              Российская
            </div>
            онлайн
            <span className=" animate-pulse text-secondary-500">платформа</span>
          </div>
          <div className="w-4/5 py-8 text-lg font-semibold tracking-normal">
            <p className="text-xl">
              <div className="pb-2">Платформа объединяет в себе:</div>
              - Цифровой электронный паспорт спортсмена
              <br /> - Систему ведения протоколов
              <br /> - Объединенный рейтинг спортсменов
              <br /> - Базу данных всех поединков со сквозной аналитикой
            </p>
          </div>
          <div className="my-4">
            <div className="flex w-8/12 justify-between gap-4">
              <Link to="/leagues" className="w-6/12 transition">
                <div className=" flex items-center justify-center rounded-lg  border-2 border-secondary-500 py-[12px] font-semibold text-secondary-500 transition hover:animate-pulse hover:bg-secondary-500 hover:text-gray-700">
                  Лиги
                </div>
              </Link>

              <Link to="/tournaments" className="w-6/12  transition">
                <div className="flex items-center justify-center rounded-lg  border-2 border-secondary-500 py-[12px] font-semibold text-secondary-500 transition hover:animate-pulse hover:bg-secondary-500 hover:text-gray-700">
                  Турниры
                </div>
              </Link>
            </div>
            <div className="py-4">
              <Link to="/signup" className="">
                <div className="flex w-8/12 items-center justify-center rounded-lg border-2  border-secondary-500 bg-secondary-500 py-[18px] font-semibold text-white shadow-sm transition hover:animate-pulse hover:bg-transparent hover:text-secondary-500">
                  СТАТЬ ЧЕМПИОНОМ
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-[-0px] opacity-50">
        <img className="z-1 max-h-[900px]" src="assets/landing/backimage.png" />
      </div>
    </div>
  )
}

export default EntrySection
