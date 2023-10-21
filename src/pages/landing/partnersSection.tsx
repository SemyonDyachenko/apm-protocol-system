import React from "react"

type Props = {}

const partnersImages = [
  {
    url: "nature.png",
  },
  {
    url: "image34.png",
  },
  {
    url: "image35.png",
  },
]

const PartnersSection = (props: Props) => {
  return (
    <div className="relative h-auto max-w-full bg-secondary-500 text-white">
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
          <div className="h-2 w-[300px] rounded-lg bg-gray-700"></div>
        </div>
      </div>
      <div className="relative z-10 my-4 h-[476px] w-full bg-gray-700 bg-opacity-50">
        <div className="mx-auto flex h-full w-8/12 items-center justify-between">
          {partnersImages.map((element, index) => (
            <div key={index} className="h-2/3 w-1/3 max-w-[300px]">
              <img src={`assets/landing/${element.url}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-full bg-gray-700 pb-10 text-white">
        <div className="flex items-center justify-center py-5 ">
          <div className="z-10 flex flex-col justify-center">
            <span className="text-center text-4xl font-extrabold uppercase">
              КОНТАКТЫ
            </span>
            <div className="h-2 w-[300px] rounded-lg bg-secondary-500"></div>
          </div>
        </div>
        <div className="relative z-10 my-4 h-[476px] w-full bg-gray-700 bg-opacity-50">
          <div className="mx-auto flex h-full w-9/12 items-center justify-between">
            <div className="flex w-1/3 flex-col justify-center text-center">
              <div className="flex justify-center">
                <img
                  alt="image"
                  className="max-w-[200px]"
                  src="assets/landing/image 31.png"
                />
              </div>
              <div className="py-3 text-xl font-bold underline">ТЕЛЕФОН</div>
              <div className="text-lg font-medium">+7-(999)-999-99-99</div>
            </div>
            <div className="flex w-1/3 flex-col justify-center text-center">
              <div className="flex justify-center">
                <img
                  alt="image"
                  className="max-w-[200px]"
                  src="assets/landing/image 32.png"
                />
              </div>
              <div className="py-3 text-xl font-bold underline">ПОЧТА</div>
              <div className="text-lg font-medium">apm@league.com</div>
            </div>
            <div className=" flex w-1/3 flex-col justify-center text-center">
              <div className="flex justify-center">
                <img
                  alt="image"
                  className="max-w-[200px]"
                  src="assets/landing/image 33.png"
                />
              </div>
              <div className="py-3 text-xl font-bold underline">АДРЕС</div>
              <div className="text-lg font-medium">
                127025 г. Москва,
                <br /> проспект Вернадского д.82
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartnersSection
