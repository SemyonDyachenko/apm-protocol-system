import { url } from "inspector"
import React from "react"

type Props = {
  label: string
  text: string
  img: string
}

const InformationSection = ({ label, text, img }: Props) => {
  return (
    <div className="relative h-screen max-w-full bg-gray-700 text-white">
      <div className="absolute -top-[13px]">
        <img src="assets/landing/group300.png" />
      </div>
      <div className="absolute right-0 -top-[120px]">
        <img src="assets/landing/vector1.png" />
      </div>
      <div className="z-8 relative">
        <div className="flex items-center justify-center py-5">
          <div className="flex flex-col justify-center">
            <span className="text-center text-4xl font-extrabold uppercase">
              {label}
            </span>
            <div className="h-2 w-[400px] rounded-lg bg-secondary-500"></div>
          </div>
        </div>

        <div className="my-4 h-[476px] w-full bg-gray-700 bg-opacity-50">
          <div className="mx-auto flex h-full w-2/3 items-center py-4">
            <div className="w-2/3">
              <p className="text-xl">{text}</p>
            </div>
            <div className="flex w-1/3 items-center justify-end">
              <img alt="image" src={img} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InformationSection
