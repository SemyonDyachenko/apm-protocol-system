import React from "react"
import { Link } from "react-router-dom"

type Props = {}

const StartPage = (props: Props) => {
  return (
    <div>
      <div className="relative flex w-full bg-gray-700">
        <div className="z-10  mx-auto w-11/12 px-4 pt-[160px] pb-[50px] text-white">
          <div className="relative w-3/5">
            <div className="space-x-2 text-6xl font-bold leading-tight tracking-wider">
              <div>
                АРМ-<span className="text-secondary-500">РЕЙТ</span> - мировая
              </div>
              онлайн
              <span className="text-secondary-500">платформа</span>
            </div>
            <div className="w-4/5 py-8 text-lg font-semibold">
              <p>
                Lorem ipsum is placeholder text commonly used in the graphic,
                print, and publishing industries for previewing layouts and
                visual mockups.
                <span className="text-secondary-500">
                  Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing industries for previewing layouts and
                  visual mockups.
                </span>
              </p>
            </div>
            <div className="flex gap-4">
              <Link to="/leagues" className="w-4/12 transition">
                <div className="flex items-center justify-center  rounded-lg border-2 border-secondary-500 py-[12px] font-semibold text-secondary-500 transition hover:bg-secondary-500 hover:text-gray-700">
                  Лиги
                </div>
              </Link>

              <Link to="/tournaments" className="w-4/12  transition">
                <div className="flex items-center justify-center  rounded-lg border-2 border-secondary-500 py-[12px] font-semibold text-secondary-500 transition hover:bg-secondary-500 hover:text-gray-700">
                  Турниры
                </div>
              </Link>
            </div>
            <div className="py-4">
              <Link to="/signup" className="">
                <div className="flex w-[530px] items-center justify-center rounded-lg  border-2 border-secondary-500 bg-secondary-500 py-[18px] font-semibold text-white shadow-sm transition hover:bg-transparent hover:text-secondary-500">
                  СТАТЬ ЧЕМПИОНОМ
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute right-[-0px] opacity-50">
          <img
            className="z-1 max-h-[900px]"
            src="assets/landing/backimage.png"
          />
        </div>
      </div>
      <div className="relative h-screen max-w-full bg-gray-700 text-white">
        <div className="absolute">
          <img src="assets/landing/Polygon5.png" />
        </div>
        <div className="z-1 absolute right-0 max-h-screen">
          <img
            className="max-h-screen scale-y-125"
            src="assets/landing/Polygon4.png"
          />
        </div>
        <div className="z-8 relative">
          <div className="flex items-center justify-center py-5">
            <div className="flex flex-col justify-center">
              <span className="text-center text-3xl font-extrabold uppercase">
                Галерея
              </span>
              <div className="h-1 w-[200px] bg-secondary-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StartPage
