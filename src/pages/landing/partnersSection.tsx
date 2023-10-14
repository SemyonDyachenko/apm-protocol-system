import React from "react"

type Props = {}

const PartnersSection = (props: Props) => {
  return (
    <div className="relative  h-screen max-w-full bg-secondary-500 text-white">
      <div className="absolute left-0 w-full">
        <img src="assets/landing/group301.png" />
      </div>
      <div className="absolute right-0 h-[490px] w-[400px] bg-gray-700 py-4"></div>
      <div className="flex items-center justify-center py-5 ">
        <div className="z-1 absolute top-2">
          <img className="w-[150px]" src="assets/landing/image20.png" />
        </div>
        <div className="z-10 flex flex-col justify-center">
          <span className="text-center text-4xl font-extrabold uppercase">
            ПАРТНЕРЫ
          </span>
          <div className="h-2 w-[360px] rounded-lg bg-gray-700"></div>
        </div>
      </div>
      <div className="relative z-10 my-4 h-[476px] w-full bg-gray-700 bg-opacity-50">
        <div className="mx-auto flex h-full w-2/3 items-center justify-between">
          {new Array(1, 2, 3).map((element) => (
            <div className="h-2/3 max-w-[300px]">
              <img src="assets/landing/image34.png" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PartnersSection
