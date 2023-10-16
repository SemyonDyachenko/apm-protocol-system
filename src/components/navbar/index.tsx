import { useAppSelector } from "@/hooks/redux"
import {
  faBuilding,
  faHome,
  faList,
  faMoon,
  faRightToBracket,
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
    icon: faTable,
  },
  {
    path: "/rating",
    title: "Рейтинг",
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
  {
    path: "/news",
    title: "Новости",
    icon: faBuilding,
    disabled: true,
  },
  {
    path: "/streams",
    title: "Трансляции",
    icon: faBuilding,
    disabled: true,
  },
  {
    path: "/trainers",
    title: "Тренировки",
    icon: faBuilding,
    disabled: true,
  },
]

const Navbar = (props: Props) => {
  const location = useLocation()
  const [theme, setTheme] = useState("light")
  const [hidden, setHidden] = useState("")
  const [scrollPrev, setScrollPrev] = useState(0)
  const [fixed, setFixed] = useState("")

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

  window.addEventListener("click", () => {
    if (location.pathname == "/") setFixed("fixed left-1/2 -translate-x-1/2")
    else setFixed("")
  })

  window.addEventListener("scroll", () => {
    let scrolled: number = window.scrollY

    if (scrolled > 100 && scrolled > scrollPrev) {
      setHidden("-translate-y-[80px]")
    } else {
      setHidden("")
    }
    setScrollPrev(scrolled)
  })

  const buttonStyles =
    " rounded-xl font-semibold bg-secondary-500 px-8 py-[7px]  text-gray-700 transition hover:bg-secondary-400 text-md"

  return (
    <nav
      className={` ${hidden} center ${fixed}  z-20 mx-auto mt-3 w-11/12   rounded-[25px]  bg-gray-700 shadow-md transition`}
    >
      <div className="flex items-center justify-between py-3 px-16">
        <div>
          <Link to="/">
            <img
              className="h-[50px]"
              src="assets/logo/mainlogo.png"
              alt="image"
            />
          </Link>
        </div>
        <div className="flex items-center justify-center text-sm font-medium text-white">
          {navLinks.map((element, index) => (
            <Link
              key={`${element}+${index}`}
              to={element.path}
              className={`${
                !element.disabled
                  ? "transition hover:text-secondary-400"
                  : "link-disabled hover:text-gray-disabled"
              }`}
            >
              <div
                className={`${
                  element.path === location.pathname && "text-secondary-400"
                }`}
                key={index}
              >
                <div
                  className={`mx-3 flex items-center gap-2 ${
                    element.disabled && "text-gray-disabled"
                  }`}
                >
                  <div>{element.title}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex  items-center justify-center gap-3">
          <div className="px-3">
            <div className="cursor-pointer font-semibold text-white">RUS</div>
          </div>
          {isAuth() ? (
            <div>
              <Link to="/profile">
                <div className={buttonStyles}>Профиль</div>
              </Link>
            </div>
          ) : (
            <div className="flex gap-2 ">
              <Link className="text-white " to="/login">
                <div className="text-md flex items-center gap-2 rounded-lg px-0 py-2 font-medium transition hover:text-secondary-500">
                  <div>Войти</div>
                  <FontAwesomeIcon icon={faRightToBracket} />
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
