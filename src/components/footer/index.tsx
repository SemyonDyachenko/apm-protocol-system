import { useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import { SocialIcon } from "react-social-icons"

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer
      className={`text-md } relative bottom-0 
        z-10 bg-gray-700
      pt-5  pb-0 font-medium uppercase text-white  shadow-inner`}
    >
      <div className="mx-auto w-4/5 ">
        <div className="items-center justify-between gap-4 md:flex">
          <div className="col-md-4 col-sm-12">
            <h4 className={"text-md pb-3 font-semibold"}>
              Armwrestling Promotion Machine
            </h4>
          </div>

          <div className="flex-column  mt-4 flex justify-end md:mt-0 md:text-right">
            <div className="cursor-pointer underline transition hover:text-secondary-500 ">
              политика конфиденциальности
            </div>
            <div className="cursor-pointer underline transition hover:text-secondary-500">
              поддержка
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-4/5">
        <div className="py-8">
          <div className="items-center justify-between md:flex">
            <div className="">
              <p>
                &copy; 2023 Всероссийская Федерация Армрестлинга. All Rights
                Reserved.
              </p>
            </div>
            <div className="mt-4 flex gap-2 md:mt-0">
              <div>
                <SocialIcon
                  bgColor="#1DA1F2"
                  style={{ width: "40px", height: "40px" }}
                  url="https://twitter.com/jaketrent"
                />
              </div>
              <div>
                <SocialIcon
                  bgColor="#E1306C"
                  style={{ width: "40px", height: "40px" }}
                  url="https://instagram.com"
                />
              </div>
              <div>
                <SocialIcon
                  bgColor="#0077FF"
                  style={{ width: "40px", height: "40px" }}
                  url="https://vk.com"
                />
              </div>
              <div>
                <SocialIcon
                  bgColor="#FF0000"
                  style={{ width: "40px", height: "40px" }}
                  url="https://youtube.com"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
