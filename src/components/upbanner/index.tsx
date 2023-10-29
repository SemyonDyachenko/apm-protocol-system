import { faCheck, faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

type Props = {
  name?: string
  logo: string
  banner: string
  onClick?: () => void
}

const UpBanner = ({ name, logo, banner, onClick }: Props) => {
  return (
    <div className="relative mt-12 h-[380px] w-full rounded-t-xl rounded-b-2xl shadow-lg">
      <div className="z-[1] ">
        <img
          className="z-4 absolute h-full w-full  rounded-t-xl rounded-b-2xl"
          src={banner}
        />
      </div>
      <div className="absolute z-[5] h-full w-full rounded-xl bg-black opacity-30"></div>
      <div className="relative -bottom-1 z-[10] flex h-full w-full items-end">
        <div className="flex h-1/3 w-full justify-between rounded-2xl bg-gray-80">
          <div className="flex px-10">
            <div className="-translate-y-6">
              <div className="h-[85px] w-[85px] rounded-full bg-gray-80">
                <img className="h-full w-full rounded-full p-1" src={logo} />
              </div>
            </div>
            <div className="py-4 px-2">
              <div className="flex items-center gap-3 text-xl font-bold">
                <div>{name}</div>
                <FontAwesomeIcon color="green" icon={faCheck} />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1 py-2">
                  {new Array(1, 2, 3, 4, 5).map((element, index) => (
                    <FontAwesomeIcon
                      className="text-secondary-500"
                      key={index}
                      icon={faStar}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-400">(4.09)</div>
              </div>
            </div>
          </div>
          <div className="px-10 py-4">
            <div>
              <button
                onClick={onClick}
                className="rounded-xl bg-secondary-500 py-2 px-4 font-medium text-gray-700 shadow-md transition hover:bg-secondary-400 active:translate-y-1"
              >
                Подать заявку
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 text-sm text-gray-400">
              <div>Вы участник </div>
              <FontAwesomeIcon icon={faCheck} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpBanner
