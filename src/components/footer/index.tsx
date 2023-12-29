import { useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { SocialIcon } from "react-social-icons"

type Props = {}

const Footer = (props: Props) => {
  const location = useLocation()
  const isMainPage = location.pathname === "/"

  return (
    <footer
      className={`text-md ${!isMainPage && "hidden"} wd z-10
      w-full  bg-gray-700 pt-4 
    font-medium uppercase
      text-white  `}
    >
      <div className="mx-auto w-4/5 ">
        <div className="items-center justify-between gap-4 pb-4 md:flex">
          <div className="">
            <div className="hidden items-center justify-between md:flex">
              <div className={"text-white"}>
                <p>
                  &copy; 2023 Всероссийская Федерация Армрестлинга. All Rights
                  Reserved.
                </p>
              </div>
            </div>
          </div>
          <div className="mb-14 flex gap-4 md:mb-0 md:mt-0 md:gap-2">
            <div>
              <SocialIcon
                bgColor="#1DA1F2"
                style={{ width: "40px", height: "40px" }}
                url="https://t.me/Armwrestling_news"
              />
            </div>

            <div>
              <SocialIcon
                bgColor="#0077FF"
                style={{ width: "40px", height: "40px" }}
                url="https://vk.com/apm_league"
              />
            </div>
            <div>
              <SocialIcon
                bgColor="#FF0000"
                style={{ width: "40px", height: "40px" }}
                url="https://www.youtube.com/@armwrestlingpromotionmachi5141"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
