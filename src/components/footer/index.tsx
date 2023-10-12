import { Link, NavLink } from "react-router-dom"
import { SocialIcon } from "react-social-icons"

type Props = {}

const Footer = (props: Props) => {
  const titleStyles = "pb-3 text-md underline"
  const liStyles = "pb-1 text-sm"

  return (
    <footer className="text-md relative z-10 bg-gray-700 pt-5 font-medium uppercase text-white shadow-inner">
      <div className="mx-auto w-4/5 ">
        <div className="flex justify-between gap-4">
          <div className="col-md-4 col-sm-12">
            <h4 className={"text-md pb-3"}>Armwrestling Promotion Machine</h4>
          </div>

          <div className=""></div>
          <div className=""></div>
        </div>
      </div>
      <div className="mx-auto w-4/5">
        <div className="py-14">
          <div className="flex items-center justify-between">
            <div className="">
              <p>
                &copy; 2023 Всероссийская Федерация Армрестлинга. All Rights
                Reserved.
              </p>
            </div>
            <div className="flex gap-2">
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
