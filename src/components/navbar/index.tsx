import {
  faCaretDown,
  faRightToBracket,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import LangSwitch from "./langSwitch"
import SideBarHeader from "./sidebarHeader"
import MainLogo from "/assets/logo/mainlogo.png"
import DarkLogo from "/assets/logo/blacklogo.png"
import { navLinks } from "./links"
import NotificationBar from "./notificationBar"
import MobileNavBar from "./mobileBar"
import { useAppSelector } from "@/hooks/redux"
import NonImage from "/assets/utils/nonuserimage.jpg"
import Main from "@/pages/main"

type Props = {}

const Navbar = (props: Props) => {
  const langSwitchRef = useRef<HTMLDivElement | null>(null)
  const location = useLocation()
  const [theme, setTheme] = useState("light")
  const [hidden, setHidden] = useState("")
  const [scrollPrev, setScrollPrev] = useState(0)
  const [fixed, setFixed] = useState("")
  const [langHidden, setLangHidden] = useState(false)
  const [sidebarOpened, openSidebar] = useState(false)

  const { competitor, loading, error } = useAppSelector(
    (state) => state.competitors
  )

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
        className={`  ${hidden} center ${fixed}  z-20 mx-auto  mt-3 w-11/12 rounded-[25px] ${
          location.pathname === "/"
            ? "bg-gray-700"
            : " sm:bg-white md:bg-gray-700"
        }  shadow-sm transition duration-300 md:border-b-0 md:shadow-md`}
      >
        <div className="flex items-center justify-between py-3 px-10 md:px-16">
          <div>
            <Link to="/">
              <img
                className="hidden h-[50px] md:block"
                src={MainLogo}
                alt="image"
              />
              <img
                className="h-[50px] md:hidden"
                src={location.pathname === "/" ? MainLogo : DarkLogo}
                alt="image"
              />
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

          <div className="hidden items-center gap-3  md:flex">
            <div className="hidden px-3 text-white md:block">
              <div
                ref={langSwitchRef}
                onClick={() => setLangHidden(!langHidden)}
                className="cursor-pointer font-semibold transition hover:text-secondary-500"
              >
                RUS <FontAwesomeIcon icon={faCaretDown} />
              </div>

              <LangSwitch active={langHidden} />
            </div>

            {localStorage.getItem("token") !== null && <NotificationBar />}

            {isAuth() ? (
              <div className="hidden md:block">
                <Link to="/profile">
                  <div className={`${buttonStyles} flex items-center gap-2`}>
                    <FontAwesomeIcon icon={faUserCircle} />
                    <div>Профиль</div>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="hidden gap-2 md:flex">
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
            {competitor ? (
              <div
                className={`flex items-center ${
                  location.pathname === "/" ? "text-white" : "text-gray-700"
                }`}
              >
                {localStorage.getItem("token") !== null && <NotificationBar />}
                <Link to="/profile">
                  <div className="max-h-[65px] max-w-[65px]">
                    <img
                      className="h-[55px] w-[55px] rounded-full border-2 border-gray-200"
                      src={competitor?.image?.toString() || NonImage}
                    />
                  </div>
                </Link>
              </div>
            ) : (
              <div className="gap-2 md:hidden">
                <Link
                  className={`${
                    location.pathname === "/" ? "text-white" : "text-gray-700 "
                  }`}
                  to="/login"
                >
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
      <SideBarHeader
        openSidebar={openSidebar}
        sidebarOpened={sidebarOpened}
        navLinks={navLinks}
      />
      <MobileNavBar />
    </div>
  )
}

export default Navbar
