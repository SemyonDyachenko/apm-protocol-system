import { useAppSelector } from "@/hooks/redux"
import {
  faBuilding,
  faHome,
  faList,
  faMoon,
  faSun,
  faTable,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { SocialIcon } from "react-social-icons"

type Props = {}

const navLinks = [
  {
    path: "/",
    title: "Главная",
    icon: faHome,
  },
  {
    path: "/rating",
    title: "Таблица рейтинга",
    icon: faTable,
  },
  {
    path: "/tournaments",
    title: "Турниры",
    icon: faList,
  },
  {
    path: "/leagues",
    title: "Лиги",
    icon: faBuilding,
  },
]

const Navbar = (props: Props) => {
  const location = useLocation()
  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const isAuth = () => {
    const token = localStorage.getItem("token")
    return token ? true : false
  }

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const buttonStyles =
    " rounded-md  font-medium bg-secondary-500 px-8 py-2 text-white transition hover:bg-primary-400 text-md"

  return (
    <nav className="w-full bg-gray-700">
      <div className="flex items-center justify-between py-4 px-24">
        <div>
          <img
            className="h-[40px] w-[240px] "
            src="https://static.tildacdn.com/tild3164-3739-4534-b466-346531666636/_.png"
          />
        </div>
        <div className="flex items-center justify-center text-sm font-bold text-white">
          {navLinks.map((element, index) => (
            <Link
              key={`${element}+${index}`}
              to={element.path}
              className="hover:text-secondary-400"
            >
              <div
                className={`${
                  element.path === location.pathname && "text-secondary-400"
                }`}
                key={index}
              >
                <div className="mx-3 flex items-center gap-2">
                  <FontAwesomeIcon className="text-md" icon={element.icon} />{" "}
                  <div>{element.title}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex  justify-center gap-3">
          {isAuth() ? (
            <div>
              <Link to="/profile">
                <div className={buttonStyles}>Профиль</div>
              </Link>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link className="text-white " to="/login">
                <div className="text-md px-6 py-2 font-medium  transition hover:text-secondary-500">
                  Войти
                </div>
              </Link>

              <Link to="/signup">
                <div className={buttonStyles}>Регистрация</div>
              </Link>
            </div>
          )}
          <button className="px-2 text-2xl text-white" onClick={toggleTheme}>
            {theme === "light" ? (
              <FontAwesomeIcon icon={faMoon} />
            ) : (
              <FontAwesomeIcon icon={faSun} />
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
