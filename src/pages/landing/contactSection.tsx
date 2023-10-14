import React from "react"

type Props = {}

const ContactSection = (props: Props) => {
  return (
    <div className="h-screen max-w-full bg-gray-700 text-white">
      <div className="absolute -left-[198px]">
        <img src="assets/landing/Vector 5.png" />
      </div>
      <div className="absolute right-16 scale-x-[1.1365]">
        <img src="assets/landing/Vector 6.png" />
      </div>
      <div className="flex items-center justify-center py-5 ">
        <div className="z-10 flex flex-col justify-center">
          <span className="text-center text-4xl font-extrabold uppercase">
            КОНТАКТЫ
          </span>
          <div className="h-2 w-[360px] rounded-lg bg-secondary-500"></div>
        </div>
      </div>
      <div className="relative z-10 my-4 h-[476px] w-full bg-gray-700 bg-opacity-50">
        <div className="mx-auto flex h-full w-3/5 items-center justify-between">
          <div className="flex flex-col justify-center text-center">
            <div className="flex justify-center">
              <img
                alt="image"
                className="max-w-[200px]"
                src="assets/landing/image 31.png"
              />
            </div>
            <div className="py-3 text-xl font-bold underline">ТЕЛЕФОН</div>
            <div className="text-lg font-medium">+7 918 064 00 32</div>
          </div>
          <div className="flex flex-col justify-center text-center">
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
          <div className="flex flex-col justify-center text-center">
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
              <br /> улица Кремль д. 1
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSection
