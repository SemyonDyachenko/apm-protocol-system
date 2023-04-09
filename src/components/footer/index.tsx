import { SocialIcon } from "react-social-icons"

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className=" text-md bg-gray-700 pt-5 text-white">
      <div className="mx-auto w-4/5 ">
        <div className="flex justify-between gap-4">
          <div className="col-md-4 col-sm-12">
            <h4 className="pb-3 text-xl">О нас</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              pharetra varius quam sit amet vulputate. Quisque mauris augue,
              molestie tincidunt condimentum vitae, gravida a libero.
            </p>
          </div>
          <div className="">
            <h4 className="pb-3 text-xl">Меню</h4>
            <ul className="quick-links">
              <li className="pb-1">
                <a href="#">Главная</a>
              </li>
              <li className="pb-1">
                <a href="#">Блог</a>
              </li>
              <li className="pb-1">
                <a href="#">Обратная связь</a>
              </li>
              <li className="pb-1">
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="">
            <h4 className="pb-3 text-xl">Поддержка</h4>
            <ul className="quick-links">
              <li className="pb-1">
                <a href="#">Помощь</a>
              </li>
              <li className="pb-1">
                <a href="#">Terms of Service</a>
              </li>
              <li className="pb-1">
                <a href="#">FAQ</a>
              </li>
            </ul>
          </div>
          <div className="">
            <h4 className="pb-3 text-xl">Контакты</h4>
            <p className="pb-1">Матвеевская 42к4, Москва, РФ</p>
            <p className="pb-1">+7 (918)-064-33-82</p>
            <p className="pb-1">contact@apm.com</p>
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
                <SocialIcon url="https://twitter.com/jaketrent" />
              </div>
              <div>
                <SocialIcon url="https://instagram.com" />
              </div>
              <div>
                <SocialIcon url="https://vk.com" />
              </div>
              <div>
                <SocialIcon url="https://youtube.com" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

/*  <div className=" bg-gray-700 py-10">
      <div className="flex w-full items-center justify-center text-lg text-white">
        All Right Reserved @ Copyright 2023
      </div>
      <div className="flex items-center justify-center  gap-2 pt-3 text-xl text-white">
        <div>
          <SocialIcon url="https://twitter.com/jaketrent" />
        </div>
        <div>
          <SocialIcon url="https://instagram.com" />
        </div>
        <div>
          <SocialIcon url="https://vk.com" />
        </div>
        <div>
          <SocialIcon url="https://youtube.com" />
        </div>
      </div>
    </div>*/
