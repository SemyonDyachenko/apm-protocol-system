import { url } from "inspector"
import React from "react"

type Props = {
  label: string
  text: string
  img: string
  bg: string
  inverse?: boolean
}

const InformationSection = ({ label, text, img, bg, inverse }: Props) => {
  return (
    <div className={`relative min-h-screen ${bg} max-w-full text-white`}>
      <div className="z-8 relative">
        <div className="mx-auto w-11/12 py-5  ">
          <div className="flex w-full flex-col justify-center md:w-1/3 md:justify-start">
            <div className="md:mt-2">
              <span className="text-4xl font-extrabold uppercase text-gray-700 md:text-5xl">
                {label}
              </span>
              <div className="mt-2 h-2 w-full rounded-lg bg-gray-700"></div>
            </div>
          </div>
          <div className="my-4 w-full md:w-1/2">
            <h3 className="text-md font-semibold text-gray-700">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet
              natus, repellat optio fugit at qui expedita quis illo, doloremque
              eaque provident mollitia unde, ratione quasi vitae nostrum
            </h3>
          </div>
        </div>

        <div className="mt-4 min-h-[476px] w-full bg-gray-700 bg-opacity-60">
          {!inverse ? (
            <div className="mx-auto flex min-h-[476px] w-2/3 items-center py-4">
              <div className="w-full md:w-2/3">
                <p className="text-lg font-medium md:text-xl">{text}</p>
              </div>
              <div className="hidden w-1/3 items-center justify-end md:visible md:flex">
                <img className="animate-pulse" alt="image" src={img} />
              </div>
            </div>
          ) : (
            <div className="mx-auto flex  h-full min-h-[476px] w-2/3 items-center py-4">
              <div className="hidden w-1/3 items-center justify-start md:visible md:flex">
                <img className="animate-pulse" alt="image" src={img} />
              </div>
              <div className="flex w-full md:w-2/3 md:justify-end">
                <p className="text-lg font-medium md:text-xl">{text}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InformationSection
