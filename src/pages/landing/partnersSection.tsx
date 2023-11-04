import { motion } from "framer-motion"
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
    url: "image34.png",
  },
]

const contactItems = [
  {
    image: "assets/landing/image 31.png",
    title: "ТЕЛЕФОН",
    value: "+7-(999)-999-99-99",
  },
  {
    image: "assets/landing/image 32.png",
    title: "ПОЧТА",
    value: "apm@league.com",
  },
  {
    image: "assets/landing/image 33.png",
    title: "АДРЕС",
    value: "г. Москва,\n проспект Вернадского д.82, 127025",
  },
]

const PartnersSection = (props: Props) => {
  return (
    <div className="relative h-auto max-w-full bg-gray-800 text-white">
      <div className="max-w-full bg-gray-800  text-white">
        <div className="flex items-center justify-center py-5 ">
          <div className="z-10 flex flex-col justify-center">
            <span className="text-center text-4xl font-extrabold uppercase text-gray-300 md:text-5xl">
              КОНТАКТЫ
            </span>
            <div className="mt-2 h-2 w-[300px] rounded-lg bg-secondary-500"></div>
          </div>
        </div>
        <div className="relative z-10 mt-4 h-[476px] min-h-[476px] w-full bg-gray-700 bg-opacity-50 md:h-[476px]">
          <div className="flex h-[476px] items-center">
            <div className="mx-auto flex  w-full justify-between px-2 md:w-9/12">
              {contactItems.map((element, index) => (
                <motion.div
                  key={index}
                  className="w-1/3 text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: 0.1 + index / 5 }}
                >
                  <div className="">
                    <div className="flex justify-center">
                      <img
                        alt="image"
                        className="w-[60px] md:w-[100px]"
                        src={element.image}
                      />
                    </div>
                    <div className="text-md py-3 font-bold underline md:text-xl">
                      {element.title}
                    </div>
                    <div className="text-center text-[12px] font-medium md:text-lg">
                      {element.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center py-5">
        <div className="z-1 absolute top-2 mt-3">
          <img className="w-[120px]" src="assets/landing/image20.png" />
        </div>
      </div>
      <div className="relative z-10 w-full bg-gray-800 md:h-[350px]">
        <div className="mx-auto flex h-full w-full justify-between  px-4 md:w-8/12 md:px-0">
          {partnersImages.map((element, index) => (
            <motion.div
              key={index}
              className="mb-5 h-2/3 w-1/3 max-w-[120px] md:mb-0 md:max-w-[300px]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.1 + index / 5 }}
            >
              <div className="p-3">
                <img src={`assets/landing/${element.url}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PartnersSection
