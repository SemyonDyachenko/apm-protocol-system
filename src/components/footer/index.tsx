import { SocialIcon } from "react-social-icons"

type Props = {}

const Footer = (props: Props) => {
  const titleStyles = "pb-3 text-lg"
  const liStyles = "pb-1 text-sm"

  return (
    <footer className=" text-md bg-gray-700 pt-5 text-white shadow-inner">
      <div className="mx-auto w-4/5 ">
        <div className="flex justify-between gap-4">
          <div className="col-md-4 col-sm-12">
            <h4 className={titleStyles}>О нас</h4>
            <p className={liStyles}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              pharetra varius quam sit amet vulputate. Quisque mauris augue,
              molestie tincidunt condimentum vitae, gravida a libero.
            </p>
          </div>
          <div className="">
            <h4 className={titleStyles}>Меню</h4>
            <ul className="quick-links">
              <li className={liStyles}>
                <a href="#">Главная</a>
              </li>
              <li className={liStyles}>
                <a href="#">Блог</a>
              </li>
              <li className={liStyles}>
                <a href="#">Обратная связь</a>
              </li>
              <li className={liStyles}>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="">
            <h4 className={titleStyles}>Поддержка</h4>
            <ul className="quick-links">
              <li className={liStyles}>
                <a href="#">Помощь</a>
              </li>
              <li className={liStyles}>
                <a href="#">Terms of Service</a>
              </li>
              <li className={liStyles}>
                <a href="#">FAQ</a>
              </li>
            </ul>
          </div>
          <div className="">
            <h4 className={titleStyles}>Контакты</h4>
            <p className={liStyles}>Матвеевская 42к4, Москва, РФ</p>
            <p className={liStyles}>+7 (918)-064-33-82</p>
            <p className={liStyles}>contact@apm.com</p>
          </div>
        </div>
      </div>
      <div className="mx-auto w-4/5">
        <div className="py-5">
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
