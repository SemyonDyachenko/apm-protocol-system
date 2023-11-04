import { useAppSelector } from "@/hooks/redux"
import {
  faArrowDown,
  faBackspace,
  faBars,
  faBuilding,
  faCaretDown,
  faCircleXmark,
  faHome,
  faList,
  faMoon,
  faRightToBracket,
  faSun,
  faTable,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState, useRef } from "react"
import { Link, useLocation } from "react-router-dom"

import LangSwitch from "./langSwitch"
import SideBarHeader from "./sidebarHeader"
import { motion } from "framer-motion"
import MainLogo from "/assets/logo/mainlogo.png"

type Props = {}

export type NavLink = {
  path: string
  title: string
  icon: any
  disabled?: boolean
}

const navLinks: Array<NavLink> = [
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
  const langSwitchRef = useRef<HTMLDivElement | null>(null)
  const location = useLocation()
  const [theme, setTheme] = useState("light")
  const [hidden, setHidden] = useState("")
  const [scrollPrev, setScrollPrev] = useState(0)
  const [fixed, setFixed] = useState("")
  const [langHidden, setLangHidden] = useState(false)
  const [sidebarOpened, openSidebar] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const isAuth = () => {
    const token = localStorage.getItem("token")
    return token ? true : false
  }

  useEffect(() => {
    document.body.className = theme
    navbarPositionListner()
  }, [theme])

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        langSwitchRef.current &&
        !langSwitchRef.current.contains(event.target as HTMLElement)
      ) {
        setLangHidden(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const navbarPositionListner = () => {
    if (location.pathname == "/")
      setFixed("fixed left-[50%] translate-x-[-50%]")
    else setFixed("")
  }

  window.addEventListener("click", navbarPositionListner)

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
    " rounded-xl font-semibold bg-secondary-500 px-8 py-[7px]  text-gray-700 transition  hover:bg-secondary-400 text-md"

  return (
    <div>
      <nav
        className={` ${hidden} center ${fixed}  z-20 mx-auto mt-3 w-11/12 rounded-[25px]  bg-gray-700 shadow-md transition duration-300 `}
      >
        <div className="flex items-center justify-between py-3 px-16">
          <div>
            <Link to="/">
              <img className="h-[50px]" src={MainLogo} alt="image" />
            </Link>
          </div>
          <div className="hidden items-center justify-center text-sm font-medium text-white md:flex">
            {navLinks.map((element, index) => (
              <Link
                key={`${element}+${index}`}
                to={element.path}
                className={`${
                  !element.disabled
                    ? "transition hover:text-secondary-400"
                    : "link-disabled hover:text-gray-disabled"
                }  `}
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

          <div className="hidden  items-center justify-center gap-3 md:flex">
            <div className="px-3 text-white ">
              <div
                ref={langSwitchRef}
                onClick={() => setLangHidden(!langHidden)}
                className="cursor-pointer font-semibold transition hover:text-secondary-500"
              >
                RUS <FontAwesomeIcon icon={faCaretDown} />
              </div>

              <LangSwitch active={langHidden} />
            </div>

            {isAuth() ? (
              <div>
                <Link to="/profile">
                  <div className={`${buttonStyles} flex items-center gap-2`}>
                    <FontAwesomeIcon icon={faUserCircle} />
                    <div>Профиль</div>
                  </div>
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

          <div className="md:hidden">
            <FontAwesomeIcon
              onClick={() => openSidebar(!sidebarOpened)}
              className="cursor-pointer text-xl text-secondary-500"
              icon={faBars}
            />
          </div>
        </div>
      </nav>
      <SideBarHeader
        openSidebar={openSidebar}
        sidebarOpened={sidebarOpened}
        navLinks={navLinks}
      />
    </div>
  )
}

export default Navbar
